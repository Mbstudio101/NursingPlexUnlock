# 🔧 Create Extension Folder - Quick Guide

## ❌ Problem
The `extension/` folder is missing from your downloaded files.

## ✅ Solution
Run the appropriate script to create the extension folder automatically.

---

## 🚀 Quick Setup

### For Mac/Linux Users:
```bash
cd Downloads/NursingPlexUnlock-main
chmod +x create-extension.sh
./create-extension.sh
```

### For Windows Users:
```bash
cd Downloads\NursingPlexUnlock-main
create-extension.bat
```

---

## 📋 What the Script Does

The script will:
1. ✅ Create the `extension/` folder
2. ✅ Generate all 6 required files:
   - `manifest.json` - Extension configuration
   - `content.js` - Main unlock script
   - `content.css` - Style overrides
   - `popup.html` - Popup interface
   - `popup.js` - Popup logic
   - `background.js` - Background service worker

---

## 🎯 After Running the Script

### Step 1: Verify Files Were Created
```bash
ls extension/
```

You should see:
```
manifest.json
content.js
content.css
popup.html
popup.js
background.js
```

### Step 2: Install the Extension

1. Open Chrome
2. Go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. **Navigate to and select the `extension` folder**
   - Path: `Downloads/NursingPlexUnlock-main/extension/`
6. Click "Select Folder"

### Step 3: Test It

1. Visit: `https://nursingplex.com/review/advanced-med-surg-proctored-exam-mchps-1778479982`
2. Questions should automatically unlock
3. Green notification should appear
4. All questions are now visible!

---

## 🐛 Troubleshooting

### Script won't run (Mac/Linux)
```bash
# Make it executable
chmod +x create-extension.sh

# Run it
./create-extension.sh
```

### Script won't run (Windows)
- Right-click `create-extension.bat`
- Select "Run as administrator"
- Or open Command Prompt as admin and run it

### Extension still won't load
1. Verify all 6 files exist in the `extension/` folder
2. Check that `manifest.json` is valid JSON
3. Make sure you're selecting the `extension` folder (not the parent)
4. Check browser console (F12) for errors

### Questions still blurred
1. Click the extension icon in Chrome toolbar
2. Make sure it's enabled
3. Click "Refresh & Unlock" if available
4. Check browser console (F12) for errors

---

## 📁 Manual Creation (Alternative)

If the scripts don't work, you can manually create the files:

1. Create `extension/` folder
2. Copy the content from `CREATE_EXTENSION_MANUALLY.md`
3. Create each file manually
4. Follow the installation steps above

---

## ✅ Success Indicators

After successful installation:
- ✅ Extension appears in `chrome://extensions/`
- ✅ No error messages
- ✅ Extension is enabled
- ✅ Clicking icon shows popup
- ✅ Visiting NursingPlex review page auto-unlocks questions
- ✅ Green notification appears

---

## 📞 Need Help?

1. Check `CREATE_EXTENSION_MANUALLY.md` for detailed instructions
2. Check `EXTENSION_FIX.md` for troubleshooting
3. Verify all files are in the correct location
4. Make sure you're selecting the `extension` folder (not the root)

---

**The scripts will create everything you need!** 🎉

Just run the appropriate script for your operating system and follow the installation steps.
