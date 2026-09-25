// NursingPlex Unlock Extension - Content Script
// Automatically unlocks blurred questions on NursingPlex review pages

(function() {
  'use strict';

  console.log('[NursingPlex Unlock] Extension loaded');

  // Wait for the page to fully load
  function waitForContent() {
    const checkInterval = setInterval(() => {
      const questionLists = document.querySelectorAll('ol.review-questions-list');
      if (questionLists.length > 0) {
        clearInterval(checkInterval);
        unlockContent();
      }
    }, 500);

    // Timeout after 10 seconds
    setTimeout(() => {
      clearInterval(checkInterval);
      console.log('[NursingPlex Unlock] Timeout waiting for content');
    }, 10000);
  }

  // Main unlock function
  function unlockContent() {
    console.log('[NursingPlex Unlock] Starting unlock process...');

    // 1. Remove blur from question lists
    const questionLists = document.querySelectorAll('ol.review-questions-list');
    questionLists.forEach(ol => {
      // Remove blur classes
      ol.classList.remove('[&>li]:blur-[3px]', '[&>li]:opacity-60', '[&>li]:pointer-events-none', '[&>li]:select-none');
      
      // Remove inline styles
      ol.style.filter = 'none';
      ol.style.webkitFilter = 'none';
      
      // Process all list items
      ol.querySelectorAll(':scope > li').forEach(li => {
        li.style.filter = 'none';
        li.style.webkitFilter = 'none';
        li.style.opacity = '1';
        li.style.pointerEvents = 'auto';
        li.style.userSelect = 'auto';
        li.style.webkitUserSelect = 'auto';
      });
    });

    // 2. Remove upsell banners
    const upsellBanners = document.querySelectorAll('[class*="z-10"][class*="my-5"]');
    upsellBanners.forEach(banner => {
      const text = banner.textContent || '';
      if (text.includes('Unlock') || text.includes('blurred questions')) {
        banner.remove();
        console.log('[NursingPlex Unlock] Removed upsell banner');
      }
    });

    // 3. Remove any overlay elements
    const overlays = document.querySelectorAll('[class*="overlay"], [class*="modal"]');
    overlays.forEach(overlay => {
      if (overlay.textContent && overlay.textContent.includes('Unlock')) {
        overlay.remove();
      }
    });

    // 4. Inject override styles
    injectStyles();

    // 5. Set up mutation observer to handle dynamically loaded content
    setupMutationObserver();

    // 6. Show success notification
    showNotification();

    console.log('[NursingPlex Unlock] Unlock process complete!');
  }

  // Inject CSS styles to override blur effects
  function injectStyles() {
    const existingStyles = document.getElementById('nursingplex-unlock-styles');
    if (existingStyles) {
      existingStyles.remove();
    }

    const style = document.createElement('style');
    style.id = 'nursingplex-unlock-styles';
    style.textContent = `
      /* Remove blur from all question elements */
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

      /* Hide upsell banners */
      [class*="z-10"][class*="my-5"] {
        display: none !important;
      }

      /* Remove any remaining blur overlays */
      .blur, [class*="blur-"] {
        filter: none !important;
        -webkit-filter: none !important;
      }

      /* Allow text selection everywhere */
      .review-shell, .review-shell * {
        user-select: auto !important;
        -webkit-user-select: auto !important;
      }

      /* Ensure page can scroll */
      body {
        overflow: auto !important;
      }

      html {
        overflow: auto !important;
      }
    `;
    document.head.appendChild(style);
    console.log('[NursingPlex Unlock] Styles injected');
  }

  // Set up mutation observer to handle dynamically loaded content
  function setupMutationObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // Element node
            // Check if it's a question list
            if (node.tagName === 'OL' && node.classList.contains('review-questions-list')) {
              node.querySelectorAll(':scope > li').forEach(li => {
                li.style.filter = 'none';
                li.style.opacity = '1';
                li.style.pointerEvents = 'auto';
                li.style.userSelect = 'auto';
              });
            }

            // Check if it's an upsell banner
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

    console.log('[NursingPlex Unlock] Mutation observer set up');
  }

  // Show success notification
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
      animation: slideIn 0.3s ease-out;
      max-width: 320px;
    `;

    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="font-size: 24px;">✓</div>
        <div>
          <div style="font-weight: 700; margin-bottom: 4px;">NursingPlex Unlock Active</div>
          <div style="font-size: 12px; opacity: 0.9; font-weight: 400;">All questions unlocked and ready to study!</div>
        </div>
      </div>
    `;

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(400px);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Auto-hide after 4 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 4000);
  }

  // Start the unlock process
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForContent);
  } else {
    waitForContent();
  }
})();
