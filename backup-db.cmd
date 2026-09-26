@echo off
REM ============================================================
REM  FasterFood POS - database backup
REM  Run manually, or from Task Scheduler (see DEPLOY.md)
REM ============================================================

setlocal
set "PGBIN=C:\Program Files\PostgreSQL\18\bin"
set "BACKUPDIR=%~dp0backups"
if not exist "%BACKUPDIR%" mkdir "%BACKUPDIR%"

REM Locale-independent timestamp
for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd-HHmmss"') do set "STAMP=%%i"

set "OUT=%BACKUPDIR%\fasterfood-%STAMP%.dump"

echo Backing up database "fasterfood" to:
echo   %OUT%
echo.

"%PGBIN%\pg_dump.exe" -h 127.0.0.1 -p 5432 -U postgres -d fasterfood -Fc -f "%OUT%"
if errorlevel 1 (
  echo.
  echo BACKUP FAILED - see message above.
  exit /b 1
)

REM Keep only the last 30 days of dumps
forfiles /p "%BACKUPDIR%" /m "fasterfood-*.dump" /d -30 /c "cmd /c echo Deleting @path" >nul 2>&1
forfiles /p "%BACKUPDIR%" /m "fasterfood-*.dump" /d -30 /c "cmd /c del @path" >nul 2>&1

echo.
echo Backup complete. Current dumps:
dir /b "%BACKUPDIR%\fasterfood-*.dump"
endlocal
