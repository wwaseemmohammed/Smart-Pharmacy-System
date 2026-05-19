@echo off
echo ========================================
echo   Smart Pharmacy System - Launcher
echo ========================================
echo.

echo Installing backend dependencies...
cd project\server
call npm install
cd ..\..

echo.
echo Installing frontend dependencies...
cd project\client\Smart-pharmacy-frontend
call npm install
cd ..\..

echo.
echo Starting the application...
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:5173
echo.
echo Press Ctrl+C to stop both servers
echo.

npm run dev