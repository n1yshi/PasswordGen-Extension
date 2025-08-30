+# User Guide

Complete guide to using the SecurePass Generator browser extension effectively and securely.

## Table of Contents
- [Getting Started](#getting-started)
- [Basic Usage](#basic-usage)
- [Advanced Features](#advanced-features)
- [Security Best Practices](#security-best-practices)
- [Customization Options](#customization-options)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Troubleshooting](#troubleshooting)

## Getting Started

### First Launch

After installing the extension, click the SecurePass icon in your browser toolbar to open the password generator interface.

**Default Settings:**
- Password length: 16 characters
- Character sets: All enabled (uppercase, lowercase, numbers, symbols)
- Theme: Dark mode
- Similar characters: Included

### Interface Overview

The extension popup contains several key sections:

1. **Header**: Logo, extension name, and theme toggle
2. **Password Display**: Generated password field with copy button
3. **Strength Indicator**: Visual representation of password strength
4. **Length Control**: Slider to adjust password length (4-50 characters)
5. **Character Options**: Checkboxes for different character types
6. **Action Buttons**: Generate and auto-fill buttons

## Basic Usage

### Generating Your First Password

1. **Open the Extension**
   - Click the SecurePass icon in your browser toolbar
   - The extension popup will open with default settings

2. **Generate a Password**
   - Click "Generate New Password" (or press Enter)
   - A secure password will appear in the display field
   - The strength indicator will update automatically

3. **Copy the Password**
   - Click the copy icon next to the password field
   - A confirmation toast will appear
   - The password is now in your clipboard

4. **Use the Password**
   - Navigate to where you need the password
   - Paste using Ctrl+V (Cmd+V on Mac)
   - The password is ready to use

### Understanding Password Strength

The strength indicator uses a color-coded system:

- **🔴 Weak (Red)**: Short passwords with limited character variety
- **🟡 Fair (Yellow)**: Moderate length with some character variety
- **🔵 Good (Blue)**: Good length with multiple character types
- **🟢 Strong (Green)**: Long passwords with all character types

**Strength Factors:**
- Length (8+, 12+, 16+, 20+ character thresholds)
- Character variety (uppercase, lowercase, numbers, symbols)
- Complexity bonus for using all character types

## Advanced Features

### Auto-Fill Functionality

The extension can automatically detect and fill password fields on websites.

**How to Use Auto-Fill:**

1. **Navigate to a Login Page**
   - Go to any website with password fields
   - The extension will automatically detect password inputs

2. **Generate a Password**
   - Open the SecurePass extension
   - Generate a new password as usual

3. **Fill the Form**
   - Click "Fill into Form" button
   - The extension will automatically find and fill password fields
   - Visual confirmation will appear on successful fill

**Auto-Fill Detection:**
- Detects `input[type="password"]` fields
- Recognizes fields with password-related names, IDs, or placeholders
- Works with most modern web frameworks (React, Vue, Angular)
- Supports both single and multiple password fields (password + confirm)

### Smart Character Set Management

**Exclude Similar Characters:**
When enabled, this option removes characters that look similar:
- Excludes: 0 (zero), O (capital O), l (lowercase L), I (capital i)
- Includes: 1, 2-9, A-N, P-Z, a-k, m-z
- Reduces confusion when typing passwords manually

**Character Set Combinations:**
- **All Sets Enabled**: Maximum security, includes all character types
- **Letters + Numbers**: Good balance of security and compatibility
- **Letters Only**: For systems that don't allow symbols
- **Custom Combinations**: Mix and match based on requirements

### Theme Customization

**Dark Mode (Default):**
- Optimized for low-light environments
- Reduces eye strain during extended use
- Modern, professional appearance
- Better battery life on OLED displays

**Light Mode:**
- Traditional bright interface
- Better visibility in bright environments
- Familiar appearance for some users
- Higher contrast for accessibility

**Switching Themes:**
- Click the sun/moon icon in the top-right corner
- Theme preference is saved automatically
- Changes apply immediately without restart

## Security Best Practices

### Password Generation Guidelines

**Recommended Settings:**
- **Length**: 16+ characters for most accounts, 20+ for critical accounts
- **Character Sets**: Enable all types unless restricted by the service
- **Exclude Similar**: Enable if you need to type passwords manually
- **Generation Frequency**: Generate new passwords for each account

**Security Considerations:**
- Never reuse passwords across multiple accounts
- Use longer passwords for more important accounts
- Generate new passwords regularly (every 3-6 months)
- Store passwords in a secure password manager

### Safe Usage Practices

**Do:**
- ✅ Generate unique passwords for each account
- ✅ Use the maximum length allowed by the service
- ✅ Enable all character types when possible
- ✅ Copy passwords directly from the extension
- ✅ Clear clipboard after use on shared computers

**Don't:**
- ❌ Reuse generated passwords
- ❌ Modify generated passwords manually
- ❌ Use predictable patterns or personal information
- ❌ Share passwords via insecure channels
- ❌ Store passwords in plain text files

### Privacy Protection

**Local Operation:**
- All password generation happens locally in your browser
- No passwords are sent to external servers
- No data collection or analytics
- Settings stored locally using browser storage

**Network Security:**
- Extension works completely offline after installation
- No network requests during normal operation
- Icons loaded from trusted CDN (Iconify)
- No tracking or telemetry

## Customization Options

### Password Length Configuration

**Length Range**: 4-50 characters

**Recommended Lengths by Use Case:**
- **4-8 characters**: Legacy systems with restrictions (not recommended)
- **8-12 characters**: Minimum acceptable length for most accounts
- **12-16 characters**: Good balance of security and usability
- **16-20 characters**: High security for important accounts
- **20+ characters**: Maximum security for critical systems

**Adjusting Length:**
1. Use the length slider in the extension popup
2. The current length is displayed next to the slider
3. Password regenerates automatically when length changes
4. Setting is saved for future use

### Character Set Configuration

**Available Character Sets:**

1. **Uppercase Letters (A-Z)**
   - 26 characters
   - Required by many password policies
   - Increases password entropy

2. **Lowercase Letters (a-z)**
   - 26 characters
   - Most common character type
   - Good base for any password

3. **Numbers (0-9)**
   - 10 characters
   - Often required by password policies
   - Easy to type on all keyboards

4. **Symbols (!@#$%^&*)**
   - 25+ special characters
   - Significantly increases security
   - May not be supported by all systems

**Custom Combinations:**
- Enable/disable any combination of character sets
- At least one character set must be enabled
- Extension ensures generated passwords contain characters from all enabled sets

### Settings Persistence

**Automatic Saving:**
- All settings are saved automatically when changed
- No manual save action required
- Settings persist across browser sessions
- Stored locally using Chrome Storage API

**Synced Settings:**
- Settings sync across devices when signed into Chrome
- Includes length, character sets, and theme preferences
- Privacy-focused: no passwords are synced

## Keyboard Shortcuts

### Primary Shortcuts

| Shortcut | Action | Context |
|----------|--------|---------|
| `Enter` | Generate new password | Extension popup |
| `Ctrl+C` | Copy password | When password field is focused |
| `Tab` | Navigate between controls | Extension popup |
| `Space` | Toggle checkboxes | When checkbox is focused |
| `Arrow Keys` | Adjust length slider | When slider is focused |

### Navigation Shortcuts

**Within Extension Popup:**
- `Tab`: Move to next control
- `Shift+Tab`: Move to previous control
- `Enter`: Activate buttons
- `Space`: Toggle checkboxes and buttons

**Browser Integration:**
- `Alt+Shift+P`: Open extension popup (if configured)
- `Ctrl+Shift+E`: Access extensions menu

### Accessibility Features

**Keyboard Navigation:**
- Full keyboard accessibility
- Logical tab order
- Visual focus indicators
- Screen reader compatibility

**Visual Accessibility:**
- High contrast themes
- Scalable interface
- Clear visual hierarchy
- Color-blind friendly indicators

## Troubleshooting

### Common Issues

#### Password Not Generating
**Symptoms**: Clicking generate button doesn't create a password
**Solutions**:
1. Ensure at least one character set is enabled
2. Check browser console for JavaScript errors
3. Reload the extension
4. Restart the browser

#### Copy Function Not Working
**Symptoms**: Copy button doesn't put password in clipboard
**Solutions**:
1. Check browser permissions for clipboard access
2. Try manual selection and copy (Ctrl+C)
3. Verify clipboard functionality in other applications
4. Update browser to latest version

#### Auto-Fill Not Working
**Symptoms**: "Fill into Form" doesn't populate password fields
**Solutions**:
1. Refresh the webpage after installing extension
2. Check if password fields are properly detected
3. Try manual copy and paste as alternative
4. Verify extension has permission to access the website

#### Settings Not Saving
**Symptoms**: Preferences reset when reopening extension
**Solutions**:
1. Check browser storage permissions
2. Clear browser cache and cookies
3. Reinstall the extension
4. Check for browser storage quota issues

### Performance Issues

#### Slow Password Generation
**Causes**:
- Very long passwords (40+ characters)
- Browser performance issues
- System resource limitations

**Solutions**:
- Reduce password length temporarily
- Close unnecessary browser tabs
- Restart browser
- Check system memory usage

#### Extension Popup Slow to Open
**Causes**:
- Browser performance issues
- Extension conflicts
- System resource limitations

**Solutions**:
- Disable other extensions temporarily
- Clear browser cache
- Restart browser
- Check for browser updates

### Browser-Specific Issues

#### Chrome
- Generally best compatibility
- Full feature support
- Regular updates supported

#### Edge
- Excellent compatibility
- All features supported
- Enterprise policy considerations

#### Brave
- Good compatibility
- Shield settings may interfere
- Privacy settings may block features

#### Firefox
- Limited compatibility
- Manifest V3 not fully supported
- Some features may not work

### Getting Help

**Self-Help Resources:**
1. Check this user guide thoroughly
2. Review the [FAQ](FAQ.md)
3. Search existing GitHub issues
4. Try basic troubleshooting steps

**Reporting Issues:**
1. Gather system information (browser, OS, extension version)
2. Document steps to reproduce the issue
3. Include screenshots if helpful
4. Create a detailed issue report on GitHub

**Community Support:**
- GitHub Discussions for general questions
- Issue tracker for bugs and feature requests
- Community wiki for additional tips and tricks

---

**Pro Tip**: For maximum security, use the extension to generate unique, long passwords for each of your accounts, and store them in a reputable password manager for easy access across devices.