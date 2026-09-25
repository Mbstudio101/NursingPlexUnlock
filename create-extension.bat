@echo off
REM Script to create the extension folder with all necessary files (Windows)

echo ==========================================
echo  Creating NursingPlex Unlock Extension
echo ==========================================
echo.

REM Create extension directory
if not exist "extension" mkdir extension
cd extension

REM Create manifest.json
(
echo {
echo   "manifest_version": 3,
echo   "name": "NursingPlex Unlock",
echo   "version": "1.0.0",
echo   "description": "Automatically unlocks blurred questions on NursingPlex",
echo   "permissions": ["activeTab", "storage"],
echo   "host_permissions": ["https://nursingplex.com/*"],
echo   "content_scripts": [
echo     {
echo       "matches": ["https://nursingplex.com/review/*"],
echo       "js": ["content.js"],
echo       "css": ["content.css"],
echo       "run_at": "document_idle"
echo     }
echo   ],
echo   "action": {
echo     "default_popup": "popup.html"
echo   },
echo   "background": {
echo     "service_worker": "background.js"
echo   }
echo }
) > manifest.json

echo [OK] Created manifest.json

REM Create content.js
(
echo ^(function^(^) {
echo   'use strict';
echo.
echo   console.log^('[NursingPlex Unlock] Extension loaded'^);
echo.
echo   function waitForContent^(^) {
echo     const checkInterval = setInterval^(^(^) =^> {
echo       const questionLists = document.querySelectorAll^('ol.review-questions-list'^);
echo       if ^(questionLists.length ^> 0^) {
echo         clearInterval^(checkInterval^);
echo         unlockContent^(^);
echo       }
echo     }, 500^);
echo.
echo     setTimeout^(^(^) =^> {
echo       clearInterval^(checkInterval^);
echo     }, 10000^);
echo   }
echo.
echo   function unlockContent^(^) {
echo     console.log^('[NursingPlex Unlock] Unlocking content...'^);
echo.
echo     const questionLists = document.querySelectorAll^('ol.review-questions-list'^);
echo     questionLists.forEach^(ol =^> {
echo       ol.classList.remove^('[&^>li]:blur-[3px]', '[&^>li]:opacity-60', '[&^>li]:pointer-events-none', '[&^>li]:select-none'^);
echo       ol.style.filter = 'none';
echo       ol.style.webkitFilter = 'none';
echo.
echo       ol.querySelectorAll^(':scope ^> li'^).forEach^(li =^> {
echo         li.style.filter = 'none';
echo         li.style.webkitFilter = 'none';
echo         li.style.opacity = '1';
echo         li.style.pointerEvents = 'auto';
echo         li.style.userSelect = 'auto';
echo         li.style.webkitUserSelect = 'auto';
echo       }^);
echo     }^);
echo.
echo     const upsellBanners = document.querySelectorAll^('[class*="z-10"][class*="my-5"]'^);
echo     upsellBanners.forEach^(banner =^> {
echo       const text = banner.textContent ^|^| '';
echo       if ^(text.includes^('Unlock'^) ^|^| text.includes^('blurred questions'^)^) {
echo         banner.remove^(^);
echo       }
echo     }^);
echo.
echo     injectStyles^(^);
echo     setupMutationObserver^(^);
echo     showNotification^(^);
echo.
echo     console.log^('[NursingPlex Unlock] Complete!'^);
echo   }
echo.
echo   function injectStyles^(^) {
echo     const existingStyles = document.getElementById^('nursingplex-unlock-styles'^);
echo     if ^(existingStyles^) existingStyles.remove^(^);
echo.
echo     const style = document.createElement^('style'^);
echo     style.id = 'nursingplex-unlock-styles';
echo     style.textContent = `
echo       ol.review-questions-list ^> li {
echo         filter: none !important;
echo         -webkit-filter: none !important;
echo         opacity: 1 !important;
echo         pointer-events: auto !important;
echo         user-select: auto !important;
echo       }
echo       ol.review-questions-list {
echo         filter: none !important;
echo       }
echo       [class*="z-10"][class*="my-5"] {
echo         display: none !important;
echo       }
echo     `;
echo     document.head.appendChild^(style^);
echo   }
echo.
echo   function setupMutationObserver^(^) {
echo     const observer = new MutationObserver^(^(mutations^) =^> {
echo       mutations.forEach^(mutation =^> {
echo         mutation.addedNodes.forEach^(node =^> {
echo           if ^(node.nodeType === 1^) {
echo             if ^(node.tagName === 'OL' ^&^& node.classList.contains^('review-questions-list'^)^) {
echo               node.querySelectorAll^(':scope ^> li'^).forEach^(li =^> {
echo                 li.style.filter = 'none';
echo                 li.style.opacity = '1';
echo                 li.style.pointerEvents = 'auto';
echo               }^);
echo             }
echo             if ^(node.tagName === 'DIV'^) {
echo               const text = node.textContent ^|^| '';
echo               if ^(text.includes^('Unlock'^) ^&^& text.includes^('blurred questions'^)^) {
echo                 node.remove^(^);
echo               }
echo             }
echo           }
echo         }^);
echo       }^);
echo     }^);
echo.
echo     observer.observe^(document.body, { childList: true, subtree: true }^);
echo   }
echo.
echo   function showNotification^(^) {
echo     const notification = document.createElement^('div'^);
echo     notification.style.cssText = `
echo       position: fixed;
echo       top: 20px;
echo       right: 20px;
echo       background: linear-gradient^(135deg, #10b981 0%, #06b6d4 100%^);
echo       color: white;
echo       padding: 16px 24px;
echo       border-radius: 12px;
echo       font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
echo       font-size: 14px;
echo       font-weight: 600;
echo       z-index: 999999;
echo       box-shadow: 0 10px 40px rgba^(16, 185, 129, 0.4^);
echo       max-width: 320px;
echo     `;
echo.
echo     notification.innerHTML = `
echo       ^<div style="display: flex; align-items: center; gap: 12px;"^>
echo         ^<div style="font-size: 24px;"^>✓^</div^>
echo         ^<div^>
echo           ^<div style="font-weight: 700; margin-bottom: 4px;"^>NursingPlex Unlock Active^</div^>
echo           ^<div style="font-size: 12px; opacity: 0.9;"^>All questions unlocked!^</div^>
echo         ^</div^>
echo       ^</div^>
echo     `;
echo.
echo     document.body.appendChild^(notification^);
echo.
echo     setTimeout^(^(^) =^> {
echo       notification.style.opacity = '0';
echo       notification.style.transition = 'opacity 0.3s';
echo       setTimeout^(^(^) =^> notification.remove^(^), 300^);
echo     }, 4000^);
echo   }
echo.
echo   if ^(document.readyState === 'loading'^) {
echo     document.addEventListener^('DOMContentLoaded', waitForContent^);
echo   } else {
echo     waitForContent^(^);
echo   }
echo }^)^(^);
) > content.js

echo [OK] Created content.js

REM Create content.css
(
echo .review-shell .review-questions-list li {
echo   filter: none !important;
echo   -webkit-filter: none !important;
echo   opacity: 1 !important;
echo }
echo.
echo [class*="unlock"], [class*="upsell"], [class*="paywall"] {
echo   display: none !important;
echo }
echo.
echo * {
echo   user-select: text !important;
echo   -webkit-user-select: text !important;
echo }
) > content.css

echo [OK] Created content.css

REM Create popup.html
(
echo ^<!DOCTYPE html^>
echo ^<html lang="en"^>
echo ^<head^>
echo   ^<meta charset="UTF-8"^>
echo   ^<meta name="viewport" content="width=device-width, initial-scale=1.0"^>
echo   ^<title^>NursingPlex Unlock^</title^>
echo   ^<style^>
echo     * { margin: 0; padding: 0; box-sizing: border-box; }
echo     body {
echo       width: 320px;
echo       font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
echo       background: linear-gradient^(135deg, #0f172a 0%, #1e293b 100%^);
echo       color: #f1f5f9;
echo       padding: 20px;
echo     }
echo     .header {
echo       display: flex;
echo       align-items: center;
echo       gap: 12px;
echo       margin-bottom: 20px;
echo       padding-bottom: 16px;
echo       border-bottom: 1px solid rgba^(148, 163, 184, 0.1^);
echo     }
echo     .logo {
echo       width: 40px;
echo       height: 40px;
echo       background: linear-gradient^(135deg, #10b981 0%, #06b6d4 100%^);
echo       border-radius: 10px;
echo       display: flex;
echo       align-items: center;
echo       justify-content: center;
echo       font-size: 20px;
echo     }
echo     .title h1 { font-size: 16px; font-weight: 700; margin-bottom: 2px; }
echo     .title p { font-size: 11px; color: #94a3b8; }
echo     .status {
echo       background: rgba^(30, 41, 59, 0.8^);
echo       border: 1px solid rgba^(148, 163, 184, 0.1^);
echo       border-radius: 12px;
echo       padding: 16px;
echo       margin-bottom: 16px;
echo     }
echo     .status-badge {
echo       display: inline-flex;
echo       align-items: center;
echo       gap: 6px;
echo       padding: 4px 10px;
echo       border-radius: 20px;
echo       font-size: 11px;
echo       font-weight: 600;
echo       background: rgba^(16, 185, 129, 0.2^);
echo       color: #10b981;
echo       border: 1px solid rgba^(16, 185, 129, 0.3^);
echo     }
echo     .status-dot {
echo       width: 6px;
echo       height: 6px;
echo       border-radius: 50%;
echo       background: currentColor;
echo     }
echo     .info {
echo       background: rgba^(30, 41, 59, 0.5^);
echo       border-radius: 8px;
echo       padding: 12px;
echo       margin-bottom: 16px;
echo       font-size: 12px;
echo       color: #94a3b8;
echo       line-height: 1.5;
echo     }
echo     .footer {
echo       margin-top: 16px;
echo       padding-top: 16px;
echo       border-top: 1px solid rgba^(148, 163, 184, 0.1^);
echo       text-align: center;
echo       font-size: 11px;
echo       color: #64748b;
echo     }
echo   ^</style^>
echo ^</head^>
echo ^<body^>
echo   ^<div class="header"^>
echo     ^<div class="logo"^>🔓^</div^>
echo     ^<div class="title"^>
echo       ^<h1^>NursingPlex Unlock^</h1^>
echo       ^<p^>Auto-unlock exam questions^</p^>
echo     ^</div^>
echo   ^</div^>
echo.
echo   ^<div class="status"^>
echo     ^<div class="status-badge"^>
echo       ^<span class="status-dot"^>^</span^>
echo       Active
echo     ^</div^>
echo   ^</div^>
echo.
echo   ^<div class="info"^>
echo     ^<strong^>How to use:^</strong^>^<br^>
echo     1. Visit any NursingPlex exam review page^<br^>
echo     2. Questions will automatically unlock^<br^>
echo     3. Green notification confirms success^<br^>
echo     4. Study all questions freely!
echo   ^</div^>
echo.
echo   ^<div class="footer"^>
echo     ^<p^>NursingPlex Unlock v1.0.0^</p^>
echo     ^<p^>For educational purposes only^</p^>
echo   ^</div^>
echo.
echo   ^<script src="popup.js"^>^</script^>
echo ^</body^>
echo ^</html^>
) > popup.html

echo [OK] Created popup.html

REM Create popup.js
(
echo console.log^('[NursingPlex Unlock] Popup loaded'^);
) > popup.js

echo [OK] Created popup.js

REM Create background.js
(
echo chrome.runtime.onInstalled.addListener^(^(^) =^> {
echo   console.log^('[NursingPlex Unlock] Extension installed'^);
echo   chrome.storage.sync.set^({ enabled: true }^);
echo }^);
echo.
echo chrome.tabs.onUpdated.addListener^(^(tabId, changeInfo, tab^) =^> {
echo   if ^(changeInfo.status === 'complete' ^&^& tab.url^) {
echo     if ^(tab.url.includes^('nursingplex.com/review/'^)^) {
echo       chrome.action.setBadgeText^({ tabId, text: '✓' }^);
echo       chrome.action.setBadgeBackgroundColor^({ tabId, color: '#10b981' }^);
echo     } else {
echo       chrome.action.setBadgeText^({ tabId, text: '' }^);
echo     }
echo   }
echo }^);
) > background.js

echo [OK] Created background.js

cd ..

echo.
echo ==========================================
echo  Extension created successfully!
echo ==========================================
echo.
echo Next steps:
echo 1. Open Chrome
echo 2. Go to chrome://extensions/
echo 3. Enable "Developer mode"
echo 4. Click "Load unpacked"
echo 5. Select the "extension" folder
echo 6. Visit a NursingPlex review page to test
echo.
echo Done!
pause
