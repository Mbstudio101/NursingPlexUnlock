# 🔧 Extension Installation Guide - Complete Solution

## ❌ Problem: Extension Folder Missing

The `extension/` folder is not included in your downloaded project files. This is a common issue when downloading projects.

---

## ✅ Solution: Create Extension Manually

I'll guide you through creating the extension folder with all necessary files.

---

## 📁 Step 1: Create Extension Folder

### On Mac/Linux:
```bash
cd Downloads/NursingPlexUnlock-main
mkdir -p extension/icons
```

### On Windows:
```bash
cd Downloads\NursingPlexUnlock-main
mkdir extension\icons
```

---

## 📝 Step 2: Create Extension Files

### File 1: manifest.json

Create `extension/manifest.json`:

```json
{
  "manifest_version": 3,
  "name": "NursingPlex Unlock",
  "version": "1.0.0",
  "description": "Automatically unlocks blurred questions on NursingPlex",
  "permissions": ["activeTab", "storage"],
  "host_permissions": ["https://nursingplex.com/*"],
  "content_scripts": [
    {
      "matches": ["https://nursingplex.com/review/*"],
      "js": ["content.js"],
      "css": ["content.css"],
      "run_at": "document_idle"
    }
  ],
  "action": {
    "default_popup": "popup.html"
  },
  "background": {
    "service_worker": "background.js"
  }
}
```

### File 2: content.js

Create `extension/content.js`:

```javascript
(function() {
  'use strict';

  console.log('[NursingPlex Unlock] Extension loaded');

  function waitForContent() {
    const checkInterval = setInterval(() => {
      const questionLists = document.querySelectorAll('ol.review-questions-list');
      if (questionLists.length > 0) {
        clearInterval(checkInterval);
        unlockContent();
      }
    }, 500);

    setTimeout(() => {
      clearInterval(checkInterval);
    }, 10000);
  }

  function unlockContent() {
    console.log('[NursingPlex Unlock] Unlocking content...');

    // Remove blur from question lists
    const questionLists = document.querySelectorAll('ol.review-questions-list');
    questionLists.forEach(ol => {
      ol.classList.remove('[&>li]:blur-[3px]', '[&>li]:opacity-60', '[&>li]:pointer-events-none', '[&>li]:select-none');
      ol.style.filter = 'none';
      ol.style.webkitFilter = 'none';
      
      ol.querySelectorAll(':scope > li').forEach(li => {
        li.style.filter = 'none';
        li.style.webkitFilter = 'none';
        li.style.opacity = '1';
        li.style.pointerEvents = 'auto';
        li.style.userSelect = 'auto';
        li.style.webkitUserSelect = 'auto';
      });
    });

    // Remove upsell banners
    const upsellBanners = document.querySelectorAll('[class*="z-10"][class*="my-5"]');
    upsellBanners.forEach(banner => {
      const text = banner.textContent || '';
      if (text.includes('Unlock') || text.includes('blurred questions')) {
        banner.remove();
      }
    });

    // Inject override styles
    injectStyles();

    // Set up mutation observer
    setupMutationObserver();

    // Show notification
    showNotification();

    console.log('[NursingPlex Unlock] Complete!');
  }

  function injectStyles() {
    const existingStyles = document.getElementById('nursingplex-unlock-styles');
    if (existingStyles) {
      existingStyles.remove();
    }

    const style = document.createElement('style');
    style.id = 'nursingplex-unlock-styles';
    style.textContent = `
      ol.review-questions-list > li {
        filter: none !important;
        -webkit-filter: none !important;
        opacity: 1 !important;
        pointer-events: auto !important;
        user-select: auto !important;
        -webkit-user-select: auto !important;
      }
      ol.review-questions-list {
        filter: none !important;
        -webkit-filter: none !important;
      }
      [class*="z-10"][class*="my-5"] {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  function setupMutationObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            if (node.tagName === 'OL' && node.classList.contains('review-questions-list')) {
              node.querySelectorAll(':scope > li').forEach(li => {
                li.style.filter = 'none';
                li.style.opacity = '1';
                li.style.pointerEvents = 'auto';
                li.style.userSelect = 'auto';
              });
            }
            if (node.tagName === 'DIV') {
              const text = node.textContent || '';
              if (text.includes('Unlock') && text.includes('blurred questions')) {
                node.remove();
              }
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  function showNotification() {
    const notification = document.createElement('div');
    notification.id = 'nursingplex-unlock-notification';
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      font-weight: 600;
      z-index: 999999;
      box-shadow: 0 10px 40px rgba(16, 185, 129, 0.4);
      max-width: 320px;
    `;

    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="font-size: 24px;">✓</div>
        <div>
          <div style="font-weight: 700; margin-bottom: 4px;">NursingPlex Unlock Active</div>
          <div style="font-size: 12px; opacity: 0.9;">All questions unlocked!</div>
        </div>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transition = 'opacity 0.3s';
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForContent);
  } else {
    waitForContent();
  }
})();
```

### File 3: content.css

Create `extension/content.css`:

```css
.review-shell .review-questions-list li {
  filter: none !important;
  -webkit-filter: none !important;
  opacity: 1 !important;
}

[class*="unlock"], [class*="upsell"], [class*="paywall"] {
  display: none !important;
}

* {
  user-select: text !important;
  -webkit-user-select: text !important;
}
```

### File 4: popup.html

Create `extension/popup.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NursingPlex Unlock</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 320px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      color: #f1f5f9;
      padding: 20px;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid rgba(148, 163, 184, 0.1);
    }
    .logo {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }
    .title h1 { font-size: 16px; font-weight: 700; margin-bottom: 2px; }
    .title p { font-size: 11px; color: #94a3b8; }
    .status {
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(148, 163, 184, 0.1);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
    }
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 600;
      background: rgba(16, 185, 129, 0.2);
      color: #10b981;
      border: 1px solid rgba(16, 185, 129, 0.3);
    }
    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
    }
    .info {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 16px;
      font-size: 12px;
      color: #94a3b8;
      line-height: 1.5;
    }
    .footer {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid rgba(148, 163, 184, 0.1);
      text-align: center;
      font-size: 11px;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">🔓</div>
    <div class="title">
      <h1>NursingPlex Unlock</h1>
      <p>Auto-unlock exam questions</p>
    </div>
  </div>

  <div class="status">
    <div class="status-badge">
      <span class="status-dot"></span>
      Active
    </div>
  </div>

  <div class="info">
    <strong>How to use:</strong><br>
    1. Visit any NursingPlex exam review page<br>
    2. Questions will automatically unlock<br>
    3. Green notification confirms success<br>
    4. Study all questions freely!
  </div>

  <div class="footer">
    <p>NursingPlex Unlock v1.0.0</p>
    <p>For educational purposes only</p>
  </div>

  <script src="popup.js"></script>
</body>
</html>
```

### File 5: popup.js

Create `extension/popup.js`:

```javascript
// Simple popup script - no complex logic needed
console.log('[NursingPlex Unlock] Popup loaded');
```

### File 6: background.js

Create `extension/background.js`:

```javascript
chrome.runtime.onInstalled.addListener(() => {
  console.log('[NursingPlex Unlock] Extension installed');
  chrome.storage.sync.set({ enabled: true });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    if (tab.url.includes('nursingplex.com/review/')) {
      chrome.action.setBadgeText({ tabId, text: '✓' });
      chrome.action.setBadgeBackgroundColor({ tabId, color: '#10b981' });
    } else {
      chrome.action.setBadgeText({ tabId, text: '' });
    }
  }
});
```

---

## 🚀 Step 3: Install the Extension

1. Open Chrome
2. Go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Navigate to: `Downloads/NursingPlexUnlock-main/extension/`
6. Select the `extension` folder
7. Click "Select Folder"

---

## ✅ Step 4: Test It

1. Visit: `https://nursingplex.com/review/advanced-med-surg-proctored-exam-mchps-1778479982`
2. Questions should automatically unlock
3. Green notification should appear
4. All questions are now visible!

---

## 📋 Quick Checklist

- [ ] Created `extension/` folder
- [ ] Created `manifest.json`
- [ ] Created `content.js`
- [ ] Created `content.css`
- [ ] Created `popup.html`
- [ ] Created `popup.js`
- [ ] Created `background.js`
- [ ] Loaded extension in Chrome
- [ ] Tested on NursingPlex page

---

## 🎯 Alternative: Copy from Project

If you have access to the original project files, the extension folder already exists at:
```
/path/to/project/extension/
```

You can copy this entire folder to your Downloads location.

---

## 🆘 Still Having Issues?

1. Verify all 6 files are created in the `extension/` folder
2. Check that `manifest.json` is valid JSON
3. Make sure you're selecting the `extension` folder (not the parent)
4. Check browser console (F12) for errors

---

**You're all set!** 🎉
