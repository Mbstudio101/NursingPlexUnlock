// NursingPlex Unlock Extension - Popup Script

document.addEventListener('DOMContentLoaded', async () => {
  const contentDiv = document.getElementById('content');
  
  // Get current tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  // Check if on NursingPlex review page
  const isNursingPlex = tab.url && tab.url.includes('nursingplex.com/review/');
  
  if (!isNursingPlex) {
    // Show message when not on NursingPlex
    contentDiv.innerHTML = `
      <div class="not-nursingplex">
        <div class="not-nursingplex-icon">📚</div>
        <h2>Not on NursingPlex</h2>
        <p>Navigate to a NursingPlex exam review page to use this extension.</p>
        <div class="actions" style="margin-top: 20px;">
          <a href="https://nursingplex.com/documents" target="_blank" class="action-btn primary">
            🌐 Visit NursingPlex
          </a>
        </div>
      </div>
      <div class="footer">
        <p>NursingPlex Unlock v1.0.0</p>
        <p>For educational purposes only</p>
      </div>
    `;
    return;
  }

  // Get extension state from storage
  const result = await chrome.storage.sync.get(['enabled', 'unlockedCount']);
  const isEnabled = result.enabled !== false; // Default to true
  const unlockedCount = result.unlockedCount || 0;

  // Extract exam name from URL
  const urlParts = tab.url.split('/');
  const examSlug = urlParts[urlParts.length - 1];
  const examName = examSlug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
    .substring(0, 50);

  // Render main UI
  contentDiv.innerHTML = `
    <div class="status">
      <div class="status-header">
        <span class="status-label">Status</span>
        <span class="status-badge ${isEnabled ? 'active' : 'inactive'}">
          <span class="status-dot"></span>
          ${isEnabled ? 'Active' : 'Inactive'}
        </span>
      </div>
    </div>

    <div class="page-info">
      <div class="page-info-label">Current Exam</div>
      <div class="page-info-value">${examName}...</div>
    </div>

    <div class="toggle-container">
      <span class="toggle-label">Auto-Unlock</span>
      <div class="toggle-switch ${isEnabled ? 'active' : ''}" id="toggleSwitch">
        <div class="toggle-slider"></div>
      </div>
    </div>

    <div class="stats">
      <div class="stat-card">
        <div class="stat-value">${unlockedCount}</div>
        <div class="stat-label">Questions Unlocked</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">∞</div>
        <div class="stat-label">Exams Available</div>
      </div>
    </div>

    <div class="actions">
      <button class="action-btn primary" id="refreshBtn">
        🔄 Refresh & Unlock
      </button>
      <a href="https://nursingplex.com/documents" target="_blank" class="action-btn secondary">
        📚 Browse Exams
      </a>
    </div>

    <div class="footer">
      <p>NursingPlex Unlock v1.0.0</p>
      <p>For educational purposes only</p>
    </div>
  `;

  // Add event listeners
  const toggleSwitch = document.getElementById('toggleSwitch');
  toggleSwitch.addEventListener('click', async () => {
    const newState = !isEnabled;
    await chrome.storage.sync.set({ enabled: newState });
    
    // Update UI
    toggleSwitch.classList.toggle('active');
    const statusBadge = document.querySelector('.status-badge');
    statusBadge.className = `status-badge ${newState ? 'active' : 'inactive'}`;
    statusBadge.innerHTML = `
      <span class="status-dot"></span>
      ${newState ? 'Active' : 'Inactive'}
    `;

    // Send message to content script
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tab.id, { action: 'toggle', enabled: newState });
  });

  const refreshBtn = document.getElementById('refreshBtn');
  refreshBtn.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Reload the tab
    chrome.tabs.reload(tab.id);
    
    // Update UI
    refreshBtn.textContent = '✓ Refreshing...';
    refreshBtn.disabled = true;
    
    setTimeout(() => {
      refreshBtn.textContent = '🔄 Refresh & Unlock';
      refreshBtn.disabled = false;
    }, 2000);
  });
});
