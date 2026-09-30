#!/bin/bash

# Script to add extension files to git and push to GitHub

echo "🔧 Adding Extension Files to GitHub..."
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "❌ Git repository not initialized"
    echo "Please run: git init"
    exit 1
fi

# Add extension folder to git
echo "📦 Adding extension folder to git..."
git add extension/

# Check if files were added
if git diff --cached --quiet extension/; then
    echo "⚠️  No changes to commit in extension folder"
    echo "The extension files might already be committed"
else
    echo "✅ Extension files added to git"
    
    # Commit the changes
    echo ""
    echo "📝 Committing changes..."
    git commit -m "Add browser extension for auto-unlocking NursingPlex questions"
    
    echo "✅ Extension files committed"
fi

# Check if remote is set
if ! git remote get-url origin &> /dev/null; then
    echo ""
    echo "⚠️  No remote repository configured"
    echo "Please add your GitHub repository:"
    echo "  git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
    echo ""
    echo "Then run:"
    echo "  git push -u origin main"
    exit 0
fi

# Push to GitHub
echo ""
echo "🚀 Pushing to GitHub..."
git push

echo ""
echo "✅ Done! Extension files are now on GitHub"
echo ""
echo "📋 Next steps:"
echo "1. Go to your GitHub repository"
echo "2. Download the project again (or pull latest changes)"
echo "3. You should now see the 'extension' folder"
echo "4. Load it in Chrome: chrome://extensions/ → Load unpacked → Select extension folder"
echo ""
echo "🎉 Extension is ready to use!"
