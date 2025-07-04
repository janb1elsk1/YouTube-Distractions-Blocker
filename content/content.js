/**
 * YouTube Intention Filter - Content Script
 * Removes recommendations, Shorts, autoplay and comments from YouTube
 * Works locally, doesn't collect any personal data
 */

class YouTubeFilter {
  constructor() {
    this.settings = {
      hideRecommendations: true,
      hideShorts: true,
      disableAutoplay: true,
      hideComments: false
    };
    
    this.observer = null;
    this.isInitialized = false;
    
    this.init();
  }

  /**
   * Filter initialization
   */
  async init() {
    try {
      // Get settings from storage
      await this.loadSettings();
      
      // Start filtering
      this.startFiltering();
      
      // Listen for setting changes
      chrome.storage.onChanged.addListener(this.handleSettingsChange.bind(this));
      
      // Listen for messages from popup
      chrome.runtime.onMessage.addListener(this.handleMessage.bind(this));
      
      console.log('YouTube Intention Filter: Initialized');
    } catch (error) {
      console.error('YouTube Intention Filter: Initialization error', error);
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
    } catch (error) {
      console.warn('YouTube Intention Filter: Cannot load settings, using defaults');
    }
  }

  /**
   * Handle setting changes
   */
  handleSettingsChange(changes) {
    let hasChanges = false;
    
    Object.keys(changes).forEach(key => {
      if (this.settings.hasOwnProperty(key)) {
        this.settings[key] = changes[key].newValue;
        hasChanges = true;
      }
    });
    
    if (hasChanges) {
      // Clear previous filters before applying new ones
      this.clearFilters();
      this.applyFilters();
    }
  }

  /**
   * Handle messages from popup
   */
  handleMessage(message) {
    if (message.action === 'updateSetting') {
      const { setting, value } = message;
      if (this.settings.hasOwnProperty(setting)) {
        this.settings[setting] = value;
        // Clear previous filters before applying new ones
        this.clearFilters();
        this.applyFilters();
      }
    }
  }

  /**
   * Starts filtering with MutationObserver
   */
  startFiltering() {
    if (this.isInitialized) return;
    
    // Initial filtering
    this.applyFilters();
    
    // MutationObserver for dynamic changes
    this.observer = new MutationObserver((mutations) => {
      let shouldRefilter = false;
      
      mutations.forEach(mutation => {
        // Check if change doesn't come from our extension
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Check if added elements aren't already hidden by us
          const hasNewElements = Array.from(mutation.addedNodes).some(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Check if element isn't already hidden by us
              return !node.dataset.yifHidden && !node.querySelector('[data-yif-hidden]');
            }
            return false;
          });
          
          if (hasNewElements) {
            shouldRefilter = true;
          }
        }
      });
      
      if (shouldRefilter) {
        // Debounce - avoid too frequent filtering
        clearTimeout(this.filterTimeout);
        this.filterTimeout = setTimeout(() => {
          this.applyFilters();
        }, 200); // Increased debounce
      }
    });
    
    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    this.isInitialized = true;
  }

  /**
   * Applies filters based on current settings
   */
  applyFilters() {
    if (this.settings.hideRecommendations) {
      this.hideRecommendations();
    }
    
    if (this.settings.hideShorts) {
      this.hideShorts();
    }
    
    if (this.settings.disableAutoplay) {
      this.disableAutoplay();
    }
    
    if (this.settings.hideComments) {
      this.hideComments();
    }
  }

  /**
   * Hides recommendations (sidebar, end screen, related videos, home grid)
   */
  hideRecommendations() {
    // Hide recommendations on homepage, but not on subscriptions feed
    const isHome = location.pathname === '/' || location.pathname.startsWith('/feed/explore');
    const isSubscriptions = location.pathname.startsWith('/feed/subscriptions');
    const isSearch = location.pathname.startsWith('/results');
    if (isHome && !isSubscriptions && !isSearch) {
      // Hide main recommendation grid
      const grid = document.querySelector('ytd-rich-grid-renderer');
      if (grid && !grid.dataset.yifHidden) {
        grid.style.display = 'none';
        grid.dataset.yifHidden = 'true';
      }
      // Hide recommendation sections (e.g., Shorts, Mixes, etc.)
      document.querySelectorAll('ytd-rich-section-renderer:not([data-yif-hidden])').forEach(section => {
        section.style.display = 'none';
        section.dataset.yifHidden = 'true';
      });
    }

    // Sidebar with recommendations - only on video page
    const selectors = [
      'ytd-watch-next-secondary-results-renderer:not([data-yif-hidden])',
      // End screen cards
      'ytd-player .ytp-endscreen-content:not([data-yif-hidden])',
      'ytd-player .ytp-endscreen-paginate:not([data-yif-hidden])',
      // "Next video" section
      'ytd-watch-next-secondary-results-renderer #related:not([data-yif-hidden])',
      // Autoplay toggle
      'ytd-toggle-button-renderer[aria-label*="autoplay"]:not([data-yif-hidden])',
      'ytd-toggle-button-renderer[aria-label*="Autoplay"]:not([data-yif-hidden])'
    ];
    
    selectors.forEach(selector => {
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          if (element && !element.dataset.yifHidden) {
            if (element.style.display !== 'none') {
              element.style.display = 'none';
              element.dataset.yifHidden = 'true';
            }
          }
        });
      } catch (error) {
        console.warn('YouTube Intention Filter: Selector error:', selector, error);
      }
    });
  }

  /**
   * Hides Shorts
   */
  hideShorts() {
    const selectors = [
      // Shorts on homepage - more precise selectors
      'ytd-rich-item-renderer[is-shorts]:not([data-yif-hidden])',
      'ytd-rich-grid-row[is-shorts]:not([data-yif-hidden])',
      // Shorts in sidebar - only navigation icons
      'ytd-mini-guide-entry-renderer[aria-label*="Shorts"]:not([data-yif-hidden])',
      // Shorts in wide sidebar (full text)
      'ytd-guide-entry-renderer[aria-label*="Shorts"]:not([data-yif-hidden])',
      // Shorts in search results (existing selectors)
      'ytd-video-renderer[is-shorts]:not([data-yif-hidden])',
      'ytd-rich-item-renderer[is-shorts]:not([data-yif-hidden])',
      // Shorts sections on homepage
      'ytd-rich-section-renderer[section-identifier="shorts"]:not([data-yif-hidden])',
      'ytd-rich-section-renderer[section-identifier="shorts"] ytd-rich-item-renderer:not([data-yif-hidden])',
      // --- Improved selectors for search results ---
      // Shorts shelf/section in search results
      'ytd-reel-shelf-renderer:not([data-yif-hidden])',
      // Individual Shorts tiles in shelf
      'ytd-reel-item-renderer:not([data-yif-hidden])',
      // Shorts shelf title (just in case)
      'ytd-reel-shelf-renderer ~ ytd-shelf-renderer[is-shorts]:not([data-yif-hidden])',
      // Shorts grid/row in search results
      'ytd-section-list-renderer ytd-reel-shelf-renderer:not([data-yif-hidden])',
    ];
    
    selectors.forEach(selector => {
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          if (element && !element.dataset.yifHidden) {
            if (element.style.display !== 'none') {
              element.style.display = 'none';
              element.dataset.yifHidden = 'true';
            }
          }
        });
      } catch (error) {
        console.warn('YouTube Intention Filter: Selector error:', selector, error);
      }
    });

    // Additionally: hide Shorts via a[title="Shorts"] (just in case)
    document.querySelectorAll('a[title="Shorts"]:not([data-yif-hidden])').forEach(el => {
      const entry = el.closest('ytd-guide-entry-renderer');
      if (entry && !entry.dataset.yifHidden) {
        entry.style.display = 'none';
        entry.dataset.yifHidden = 'true';
      }
    });
  }

  /**
   * Disables autoplay
   */
  disableAutoplay() {
    // Disable autoplay in player
    const player = document.querySelector('video');
    if (player) {
      player.autoplay = false;
      player.muted = false;
    }
    
    // Disable autoplay toggle
    const autoplayToggles = document.querySelectorAll('ytd-toggle-button-renderer');
    autoplayToggles.forEach(toggle => {
      const button = toggle.querySelector('button');
      if (button && (button.getAttribute('aria-label')?.includes('autoplay') || 
                     button.getAttribute('aria-label')?.includes('Autoplay'))) {
        if (button.getAttribute('aria-pressed') === 'true') {
          button.click();
        }
      }
    });
  }

  /**
   * Hides comments (optional)
   */
  hideComments() {
    const selectors = [
      'ytd-comments#comments',
      'ytd-comments#comments ytd-comments-header-renderer',
      'ytd-comments#comments ytd-comments-renderer'
    ];
    
    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        if (element && !element.dataset.yifHidden) {
          element.style.display = 'none';
          element.dataset.yifHidden = 'true';
        }
      });
    });
  }

  /**
   * Clears filters (restores visibility)
   */
  clearFilters() {
    const hiddenElements = document.querySelectorAll('[data-yif-hidden="true"]');
    hiddenElements.forEach(element => {
      element.style.display = '';
      delete element.dataset.yifHidden;
    });
  }

  /**
   * Destructor - cleans up observer
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.clearFilters();
  }
}

// Initialize filter when DOM is ready
let filterInstance = null;

function initializeFilter() {
  // Check if filter isn't already running
  if (filterInstance) {
    console.log('YouTube Intention Filter: Filter already running');
    return;
  }
  
  try {
    filterInstance = new YouTubeFilter();
    console.log('YouTube Intention Filter: Successfully initialized');
  } catch (error) {
    console.error('YouTube Intention Filter: Initialization error:', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeFilter);
} else {
  initializeFilter();
}

// Export for tests (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = YouTubeFilter;
} 