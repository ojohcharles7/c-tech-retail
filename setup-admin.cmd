@echo off
setlocal EnableExtensions EnableDelayedExpansion

REM ============================================================
REM  FasterFood POS - installer
REM
REM  Double-click this file. It asks Windows for administrator
REM  rights on its own, so there is no need to right-click it.
REM
REM  1. Locates Node.js
REM  2. Stops a POS server that is already running
REM  3. Configures PostgreSQL and creates the role + database
REM  4. Optionally restores a database dump
REM  5. Registers a boot-start scheduled task and starts the server
REM  6. Publishes the connect URL and registers the logon launcher
REM
REM  Safe to re-run. Every step checks before it changes anything.
REM
REM  Switches:
REM     /S   silent. No questions and no pauses. Skips the restore
REM         prompt and keeps whatever is already in the database.
REM
REM  TO MOVE EXISTING DATA ONTO THIS PC, copy a dump to either
REM     restore.dump                 (next to this script)
REM     backups\install\latest.dump
REM  before running. You will be asked whether to restore it.
REM ============================================================

REM ---------- 0. Switches, then make sure we are elevated ----------
set "FF_SILENT="
for %%a in (%*) do (
  if /i "%%a"=="/S"       set "FF_SILENT=1"
  if /i "%%a"=="/SILENT" set "FF_SILENT=1"
)

net session >nul 2>&1
if errorlevel 1 (
  echo.
  echo Requesting administrator rights ...
  if defined FF_SILENT (
    powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Process -FilePath '%~f0' -ArgumentList '/S' -WorkingDirectory '%~dp0' -Verb RunAs"
  ) else (
    powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Process -FilePath '%~f0' -WorkingDirectory '%~dp0' -Verb RunAs"
  )
  if errorlevel 1 (
    echo.
    echo ERROR: Windows would not elevate this script.
    echo        Right-click setup-admin.cmd -^> "Run as administrator",
    echo        or run it from an Administrator command prompt.
    echo.
    call :ff_pause
  )
  exit /b 0
)

set "FF_WORKDIR=%~dp0"
set "FF_SCRIPT=%~dp0server.js"
set "FF_PGSETUP=%~dp0pg-setup.ps1"
set "FF_CONNECT=%~dp0connect-info.ps1"
set "FF_LAUNCHER=%~dp0start-pos.cmd"
set "FF_PORT=5501"

REM ---------- 1. Node.js ----------
REM The standard install location wins. The D:\ entry is only a
REM fallback for older machines - delete it once Node.js is
REM installed in C:\Program Files\nodejs.
set "FF_NODE=%ProgramFiles%\nodejs\node.exe"
if not exist "!FF_NODE!" for /f "delims=" %%i in ('where node 2^>nul') do if not exist "!FF_NODE!" set "FF_NODE=%%i"
if not exist "!FF_NODE!" if exist "D:\webapp test run\node.exe" set "FF_NODE=D:\webapp test run\node.exe"

if not exist "!FF_NODE!" (
  echo.
  echo ERROR: node.exe was not found.
  echo        Install Node.js 18 or newer, or edit the FF_NODE line
  echo        near the top of this script to point at node.exe.
  echo.
  call :ff_pause
  exit /b 1
)

if not exist "!FF_SCRIPT!" (
  echo.
  echo ERROR: server.js not found next to this script:
  echo        !FF_SCRIPT!
  echo        Copy the whole project folder before running setup.
  echo.
  call :ff_pause
  exit /b 1
)

if not exist "!FF_PGSETUP!" (
  echo.
  echo ERROR: pg-setup.ps1 not found next to this script:
  echo        !FF_PGSETUP!
  echo        Copy the whole project folder before running setup.
  echo.
  call :ff_pause
  exit /b 1
)

if not exist "!FF_CONNECT!" (
  echo.
  echo ERROR: connect-info.ps1 not found next to this script:
  echo        !FF_CONNECT!
  echo        Copy the whole project folder before running setup.
  echo.
  call :ff_pause
  exit /b 1
)

if not exist "!FF_LAUNCHER!" (
  echo.
  echo ERROR: start-pos.cmd not found next to this script:
  echo        !FF_LAUNCHER!
  echo        Copy the whole project folder before running setup.
  echo.
  call :ff_pause
  exit /b 1
)

echo.
echo [1/6] Node.js  : !FF_NODE!
echo       Project  : !FF_WORKDIR!

REM ---------- 2. Stop a running server ----------
echo.
echo [2/6] Stopping any running POS server ...
schtasks /end /tn "FasterFoodPOS" >nul 2>&1

REM Ending the task is not instant, and starting it again too early
REM leaves the new run sitting in the queue forever. Wait for the
REM port to actually clear before going any further.
set /a FF_STOP=0
:stop_loop
"%SystemRoot%\System32\timeout.exe" /t 2 /nobreak >nul
netstat -ano | findstr /C:":!FF_PORT!" | findstr /C:"LISTENING" >nul
if errorlevel 1 goto stop_ok
set /a FF_STOP+=2
if %FF_STOP% GEQ 20 goto stop_stuck
goto stop_loop

:stop_stuck
REM The task is gone but something still holds the port. If it is a
REM node.exe left over from the task, clear it and carry on.
set "FF_HOLDER="
for /f "tokens=5" %%p in ('netstat -ano ^| findstr /C:":!FF_PORT!" ^| findstr /C:"LISTENING"') do set "FF_HOLDER=%%p"
if defined FF_HOLDER (
  tasklist /fi "PID eq !FF_HOLDER!" /nh 2>nul | findstr /i "node.exe" >nul
  if not errorlevel 1 (
    echo       ending leftover node.exe PID !FF_HOLDER! ...
    taskkill /f /pid !FF_HOLDER! >nul 2>&1
    "%SystemRoot%\System32\timeout.exe" /t 2 /nobreak >nul
  )
)
netstat -ano | findstr /C:":!FF_PORT!" | findstr /C:"LISTENING" >nul
if not errorlevel 1 (
  for /f "tokens=5" %%p in ('netstat -ano ^| findstr /C:":!FF_PORT!" ^| findstr /C:"LISTENING"') do (
    echo       port !FF_PORT! is still held by PID %%p - stop it before continuing.
    echo.
    call :ff_pause
    exit /b 1
  )
)

:stop_ok
echo       port !FF_PORT! is free.

REM ---------- 3 + 4. PostgreSQL, then optional restore ----------
set "FF_DUMP="
if exist "!FF_WORKDIR!restore.dump" set "FF_DUMP=!FF_WORKDIR!restore.dump"
if not defined FF_DUMP if exist "!FF_WORKDIR!backups\install\latest.dump" set "FF_DUMP=!FF_WORKDIR!backups\install\latest.dump"

set "FF_RESTORE="
if defined FF_DUMP if not defined FF_SILENT (
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
if defined FF_DUMP if defined FF_SILENT set "FF_DUMP="

echo.
echo [3/6] Configuring PostgreSQL, role and database ...

if defined FF_DUMP (
  powershell -NoProfile -ExecutionPolicy Bypass -File "!FF_PGSETUP!" -Restore -Dump "!FF_DUMP!"
) else (
  powershell -NoProfile -ExecutionPolicy Bypass -File "!FF_PGSETUP!"
)

if errorlevel 1 (
  echo.
  echo ERROR: PostgreSQL setup failed. See the messages above.
  echo.
  call :ff_pause
  exit /b 1
)

REM ---------- 5. Boot task ----------
echo.
echo [4/6] Opening TCP !FF_PORT! in Windows Firewall ...
netsh advfirewall firewall delete rule name="FasterFood POS" >nul 2>&1
netsh advfirewall firewall add rule name="FasterFood POS" dir=in action=allow protocol=TCP localport=!FF_PORT! profile=any
if errorlevel 1 (
  echo.
  echo ERROR: could not add the firewall rule.
  echo.
  call :ff_pause
  exit /b 1
)

echo.
echo [5/6] Registering the boot-start scheduled task ...
echo       Task name : FasterFoodPOS
echo       Runs as   : SYSTEM, at every boot
echo       Command   : "!FF_NODE!" "!FF_SCRIPT!"

set "FF_PS1=%TEMP%\ff-register-task.ps1"
>"!FF_PS1!"  echo $ErrorActionPreference = 'Stop'
>>"!FF_PS1!" echo $quoted = [char]34 + $env:FF_SCRIPT + [char]34
>>"!FF_PS1!" echo $action = New-ScheduledTaskAction -Execute $env:FF_NODE -Argument $quoted -WorkingDirectory $env:FF_WORKDIR
>>"!FF_PS1!" echo $trigger = New-ScheduledTaskTrigger -AtStartup
>>"!FF_PS1!" echo $principal = New-ScheduledTaskPrincipal -UserId 'SYSTEM' -LogonType ServiceAccount -RunLevel Highest
>>"!FF_PS1!" echo $settings = New-ScheduledTaskSettingsSet -ExecutionTimeLimit ([TimeSpan]::Zero) -RestartCount 999 -RestartInterval (New-TimeSpan -Minutes 1) -StartWhenAvailable -MultipleInstances IgnoreNew -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
>>"!FF_PS1!" echo Register-ScheduledTask -TaskName 'FasterFoodPOS' -Action $action -Trigger $trigger -Principal $principal -Settings $settings -Description 'FasterFood POS server - starts automatically at boot' -Force ^| Out-Null

powershell -NoProfile -ExecutionPolicy Bypass -File "!FF_PS1!"
set "FF_RC=%errorlevel%"
del /q "!FF_PS1!" >nul 2>&1

if not "%FF_RC%"=="0" (
  echo.
  echo ERROR: task registration failed. See the PowerShell error above.
  echo.
  call :ff_pause
  exit /b 1
)
echo       registered.

echo.
echo Starting the task ...
schtasks /run /tn "FasterFoodPOS" >nul 2>&1

REM A first "run" can be swallowed if the scheduler still considers the
REM old instance to be going, so keep asking until the port answers.
set /a FF_WAIT=0
set /a FF_TRIES=0
:wait_loop
"%SystemRoot%\System32\timeout.exe" /t 2 /nobreak >nul
netstat -ano | findstr /C:":!FF_PORT!" | findstr /C:"LISTENING" >nul
if not errorlevel 1 goto wait_ok
set /a FF_WAIT+=2
if %FF_WAIT% GEQ 20 goto wait_retry
goto wait_loop

:wait_retry
set /a FF_TRIES+=1
if %FF_TRIES% GEQ 3 goto wait_fail
echo       still nothing on port !FF_PORT! - starting the task again (try %FF_TRIES%)
schtasks /run /tn "FasterFoodPOS" >nul 2>&1
set /a FF_WAIT=0
goto wait_loop

:wait_fail
echo.
echo WARNING: the task started but nothing is listening on port !FF_PORT!.
echo          Open Task Scheduler -^> FasterFoodPOS and read "Last Run Result".
echo          0x1 usually means node.exe is missing or its drive was not
echo          ready at boot.
echo.
call :ff_pause
exit /b 1

:wait_ok
REM ---------- 6. Connect URL + logon launcher ----------
echo.
echo [6/6] Publishing the connect address and registering the logon launcher ...

set "FF_IP="
for /f "usebackq delims=" %%i in (`powershell -NoProfile -ExecutionPolicy Bypass -File "!FF_CONNECT!" -Port !FF_PORT! -WriteFile "!FF_WORKDIR!connect.json"`) do if not defined FF_IP set "FF_IP=%%i"
if not defined FF_IP set "FF_IP=localhost"
echo       Terminals : http://!FF_IP!:!FF_PORT!
echo       This PC   : http://localhost:!FF_PORT!
echo       Written to connect.json, and served at /api/connect

echo.
echo       Task name : FasterFoodPOS Launcher
echo       Runs as   : this user, at every logon, with admin rights
echo       Command   : "!FF_LAUNCHER!"
echo.
echo       Task name : FasterFoodPOS App
echo       Runs as   : this user, WITHOUT admin rights
echo       Opens     : the app window at http://!FF_IP!:!FF_PORT!/

set "FF_PS1=%TEMP%\ff-register-launcher.ps1"
>"!FF_PS1!"  echo $ErrorActionPreference = 'Stop'
>>"!FF_PS1!" echo $dir = $env:FF_WORKDIR
>>"!FF_PS1!" echo $launcher = $env:FF_LAUNCHER
>>"!FF_PS1!" echo $user = [System.Security.Principal.WindowsIdentity]::GetCurrent().Name
>>"!FF_PS1!" echo $quoted = '/c ' + [char]34 + $launcher + [char]34
>>"!FF_PS1!" echo $action = New-ScheduledTaskAction -Execute $env:ComSpec -Argument $quoted -WorkingDirectory $dir
>>"!FF_PS1!" echo $trigger = New-ScheduledTaskTrigger -AtLogOn -User $user
>>"!FF_PS1!" echo $trigger.Delay = 'PT45S'
>>"!FF_PS1!" echo $principal = New-ScheduledTaskPrincipal -UserId $user -LogonType Interactive -RunLevel Highest
>>"!FF_PS1!" echo $settings = New-ScheduledTaskSettingsSet -ExecutionTimeLimit ([TimeSpan]::Zero) -StartWhenAvailable -MultipleInstances IgnoreNew -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
>>"!FF_PS1!" echo Register-ScheduledTask -TaskName 'FasterFoodPOS Launcher' -Action $action -Trigger $trigger -Principal $principal -Settings $settings -Description 'FasterFood POS - waits for the server and opens the app after logon' -Force ^| Out-Null
>>"!FF_PS1!" echo $pf86 = [Environment]::GetEnvironmentVariable('ProgramFiles(x86)')
>>"!FF_PS1!" echo $edge = Join-Path $pf86 'Microsoft\Edge\Application\msedge.exe'
>>"!FF_PS1!" echo if (-not (Test-Path $edge)) { $edge = Join-Path $env:ProgramFiles 'Microsoft\Edge\Application\msedge.exe' }
>>"!FF_PS1!" echo if (-not (Test-Path $edge)) { $edge = Join-Path $env:WINDIR 'explorer.exe' }
>>"!FF_PS1!" echo $url = "http://" + $env:FF_IP + ":" + $env:FF_PORT + "/"
>>"!FF_PS1!" echo if ($edge -like '*explorer.exe') { $edgeArgs = $url } else { $edgeArgs = '--profile-directory=Default --app=' + $url }
>>"!FF_PS1!" echo $appAction = New-ScheduledTaskAction -Execute $edge -Argument $edgeArgs
>>"!FF_PS1!" echo $openPrincipal = New-ScheduledTaskPrincipal -UserId $user -LogonType Interactive -RunLevel Limited
>>"!FF_PS1!" echo $openSettings = New-ScheduledTaskSettingsSet -ExecutionTimeLimit ([TimeSpan]::Zero) -StartWhenAvailable -MultipleInstances IgnoreNew -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
>>"!FF_PS1!" echo Register-ScheduledTask -TaskName 'FasterFoodPOS App' -Action $appAction -Principal $openPrincipal -Settings $openSettings -Description 'FasterFood POS - the app window' -Force ^| Out-Null

powershell -NoProfile -ExecutionPolicy Bypass -File "!FF_PS1!"
set "FF_RC=%errorlevel%"
del /q "!FF_PS1!" >nul 2>&1

if not "%FF_RC%"=="0" (
  echo.
  echo ERROR: launcher task registration failed. See the PowerShell error above.
  echo.
  call :ff_pause
  exit /b 1
)
echo       registered.

REM The installer is a one-time job. A copy of it in the Startup
REM folder would run at every logon, without admin rights, and
REM would look for server.js next to the Startup folder - so it
REM could never work. Remove it now that the tasks exist.
set "FF_STARTUP=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
if exist "!FF_STARTUP!\setup-admin.cmd" (
  del /q "!FF_STARTUP!\setup-admin.cmd"
  if not exist "!FF_STARTUP!\setup-admin.cmd" (
    echo.
    echo       removed the old copy of this script from the Startup folder.
    echo       Logon is now handled by the FasterFoodPOS Launcher task.
  ) else (
    echo.
    echo WARNING: could not remove "!FF_STARTUP!\setup-admin.cmd".
    echo          Delete it by hand, or it will run again at every logon.
  )
)

echo.
echo ============================================================
echo  Setup complete.
echo.
echo  Terminals open:   http://!FF_IP!:!FF_PORT!
echo  Local check:      http://localhost:!FF_PORT!
echo  Database check:   netstat -ano ^| findstr :5432
echo                    (should show 127.0.0.1 / [::1] only)
echo.
echo  From now on this PC needs no manual step:
echo    boot   - the server starts as SYSTEM, before anyone logs in
echo    logon  - the app window opens at http://!FF_IP!:!FF_PORT!
echo.
echo  Both are scheduled tasks, so they need no shortcut and no
echo  Startup folder entry.
echo  Do not also run "npm start" by hand - port !FF_PORT! would clash.
echo.
echo  Reserve !FF_IP! in your router (192.168.0.1) so the address
echo  never changes. See DEPLOY.md - "Fixed IP".
echo.
echo  If you moved data here, change the default password:
echo  the app ships with admin / 123.
echo ============================================================
echo.
call :ff_pause
endlocal
exit /b 0

:ff_pause
if defined FF_SILENT exit /b 0
pause
exit /b 0
