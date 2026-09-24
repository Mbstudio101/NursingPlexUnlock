#!/bin/bash

# Quick GitHub Setup Script for Nursing Exam Platform
# This script automates the process of pushing your project to GitHub

echo "🚀 Nursing Exam Platform - GitHub Setup Script"
echo "================================================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first:"
    echo "   https://git-scm.com/downloads"
    exit 1
fi

# Check if gh CLI is installed
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI detected"
    
    # Check if authenticated
    if ! gh auth status &> /dev/null; then
        echo "🔐 Please authenticate with GitHub..."
        gh auth login
    fi
    
    echo ""
    echo "📦 Creating GitHub repository..."
    read -p "Enter repository name (default: nursing-exam-platform): " repo_name
    repo_name=${repo_name:-nursing-exam-platform}
    
    read -p "Make repository public? (y/n, default: y): " is_public
    is_public=${is_public:-y}
    
    if [ "$is_public" = "y" ]; then
        visibility="--public"
    else
        visibility="--private"
    fi
    
    # Initialize git if not already done
    if [ ! -d .git ]; then
        git init
        git add .
        git commit -m "Initial commit: Nursing Exam Platform with 503 questions from 7 exams"
    fi
    
    # Create repository and push
    gh repo create "$repo_name" $visibility --source=. --remote=origin --push
    
    echo ""
    echo "✅ Success! Your repository is now on GitHub!"
    echo "🌐 Visit: https://github.com/$(gh auth status --show-active 2>&1 | grep -oP '(?<=Logged in to github\.com as )\w+')/$repo_name"
    
else
    echo "⚠️  GitHub CLI not detected. Using manual git commands..."
    echo ""
    
    # Initialize git if not already done
    if [ ! -d .git ]; then
        git init
        git add .
        git commit -m "Initial commit: Nursing Exam Platform with 503 questions from 7 exams"
    fi
    
    echo "📝 Next steps:"
    echo "1. Go to https://github.com/new"
    echo "2. Create a new repository named: nursing-exam-platform"
    echo "3. DO NOT initialize with README, .gitignore, or license"
    echo "4. Run these commands:"
    echo ""
    echo "   git remote add origin https://github.com/YOUR_USERNAME/nursing-exam-platform.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
    read -p "Press Enter when you've created the repository..."
    
    read -p "Enter your GitHub username: " username
    read -p "Enter repository name (default: nursing-exam-platform): " repo_name
    repo_name=${repo_name:-nursing-exam-platform}
    
    git remote add origin "https://github.com/$username/$repo_name.git"
    git branch -M main
    git push -u origin main
    
    echo ""
    echo "✅ Success! Your repository is now on GitHub!"
    echo "🌐 Visit: https://github.com/$username/$repo_name"
fi

echo ""
echo "📚 Next steps:"
echo "   - Update README.md with your information"
echo "   - Add repository description and topics on GitHub"
echo "   - Consider deploying to GitHub Pages (see GITHUB_DEPLOYMENT_GUIDE.md)"
echo ""
echo "🎉 Happy coding!"
