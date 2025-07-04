/**
 * YouTuned - Modern Popup JavaScript
 * High-quality UI handling with glass morphism effects and smooth animations
 */

class PopupManager {
  constructor() {
    this.settings = {
      hideRecommendations: true,
      hideShorts: true,
      hideComments: false
    };
    this.masterEnabled = true;
    this.init();
  }

  /**
   * Popup initialization with modern effects
   */
  async init() {
    try {
      // Add loading animation
      this.showLoadingState();
      
      // Get settings
      await this.loadSettings();
      
      // Set event listeners
      this.setupEventListeners();
      
      // Check extension status
      await this.checkExtensionStatus();
      
      // Add entrance animation
      this.animateEntrance();
      
      this.initMasterToggle();
      
      console.log('YouTuned Popup: Initialized');
    } catch (error) {
      console.error('YouTuned Popup: Initialization error', error);
      this.showError('Extension initialization error');
    }
  }

  /**
   * Shows loading state with glass effect
   */
  showLoadingState() {
    const container = document.querySelector('.app-container');
    if (container) {
      container.style.opacity = '0';
      container.style.transform = 'translateY(20px) scale(0.95)';
    }
  }

  /**
   * Animate entrance with modern effects
   */
  animateEntrance() {
    const container = document.querySelector('.app-container');
    if (container) {
      container.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      container.style.opacity = '1';
      container.style.transform = 'translateY(0) scale(1)';
      
      // Animate elements sequentially with glass morphism
      this.animateElementsSequentially();
    }
  }

  /**
   * Animate elements with staggered timing and glass effects
   */
  animateElementsSequentially() {
    const elements = [
      '.app-header',
      '.feature-card',
      '.actions-section',
      '.app-footer'
    ];
    
    elements.forEach((selector, index) => {
      const element = document.querySelector(selector);
      if (element) {
        setTimeout(() => {
          element.style.opacity = '0';
          element.style.transform = 'translateY(15px) scale(0.98)';
          element.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
          
          setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
          }, 100);
        }, index * 150);
      }
    });
  }

  /**
   * Gets settings from chrome.storage with error handling
   */
  async loadSettings() {
    try {
      const result = await chrome.storage.sync.get([
        'hideRecommendations',
        'hideShorts',
        'hideComments',
        'masterEnabled'
      ]);
      
      this.settings = {
        hideRecommendations: result.hideRecommendations !== false,
        hideShorts: result.hideShorts !== false,
        hideComments: result.hideComments === true
      };
      
      this.masterEnabled = result.masterEnabled !== false;
      
      // Update UI with smooth transitions
      this.updateUI();
    } catch (error) {
      console.warn('Cannot load settings, using defaults');
      this.showWarning('Using default settings');
    }
  }

  /**
   * Sets event listeners with modern interactions
   */
  setupEventListeners() {
    const toggles = [
      'hideRecommendations',
      'hideShorts',
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

    // Action buttons
    const refreshBtn = document.getElementById('refreshBtn');
    const aboutBtn = document.getElementById('aboutBtn');
    const closeModal = document.getElementById('closeModal');
    
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => this.handleRefreshFilters());
    }
    
    if (aboutBtn) {
      aboutBtn.addEventListener('click', () => this.showAboutModal());
    }
    
    if (closeModal) {
      closeModal.addEventListener('click', () => this.hideAboutModal());
    }
    
    // Modal overlay click to close
    const modalOverlay = document.getElementById('aboutModal');
    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
          this.hideAboutModal();
        }
      });
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hideAboutModal();
      }
    });
  }

  /**
   * Handle toggle change with modern feedback
   */
  async handleToggleChange(setting, value) {
    try {
      // Add haptic feedback
      this.addHapticFeedback();
      // Update local settings
      this.settings[setting] = value;
      // Save to storage
      await chrome.storage.sync.set({ [setting]: value });
      // Send message to content script
      await this.notifyContentScript(setting, value);
      // Show feedback with modern style
      const label = this.getSettingLabel(setting);
      const state = value ? 'enabled' : 'disabled';
      const type = value ? 'success' : 'disabled';
      this.showFeedback(`${label} ${state}`, type);
      // Animate the toggle
      this.animateToggle(setting, value);
    } catch (error) {
      console.error('Error while changing setting:', error);
      this.showError('Error saving setting');
    }
  }

  /**
   * Animate toggle with glass morphism effect
   */
  animateToggle(setting, value) {
    const toggle = document.getElementById(setting);
    const card = toggle?.closest('.feature-card');
    
    if (card) {
      card.style.transform = 'scale(1.02)';
      card.style.boxShadow = value ? '0 0 20px rgba(99, 102, 241, 0.3)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      
      setTimeout(() => {
        card.style.transform = 'scale(1)';
        card.style.boxShadow = '';
      }, 300);
    }
  }

  /**
   * Add haptic feedback for better feel
   */
  addHapticFeedback() {
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  }

  /**
   * Get human-readable setting labels
   */
  getSettingLabel(setting) {
    const labels = {
      hideRecommendations: 'Recommendations',
      hideShorts: 'Shorts',
      hideComments: 'Comments'
    };
    return labels[setting] || setting;
  }

  /**
   * Update UI with modern styling
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
   * Handle refresh filters with modern feedback
   */
  async handleRefreshFilters() {
    try {
      // Add loading state
      const refreshBtn = document.getElementById('refreshBtn');
      if (refreshBtn) {
        refreshBtn.style.opacity = '0.7';
        refreshBtn.disabled = true;
      }
      // Send refresh message to content script
      await chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        if (tabs[0]?.url?.includes('youtube.com')) {
          try {
            await chrome.tabs.sendMessage(tabs[0].id, { action: 'refreshFilters' });
          } catch (err) {
            if (!err?.message?.includes('Could not establish connection')) {
              throw err;
            }
            // Silently ignore if no receiving end exists
          }
        }
      });
      // Show success feedback
      this.showFeedback('Page refreshed successfully');
      // Reset button state
      setTimeout(() => {
        if (refreshBtn) {
          refreshBtn.style.opacity = '1';
          refreshBtn.disabled = false;
        }
      }, 1000);
    } catch (error) {
      console.error('Error refreshing filters:', error);
      this.showError('Error refreshing page');
    }
  }

  /**
   * Show about modal with glass morphism
   */
  showAboutModal() {
    const modal = document.getElementById('aboutModal');
    if (modal) {
      modal.hidden = false;
      
      // Animate modal entrance
      setTimeout(() => {
        modal.style.opacity = '1';
      }, 10);
    }
  }

  /**
   * Hide about modal with smooth transition
   */
  hideAboutModal() {
    const modal = document.getElementById('aboutModal');
    if (modal) {
      modal.style.opacity = '0';
      
      setTimeout(() => {
        modal.hidden = true;
      }, 300);
    }
  }

  /**
   * Check extension status with modern indicators
   */
  async checkExtensionStatus() {
    try {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      const isYouTube = tabs[0] && tabs[0].url && tabs[0].url.includes('youtube.com');
      if (isYouTube) {
        this.updateStatus(true, 'Active on YouTube');
        this.animateStatusSuccess();
      } else {
        this.updateStatus(false, 'Not on YouTube');
        this.animateStatusWarning();
      }
    } catch (error) {
      console.error('Error checking extension status:', error);
      this.updateStatus(false, 'Status unknown');
    }
  }

  /**
   * Animate status success with glass effect
   */
  animateStatusSuccess() {
    const statusBadge = document.querySelector('.status-badge');
    if (statusBadge) {
      statusBadge.style.animation = 'pulse 2s infinite';
      setTimeout(() => {
        statusBadge.style.animation = '';
      }, 2000);
    }
  }

  /**
   * Animate status warning
   */
  animateStatusWarning() {
    const statusBadge = document.querySelector('.status-badge');
    if (statusBadge) {
      statusBadge.style.background = 'rgba(245, 158, 11, 0.1)';
      statusBadge.style.borderColor = 'rgba(245, 158, 11, 0.2)';
    }
  }

  /**
   * Update status with modern styling
   */
  updateStatus(isActive, message) {
    const statusIndicator = document.querySelector('.status-indicator');
    const statusText = document.querySelector('.status-text');
    const statusBadge = document.querySelector('.status-badge');
    
    if (statusIndicator && statusText && statusBadge) {
      if (isActive) {
        statusIndicator.style.background = 'var(--success)';
        statusText.textContent = 'Active';
        statusBadge.style.background = 'rgba(16, 185, 129, 0.1)';
        statusBadge.style.borderColor = 'rgba(16, 185, 129, 0.2)';
      } else {
        statusIndicator.style.background = 'var(--warning)';
        statusText.textContent = 'Inactive';
        statusBadge.style.background = 'rgba(245, 158, 11, 0.1)';
        statusBadge.style.borderColor = 'rgba(245, 158, 11, 0.2)';
      }
    }
  }

  /**
   * Notify content script with modern messaging
   */
  async notifyContentScript(setting, value) {
    try {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tabs[0]?.url?.includes('youtube.com')) {
        try {
          await chrome.tabs.sendMessage(tabs[0].id, {
            action: 'updateSetting',
            setting: setting,
            value: value
          });
        } catch (err) {
          if (!err?.message?.includes('Could not establish connection')) {
            throw err;
          }
          // Silently ignore if no receiving end exists
        }
      }
    } catch (error) {
      console.warn('Cannot notify content script:', error);
    }
  }

  /**
   * Show feedback with glass morphism
   */
  showFeedback(message, type = 'success') {
    // Create modern feedback element
    const feedback = document.createElement('div');
    feedback.className = `feedback-toast ${type}`;
    let iconSVG = '';
    if (type === 'success') {
      iconSVG = `<svg class="feedback-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M16.704 6.29a1 1 0 00-1.408-1.418l-5.3 5.263-2.3-2.263a1 1 0 10-1.392 1.436l3 2.953a1 1 0 001.4-.014l6-6z"/></svg>`;
    } else if (type === 'disabled') {
      iconSVG = `<svg class="feedback-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.54-10.46a1 1 0 00-1.42-1.42L10 8.59 7.88 6.46a1 1 0 10-1.42 1.42L8.59 10l-2.13 2.12a1 1 0 101.42 1.42L10 11.41l2.12 2.13a1 1 0 001.42-1.42L11.41 10l2.13-2.12z"/></svg>`;
    } else {
      iconSVG = `<svg class="feedback-icon" viewBox="0 0 20 20" fill="currentColor"><circle cx="10" cy="10" r="8"/></svg>`;
    }
    feedback.innerHTML = `
      <div class="feedback-content">
        ${iconSVG}
        <span class="feedback-text">${message}</span>
      </div>
    `;
    document.body.appendChild(feedback);
    // Animate in
    setTimeout(() => {
      feedback.style.opacity = '1';
      feedback.style.pointerEvents = 'auto';
      feedback.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);
    // Remove after delay
    setTimeout(() => {
      feedback.style.opacity = '0';
      feedback.style.pointerEvents = 'none';
      feedback.style.transform = 'translateX(-50%) translateY(-20px)';
      setTimeout(() => {
        if (feedback.parentNode) feedback.parentNode.removeChild(feedback);
      }, 350);
    }, 2200);
  }

  /**
   * Show warning with modern styling
   */
  showWarning(message) {
    this.showFeedback(message, 'disabled');
  }

  /**
   * Show error with modern styling
   */
  showError(message) {
    this.showFeedback(message, 'disabled');
  }

  /**
   * Setup storage listener for real-time updates
   */
  setupStorageListener() {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (namespace === 'sync') {
        Object.keys(changes).forEach(key => {
          if (this.settings.hasOwnProperty(key)) {
            this.settings[key] = changes[key].newValue;
            this.updateUI();
          } else if (key === 'masterEnabled') {
            this.masterEnabled = changes[key].newValue;
            this.updateUI();
          }
        });
      }
    });
  }

  initMasterToggle() {
    const masterToggle = document.getElementById('extensionMasterToggle');
    const thumbLabel = document.querySelector('.master-switch .toggle-thumb .thumb-label');
    const featureToggles = document.querySelectorAll('.feature-toggle .toggle-input');
    if (masterToggle && thumbLabel) {
      // Load state from storage
      chrome.storage.sync.get(['masterEnabled'], (result) => {
        const enabled = result.masterEnabled !== false;
        masterToggle.checked = enabled;
        this.masterEnabled = enabled;
        thumbLabel.textContent = enabled ? 'ON' : 'OFF';
        this.setFiltersEnabled(enabled);
      });
      masterToggle.addEventListener('change', (e) => {
        const enabled = e.target.checked;
        this.masterEnabled = enabled;
        thumbLabel.textContent = enabled ? 'ON' : 'OFF';
        chrome.storage.sync.set({ masterEnabled: enabled });
        this.setFiltersEnabled(enabled);
        // Notify content script to enable/disable all filtering
        this.notifyContentScript('masterEnabled', enabled);
        
        // Show feedback
        this.showFeedback(`Extension ${enabled ? 'enabled' : 'disabled'}`);
      });
    }
  }

  setFiltersEnabled(enabled) {
    const featureCards = document.querySelectorAll('.feature-card');
    const featureToggles = document.querySelectorAll('.feature-toggle .toggle-input');
    featureCards.forEach(card => {
      if (!enabled) {
        card.classList.add('disabled');
        card.style.opacity = '0.5';
      } else {
        card.classList.remove('disabled');
        card.style.opacity = '1';
      }
    });
    featureToggles.forEach(toggle => {
      toggle.disabled = !enabled;
    });
  }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PopupManager();
});

// Global error handling
window.addEventListener('error', (event) => {
  console.error('Global error in popup:', event.error);
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
}); 