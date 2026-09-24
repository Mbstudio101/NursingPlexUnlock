# 🎯 Unified Installation Guide - Complete Setup in 5 Minutes

## 📦 What You're Installing

This guide installs **both components** of the Nursing Exam Platform:
1. **Web Application** - 503 questions with interactive quizzes
2. **Browser Extension** - Auto-unlock NursingPlex pages

---

## 🚀 Automated Installation (Recommended)

### For Mac/Linux Users

```bash
# Run the unified setup script
chmod +x unified-setup.sh
./unified-setup.sh
```

The script will:
- ✅ Install web app dependencies
- ✅ Generate extension icons
- ✅ Guide you through extension installation
- ✅ Verify everything works
- ✅ Open the app in your browser

### For Windows Users

```bash
# Run the unified setup script
unified-setup.bat
```

The script will do the same as above for Windows.

---

## 📋 Manual Installation

If you prefer to install manually, follow these steps:

### Part 1: Web Application (2 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# Navigate to http://localhost:5173
```

**Verify it works:**
- ✅ You should see the home page
- ✅ Click "View All Questions" - should show 503 questions
- ✅ Click "Start Quiz Mode" - should show exam selector
- ✅ Select an exam - should start quiz

### Part 2: Browser Extension (2 minutes)

```bash
# 1. Generate icons
# Open extension/generate-icons.html in your browser
# Click "Download All" button
# Save the 3 PNG files to extension/icons/ folder
# Rename them: icon16.png, icon48.png, icon128.png

# 2. Install extension
# Open Chrome/Edge/Brave
# Go to chrome://extensions/
# Enable "Developer mode" (top right)
# Click "Load unpacked"
# Select the "extension" folder
# Pin the extension to toolbar
```

**Verify it works:**
- ✅ Visit any NursingPlex review page
- ✅ Questions should automatically unlock
- ✅ Green notification should appear
- ✅ Click extension icon - should show popup

---

## ✅ Verification Checklist

After installation, verify everything works:

### Web Application
- [ ] `npm run dev` starts without errors
- [ ] http://localhost:5173 loads
- [ ] Home page displays correctly
- [ ] "View All Questions" shows exam cards
- [ ] Selecting an exam shows questions
- [ ] "Start Quiz Mode" shows exam selector
- [ ] Quiz mode works with timer
- [ ] Search and filter work
- [ ] Export button works

### Browser Extension
- [ ] Extension appears in chrome://extensions/
- [ ] Extension icon is visible in toolbar
- [ ] Clicking icon shows popup
- [ ] Popup shows status and stats
- [ ] Visit NursingPlex review page
- [ ] Questions automatically unlock
- [ ] Green notification appears
- [ ] Toggle control works
- [ ] "Refresh & Unlock" button works

---

## 🎮 First Steps After Installation

### 1. Explore the Web App

```bash
# Make sure dev server is running
npm run dev
```

**Try these features:**
- Browse all 503 questions
- Take a quiz on any exam
- Search for specific topics
- Export questions to text file
- Toggle dark mode

### 2. Test the Extension

**Visit a NursingPlex exam:**
```
https://nursingplex.com/review/advanced-med-surg-proctored-exam-mchps-1778479982
```

**Verify:**
- Questions unlock automatically
- No blur effects
- No upsell banners
- Content is selectable
- Extension icon shows badge

### 3. Study Effectively

**Use both tools together:**
- Web app for 503 pre-scraped questions
- Extension for unlimited new exams
- Export questions for offline study
- Track your progress

---

## 🔧 Troubleshooting

### Issue: Web app won't start

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Issue: Extension icons missing

**Solution:**
1. Open `extension/generate-icons.html`
2. Click "Download All"
3. Save files to `extension/icons/`
4. Rename to: `icon16.png`, `icon48.png`, `icon128.png`
5. Reload extension in Chrome

### Issue: Extension not working on NursingPlex

**Solution:**
1. Click extension icon
2. Make sure toggle is ON
3. Click "Refresh & Unlock"
4. Check console (F12) for errors
5. Reinstall extension if needed

### Issue: Questions still blurred

**Solution:**
1. Wait for page to fully load
2. Click "Refresh & Unlock"
3. Check browser console for errors
4. Verify you're on a review page (not exam mode)
5. Reinstall extension

---

## 📊 What You Get

### Web Application
- ✅ 503 questions from 7 exams
- ✅ 7 interactive question types
- ✅ Quiz mode with timer
- ✅ Exam database with search
- ✅ Export functionality
- ✅ Dark mode UI
- ✅ Responsive design

### Browser Extension
- ✅ Auto-unlock on NursingPlex
- ✅ Beautiful popup UI
- ✅ Statistics tracking
- ✅ Toggle control
- ✅ Manual refresh
- ✅ Privacy-first design

### Combined Power
- ✅ 503+ questions available
- ✅ Unlimited new exams via extension
- ✅ Interactive practice + direct study
- ✅ Offline + online study options
- ✅ Complete nursing exam prep solution

---

## 🎯 Next Steps

### Immediate
1. ✅ Complete installation
2. ✅ Verify both components work
3. ✅ Explore all features
4. ✅ Start studying!

### Short-term
1. ⏳ Study with 503 questions
2. ⏳ Unlock new exams with extension
3. ⏳ Track your progress
4. ⏳ Export questions for offline study

### Long-term
1. ⏳ Push to GitHub
2. ⏳ Deploy to hosting
3. ⏳ Share with others
4. ⏳ Contribute improvements

---

## 📞 Support

### Documentation
- **UNIFIED_README.md** - Complete overview
- **START_HERE.md** - Quick start
- **QUICK_REFERENCE.md** - One-page reference
- **extension/INSTALL.md** - Extension details

### Getting Help
1. Check this guide
2. Review documentation
3. Check troubleshooting sections
4. Open GitHub issue

---

## 🎉 Success!

You now have a **complete nursing exam practice platform** installed and ready to use!

### What You Can Do Now
✅ Study 503 questions from 7 exams  
✅ Take interactive quizzes  
✅ Unlock any NursingPlex exam automatically  
✅ Export questions for offline study  
✅ Track your progress  
✅ Study effectively  

### Time Investment
- **Installation:** 3-5 minutes
- **Learning curve:** 5 minutes
- **Setup complete:** You're ready!

---

**Happy studying!** 🎓💉📚✨

**Your nursing exam platform is ready to help you succeed!** 🌍📚

---

**Version:** 1.0.0  
**Last Updated:** 2024-01-15  
**Status:** ✅ Installation Complete  
**Ready to Use:** YES! 🎉
