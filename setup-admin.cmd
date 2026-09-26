@echo off
setlocal EnableExtensions EnableDelayedExpansion

REM ============================================================
REM  FasterFood POS - one-time administrator setup
REM  Right-click this file -> "Run as administrator"
REM
REM  1. Verifies Node.js is installed
REM  2. Ensures the PostgreSQL service is running
REM  3. Opens TCP 5501 in Windows Firewall on all profiles
REM  4. Registers a boot-start scheduled task and starts it
REM
REM  NOTE: this script does NOT edit postgresql.conf.
REM  listen_addresses is already 'localhost', so port 5432 is
REM  never reachable from the network. Verify with:
REM    netstat -ano | findstr :5432
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

REM ---------- 1. Node.js ----------
REM Change this line if Node.js is installed somewhere else.
set "FF_NODE=D:\webapp test run\node.exe"
if not exist "!FF_NODE!" for /f "delims=" %%i in ('where node 2^>nul') do set "FF_NODE=%%i"

if not exist "!FF_NODE!" (
  echo.
  echo ERROR: node.exe was not found.
  echo        Edit the FF_NODE line near the top of this script and
  echo        point it at your node.exe, then run it again.
  echo.
  pause
  exit /b 1
)

set "FF_SCRIPT=%~dp0server.js"
set "FF_WORKDIR=%~dp0"

if not exist "!FF_SCRIPT!" (
  echo.
  echo ERROR: server.js not found next to this script:
  echo        !FF_SCRIPT!
  echo.
  pause
  exit /b 1
)

echo.
echo [1/4] Node.js  : !FF_NODE!
echo       Server  : !FF_SCRIPT!

REM ---------- 2. PostgreSQL ----------
echo.
echo [2/4] Checking PostgreSQL service ...
sc query postgresql-x64-18 | findstr /C:"RUNNING" >nul
if errorlevel 1 (
  net start postgresql-x64-18
  timeout /t 3 /nobreak >nul
) else (
  echo       already running.
)

sc query postgresql-x64-18 | findstr /C:"RUNNING" >nul
if errorlevel 1 (
  echo.
  echo ERROR: PostgreSQL is not running. Fix that first, then re-run.
  echo        Check: Get-Service postgresql-x64-18
  echo.
  pause
  exit /b 1
)

REM ---------- 3. Firewall ----------
echo.
echo [3/4] Opening TCP 5501 in Windows Firewall ...
netsh advfirewall firewall delete rule name="FasterFood POS" >nul 2>&1
netsh advfirewall firewall add rule name="FasterFood POS" dir=in action=allow protocol=TCP localport=5501 profile=any

if errorlevel 1 (
  echo.
  echo ERROR: could not add the firewall rule.
  echo.
  pause
  exit /b 1
)

REM ---------- 4. Boot task ----------
echo.
echo [4/4] Registering the boot-start scheduled task ...
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

REM ---------- start it now ----------
echo.
echo Starting the task ...
schtasks /run /tn "FasterFoodPOS" >nul 2>&1

set /a FF_WAIT=0
:wait_loop
timeout /t 2 /nobreak >nul
netstat -ano | findstr /C:":5501" | findstr /C:"LISTENING" >nul
if not errorlevel 1 goto wait_ok
set /a FF_WAIT+=2
if %FF_WAIT% GEQ 20 goto wait_fail
goto wait_loop

:wait_fail
echo.
echo WARNING: the task started but nothing is listening on port 5501 yet.
echo          Open Task Scheduler -^> Task Scheduler Library -^> FasterFoodPOS
echo          and check the "Last Run Result" for the reason.
echo.
echo          Common cause: node.exe lives on a drive that is not ready
echo          at boot. Move Node to C:\ or start the task manually.
echo.
pause
exit /b 1

:wait_ok
echo       listening on port 5501.
echo.
echo ============================================================
echo  Setup complete.
echo.
echo  Terminals open:   http://192.168.0.3:5501
echo  Local check:      http://localhost:5501
echo  Database check:   netstat -ano ^| findstr :5432
echo                    (should show 127.0.0.1 / [::1] only)
echo.
echo  The server now starts by itself every time this PC boots.
echo  Do not also run "npm start" by hand - port 5501 would clash.
echo
echo  IMPORTANT: reserve 192.168.0.3 in your router (192.168.0.1)
echo  so this address never changes. See DEPLOY.md - "Fixed IP".
echo ============================================================
echo.
pause
endlocal
