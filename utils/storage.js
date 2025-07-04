/**
 * YouTube Intention Filter - Storage Utilities
 * Secure settings management with localStorage fallback
 */

class StorageManager {
  constructor() {
    this.defaultSettings = {
      hideRecommendations: true,
      hideShorts: true,
      hideComments: false
    };
    
    this.storageKey = 'youtubeIntentionFilter';
  }

  /**
   * Gets settings from chrome.storage or localStorage
   */
  async getSettings() {
    try {
      // Try chrome.storage.sync
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
        const result = await chrome.storage.sync.get(Object.keys(this.defaultSettings));
        
        // Check if all settings are available
        const hasAllSettings = Object.keys(this.defaultSettings).every(key => 
          result.hasOwnProperty(key)
        );
        
        if (hasAllSettings) {
          return this.mergeWithDefaults(result);
        }
      }
      
      // Fallback to localStorage
      return this.getFromLocalStorage();
    } catch (error) {
      console.warn('Error getting settings from chrome.storage, using localStorage:', error);
      return this.getFromLocalStorage();
    }
  }

  /**
   * Saves settings to chrome.storage or localStorage
   */
  async setSettings(settings) {
    try {
      // Try chrome.storage.sync
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
        await chrome.storage.sync.set(settings);
        return true;
      }
      
      // Fallback to localStorage
      return this.setToLocalStorage(settings);
    } catch (error) {
      console.warn('Error saving to chrome.storage, using localStorage:', error);
      return this.setToLocalStorage(settings);
    }
  }

  /**
   * Saves single setting
   */
  async setSetting(key, value) {
    const settings = await this.getSettings();
    settings[key] = value;
    return this.setSettings(settings);
  }

  /**
   * Gets settings from localStorage
   */
  getFromLocalStorage() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        return this.mergeWithDefaults(parsed);
      }
    } catch (error) {
      console.warn('Error reading from localStorage:', error);
    }
    
    return { ...this.defaultSettings };
  }

  /**
   * Saves settings to localStorage
   */
  setToLocalStorage(settings) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      return false;
    }
  }

  /**
   * Merges settings with default values
   */
  mergeWithDefaults(settings) {
    const merged = { ...this.defaultSettings };
    
    Object.keys(settings).forEach(key => {
      if (this.defaultSettings.hasOwnProperty(key)) {
        merged[key] = settings[key];
      }
    });
    
    return merged;
  }

  /**
   * Resets settings to defaults
   */
  async resetSettings() {
    return this.setSettings(this.defaultSettings);
  }

  /**
   * Exports settings
   */
  async exportSettings() {
    const settings = await this.getSettings();
    return {
      settings,
      exportDate: new Date().toISOString(),
      version: '1.0.0'
    };
  }

  /**
   * Imports settings
   */
  async importSettings(importData) {
    try {
      if (importData && importData.settings) {
        const validSettings = this.validateSettings(importData.settings);
        return this.setSettings(validSettings);
      }
      return false;
    } catch (error) {
      console.error('Error importing settings:', error);
      return false;
    }
  }

  /**
   * Validates settings
   */
  validateSettings(settings) {
    const valid = {};
    
    Object.keys(this.defaultSettings).forEach(key => {
      if (settings.hasOwnProperty(key) && typeof settings[key] === 'boolean') {
        valid[key] = settings[key];
      } else {
        valid[key] = this.defaultSettings[key];
      }
    });
    
    return valid;
  }

  /**
   * Listens for storage changes
   */
  onSettingsChanged(callback) {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.onChanged) {
      chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'sync') {
          const changedSettings = {};
          
          Object.keys(changes).forEach(key => {
            if (this.defaultSettings.hasOwnProperty(key)) {
              changedSettings[key] = changes[key].newValue;
            }
          });
          
          if (Object.keys(changedSettings).length > 0) {
            callback(changedSettings);
          }
        }
      });
    }
  }

  /**
   * Checks if storage is available
   */
  isStorageAvailable() {
    return typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync;
  }

  /**
   * Gets storage information
   */
  getStorageInfo() {
    return {
      type: this.isStorageAvailable() ? 'chrome.storage.sync' : 'localStorage',
      available: this.isStorageAvailable() || typeof localStorage !== 'undefined',
      defaultSettings: this.defaultSettings
    };
  }
}

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StorageManager;
}

// Export for global use
if (typeof window !== 'undefined') {
  window.StorageManager = StorageManager;
} 