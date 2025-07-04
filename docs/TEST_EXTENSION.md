# Extension Testing Guide

## 🧪 Testing Checklist

### 1. Installation Test
- [ ] Load extension in Chrome (chrome://extensions/)
- [ ] Enable Developer mode
- [ ] Click "Load unpacked"
- [ ] Select extension folder
- [ ] Verify extension appears in toolbar
- [ ] Check extension icon displays correctly

### 2. Popup Interface Test
- [ ] Click extension icon
- [ ] Verify popup opens with premium UI
- [ ] Check all animations work smoothly
- [ ] Test dark/light mode adaptation
- [ ] Verify all toggle switches work
- [ ] Check status dashboard displays correctly
- [ ] Test quick action buttons
- [ ] Verify notifications appear properly

### 3. YouTube Functionality Test

#### Homepage Test
- [ ] Go to youtube.com
- [ ] Verify recommendations are hidden
- [ ] Check Shorts sections are hidden
- [ ] Verify subscriptions still visible
- [ ] Test different homepage sections

#### Video Page Test
- [ ] Open any YouTube video
- [ ] Verify sidebar recommendations hidden
- [ ] Check end screen cards hidden
- [ ] Test autoplay is disabled
- [ ] Verify video player works normally

#### Search Results Test
- [ ] Search for any term on YouTube
- [ ] Verify Shorts in search results hidden
- [ ] Check regular videos still visible
- [ ] Test pagination works

#### Comments Test
- [ ] Toggle "Hide comments" setting
- [ ] Verify comments section hidden/shown
- [ ] Test toggle functionality

### 4. Settings Persistence Test
- [ ] Change settings in popup
- [ ] Refresh YouTube page
- [ ] Verify settings are preserved
- [ ] Test on different YouTube pages
- [ ] Check settings sync across tabs

### 5. Performance Test
- [ ] Monitor CPU usage
- [ ] Check memory consumption
- [ ] Verify no lag on YouTube
- [ ] Test with multiple tabs open
- [ ] Check extension doesn't slow down browser

### 6. Error Handling Test
- [ ] Test on slow internet connection
- [ ] Verify graceful error handling
- [ ] Check console for errors
- [ ] Test with YouTube changes
- [ ] Verify extension recovers from errors

### 7. Accessibility Test
- [ ] Test keyboard navigation
- [ ] Verify screen reader compatibility
- [ ] Check high contrast mode
- [ ] Test with reduced motion
- [ ] Verify focus indicators visible

### 8. Cross-Browser Test
- [ ] Test on Chrome (primary)
- [ ] Test on Edge (Chromium-based)
- [ ] Verify compatibility
- [ ] Check manifest V3 compliance

## 🐛 Common Issues & Solutions

### Issue: Extension not working
**Solution:**
1. Check console for errors
2. Verify manifest.json is valid
3. Reload extension
4. Clear browser cache

### Issue: Settings not saving
**Solution:**
1. Check storage permissions
2. Verify chrome.storage.sync access
3. Test in incognito mode
4. Check for conflicts with other extensions

### Issue: YouTube elements not hidden
**Solution:**
1. Check if YouTube changed selectors
2. Update content script selectors
3. Verify MutationObserver is working
4. Test on different YouTube layouts

### Issue: Popup not opening
**Solution:**
1. Check popup.html path in manifest
2. Verify all popup files exist
3. Check for JavaScript errors
4. Test popup in different contexts

## 📊 Performance Benchmarks

### Memory Usage
- **Target:** < 10MB additional memory
- **Acceptable:** < 20MB additional memory
- **Unacceptable:** > 50MB additional memory

### CPU Usage
- **Target:** < 1% CPU when idle
- **Acceptable:** < 5% CPU when active
- **Unacceptable:** > 10% CPU usage

### Load Time
- **Target:** < 100ms to apply filters
- **Acceptable:** < 500ms to apply filters
- **Unacceptable:** > 1000ms to apply filters

## 🔍 Debugging Tools

### Chrome DevTools
1. Open DevTools (F12)
2. Go to "Console" tab
3. Look for "YouTube Intention Filter" logs
4. Check for errors or warnings

### Extension Debug
1. Go to chrome://extensions/
2. Find your extension
3. Click "Details"
4. Check "Errors" section

### Content Script Debug
1. Open YouTube
2. Open DevTools
3. Go to "Sources" tab
4. Look for content script
5. Set breakpoints if needed

## ✅ Final Verification

### Before Publication
- [ ] All tests pass
- [ ] No console errors
- [ ] Performance benchmarks met
- [ ] Accessibility requirements met
- [ ] Privacy policy updated
- [ ] README complete
- [ ] Screenshots ready
- [ ] Store listing prepared

### Publication Checklist
- [ ] Extension packaged (.crx or .zip)
- [ ] Store listing information ready
- [ ] Screenshots uploaded
- [ ] Privacy policy linked
- [ ] Support information provided
- [ ] Legal compliance verified

## 🚀 Ready for Publication!

If all tests pass, your extension is ready for Chrome Web Store publication!

**Next Steps:**
1. Create Chrome Web Store developer account
2. Upload extension package
3. Fill in store listing information
4. Submit for review
5. Monitor for approval

**Expected Review Time:** 1-3 business days
**Success Rate:** 95%+ for compliant extensions 