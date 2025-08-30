# Installation Guide

This guide provides detailed instructions for installing the SecurePass Generator browser extension across different browsers and platforms.

## Table of Contents
- [System Requirements](#system-requirements)
- [Chrome Installation](#chrome-installation)
- [Edge Installation](#edge-installation)
- [Brave Installation](#brave-installation)
- [Opera Installation](#opera-installation)
- [Firefox Installation](#firefox-installation)
- [Troubleshooting](#troubleshooting)
- [Verification](#verification)

## System Requirements

### Minimum Requirements
- **Operating System**: Windows 10+, macOS 10.14+, Linux (Ubuntu 18.04+)
- **Browser Version**: Chrome 88+, Edge 88+, Brave 1.20+, Opera 74+
- **RAM**: 4GB minimum (8GB recommended)
- **Storage**: 50MB free space
- **Internet Connection**: Required for initial download only

### Recommended Specifications
- **Operating System**: Latest stable version
- **Browser**: Latest stable version
- **RAM**: 8GB or more
- **Storage**: 1GB free space for optimal performance

## Chrome Installation

### Method 1: Developer Mode (Recommended)

1. **Download the Extension**
   ```bash
   git clone https://github.com/your-username/password-generator-extension.git
   cd password-generator-extension
   ```

2. **Open Chrome Extensions Page**
   - Type `chrome://extensions/` in the address bar
   - Press Enter to navigate to the extensions page

3. **Enable Developer Mode**
   - Look for the "Developer mode" toggle in the top-right corner
   - Click to enable it (the toggle should turn blue)

4. **Load the Extension**
   - Click "Load unpacked" button (appears after enabling developer mode)
   - Navigate to the `password-generator-extension` folder
   - Select the folder and click "Select Folder"

5. **Verify Installation**
   - The SecurePass Generator should appear in your extensions list
   - Look for the lock icon in your browser toolbar
   - If not visible, click the puzzle piece icon and pin the extension

### Method 2: Chrome Web Store (Future Release)
*This method will be available once the extension is published to the Chrome Web Store.*

1. Visit the Chrome Web Store
2. Search for "SecurePass Generator"
3. Click "Add to Chrome"
4. Confirm installation in the popup dialog

## Edge Installation

### Chromium-based Edge (Recommended)

1. **Download the Extension**
   - Follow the same download steps as Chrome installation

2. **Open Edge Extensions Page**
   - Type `edge://extensions/` in the address bar
   - Press Enter to navigate

3. **Enable Developer Mode**
   - Toggle "Developer mode" in the left sidebar
   - The toggle should show as "On"

4. **Load Unpacked Extension**
   - Click "Load unpacked" button
   - Select the `password-generator-extension` folder
   - Click "Select Folder"

5. **Pin to Toolbar**
   - Click the three dots menu (⋯) in the toolbar
   - Select "Extensions"
   - Find SecurePass Generator and click the eye icon to show in toolbar

### Legacy Edge
*Legacy Edge is no longer supported. Please upgrade to Chromium-based Edge.*

## Brave Installation

1. **Download the Extension**
   - Use the same download process as Chrome

2. **Access Brave Extensions**
   - Type `brave://extensions/` in the address bar
   - Navigate to the extensions page

3. **Enable Developer Mode**
   - Click the "Developer mode" toggle in the top-right
   - Ensure it's enabled (highlighted)

4. **Install Extension**
   - Click "Load unpacked"
   - Choose the extension folder
   - Confirm selection

5. **Configure Brave Settings**
   - Brave may show additional security warnings
   - Click "Allow" when prompted about extension permissions
   - The extension should appear in your toolbar

## Opera Installation

1. **Download Extension Files**
   - Clone or download the extension as with other browsers

2. **Open Opera Extensions**
   - Type `opera://extensions/` in the address bar
   - Or go to Menu → Extensions → Extensions

3. **Enable Developer Mode**
   - Click "Developer mode" in the top-right corner
   - Toggle should show as enabled

4. **Load Extension**
   - Click "Load unpacked"
   - Navigate to and select the extension folder
   - Confirm the selection

5. **Access Extension**
   - Look for the SecurePass icon in the toolbar
   - If not visible, click the extensions button and pin it

## Firefox Installation

*Note: Firefox requires Manifest V2, which may need code modifications.*

### Current Limitations
- The extension uses Manifest V3, which is not fully supported in Firefox
- Some features may not work as expected
- Auto-fill functionality may be limited

### Installation Steps (Experimental)

1. **Download Extension**
   - Get the extension files as described above

2. **Open Firefox Add-ons Page**
   - Type `about:debugging` in the address bar
   - Click "This Firefox" in the left sidebar

3. **Load Temporary Add-on**
   - Click "Load Temporary Add-on"
   - Navigate to the extension folder
   - Select the `manifest.json` file

4. **Temporary Installation**
   - The extension will be installed temporarily
   - It will be removed when Firefox is restarted
   - For permanent installation, the extension needs to be signed by Mozilla

### Firefox-Specific Issues
- Manifest V3 features may not work
- Some Chrome APIs are not available
- Extension may need modifications for full compatibility

## Troubleshooting

### Common Installation Issues

#### Extension Not Loading
**Problem**: Extension doesn't appear after installation
**Solutions**:
1. Verify developer mode is enabled
2. Check that all files are present in the folder
3. Look for error messages in the extensions page
4. Try reloading the extension

#### Permission Errors
**Problem**: Browser shows permission warnings
**Solutions**:
1. Review the permissions requested in `manifest.json`
2. Click "Allow" for necessary permissions
3. Check browser security settings
4. Ensure the extension source is trusted

#### Icon Not Visible
**Problem**: Extension icon doesn't appear in toolbar
**Solutions**:
1. Click the extensions/puzzle piece icon in toolbar
2. Pin the SecurePass Generator extension
3. Check if the extension is enabled
4. Restart the browser if necessary

#### Loading Errors
**Problem**: Browser shows errors when loading extension
**Solutions**:
1. Check browser console for specific error messages
2. Verify all files are present and not corrupted
3. Ensure proper file permissions
4. Try downloading the extension again

### Browser-Specific Issues

#### Chrome Issues
- **Manifest V3 Warnings**: Normal for development mode
- **Security Warnings**: Expected for unpacked extensions
- **Update Notifications**: Disable automatic updates for development

#### Edge Issues
- **SmartScreen Warnings**: May appear for unknown extensions
- **Enterprise Policies**: May block extension installation
- **Sync Issues**: Extension won't sync across devices in developer mode

#### Brave Issues
- **Shield Blocking**: May interfere with extension functionality
- **Privacy Settings**: Could block certain features
- **Ad Blocker Conflicts**: May affect extension behavior

#### Opera Issues
- **VPN Interference**: Built-in VPN may affect functionality
- **Sidebar Integration**: Extension may not appear in sidebar
- **Workspace Compatibility**: May not work across all workspaces

### Performance Issues

#### Slow Loading
**Causes**:
- Large extension size
- Slow system performance
- Browser resource limitations

**Solutions**:
- Close unnecessary browser tabs
- Restart the browser
- Check system resources
- Update browser to latest version

#### Memory Usage
**Monitoring**:
- Use browser's task manager (Shift+Esc in Chrome)
- Check extension memory usage
- Monitor for memory leaks

**Optimization**:
- Close extension popup when not in use
- Restart browser periodically
- Report persistent memory issues

## Verification

### Installation Verification Checklist

1. **Extension Appears in List**
   - [ ] SecurePass Generator visible in extensions page
   - [ ] Extension shows as "Enabled"
   - [ ] No error messages displayed

2. **Toolbar Integration**
   - [ ] Extension icon visible in browser toolbar
   - [ ] Icon is clickable and responsive
   - [ ] Popup opens when clicked

3. **Basic Functionality**
   - [ ] Password generation works
   - [ ] Copy to clipboard functions
   - [ ] Settings are saved and restored
   - [ ] Theme switching works

4. **Advanced Features**
   - [ ] Auto-fill detects password fields
   - [ ] Strength indicator updates correctly
   - [ ] All character set options work
   - [ ] Keyboard shortcuts function

### Testing Procedure

1. **Generate Test Password**
   - Open the extension popup
   - Click "Generate New Password"
   - Verify a password appears
   - Check that strength indicator updates

2. **Test Copy Functionality**
   - Generate a password
   - Click the copy button
   - Paste in a text editor to verify
   - Confirm toast notification appears

3. **Test Auto-fill**
   - Navigate to a login page
   - Generate a password
   - Click "Fill into Form"
   - Verify password appears in the field

4. **Test Settings Persistence**
   - Change password length
   - Toggle character set options
   - Close and reopen extension
   - Verify settings are remembered

### Reporting Installation Issues

If you encounter issues during installation:

1. **Gather Information**
   - Browser name and version
   - Operating system details
   - Error messages (screenshots helpful)
   - Steps that led to the issue

2. **Check Known Issues**
   - Review this troubleshooting section
   - Check the project's issue tracker
   - Search for similar problems

3. **Report the Issue**
   - Create a detailed issue report
   - Include system information
   - Provide steps to reproduce
   - Attach relevant screenshots

## Next Steps

After successful installation:

1. **Read the User Guide**
   - Learn about all available features
   - Understand security best practices
   - Explore advanced options

2. **Configure Settings**
   - Set preferred password length
   - Choose character sets
   - Select theme preference

3. **Test on Different Sites**
   - Try auto-fill on various websites
   - Test with different form types
   - Verify compatibility

4. **Stay Updated**
   - Watch for extension updates
   - Follow security best practices
   - Report any issues encountered

---

**Need Help?** If you're still having trouble with installation, please check our [FAQ](FAQ.md) or [create an issue](https://github.com/your-username/password-generator-extension/issues) on GitHub.