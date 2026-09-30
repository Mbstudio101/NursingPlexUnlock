@echo off
REM Unified Setup Script for Nursing Exam Platform (Windows)
REM Installs both Web Application and Browser Extension

echo.
echo ==========================================
echo  Nursing Exam Platform - Unified Setup
echo ==========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js first:
    echo         https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js detected
node --version

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo [OK] npm detected
npm --version
echo.

REM Part 1: Install Web Application
echo ==========================================
echo  Part 1: Installing Web Application
echo ==========================================
echo.

echo Installing npm dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)

echo [OK] Dependencies installed successfully
echo.

REM Part 2: Prepare Browser Extension
echo ==========================================
echo  Part 2: Preparing Browser Extension
echo ==========================================
echo.

REM Check if icons directory exists
if not exist "extension\icons" (
    mkdir extension\icons
    echo [OK] Created extension\icons directory
)

REM Check if icons exist
if not exist "extension\icons\icon16.png" (
    echo [WARNING] Extension icons not found
    echo.
    echo Please generate icons:
    echo 1. Open extension\generate-icons.html in your browser
    echo 2. Click "Download All" button
    echo 3. Save the 3 PNG files to extension\icons\ folder
    echo 4. Rename them: icon16.png, icon48.png, icon128.png
    echo.
    pause
) else (
    echo [OK] Extension icons found
)

echo.

REM Part 3: Start Development Server
echo ==========================================
echo  Part 3: Starting Development Server
echo ==========================================
echo.
echo Starting web application on http://localhost:5173
echo.
echo Next Steps:
echo 1. The app will open in your browser automatically
echo 2. Explore the 503 questions
echo 3. Try the quiz mode
echo 4. Install the browser extension (see instructions below)
echo.
echo To install the browser extension:
echo 1. Go to chrome://extensions/
echo 2. Enable "Developer mode"
echo 3. Click "Load unpacked"
echo 4. Select the "extension" folder
echo 5. Pin the extension to toolbar
echo.
echo [DONE] Setup complete! Starting the app...
echo.

REM Open browser after a short delay
start /b cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:5173"

REM Start development server
call npm run dev
