// NursingPlex Unlock Extension - Background Service Worker

// Listen for extension installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('[NursingPlex Unlock] Extension installed');
    
    // Set default settings
    chrome.storage.sync.set({
      enabled: true,
      unlockedCount: 0
    });
  } else if (details.reason === 'update') {
    console.log('[NursingPlex Unlock] Extension updated');
  }
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'incrementCount') {
    // Increment the unlocked questions count
    chrome.storage.sync.get(['unlockedCount'], (result) => {
      const newCount = (result.unlockedCount || 0) + request.count;
      chrome.storage.sync.set({ unlockedCount: newCount });
      sendResponse({ success: true, count: newCount });
    });
    return true; // Keep message channel open for async response
  }
  
  if (request.action === 'getStatus') {
    chrome.storage.sync.get(['enabled'], (result) => {
      sendResponse({ enabled: result.enabled !== false });
    });
    return true;
  }
});

// Update badge when on NursingPlex pages
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    if (tab.url.includes('nursingplex.com/review/')) {
      // Show badge on NursingPlex review pages
      chrome.action.setBadgeText({ tabId, text: '✓' });
      chrome.action.setBadgeBackgroundColor({ tabId, color: '#10b981' });
    } else {
      // Clear badge on other pages
      chrome.action.setBadgeText({ tabId, text: '' });
    }
  }
});

// Listen for tab activation
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  
  if (tab.url && tab.url.includes('nursingplex.com/review/')) {
    chrome.action.setBadgeText({ tabId: activeInfo.tabId, text: '✓' });
    chrome.action.setBadgeBackgroundColor({ tabId: activeInfo.tabId, color: '#10b981' });
  } else {
    chrome.action.setBadgeText({ tabId: activeInfo.tabId, text: '' });
  }
});

console.log('[NursingPlex Unlock] Background service worker loaded');
