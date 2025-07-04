# YouTuned

**A premium Chrome extension that removes distractions from YouTube—recommendations, Shorts, and comments—while preserving search and subscriptions.**

[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-Available-green)](https://chrome.google.com/webstore)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue)](https://developer.chrome.com/docs/extensions/mv3/)
[![Privacy](https://img.shields.io/badge/Privacy-No%20Data%20Collection-green)](PRIVACY.md)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

## ✨ What is YouTuned?

YouTuned is a distraction filter for YouTube with a **master power switch** and a modern, glassmorphism UI. It lets you:
- Remove recommendations, Shorts, and comments
- Keep search and subscriptions untouched
- Control all filtering with a single, beautiful master switch
- Enjoy a privacy-first, zero-data-collection experience

## 🎨 Features

- **Master Power Switch** — Instantly enable/disable all filtering
- **Individual Filters** — Hide recommendations, Shorts, comments (optional)
- **Premium Glassmorphism UI** — Modern, responsive, and beautiful
- **Animated Feedback** — Modern toasts for every action
- **About Modal** — High-quality, glassy About page with privacy and legal info
- **Dark/Light Mode** — Adapts to your system
- **No Data Collection** — 100% local, privacy-first

## 🖼️ Screenshots

- **Popup:** Modern glassmorphism, master switch, and toggles
- **About Modal:** Premium, glassy, privacy-focused
- **YouTube:** Clean interface, no recommendations or Shorts

## 🚀 Installation

**From Chrome Web Store:**
1. Go to [Chrome Web Store](https://chrome.google.com/webstore)
2. Search for "YouTuned"
3. Click "Add to Chrome"

**Local installation (for developers):**
1. Clone or download this repo
2. Go to `chrome://extensions/` in Chrome
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension folder

## 📖 Usage

1. **Go to YouTube** — YouTuned activates automatically
2. **Click the extension icon** — Open the popup
3. **Use the master switch** — Instantly enable/disable all filtering
4. **Toggle individual filters** — Customize your experience
5. **Open the About modal** — See privacy and legal info in a premium glass UI

## 🔒 Privacy & Security

- **No personal data collected** — All settings are local
- **No tracking, no analytics, no cookies**
- **Minimal permissions** — YouTube only
- **Manifest V3** — Latest Chrome security standard
- **Open source** — Full code transparency

## ⚡ Project Structure

```
youtubefilter-chrome-extension/
├── manifest.json              # Extension config
├── content/
│   └── content.js             # Content script (filter logic)
├── popup/
│   ├── popup.html             # Popup UI
│   ├── popup.js               # Popup logic
│   └── popup.css              # Popup styles
├── utils/
│   └── storage.js             # Storage helpers
├── assets/
│   └── icon.svg               # Extension icon
├── README.md                  # Documentation
├── PRIVACY.md                 # Privacy policy
└── ...                        # Other docs
```

## 🛠️ Technologies
- **Manifest V3**
- **Glassmorphism CSS**
- **MutationObserver**
- **Chrome Storage API**
- **ES6+ JavaScript**

## 🧪 Testing
- Install locally, open YouTube, and test all toggles and the master switch
- Open the About modal to verify privacy and legal info

## 📋 Security Checklist
- ✅ No personal data collection
- ✅ Minimal permissions (YouTube only)
- ✅ Manifest V3
- ✅ Content Security Policy
- ✅ Does not block ads or bypass restrictions

## ⚖️ Legal Compliance
- ✅ YouTube ToS compliant (only hides UI)
- ✅ Chrome Web Store Policy compliant
- ✅ GDPR/CCPA compliant (no data collection)

## 📄 License
MIT License — see [LICENSE](LICENSE)

---

**YouTuned** — Watch what matters. Filter the rest.

*Not affiliated with Google or YouTube. All trademarks belong to their respective owners.* 
