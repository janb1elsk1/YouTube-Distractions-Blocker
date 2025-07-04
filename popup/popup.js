/**
 * YouTube Intention Filter - Popup JavaScript
 * UI handling, storage and communication with content script
 */

class PopupManager {
  constructor() {
    this.settings = {
      hideRecommendations: true,
      hideShorts: true,
      disableAutoplay: true,
      hideComments: false
    };
    
    this.init();
  }

  /**
   * Popup initialization
   */
  async init() {
    try {
      // Get settings
      await this.loadSettings();
      
      // Set event listeners
      this.setupEventListeners();
      
      // Check extension status
      await this.checkExtensionStatus();
      
      console.log('YouTube Intention Filter Popup: Initialized');
    } catch (error) {
      console.error('YouTube Intention Filter Popup: Initialization error', error);
      this.showError('Extension initialization error');
    }
  }

  /**
   * Gets settings from chrome.storage
   */
  async loadSettings() {
    try {
      const result = await chrome.storage.sync.get([
        'hideRecommendations',
        'hideShorts',
        'disableAutoplay',
        'hideComments'
      ]);
      
      this.settings = {
        hideRecommendations: result.hideRecommendations !== false,
        hideShorts: result.hideShorts !== false,
        disableAutoplay: result.disableAutoplay !== false,
        hideComments: result.hideComments === true
      };
      
      // Update UI
      this.updateUI();
    } catch (error) {
      console.warn('Cannot load settings, using defaults');
    }
  }

  /**
   * Sets event listeners for toggles
   */
  setupEventListeners() {
    const toggles = [
      'hideRecommendations',
      'hideShorts',
      'disableAutoplay',
      'hideComments'
    ];
    
    toggles.forEach(setting => {
      const toggle = document.getElementById(setting);
      if (toggle) {
        toggle.addEventListener('change', (e) => {
          this.handleToggleChange(setting, e.target.checked);
        });
      }
    });
  }

  /**
   * Handle toggle change
   */
  async handleToggleChange(setting, value) {
    try {
      // Update local settings
      this.settings[setting] = value;
      
      // Save to storage
      await chrome.storage.sync.set({ [setting]: value });
      
      // Send message to content script
      await this.notifyContentScript(setting, value);
      
      // Show feedback
      this.showSuccess(`Setting "${this.getSettingLabel(setting)}" ${value ? 'enabled' : 'disabled'}`);
      
      console.log(`Setting changed: ${setting} = ${value}`);
    } catch (error) {
      console.error('Error while changing setting:', error);
      this.showError('Error saving setting');
      
      // Restore previous state
      this.updateUI();
    }
  }

  /**
   * Display setting label
   */
  getSettingLabel(setting) {
    const labels = {
      hideRecommendations: 'Hide recommendations',
      hideShorts: 'Hide Shorts',
      disableAutoplay: 'Disable autoplay',
      hideComments: 'Hide comments'
    };
    return labels[setting] || setting;
  }

  /**
   * Updates UI based on settings
   */
  updateUI() {
    Object.keys(this.settings).forEach(setting => {
      const toggle = document.getElementById(setting);
      if (toggle) {
        toggle.checked = this.settings[setting];
        
        // Update aria-checked for accessibility
        const label = toggle.nextElementSibling;
        if (label) {
          label.setAttribute('aria-checked', this.settings[setting].toString());
        }
      }
    });
  }

  /**
   * Checks extension status on YouTube
   */
  async checkExtensionStatus() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (tab.url && tab.url.includes('youtube.com')) {
        this.updateStatus(true, 'Active on YouTube');
      } else {
        this.updateStatus(false, 'Inactive - open YouTube');
      }
    } catch (error) {
      console.error('Error checking status:', error);
      this.updateStatus(false, 'Status check error');
    }
  }

  /**
   * Updates extension status
   */
  updateStatus(isActive, message) {
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');
    
    if (statusDot) {
      statusDot.classList.toggle('active', isActive);
      statusDot.classList.toggle('inactive', !isActive);
    }
    
    if (statusText) {
      statusText.textContent = message;
    }
  }

  /**
   * Sends message to content script
   */
  async notifyContentScript(setting, value) {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (tab.url && tab.url.includes('youtube.com')) {
        await chrome.tabs.sendMessage(tab.id, {
          action: 'updateSetting',
          setting: setting,
          value: value
        });
      }
    } catch (error) {
      console.warn('Cannot send message to content script:', error);
    }
  }

  /**
   * Shows success message
   */
  showSuccess(message) {
    // Can add toast notification in the future
    console.log('Success:', message);
  }

  /**
   * Shows error message
   */
  showError(message) {
    // Can add toast notification in the future
    console.error('Error:', message);
  }

  /**
   * Listens for storage changes
   */
  setupStorageListener() {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (namespace === 'sync') {
        Object.keys(changes).forEach(key => {
          if (this.settings.hasOwnProperty(key)) {
            this.settings[key] = changes[key].newValue;
          }
        });
        this.updateUI();
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const popup = new PopupManager();
  
  // Export for tests (if needed)
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = PopupManager;
  }
});

// Global error handling
window.addEventListener('error', (event) => {
  console.error('Global error in popup:', event.error);
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
}); 