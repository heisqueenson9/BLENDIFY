@echo off
echo ============================================================
echo   BLENDIFY — FULL-STACK SYSTEM LAUNCHER
echo   (React + Node + MongoDB)
echo ============================================================
echo.

:: 1. Install Server Dependencies
echo [1/4] Installing backend dependencies...
cd server
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Error installing backend dependencies.
    pause
    exit /b %ERRORLEVEL%
)

:: 2. Seed Database
echo [2/4] Seeding MongoDB with 18 products (Using approved images)...
call node seed.js
if %ERRORLEVEL% NEQ 0 (
    echo Error seeding database. Ensure MongoDB is running.
    pause
    exit /b %ERRORLEVEL%
)

:: 3. Install Client Dependencies
echo [3/4] Installing frontend dependencies...
cd ../client
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Error installing frontend dependencies.
    pause
    exit /b %ERRORLEVEL%
)

:: 4. Start Application
echo [4/4] Starting Full-Stack Application...
start "BLENDIFY BACKEND" cmd /c "cd ../server && npm start"
echo Backend starting on http://localhost:5000...
echo.
echo Starting Frontend Development Server...
npm run dev

echo.
echo ============================================================
echo   DONE! Visit: http://localhost:5173
echo ============================================================
pause
