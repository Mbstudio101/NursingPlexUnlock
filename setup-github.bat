@echo off
REM Quick GitHub Setup Script for Nursing Exam Platform (Windows)
REM This script automates the process of pushing your project to GitHub

echo.
echo ================================================
echo  Nursing Exam Platform - GitHub Setup Script
echo ================================================
echo.

REM Check if git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git is not installed. Please install Git first:
    echo         https://git-scm.com/downloads
    pause
    exit /b 1
)

echo [OK] Git is installed
echo.

REM Check if gh CLI is installed
where gh >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] GitHub CLI detected
    echo.
    
    REM Check if authenticated
    gh auth status >nul 2>nul
    if %ERRORLEVEL% NEQ 0 (
        echo [AUTH] Please authenticate with GitHub...
        gh auth login
    )
    
    echo.
    echo [INFO] Creating GitHub repository...
    set /p repo_name="Enter repository name (default: nursing-exam-platform): "
    if "%repo_name%"=="" set repo_name=nursing-exam-platform
    
    set /p is_public="Make repository public? (y/n, default: y): "
    if "%is_public%"=="" set is_public=y
    
    if /i "%is_public%"=="y" (
        set visibility=--public
    ) else (
        set visibility=--private
    )
    
    REM Initialize git if not already done
    if not exist .git (
        git init
        git add .
        git commit -m "Initial commit: Nursing Exam Platform with 503 questions from 7 exams"
    )
    
    REM Create repository and push
    gh repo create %repo_name% %visibility% --source=. --remote=origin --push
    
    echo.
    echo [SUCCESS] Your repository is now on GitHub!
    echo.
    echo Visit: https://github.com/%USERNAME%/%repo_name%
    
) else (
    echo [WARNING] GitHub CLI not detected. Using manual git commands...
    echo.
    
    REM Initialize git if not already done
    if not exist .git (
        git init
        git add .
        git commit -m "Initial commit: Nursing Exam Platform with 503 questions from 7 exams"
    )
    
    echo [INFO] Next steps:
    echo 1. Go to https://github.com/new
    echo 2. Create a new repository named: nursing-exam-platform
    echo 3. DO NOT initialize with README, .gitignore, or license
    echo 4. Run these commands:
    echo.
    echo    git remote add origin https://github.com/YOUR_USERNAME/nursing-exam-platform.git
    echo    git branch -M main
    echo    git push -u origin main
    echo.
    pause
    
    set /p username="Enter your GitHub username: "
    set /p repo_name="Enter repository name (default: nursing-exam-platform): "
    if "%repo_name%"=="" set repo_name=nursing-exam-platform
    
    git remote add origin https://github.com/%username%/%repo_name%.git
    git branch -M main
    git push -u origin main
    
    echo.
    echo [SUCCESS] Your repository is now on GitHub!
    echo.
    echo Visit: https://github.com/%username%/%repo_name%
)

echo.
echo [INFO] Next steps:
echo    - Update README.md with your information
echo    - Add repository description and topics on GitHub
echo    - Consider deploying to GitHub Pages (see GITHUB_DEPLOYMENT_GUIDE.md)
echo.
echo [DONE] Happy coding!
echo.
pause
