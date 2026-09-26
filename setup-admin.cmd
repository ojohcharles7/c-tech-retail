@echo off
REM ============================================================
REM  FasterFood POS - one-time administrator setup
REM  Right-click this file -> "Run as administrator"
REM
REM  1. Restarts PostgreSQL so listen_addresses='localhost' takes effect
REM     (closes port 5432 to the LAN)
REM  2. Opens TCP 5501 in Windows Firewall on all profiles so
REM     other terminals on your network can reach the POS
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

echo.
echo [1/2] Restarting PostgreSQL to apply listen_addresses=localhost ...
net stop postgresql-x64-18
timeout /t 3 /nobreak >nul
net start postgresql-x64-18
timeout /t 3 /nobreak >nul
echo       done.

echo.
echo [2/2] Opening TCP 5501 in Windows Firewall ...
netsh advfirewall firewall delete rule name="FasterFood POS" >nul 2>&1
netsh advfirewall firewall add rule name="FasterFood POS" dir=in action=allow protocol=TCP localport=5501 profile=any
echo       done.

echo.
echo ============================================================
echo  Setup complete.
echo.
echo  Verify PostgreSQL is no longer reachable from the network:
echo    netstat -ano ^| findstr :5432
echo    (should show 127.0.0.1 / [::1] only, not 0.0.0.0)
echo.
echo  Start the POS server with:  npm start
echo ============================================================
echo.
pause
