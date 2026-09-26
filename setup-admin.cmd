@echo off
setlocal EnableExtensions EnableDelayedExpansion

REM ============================================================
REM  FasterFood POS - installer
REM  Right-click this file -> "Run as administrator"
REM
REM  1. Locates Node.js
REM  2. Stops a POS server that is already running
REM  3. Configures PostgreSQL and creates the role + database
REM  4. Optionally restores a database dump
REM  5. Registers a boot-start scheduled task and starts the server
REM
REM  Safe to re-run. Every step checks before it changes anything.
REM
REM  TO MOVE EXISTING DATA ONTO THIS PC, copy a dump to either
REM     restore.dump                 (next to this script)
REM     backups\install\latest.dump
REM  before running. You will be asked whether to restore it.
REM ============================================================

net session >nul 2>&1
if errorlevel 1 (
  echo.
  echo ERROR: This script must be run as Administrator.
  echo Right-click setup-admin.cmd -^> "Run as administrator".
  echo.
  pause
  exit /b 1
)

set "FF_WORKDIR=%~dp0"
set "FF_SCRIPT=%~dp0server.js"
set "FF_PGSETUP=%~dp0pg-setup.ps1"

REM ---------- 1. Node.js ----------
REM Change this line only if Node.js is installed somewhere unusual.
set "FF_NODE=D:\webapp test run\node.exe"
if not exist "!FF_NODE!" for /f "delims=" %%i in ('where node 2^>nul') do set "FF_NODE=%%i"
if not exist "!FF_NODE!" if exist "%ProgramFiles%\nodejs\node.exe" set "FF_NODE=%ProgramFiles%\nodejs\node.exe"

if not exist "!FF_NODE!" (
  echo.
  echo ERROR: node.exe was not found.
  echo        Install Node.js 18 or newer, or edit the FF_NODE line
  echo        near the top of this script to point at node.exe.
  echo.
  pause
  exit /b 1
)

if not exist "!FF_SCRIPT!" (
  echo.
  echo ERROR: server.js not found next to this script:
  echo        !FF_SCRIPT!
  echo        Copy the whole project folder before running setup.
  echo.
  pause
  exit /b 1
)

if not exist "!FF_PGSETUP!" (
  echo.
  echo ERROR: pg-setup.ps1 not found next to this script:
  echo        !FF_PGSETUP!
  echo        Copy the whole project folder before running setup.
  echo.
  pause
  exit /b 1
)

echo.
echo [1/5] Node.js  : !FF_NODE!
echo       Project  : !FF_WORKDIR!

REM ---------- 2. Stop a running server ----------
echo.
echo [2/5] Stopping any running POS server ...
schtasks /end /tn "FasterFoodPOS" >nul 2>&1
"%SystemRoot%\System32\timeout.exe" /t 2 /nobreak >nul
for /f "tokens=5" %%p in ('netstat -ano ^| findstr /C:":5501" ^| findstr /C:"LISTENING"') do (
  echo       port 5501 held by PID %%p - stop it before continuing.
  echo.
  pause
  exit /b 1
)
echo       port 5501 is free.

REM ---------- 3 + 4. PostgreSQL, then optional restore ----------
set "FF_DUMP="
if exist "!FF_WORKDIR!restore.dump" set "FF_DUMP=!FF_WORKDIR!restore.dump"
if not defined FF_DUMP if exist "!FF_WORKDIR!backups\install\latest.dump" set "FF_DUMP=!FF_WORKDIR!backups\install\latest.dump"

set "FF_RESTORE="
if defined FF_DUMP (
  echo.
  echo A database dump was found:
  echo    !FF_DUMP!
  echo.
  echo        YES - restore it. Use this when MOVING data to this PC.
  echo        NO  - keep what is already in the database.
  echo.
  choice /C YN /N /M "        Restore this dump? [Y/N] "
  if errorlevel 2 (set "FF_DUMP=") else (set "FF_RESTORE=1")
)

echo.
echo [3/5] Configuring PostgreSQL, role and database ...

if defined FF_DUMP (
  powershell -NoProfile -ExecutionPolicy Bypass -File "!FF_PGSETUP!" -Restore -Dump "!FF_DUMP!"
) else (
  powershell -NoProfile -ExecutionPolicy Bypass -File "!FF_PGSETUP!"
)

if errorlevel 1 (
  echo.
  echo ERROR: PostgreSQL setup failed. See the messages above.
  echo.
  pause
  exit /b 1
)

REM ---------- 5. Boot task ----------
echo.
echo [4/5] Opening TCP 5501 in Windows Firewall ...
netsh advfirewall firewall delete rule name="FasterFood POS" >nul 2>&1
netsh advfirewall firewall add rule name="FasterFood POS" dir=in action=allow protocol=TCP localport=5501 profile=any
if errorlevel 1 (
  echo.
  echo ERROR: could not add the firewall rule.
  echo.
  pause
  exit /b 1
)

echo.
echo [5/5] Registering the boot-start scheduled task ...
echo       Task name : FasterFoodPOS
echo       Runs as   : SYSTEM, at every boot
echo       Command   : "!FF_NODE!" "!FF_SCRIPT!"

set "FF_PS1=%TEMP%\ff-register-task.ps1"
>"!FF_PS1!"  echo $ErrorActionPreference = 'Stop'
>>"!FF_PS1!" echo $quoted = [char]34 + $env:FF_SCRIPT + [char]34
>>"!FF_PS1!" echo $action = New-ScheduledTaskAction -Execute $env:FF_NODE -Argument $quoted -WorkingDirectory $env:FF_WORKDIR
>>"!FF_PS1!" echo $trigger = New-ScheduledTaskTrigger -AtStartup
>>"!FF_PS1!" echo $principal = New-ScheduledTaskPrincipal -UserId 'SYSTEM' -LogonType ServiceAccount -RunLevel Highest
>>"!FF_PS1!" echo $settings = New-ScheduledTaskSettingsSet -ExecutionTimeLimit ([TimeSpan]::Zero) -RestartCount 999 -RestartInterval (New-TimeSpan -Minutes 1) -StartWhenAvailable -MultipleInstances IgnoreNew
>>"!FF_PS1!" echo Register-ScheduledTask -TaskName 'FasterFoodPOS' -Action $action -Trigger $trigger -Principal $principal -Settings $settings -Description 'FasterFood POS server - starts automatically at boot' -Force ^| Out-Null

powershell -NoProfile -ExecutionPolicy Bypass -File "!FF_PS1!"
set "FF_RC=%errorlevel%"
del /q "!FF_PS1!" >nul 2>&1

if not "%FF_RC%"=="0" (
  echo.
  echo ERROR: task registration failed. See the PowerShell error above.
  echo.
  pause
  exit /b 1
)
echo       registered.

echo.
echo Starting the task ...
schtasks /run /tn "FasterFoodPOS" >nul 2>&1

set /a FF_WAIT=0
:wait_loop
"%SystemRoot%\System32\timeout.exe" /t 2 /nobreak >nul
netstat -ano | findstr /C:":5501" | findstr /C:"LISTENING" >nul
if not errorlevel 1 goto wait_ok
set /a FF_WAIT+=2
if %FF_WAIT% GEQ 20 goto wait_fail
goto wait_loop

:wait_fail
echo.
echo WARNING: the task started but nothing is listening on port 5501.
echo          Open Task Scheduler -^> FasterFoodPOS and read "Last Run Result".
echo          0x1 usually means node.exe is missing or its drive was not
echo          ready at boot.
echo.
pause
exit /b 1

:wait_ok
set "FF_IP="
for /f "usebackq delims=" %%i in (`powershell -NoProfile -Command "(Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -notlike '127.*' -and $_.PrefixOrigin -ne 'WellKnown' -and $_.InterfaceAlias -notmatch 'vEthernet|VMware|VirtualBox|Bluetooth|Loopback' } | Sort-Object InterfaceMetric | Select-Object -First 1).IPAddress"`) do set "FF_IP=%%i"
if not defined FF_IP set "FF_IP=localhost"

echo.
echo ============================================================
echo  Setup complete.
echo.
echo  Terminals open:   http://!FF_IP!:5501
echo  Local check:      http://localhost:5501
echo  Database check:   netstat -ano ^| findstr :5432
echo                    (should show 127.0.0.1 / [::1] only)
echo.
echo  The server now starts by itself every time this PC boots.
echo  Do not also run "npm start" by hand - port 5501 would clash.
echo
echo  Reserve !FF_IP! in your router (192.168.0.1) so the address
echo  never changes. See DEPLOY.md - "Fixed IP".
echo
echo  If you moved data here, change the default password:
echo  the app ships with admin / 123.
echo ============================================================
echo.
pause
endlocal
