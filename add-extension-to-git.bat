@echo off
REM Script to add extension files to git and push to GitHub (Windows)

echo ==========================================
echo  Adding Extension Files to GitHub
echo ==========================================
echo.

REM Check if git is initialized
if not exist .git (
    echo [ERROR] Git repository not initialized
    echo Please run: git init
    pause
    exit /b 1
)

REM Add extension folder to git
echo [INFO] Adding extension folder to git...
git add extension/

REM Check if files were added
git diff --cached --quiet extension/
if %ERRORLEVEL% EQU 0 (
    echo [WARNING] No changes to commit in extension folder
    echo The extension files might already be committed
) else (
    echo [OK] Extension files added to git
    
    REM Commit the changes
    echo.
    echo [INFO] Committing changes...
    git commit -m "Add browser extension for auto-unlocking NursingPlex questions"
    
    echo [OK] Extension files committed
)

REM Check if remote is set
git remote get-url origin >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [WARNING] No remote repository configured
    echo Please add your GitHub repository:
    echo   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
    echo.
    echo Then run:
    echo   git push -u origin main
    pause
    exit /b 0
)

REM Push to GitHub
echo.
echo [INFO] Pushing to GitHub...
git push

echo.
echo ==========================================
echo  Done! Extension files are on GitHub
echo ==========================================
echo.
echo Next steps:
echo 1. Go to your GitHub repository
echo 2. Download the project again (or pull latest changes)
echo 3. You should now see the 'extension' folder
echo 4. Load it in Chrome: chrome://extensions/ - Load unpacked - Select extension folder
echo.
echo Extension is ready to use!
pause
