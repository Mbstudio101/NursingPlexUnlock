# 🔧 FIX: Extension Not Showing on GitHub

## The Problem
The extension folder exists in your project but hasn't been uploaded to GitHub yet.

## The Solution (3 Simple Steps)

### Step 1: Open Terminal/Command Prompt
- **Mac**: Open Terminal app
- **Windows**: Open Command Prompt or PowerShell
- **Linux**: Open Terminal

### Step 2: Navigate to Your Project
```bash
cd Downloads/NursingPlexUnlock-main
```

### Step 3: Run These Commands (Copy-Paste One by One)

```bash
git add extension/
```
↑ Press Enter, wait for it to finish, then:

```bash
git commit -m "Add extension"
```
↑ Press Enter, wait for it to finish, then:

```bash
git push
```
↑ Press Enter, wait for it to finish

**That's it!** ✅

---

## What Happens Next

1. Go to your GitHub repository page
2. Refresh the page
3. You should now see the `extension` folder
4. Click "Code" → "Download ZIP"
5. Extract the ZIP
6. You'll see the `extension` folder inside

---

## How to Install the Extension

1. Open Chrome
2. Go to: `chrome://extensions/`
3. Turn ON "Developer mode" (top right corner)
4. Click "Load unpacked"
5. Select the `extension` folder from your downloaded project
6. Done! The extension is installed ✅

---

## Test It

1. Go to: https://nursingplex.com/review/advanced-med-surg-proctored-exam-mchps-1778479982
2. All questions should automatically unlock
3. Green notification appears in top right
4. You can now see all questions! 🎉

---

## If You Get Errors

**Error: "fatal: not a git repository"**
- You need to initialize git first
- Run: `git init`
- Then run the 3 commands above

**Error: "nothing to commit"**
- Extension is already committed
- Just run: `git push`

**Error: "rejected" or "non-fast-forward"**
- Run: `git pull`
- Then run: `git push`

---

## Quick Reference

```bash
# All commands in one line:
cd Downloads/NursingPlexUnlock-main && git add extension/ && git commit -m "Add extension" && git push
```

---

**That's all you need to do!** The extension will be on GitHub after you run those 3 commands.
