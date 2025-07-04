# YouTube Intention Filter

**A Chrome extension that removes recommendations, Shorts, and autoplay from YouTube while preserving search and subscriptions.**

[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-Available-green)](https://chrome.google.com/webstore)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue)](https://developer.chrome.com/docs/extensions/mv3/)
[![Privacy](https://img.shields.io/badge/Privacy-No%20Data%20Collection-green)](https://github.com/youtube-intention-filter)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

## 🎯 Purpose

YouTube Intention Filter helps maintain intention while browsing YouTube by:

- **Removing recommendations** - sidebar, end screen cards, related videos
- **Hiding Shorts** - Shorts sections from homepage and navigation
- **Disabling autoplay** - automatic playback of next videos
- **Optional comment hiding** - for an even cleaner interface

The extension **does not block ads** or **bypass restrictions** - it only hides UI elements while preserving all search and subscription functionality.

## ✨ Features

### 🔧 Settings
- **Hide recommendations** - removes sidebar with recommendations, end screen cards and related videos
- **Hide Shorts** - removes Shorts sections from homepage and navigation
- **Disable autoplay** - disables automatic playback of next videos
- **Hide comments** - hides comment section under videos (optional)

### 🎨 Interface
- **Minimalist popup** with toggles
- **Dark mode** - automatic adaptation to system preferences
- **Responsive design** - works on all screen sizes
- **Full accessibility** - WCAG 2.1 compliance, keyboard support

### 🔒 Security and privacy
- **No personal data collection** - works entirely locally
- **Minimal permissions** - YouTube only
- **Manifest V3** - latest security standard
- **Open source** - full code transparency

## 🚀 Installation

### From Chrome Web Store (Recommended)
1. Go to [Chrome Web Store](https://chrome.google.com/webstore)
2. Search for "YouTube Intention Filter"
3. Click "Add to Chrome"
4. Confirm installation

### Local installation (For developers)
1. Download or clone the repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the extension folder

## 📖 Usage

1. **Install the extension** according to the instructions above
2. **Go to YouTube** - the extension automatically activates
3. **Click the extension icon** in Chrome toolbar
4. **Customize settings** according to preferences:
   - Enable/disable individual filters
   - Changes are automatically saved
   - Settings sync between devices

### Usage examples

#### Scenario 1: Focus on a specific video
- Enable "Hide recommendations" and "Disable autoplay"
- Watch the video without distracting elements
- Maintain full control over playback

#### Scenario 2: Browsing subscriptions
- Enable "Hide Shorts" and "Hide recommendations"
- Focus on videos from subscriptions
- Avoid accidentally clicking on recommendations

#### Scenario 3: Reading comments
- Disable "Hide comments" (disabled by default)
- Keep access to comments when needed

## 🛠️ Technologies

- **Manifest V3** - latest Chrome Extensions standard
- **MutationObserver** - efficient DOM change detection
- **Chrome Storage API** - secure settings storage
- **CSS Variables** - easy style management
- **ES6+ JavaScript** - modern code
- **WCAG 2.1** - full accessibility

## 🔧 Project Structure

```
youtubefilter-chrome-extension/
├── manifest.json              # Extension configuration
├── content/
│   └── content.js             # Content script - DOM modification
├── popup/
│   ├── popup.html             # Popup UI
│   ├── popup.js               # Popup logic
│   └── popup.css              # Popup styles
├── utils/
│   └── storage.js             # Storage helper functions
├── assets/
│   └── icon.svg               # Extension icon
└── README.md                  # Documentation
```

## 🧪 Testing

### Local testing
1. Install the extension locally (see Installation section)
2. Open YouTube in a new tab
3. Check if filters work correctly
4. Test different YouTube pages (homepage, video, channel)

### Debugging
1. Open DevTools (F12)
2. Go to "Console" tab
3. Check extension logs (prefix: "YouTube Intention Filter")
4. Use "Sources" to debug content script

### Testing settings
1. Change settings in popup
2. Check if changes are saved
3. Refresh page - settings should be preserved
4. Test on different devices (synchronization)

## 📋 Security checklist

- ✅ **No personal data collection**
- ✅ **Works entirely locally**
- ✅ **Minimal permissions** (YouTube only)
- ✅ **Manifest V3** - latest standard
- ✅ **Content Security Policy** - security
- ✅ **Does not modify content** - only hides UI elements
- ✅ **Preserves search functionality**
- ✅ **Does not block ads**
- ✅ **Does not bypass restrictions**

## ⚖️ Legal compliance

### YouTube Terms of Service
- ✅ **Does not violate ToS** - only hides UI elements
- ✅ **Does not bypass restrictions** - preserves all YouTube mechanisms
- ✅ **Does not modify content** - does not change videos or descriptions
- ✅ **Does not block ads** - ads remain visible

### Chrome Web Store Policy
- ✅ **Clear functionality description**
- ✅ **Minimal permissions**
- ✅ **Secure code**
- ✅ **Manifest V3 compliance**

## 🤝 Contributing

### Reporting bugs
1. Check if the issue is already reported
2. Create a new issue with problem description
3. Include information about:
   - Chrome version
   - Extension version
   - Steps to reproduce
   - Screenshots (if needed)

### Proposing features
1. Check if the feature is not already planned
2. Create an issue with feature description
3. Explain benefits for users
4. Consider implementing it yourself

### Pull Requests
1. Fork the repository
2. Create a branch for your feature
3. Add tests if possible
4. Describe changes in PR

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Chrome Extensions Team** for Manifest V3
- **YouTube** for providing the API
- **Open source community** for inspiration
- **Users** for feedback and suggestions

## 📞 Contact

- **GitHub**: [youtube-intention-filter](https://github.com/youtube-intention-filter)
- **Issues**: [GitHub Issues](https://github.com/youtube-intention-filter/issues)
- **Discussions**: [GitHub Discussions](https://github.com/youtube-intention-filter/discussions)

---

**YouTube Intention Filter** - Preserve intention, filter distractions.

*The extension is not affiliated with Google or YouTube. All trademarks belong to their respective owners.* 