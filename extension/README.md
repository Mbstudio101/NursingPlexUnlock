# 🔓 NursingPlex Unlock Browser Extension

A browser extension that automatically unlocks blurred questions and removes upsell banners on NursingPlex exam review pages.

## ✨ Features

- ✅ **Automatic Unlocking** - Automatically removes blur effects when you visit a NursingPlex review page
- ✅ **Remove Upsell Banners** - Hides "Unlock the blurred questions" prompts
- ✅ **Restore Interactivity** - Makes all text selectable and copyable
- ✅ **Persistent** - Works even when new content loads dynamically
- ✅ **Toggle Control** - Enable/disable the extension with one click
- ✅ **Beautiful UI** - Modern popup interface with status and stats
- ✅ **Lightweight** - Minimal impact on browser performance

## 📦 Installation

### Chrome / Edge / Brave

1. **Download the extension folder**
   - Clone this repository or download the `extension/` folder

2. **Open Chrome Extensions page**
   - Go to `chrome://extensions/`
   - Or: Menu → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top right

4. **Load the extension**
   - Click "Load unpacked"
   - Select the `extension/` folder
   - The extension should now appear in your extensions list

5. **Pin the extension** (optional)
   - Click the puzzle piece icon in the toolbar
   - Find "NursingPlex Unlock"
   - Click the pin icon to pin it to your toolbar

### Firefox

1. **Open Firefox Add-ons**
   - Go to `about:debugging#/runtime/this-firefox`

2. **Load temporary add-on**
   - Click "Load Temporary Add-on..."
   - Select the `manifest.json` file from the `extension/` folder

3. **Note**: Firefox temporary add-ons are removed when you close Firefox. For permanent installation, you'll need to sign the extension through AMO.

## 🎯 Usage

### Automatic Mode (Default)

1. Navigate to any NursingPlex exam review page
   - Example: `https://nursingplex.com/review/advanced-med-surg-proctored-exam-mchps-1778479982`

2. The extension will automatically:
   - Remove blur effects from all questions
   - Hide upsell banners
   - Make content selectable
   - Show a success notification

3. That's it! All questions are now visible and interactive.

### Manual Control

1. Click the extension icon in your toolbar
2. Use the toggle switch to enable/disable auto-unlock
3. Click "Refresh & Unlock" to manually trigger the unlock process
4. View stats on how many questions you've unlocked

## 🔧 How It Works

The extension uses a content script that:

1. **Detects NursingPlex review pages** - Only runs on `nursingplex.com/review/*` URLs
2. **Removes CSS blur effects** - Overrides the `blur-[3px]` and `opacity-60` classes
3. **Hides upsell banners** - Removes elements containing "Unlock" prompts
4. **Injects override styles** - Ensures content remains unlocked
5. **Sets up mutation observer** - Handles dynamically loaded content
6. **Shows notification** - Confirms successful unlock

## 📊 Extension Stats

The extension tracks:
- Number of questions unlocked
- Current exam being viewed
- Extension status (active/inactive)

## 🎨 UI Components

### Popup Interface
- **Status indicator** - Shows if extension is active
- **Current exam** - Displays the exam you're viewing
- **Toggle switch** - Enable/disable auto-unlock
- **Statistics** - View unlocked questions count
- **Quick actions** - Refresh page, browse exams

### Content Script
- **Success notification** - Green gradient banner confirming unlock
- **Auto-hide** - Notification disappears after 4 seconds
- **Non-intrusive** - Doesn't interfere with page content

## 🔒 Privacy & Security

- ✅ **No data collection** - Extension doesn't send any data to external servers
- ✅ **Local storage only** - Settings stored in browser's local storage
- ✅ **Minimal permissions** - Only accesses NursingPlex pages
- ✅ **Open source** - All code is visible and auditable
- ✅ **No tracking** - No analytics or telemetry

## 🐛 Troubleshooting

### Extension not working?

1. **Check if enabled**
   - Click the extension icon
   - Make sure the toggle is ON

2. **Refresh the page**
   - Click "Refresh & Unlock" in the popup
   - Or press F5 to reload the page

3. **Check console for errors**
   - Press F12 to open Developer Tools
   - Go to Console tab
   - Look for `[NursingPlex Unlock]` messages

4. **Reinstall the extension**
   - Remove the extension from `chrome://extensions/`
   - Reload the unpacked extension

### Questions still blurred?

1. **Wait for page to fully load**
   - The extension waits for content to load
   - May take a few seconds on slow connections

2. **Check if it's a free question**
   - First 10 questions are already visible
   - Extension unlocks questions 11+

3. **Manual refresh**
   - Click "Refresh & Unlock" in the popup

### Popup not showing?

1. **Pin the extension**
   - Click the puzzle piece icon
   - Pin "NursingPlex Unlock" to toolbar

2. **Check extension permissions**
   - Go to `chrome://extensions/`
   - Make sure the extension is enabled
   - Check site access permissions

## 📝 Development

### File Structure

```
extension/
├── manifest.json          # Extension configuration
├── content.js             # Content script (runs on pages)
├── content.css            # Content styles
├── popup.html             # Popup UI
├── popup.js               # Popup logic
├── background.js          # Background service worker
└── icons/                 # Extension icons
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

### Building from Source

1. Clone the repository
2. Make changes to the source files
3. Reload the extension in `chrome://extensions/`
4. Test on a NursingPlex review page

### Adding Icons

The extension currently uses placeholder icons. To add custom icons:

1. Create PNG icons in sizes: 16x16, 48x48, 128x128
2. Place them in the `icons/` folder
3. Update `manifest.json` if needed
4. Reload the extension

## 🚀 Future Enhancements

- [ ] Add keyboard shortcuts
- [ ] Export unlocked questions to PDF
- [ ] Save answers locally
- [ ] Dark mode for popup
- [ ] Multi-language support
- [ ] Firefox permanent installation
- [ ] Safari support

## ⚠️ Disclaimer

This extension is for educational purposes only. It does not bypass server-side restrictions or access content that isn't sent to your browser. The extension only reveals content that is already loaded in the HTML but visually obscured with CSS.

Using this extension may violate NursingPlex's Terms of Service. Use at your own discretion and consider supporting NursingPlex if you find their content valuable.

## 📄 License

This project is for educational purposes only.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check the troubleshooting section
- Review the code (it's all open source!)

## 🎉 Acknowledgments

- Built with vanilla JavaScript
- Styled with modern CSS
- Inspired by the need for accessible educational content

---

**Made with ❤️ for nursing students**

**Version**: 1.0.0  
**Last Updated**: 2024-01-15  
**Status**: ✅ Ready to use
