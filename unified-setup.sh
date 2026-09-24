#!/bin/bash

# Unified Setup Script for Nursing Exam Platform
# Installs both Web Application and Browser Extension

echo "🎓 Nursing Exam Platform - Unified Setup"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first:"
    echo "   https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js detected: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm detected: $(npm --version)"
echo ""

# Part 1: Install Web Application
echo "📦 Part 1: Installing Web Application..."
echo "----------------------------------------"

# Install dependencies
echo "Installing npm dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""

# Part 2: Prepare Browser Extension
echo "🔓 Part 2: Preparing Browser Extension..."
echo "----------------------------------------"

# Check if icons directory exists
if [ ! -d "extension/icons" ]; then
    mkdir -p extension/icons
    echo "✅ Created extension/icons directory"
fi

# Check if icons exist
if [ ! -f "extension/icons/icon16.png" ] || [ ! -f "extension/icons/icon48.png" ] || [ ! -f "extension/icons/icon128.png" ]; then
    echo "⚠️  Extension icons not found"
    echo ""
    echo "Please generate icons:"
    echo "1. Open extension/generate-icons.html in your browser"
    echo "2. Click 'Download All' button"
    echo "3. Save the 3 PNG files to extension/icons/ folder"
    echo "4. Rename them: icon16.png, icon48.png, icon128.png"
    echo ""
    read -p "Press Enter when you've generated the icons..."
else
    echo "✅ Extension icons found"
fi

echo ""

# Part 3: Start Development Server
echo "🚀 Part 3: Starting Development Server..."
echo "----------------------------------------"
echo ""
echo "Starting web application on http://localhost:5173"
echo ""
echo "📋 Next Steps:"
echo "1. The app will open in your browser automatically"
echo "2. Explore the 503 questions"
echo "3. Try the quiz mode"
echo "4. Install the browser extension (see instructions below)"
echo ""
echo "🔓 To install the browser extension:"
echo "1. Go to chrome://extensions/"
echo "2. Enable 'Developer mode'"
echo "3. Click 'Load unpacked'"
echo "4. Select the 'extension' folder"
echo "5. Pin the extension to toolbar"
echo ""
echo "🎉 Setup complete! Starting the app..."
echo ""

# Open browser after a short delay
(sleep 3 && open http://localhost:5173) &

# Start development server
npm run dev
