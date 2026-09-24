# 🚀 GitHub Deployment Guide

This guide will help you push your Nursing Exam Platform to GitHub.

## Prerequisites

1. **GitHub Account**: Make sure you have a GitHub account at [github.com](https://github.com)
2. **Git Installed**: Install Git from [git-scm.com](https://git-scm.com/downloads)
3. **GitHub CLI (Optional)**: Install GitHub CLI from [cli.github.com](https://cli.github.com/)

## Step-by-Step Instructions

### Method 1: Using GitHub CLI (Recommended)

#### 1. Install GitHub CLI (if not already installed)

**macOS:**
```bash
brew install gh
```

**Windows:**
```bash
winget install --id GitHub.cli
```

**Linux:**
```bash
# Debian/Ubuntu
sudo apt install gh

# Fedora
sudo dnf install gh

# Arch
sudo pacman -S github-cli
```

#### 2. Authenticate with GitHub

```bash
gh auth login
```

Follow the prompts:
- Choose "GitHub.com"
- Choose "HTTPS"
- Choose "Login with a web browser"
- Copy the code and paste it in your browser
- Authorize the CLI

#### 3. Create a New Repository

```bash
gh repo create nursing-exam-platform --public --source=. --remote=origin --push
```

This command will:
- Create a new public repository named "nursing-exam-platform"
- Set the current directory as the source
- Add the remote origin
- Push your code to GitHub

#### 4. Verify

Go to `https://github.com/YOUR_USERNAME/nursing-exam-platform` to see your repository!

---

### Method 2: Using Git Commands

#### 1. Initialize Git Repository

```bash
git init
```

#### 2. Add All Files

```bash
git add .
```

#### 3. Create Initial Commit

```bash
git commit -m "Initial commit: Nursing Exam Platform with 503 questions from 7 exams"
```

#### 4. Create GitHub Repository

Go to [github.com/new](https://github.com/new) and:
- Repository name: `nursing-exam-platform`
- Description: `A comprehensive web application for practicing nursing exams with 503 questions from 7 exams`
- Visibility: Public
- **DO NOT** initialize with README, .gitignore, or license (we already have these)

Click "Create repository"

#### 5. Add Remote and Push

```bash
# Add the remote repository
git remote add origin https://github.com/YOUR_USERNAME/nursing-exam-platform.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

#### 6. Verify

Go to `https://github.com/YOUR_USERNAME/nursing-exam-platform` to see your repository!

---

### Method 3: Using GitHub Desktop

#### 1. Install GitHub Desktop

Download from [desktop.github.com](https://desktop.github.com/)

#### 2. Add Repository

1. Open GitHub Desktop
2. Click "File" → "Add Local Repository"
3. Click "Choose..." and select your project folder
4. If it's not a Git repository, click "create a repository"
5. Fill in:
   - Name: `nursing-exam-platform`
   - Description: `A comprehensive web application for practicing nursing exams`
   - Local Path: (should be auto-filled)
6. Click "Create Repository"

#### 3. Commit Changes

1. You'll see all your files in the "Changes" tab
2. Enter a commit message: "Initial commit: Nursing Exam Platform"
3. Click "Commit to main"

#### 4. Publish to GitHub

1. Click "Publish repository"
2. Fill in:
   - Name: `nursing-exam-platform`
   - Description: `A comprehensive web application for practicing nursing exams`
   - Keep this code private: **Uncheck** (make it public)
3. Click "Publish Repository"

#### 5. Verify

Go to `https://github.com/YOUR_USERNAME/nursing-exam-platform` to see your repository!

---

## 🎨 Customize Your Repository

### Update README.md

Edit the README.md file and replace:
- `YOUR_USERNAME` with your actual GitHub username
- Any other placeholder text with your information

### Add a Repository Description

1. Go to your repository on GitHub
2. Click the "About" section on the right
3. Click the gear icon
4. Add a description
5. Add topics: `nursing`, `exam-prep`, `react`, `typescript`, `education`
6. Click "Save changes"

### Add a Website URL

If you deploy your app (see deployment section below), add the URL:
1. Go to your repository
2. Click the gear icon in the "About" section
3. Add your website URL
4. Click "Save changes"

---

## 🌐 Deploy to GitHub Pages (Optional)

### Using Vite (Recommended)

#### 1. Install gh-pages

```bash
npm install --save-dev gh-pages
```

#### 2. Update package.json

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

#### 3. Update vite.config.js

Add the `base` option:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/nursing-exam-platform/',
})
```

#### 4. Deploy

```bash
npm run deploy
```

#### 5. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings"
3. Click "Pages" in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Select branch: `gh-pages`
6. Select folder: `/ (root)`
7. Click "Save"

#### 6. Access Your Site

Your site will be available at:
`https://YOUR_USERNAME.github.io/nursing-exam-platform/`

---

## 🔄 Keep Your Repository Updated

### Making Changes

```bash
# Make your changes to the code

# Stage changes
git add .

# Commit changes
git commit -m "Describe your changes"

# Push to GitHub
git push
```

### Pulling Updates (if working on multiple devices)

```bash
git pull origin main
```

---

## 📊 Repository Statistics

After pushing, you can see:
- **Contributors**: You (and anyone else who contributes)
- **Languages**: TypeScript, JavaScript, CSS, HTML
- **Commits**: Your commit history
- **Branches**: main branch
- **Releases**: Create releases for major versions

---

## 🛡️ Best Practices

### 1. Keep Sensitive Data Out

Make sure `.gitignore` excludes:
- API keys
- Passwords
- Environment variables
- Node modules
- Build files

### 2. Write Good Commit Messages

```bash
# Good examples
git commit -m "Add ATI Pharmacology exam with 70 questions"
git commit -m "Fix matrix question rendering bug"
git commit -m "Update README with deployment instructions"

# Bad examples
git commit -m "fix"
git commit -m "update"
git commit -m "changes"
```

### 3. Use Branches for Features

```bash
# Create a feature branch
git checkout -b feature/add-new-exam

# Make changes and commit
git add .
git commit -m "Add new exam"

# Push the branch
git push -u origin feature/add-new-exam

# Create a pull request on GitHub
```

### 4. Tag Releases

```bash
# Create a tag
git tag -a v1.0.0 -m "Version 1.0.0 - Initial release with 7 exams"

# Push the tag
git push origin v1.0.0
```

---

## 📝 Common Issues

### Issue: "fatal: remote origin already exists"

**Solution:**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/nursing-exam-platform.git
```

### Issue: "Updates were rejected because the remote contains work"

**Solution:**
```bash
git pull origin main --rebase
git push origin main
```

### Issue: "Permission denied (publickey)"

**Solution:**
```bash
# Use HTTPS instead of SSH
git remote set-url origin https://github.com/YOUR_USERNAME/nursing-exam-platform.git
```

### Issue: Large files won't push

**Solution:**
```bash
# Check .gitignore
cat .gitignore

# Remove large files from tracking
git rm --cached large-file.mp4
git commit -m "Remove large file"
git push
```

---

## 🎉 Success!

Once your repository is on GitHub, you can:

✅ Share the link with others
✅ Collaborate with team members
✅ Track issues and feature requests
✅ Deploy to GitHub Pages or other platforms
✅ Create releases for different versions
✅ Build a community around your project

---

## 📞 Need Help?

- **GitHub Docs**: [docs.github.com](https://docs.github.com)
- **Git Documentation**: [git-scm.com/doc](https://git-scm.com/doc)
- **GitHub Community**: [github.community](https://github.community)

---

**Happy Coding! 🚀**
