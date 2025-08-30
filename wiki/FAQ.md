# Frequently Asked Questions (FAQ)

Common questions and answers about the SecurePass Generator browser extension.

## Table of Contents
- [General Questions](#general-questions)
- [Security & Privacy](#security--privacy)
- [Installation & Setup](#installation--setup)
- [Usage & Features](#usage--features)
- [Troubleshooting](#troubleshooting)
- [Browser Compatibility](#browser-compatibility)
- [Development & Contributing](#development--contributing)

## General Questions

### What is SecurePass Generator?

SecurePass Generator is a modern browser extension that creates cryptographically secure passwords with customizable options. It features a dark mode interface, real-time strength analysis, and intelligent auto-fill capabilities for web forms.

### Is SecurePass Generator free to use?

Yes, SecurePass Generator is completely free and open-source. There are no premium features, subscriptions, or hidden costs. The source code is available on GitHub for transparency and community contributions.

### What browsers are supported?

**Fully Supported:**
- Google Chrome (88+)
- Microsoft Edge (88+)
- Brave Browser (1.20+)
- Opera (74+)

**Limited Support:**
- Firefox (requires modifications for full compatibility)

**Not Supported:**
- Safari (different extension architecture required)
- Internet Explorer (deprecated browser)

### How is this different from other password generators?

**Key Differentiators:**
- **Dark mode by default** with light mode option
- **Real-time strength analysis** with visual indicators
- **Intelligent auto-fill** that works with modern web frameworks
- **No data collection** - completely privacy-focused
- **Modern UI/UX** with smooth animations and responsive design
- **Open source** with full transparency

## Security & Privacy

### How secure are the generated passwords?

SecurePass Generator uses the browser's built-in `crypto.getRandomValues()` function, which provides cryptographically secure random numbers. This ensures:

- **True randomness** (not pseudo-random)
- **No predictable patterns**
- **Sufficient entropy** for strong security
- **Industry-standard security** practices

### Are my passwords stored anywhere?

**No passwords are ever stored.** The extension:
- Generates passwords locally in your browser
- Does not save or log any passwords
- Does not transmit passwords over the network
- Only stores your preferences (length, character sets, theme)

### Does the extension collect any data?

**No data collection whatsoever.** The extension:
- Does not use analytics or telemetry
- Does not track user behavior
- Does not send data to external servers
- Does not collect personal information
- Only uses local browser storage for settings

### Can the extension access my other passwords?

No. The extension:
- Only has access to the current active tab when using auto-fill
- Cannot read existing passwords from forms
- Cannot access your browser's saved passwords
- Cannot access other extensions' data
- Operates with minimal permissions

### Is it safe to use the auto-fill feature?

Yes, the auto-fill feature is safe:
- Only fills passwords you explicitly generate
- Works only when you click "Fill into Form"
- Does not automatically fill without user action
- Uses secure DOM manipulation techniques
- Provides visual confirmation of successful fills

## Installation & Setup

### How do I install the extension?

**For Chrome/Edge/Brave:**
1. Download the extension files from GitHub
2. Open `chrome://extensions/` (or equivalent)
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension folder

**Detailed instructions:** See our [Installation Guide](Installation-Guide.md)

### Why isn't the extension available in the Chrome Web Store?

The extension is currently in development and available as an open-source project. Chrome Web Store publication may be considered in the future, but the current focus is on community development and feedback.

### Do I need to create an account?

No account is required. The extension works immediately after installation with no registration, sign-up, or personal information needed.

### How do I update the extension?

Currently, updates require manual installation:
1. Download the latest version from GitHub
2. Replace the old extension files
3. Reload the extension in your browser's extension manager

Automatic updates will be available if published to browser stores.

### Can I use the extension offline?

Yes, once installed, the extension works completely offline. The only online component is the icon loading from Iconify CDN, which has local fallbacks.

## Usage & Features

### What's the recommended password length?

**Recommendations by use case:**
- **16+ characters**: Good for most accounts
- **20+ characters**: Recommended for important accounts
- **24+ characters**: Maximum security for critical systems
- **12-15 characters**: Minimum acceptable length
- **8-11 characters**: Only if required by system limitations

### Should I use all character types?

**Generally yes**, unless restricted by the service:
- **Uppercase + Lowercase + Numbers + Symbols**: Maximum security
- **Letters + Numbers**: Good balance if symbols aren't allowed
- **Letters only**: Only if numbers and symbols are prohibited

### When should I exclude similar characters?

Enable "Exclude similar characters" when:
- You need to type passwords manually frequently
- The service uses fonts where similar characters look identical
- You're creating passwords for others to type
- You want to reduce transcription errors

**Characters excluded**: 0 (zero), O (capital O), l (lowercase L), I (capital i), 1 (one)

### How often should I generate new passwords?

**Best practices:**
- **New account**: Always generate a unique password
- **Existing accounts**: Change every 3-6 months
- **After breach**: Immediately if the service was compromised
- **Suspicious activity**: Change immediately if you suspect compromise
- **Shared computers**: Generate new passwords after use

### Can I modify generated passwords?

**Not recommended.** Modifying generated passwords:
- Reduces security and entropy
- May introduce predictable patterns
- Could weaken the overall password strength

**Better approach**: Adjust the generator settings and create a new password.

### How do I use the strength indicator?

The strength indicator shows four levels:

- **🔴 Weak**: Increase length or add character types
- **🟡 Fair**: Acceptable for low-risk accounts
- **🔵 Good**: Suitable for most accounts
- **🟢 Strong**: Excellent for all accounts

**Factors affecting strength:**
- Password length (longer is better)
- Character variety (more types = stronger)
- Total character set size

## Troubleshooting

### The extension icon doesn't appear in my toolbar

**Solutions:**
1. Look for the puzzle piece icon (extensions menu)
2. Click it and pin SecurePass Generator
3. Check if the extension is enabled in `chrome://extensions/`
4. Restart your browser if necessary

### Password generation isn't working

**Check these items:**
1. At least one character type must be selected
2. Look for JavaScript errors in browser console (F12)
3. Try reloading the extension
4. Restart the browser

### Copy to clipboard doesn't work

**Troubleshooting steps:**
1. Check browser permissions for clipboard access
2. Try selecting the password and using Ctrl+C manually
3. Test clipboard functionality in other applications
4. Update your browser to the latest version

### Auto-fill isn't working on a website

**Common causes and solutions:**
1. **Page not loaded**: Refresh the page after installing the extension
2. **No password fields detected**: The site may use non-standard form elements
3. **JavaScript frameworks**: Some sites require page refresh for detection
4. **Security restrictions**: Some sites block auto-fill for security

**Workaround**: Use copy and paste manually

### Settings aren't being saved

**Possible causes:**
1. Browser storage permissions issue
2. Storage quota exceeded (unlikely)
3. Browser in incognito/private mode
4. Extension permissions not granted

**Solutions:**
1. Check extension permissions
2. Clear browser cache and cookies
3. Reinstall the extension
4. Try in normal (non-incognito) mode

### The extension is slow or unresponsive

**Performance troubleshooting:**
1. Close unnecessary browser tabs
2. Restart the browser
3. Check system memory usage
4. Disable other extensions temporarily
5. Update browser to latest version

## Browser Compatibility

### Why doesn't it work in Firefox?

Firefox uses Manifest V2 while this extension uses Manifest V3. Key differences:
- Different API structure
- Some Chrome-specific APIs not available
- Content script behavior differences

**Status**: Firefox compatibility is being considered for future versions.

### Can I use it in Safari?

Safari uses a completely different extension architecture. The current extension would need to be completely rewritten for Safari compatibility.

**Status**: Safari support is not currently planned.

### Does it work in mobile browsers?

Mobile browser extension support is limited:
- **Chrome Mobile**: No extension support
- **Firefox Mobile**: Limited extension support
- **Safari Mobile**: No extension support for third-party extensions

**Alternative**: Use the extension on desktop and sync passwords through a password manager.

### Are there any known browser-specific issues?

**Chrome**: Generally excellent compatibility
**Edge**: Full compatibility, may show SmartScreen warnings
**Brave**: Works well, but Shield settings may interfere
**Opera**: Good compatibility, VPN may affect some features

## Development & Contributing

### How can I contribute to the project?

**Ways to contribute:**
1. **Report bugs**: Create detailed issue reports on GitHub
2. **Suggest features**: Open feature requests with use cases
3. **Submit code**: Fork the repository and create pull requests
4. **Improve documentation**: Help enhance guides and documentation
5. **Test compatibility**: Test on different browsers and report results

### Is the code open source?

Yes, the complete source code is available on GitHub under the MIT License. This provides:
- Full transparency in security implementation
- Community review and contributions
- Freedom to modify and distribute
- No vendor lock-in

### How do I report a bug?

**When reporting bugs, include:**
1. Browser name and version
2. Operating system details
3. Extension version
4. Steps to reproduce the issue
5. Expected vs. actual behavior
6. Screenshots if helpful
7. Browser console errors (if any)

**Where to report**: Create an issue on the GitHub repository

### Can I request new features?

Yes! Feature requests are welcome. **Please include:**
1. Clear description of the feature
2. Use case or problem it solves
3. How it would work from user perspective
4. Any security or privacy considerations

### How do I set up a development environment?

**Requirements:**
- Modern web browser (Chrome recommended)
- Text editor or IDE
- Git (for version control)
- Basic knowledge of HTML, CSS, JavaScript

**Setup steps:**
1. Clone the repository
2. Load the extension in developer mode
3. Make changes and test
4. Submit pull requests for review

**Detailed guide**: See the [API Documentation](API-Documentation.md)

### What's the project roadmap?

**Short-term (v1.1):**
- Password history (optional, encrypted)
- Bulk generation
- Custom character sets
- Passphrase generation

**Medium-term (v1.2):**
- Multi-language support
- Advanced strength analysis
- Breach checking integration
- Keyboard shortcut customization

**Long-term (v2.0):**
- Cross-browser compatibility
- Mobile support
- Password manager integration
- Enterprise features

---

**Still have questions?** 

- Check our [User Guide](User-Guide.md) for detailed usage instructions
- Review the [Installation Guide](Installation-Guide.md) for setup help
- Browse the [API Documentation](API-Documentation.md) for technical details
- Create an issue on GitHub for specific problems or feature requests