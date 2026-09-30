# 🔧 Extension Installation Fix

## ❌ Error: "Manifest file is missing or unreadable"

This error occurs when you select the **wrong folder** when loading the extension.

---

## ✅ Solution

### The Problem
You're selecting the **root folder** (`NursingPlexUnlock-main`) instead of the **extension folder**.

### The Fix
You need to select the **`extension` subfolder**, not the main folder.

---

## 📁 Correct Folder Structure

```
NursingPlexUnlock-main/          ❌ WRONG - Don't select this
├── extension/                    ✅ CORRECT - Select THIS folder
│   ├── manifest.json            ← This file must be in the selected folder
│   ├── content.js
│   ├── popup.html
│   ├── popup.js
│   ├── background.js
│   └── content.css
├── src/
├── package.json
└── README.md
```

---

## 🚀 Step-by-Step Fix

### Step 1: Navigate to the Correct Folder

**In File Explorer/Finder:**
```
Downloads/
└── NursingPlexUnlock-main/
    └── extension/               ← THIS IS THE FOLDER YOU NEED
        ├── manifest.json
        ├── content.js
        ├── popup.html
        └── ... (other files)
```

### Step 2: Load the Extension in Chrome

1. Open Chrome
2. Go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. **Navigate to and select the `extension` folder** (NOT the root folder)
   - Path: `Downloads/NursingPlexUnlock-main/extension/`
6. Click "Select Folder"

### Step 3: Verify Installation

You should see:
- ✅ Extension appears in the list
- ✅ No error messages
- ✅ Extension name: "NursingPlex Unlock"
- ✅ Status: Enabled

---

## 🎯 Quick Reference

### ❌ Wrong Path
```
Downloads/NursingPlexUnlock-main
```

### ✅ Correct Path
```
Downloads/NursingPlexUnlock-main/extension
```

---

## 🔍 How to Verify You Selected the Right Folder

The folder you select **must contain these files**:
- ✅ `manifest.json` (required)
- ✅ `content.js`
- ✅ `popup.html`
- ✅ `popup.js`
- ✅ `background.js`
- ✅ `content.css`

If you don't see `manifest.json` in the folder you selected, **you selected the wrong folder!**

---

## 🐛 Still Getting Errors?

### Error: "Manifest file is missing or unreadable"

**Cause:** Selected wrong folder

**Fix:** 
1. Go back to `chrome://extensions/`
2. Click "Load unpacked" again
3. Navigate to `Downloads/NursingPlexUnlock-main/extension/`
4. Select the `extension` folder (not the parent folder)

### Error: "Failed to load extension"

**Cause:** Missing required files

**Fix:**
1. Verify all files are present in the `extension` folder
2. Check that `manifest.json` is valid JSON
3. Try reloading the extension

### Extension loads but doesn't work

**Cause:** Not on a NursingPlex review page

**Fix:**
1. Visit a NursingPlex review page
2. Example: `https://nursingplex.com/review/advanced-med-surg-proctored-exam-mchps-1778479982`
3. Extension should automatically unlock questions

---

## 📋 Checklist

Before loading the extension, verify:

- [ ] You're in Chrome/Edge/Brave
- [ ] Developer mode is enabled
- [ ] You selected the `extension` folder (not the root folder)
- [ ] The folder contains `manifest.json`
- [ ] The folder contains `content.js`
- [ ] The folder contains `popup.html`

---

## 🎉 Success Indicators

After successful installation:
- ✅ Extension appears in `chrome://extensions/`
- ✅ No error messages
- ✅ Extension is enabled
- ✅ Extension icon appears in toolbar (optional)
- ✅ Clicking icon shows popup
- ✅ Visiting NursingPlex review page auto-unlocks questions

---

## 📞 Need More Help?

1. Check the folder path carefully
2. Verify `manifest.json` exists in the selected folder
3. Try reloading the extension
4. Check browser console (F12) for errors
5. Review `extension/INSTALL.md` for detailed instructions

---

**The key is selecting the `extension` folder, not the root folder!** 🔑
