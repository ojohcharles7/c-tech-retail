@echo off
setlocal EnableExtensions EnableDelayedExpansion

REM ============================================================
REM  FasterFood POS - logon launcher
REM
REM  Runs from the "FasterFoodPOS Launcher" scheduled task at
REM  every logon, with admin rights. It installs nothing and
REM  never asks a question - a failed step is written to
REM  start-pos.log and the launcher moves on.
REM
REM  1. Waits for the POS server to answer on the port
REM  2. Starts the FasterFoodPOS task if the server is not up
REM  3. Rewrites connect.json with the current LAN address
REM  4. Points the Edge shortcut at that address
REM  5. Registers "FasterFoodPOS App" with that address and runs it
REM
REM  Step 5 registers the browser as the task's own main process
REM  instead of starting it from here. A window started by a
REM  script belongs to that script's process tree, and Task
REM  Scheduler discards the tree when the task ends, which is why
REM  the app window used to vanish as soon as it opened.
REM
REM  Run it by hand with:  start-pos.cmd
REM ============================================================

set "FF_WORKDIR=%~dp0"
set "FF_CONNECT=%~dp0connect-info.ps1"
set "FF_LOG=%~dp0start-pos.log"
set "FF_PORT=5501"
set "FF_TASK=FasterFoodPOS"
set "FF_APPTASK=FasterFoodPOS App"

REM The browser used for the app window. "explorer.exe" is the
REM fallback, which opens the address in the default browser.
set "FF_EDGE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if not exist "!FF_EDGE!" set "FF_EDGE=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
if not exist "!FF_EDGE!" set "FF_EDGE=explorer.exe"

if not exist "!FF_CONNECT!" exit /b 0

REM "ping" is used to sleep because "timeout" refuses to run
REM without a console, and this script normally has none.
set "FF_SLEEP=ping -n 3 127.0.0.1 >nul"
set "FF_NOW=?"
for /f "usebackq delims=" %%t in (`powershell -NoProfile -Command "Get-Date -Format 'yyyy-MM-dd HH:mm:ss'"`) do set "FF_NOW=%%t"

REM Keep the log from growing without end on a till that never reboots.
if exist "!FF_LOG!" (
  set /a FF_LOGSIZE=0
  for %%f in ("!FF_LOG!") do set /a FF_LOGSIZE=%%~zf
  set /a FF_LOGCHUNKS=!FF_LOGSIZE! / 262145
  if not "!FF_LOGCHUNKS!"=="0" del /q "!FF_LOG!" >nul 2>&1
)
>>"!FF_LOG!" echo.
>>"!FF_LOG!" echo [!FF_NOW!] ==== start-pos.cmd ====

net session >nul 2>&1
if errorlevel 1 goto wait_readonly

REM ---------- 1 + 2. Wait for the server, start the task if needed ----------
set /a FF_WAIT=0
:wait_loop
netstat -ano | findstr /C:":!FF_PORT!" | findstr /C:"LISTENING" >nul
if not errorlevel 1 goto publish
if %FF_WAIT% GEQ 60 goto wait_give_up
%FF_SLEEP%
set /a FF_WAIT+=2
goto wait_loop

:wait_give_up
>>"!FF_LOG!" echo [%FF_NOW%] nothing on port !FF_PORT! after 60s - starting !FF_TASK!
schtasks /run /tn "!FF_TASK!" >>"!FF_LOG!" 2>&1
if errorlevel 1 (
  >>"!FF_LOG!" echo [%FF_NOW%] could not start !FF_TASK!
  exit /b 0
)
set /a FF_WAIT=0
:wait2_loop
netstat -ano | findstr /C:":!FF_PORT!" | findstr /C:"LISTENING" >nul
if not errorlevel 1 goto publish
if %FF_WAIT% GEQ 60 (
  >>"!FF_LOG!" echo [%FF_NOW%] !FF_TASK! did not answer within 60s - not opening the app
  exit /b 0
)
%FF_SLEEP%
set /a FF_WAIT+=2
goto wait2_loop

REM Without admin rights the task cannot be started, so only wait.
:wait_readonly
set /a FF_WAIT=0
:wait3_loop
netstat -ano | findstr /C:":!FF_PORT!" | findstr /C:"LISTENING" >nul
if not errorlevel 1 goto publish
if %FF_WAIT% GEQ 30 (
  >>"!FF_LOG!" echo [%FF_NOW%] not elevated and the server is not answering - not opening the app
  exit /b 0
)
%FF_SLEEP%
set /a FF_WAIT+=2
goto wait3_loop

REM ---------- 3. Publish the connect address ----------
:publish
set "FF_IP="
for /f "usebackq delims=" %%i in (`powershell -NoProfile -ExecutionPolicy Bypass -File "!FF_CONNECT!" -Port !FF_PORT! -WriteFile "!FF_WORKDIR!connect.json"`) do if not defined FF_IP set "FF_IP=%%i"
if not defined FF_IP (
  >>"!FF_LOG!" echo [%FF_NOW%] could not work out the LAN address
  set "FF_IP=localhost"
)
set "FF_URL=http://!FF_IP!:!FF_PORT!/"
>>"!FF_LOG!" echo [%FF_NOW%] connect address is !FF_URL!

REM ---------- 4. Point the shortcut at the current address ----------
set "FF_STARTUP=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "FF_LNK_DIR="
if exist "!FF_STARTUP!\Charitech Retail.lnk" set "FF_LNK_DIR=!FF_STARTUP!"
if not defined FF_LNK_DIR if exist "!FF_WORKDIR!Charitech Retail.lnk" set "FF_LNK_DIR=!FF_WORKDIR!"

if defined FF_LNK_DIR (
  set "FF_LNK=!FF_LNK_DIR!Charitech Retail.lnk"
  set "FF_LNKFILE=!FF_LNK!"
)

REM Written from scratch every time, so a shortcut left over from an
REM older version is repaired instead of trusted.
if defined FF_LNK_DIR (
  set "FF_EDGEARG=--profile-directory=Default --app=!FF_URL!"
  if /i "!FF_EDGE!"=="explorer.exe" set "FF_EDGEARG=!FF_URL!"
  powershell -NoProfile -ExecutionPolicy Bypass -Command "$s = New-Object -ComObject WScript.Shell; $l = $s.CreateShortcut($env:FF_LNKFILE); $l.TargetPath = $env:FF_EDGE; $l.Arguments = $env:FF_EDGEARG; $l.WorkingDirectory = $env:FF_WORKDIR; $l.Description = 'FasterFood POS'; if ($env:FF_EDGE -notlike '*explorer.exe') { $l.IconLocation = $env:FF_EDGE + ',0' }; $l.Save()" >>"!FF_LOG!" 2>&1
  >>"!FF_LOG!" echo [%FF_NOW%] shortcut now points at !FF_URL!
)

REM The launcher opens the app itself, so a copy left in the
REM Startup folder would open a second window at every logon.
if exist "!FF_STARTUP!\Charitech Retail.lnk" (
  move /y "!FF_STARTUP!\Charitech Retail.lnk" "!FF_WORKDIR!Charitech Retail.lnk" >nul 2>&1
  if exist "!FF_WORKDIR!Charitech Retail.lnk" (
    >>"!FF_LOG!" echo [%FF_NOW%] moved the Startup shortcut into the project folder
  ) else (
    >>"!FF_LOG!" echo [%FF_NOW%] WARNING could not move the Startup shortcut - delete it or two windows open
  )
)

REM ---------- 5. Register and run the app window task ----------
set "FF_PS1=%TEMP%\ff-register-app-task.ps1"
>"!FF_PS1!"  echo $ErrorActionPreference = 'Stop'
>>"!FF_PS1!" echo $user = [System.Security.Principal.WindowsIdentity]::GetCurrent().Name
>>"!FF_PS1!" echo $url = $env:FF_URL
>>"!FF_PS1!" echo if ($env:FF_EDGE -like '*explorer.exe') { $arg = $url } else { $arg = '--profile-directory=Default --app=' + $url }
>>"!FF_PS1!" echo $action = New-ScheduledTaskAction -Execute $env:FF_EDGE -Argument $arg
>>"!FF_PS1!" echo $principal = New-ScheduledTaskPrincipal -UserId $user -LogonType Interactive -RunLevel Limited
>>"!FF_PS1!" echo $settings = New-ScheduledTaskSettingsSet -ExecutionTimeLimit ([TimeSpan]::Zero) -StartWhenAvailable -MultipleInstances IgnoreNew -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
>>"!FF_PS1!" echo Register-ScheduledTask -TaskName 'FasterFoodPOS App' -Action $action -Principal $principal -Settings $settings -Description 'FasterFood POS - the app window' -Force ^| Out-Null

powershell -NoProfile -ExecutionPolicy Bypass -File "!FF_PS1!" >>"!FF_LOG!" 2>&1
set "FF_RC=%errorlevel%"
del /q "!FF_PS1!" >nul 2>&1

if not "%FF_RC%"=="0" (
  >>"!FF_LOG!" echo [%FF_NOW%] could not register !FF_APPTASK! - not opening the app
  exit /b 0
)
>>"!FF_LOG!" echo [%FF_NOW%] !FF_APPTASK! registered for !FF_URL!

schtasks /run /tn "!FF_APPTASK!" >>"!FF_LOG!" 2>&1
if errorlevel 1 (
  >>"!FF_LOG!" echo [%FF_NOW%] could not start !FF_APPTASK!
  exit /b 0
)
>>"!FF_LOG!" echo [%FF_NOW%] !FF_APPTASK! started
endlocal
exit /b 0
