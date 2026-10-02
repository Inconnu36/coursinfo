@echo off
REM Start the local reconstruction. Usage:  start.bat [port]
cd /d "%~dp0"
set PORT=%1
if "%PORT%"=="" set PORT=8080
echo ==^> http://localhost:%PORT%/
where node >nul 2>nul
if %errorlevel%==0 (
  node server.js %PORT%
) else (
  python -m http.server %PORT%
)