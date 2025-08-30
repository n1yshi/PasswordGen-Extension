# API Documentation

Technical documentation for the SecurePass Generator extension's internal APIs, methods, and architecture.

## Table of Contents
- [Architecture Overview](#architecture-overview)
- [Core Classes](#core-classes)
- [Password Generation API](#password-generation-api)
- [Storage API](#storage-api)
- [Content Script API](#content-script-api)
- [Event System](#event-system)
- [Extension APIs](#extension-apis)
- [Security Implementation](#security-implementation)

## Architecture Overview

### Component Structure

```
SecurePass Generator Extension
├── Popup Interface (popup.html, popup.js, styles.css)
├── Content Script (content.js)
├── Background Script (none - Manifest V3)
├── Storage Layer (Chrome Storage API)
└── Security Layer (Web Crypto API)
```

### Data Flow

```
User Input → UI Components → PasswordGenerator Class → Crypto API → Generated Password
                ↓
Settings → Chrome Storage API → Persistent Configuration
                ↓
Auto-fill → Content Script → DOM Manipulation → Form Filling
```

### Technology Stack

- **Frontend**: HTML5, CSS3 (Custom Properties), Vanilla JavaScript (ES6+)
- **Extension APIs**: Chrome Extension Manifest V3
- **Cryptography**: Web Crypto API (`crypto.getRandomValues()`)
- **Storage**: Chrome Storage Sync API
- **Icons**: Iconify API (online SVG icons)

## Core Classes

### PasswordGenerator Class

The main class that handles all password generation and UI interactions.

#### Constructor

```javascript
class PasswordGenerator {
    constructor()
```

**Description**: Initializes the password generator, sets up DOM elements, loads settings, binds events, and generates an initial password.

**Usage**:
```javascript
const generator = new PasswordGenerator();
```

#### Properties

```javascript
this.elements = {
    passwordOutput: HTMLInputElement,
    copyBtn: HTMLButtonElement,
    generateBtn: HTMLButtonElement,
    fillBtn: HTMLButtonElement,
    lengthSlider: HTMLInputElement,
    lengthValue: HTMLSpanElement,
    strengthFill: HTMLDivElement,
    strengthText: HTMLSpanElement,
    themeToggle: HTMLButtonElement,
    themeIcon: HTMLImageElement,
    toast: HTMLDivElement,
    toastMessage: HTMLSpanElement,
    uppercase: HTMLInputElement,
    lowercase: HTMLInputElement,
    numbers: HTMLInputElement,
    symbols: HTMLInputElement,
    excludeSimilar: HTMLInputElement
}
```

#### Methods

##### initializeElements()

```javascript
initializeElements(): void
```

**Description**: Caches DOM element references for efficient access throughout the class lifecycle.

**Implementation**:
```javascript
initializeElements() {
    this.elements = {
        passwordOutput: document.getElementById('passwordOutput'),
        copyBtn: document.getElementById('copyBtn'),
        // ... other elements
    };
}
```

##### bindEvents()

```javascript
bindEvents(): void
```

**Description**: Attaches event listeners to UI elements for user interactions.

**Events Bound**:
- Button clicks (generate, copy, fill, theme toggle)
- Checkbox changes (character set options)
- Slider input (length adjustment)
- Keyboard events (Enter key for generation)

##### loadSettings()

```javascript
loadSettings(): void
```

**Description**: Loads user preferences from Chrome storage and applies them to the UI.

**Default Settings**:
```javascript
{
    theme: 'dark',
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: false
}
```

##### saveSettings()

```javascript
saveSettings(): void
```

**Description**: Saves current UI state to Chrome storage for persistence across sessions.

**Storage Format**:
```javascript
{
    theme: string,           // 'dark' | 'light'
    length: number,          // 4-50
    uppercase: boolean,
    lowercase: boolean,
    numbers: boolean,
    symbols: boolean,
    excludeSimilar: boolean
}
```

## Password Generation API

### Core Generation Method

#### generatePassword()

```javascript
generatePassword(): void
```

**Description**: Main method that orchestrates password generation with visual feedback.

**Process Flow**:
1. Add generating animation to button
2. Get current password options
3. Generate password using crypto API
4. Update UI with new password
5. Update strength indicator
6. Remove generating animation

**Implementation**:
```javascript
generatePassword() {
    this.elements.generateBtn.classList.add('generating');
    
    setTimeout(() => {
        const options = this.getPasswordOptions();
        const password = this.createPassword(options);
        
        this.elements.passwordOutput.value = password;
        this.updateStrengthIndicator(password);
        this.elements.generateBtn.classList.remove('generating');
    }, 200);
}
```

#### getPasswordOptions()

```javascript
getPasswordOptions(): PasswordOptions
```

**Returns**: Configuration object for password generation

**Type Definition**:
```typescript
interface PasswordOptions {
    length: number;
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
    excludeSimilar: boolean;
}
```

#### createPassword()

```javascript
createPassword(options: PasswordOptions): string
```

**Parameters**:
- `options`: Configuration object specifying password requirements

**Returns**: Generated password string

**Algorithm**:
1. Build character set based on options
2. Use `crypto.getRandomValues()` for secure randomness
3. Generate password from character set
4. Ensure password meets all requirements
5. Return final password

**Character Sets**:
```javascript
const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    uppercaseExcluded: 'ABCDEFGHJKLMNPQRSTUVWXYZ', // No I, O
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    lowercaseExcluded: 'abcdefghjkmnpqrstuvwxyz',   // No i, l, o
    numbers: '0123456789',
    numbersExcluded: '23456789',                     // No 0, 1
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};
```

#### replaceRandomChar()

```javascript
replaceRandomChar(password: string, charset: string): string
```

**Description**: Utility method to ensure password contains characters from required sets.

**Parameters**:
- `password`: Current password string
- `charset`: Character set to select replacement from

**Returns**: Modified password with guaranteed character type inclusion

### Strength Analysis API

#### calculateStrength()

```javascript
calculateStrength(password: string): number
```

**Description**: Analyzes password strength and returns a score from 0-3.

**Parameters**:
- `password`: Password string to analyze

**Returns**: Strength level (0=Weak, 1=Fair, 2=Good, 3=Strong)

**Scoring Algorithm**:
```javascript
let score = 0;

// Length scoring
if (password.length >= 8) score += 1;
if (password.length >= 12) score += 1;
if (password.length >= 16) score += 1;

// Character variety scoring
if (/[a-z]/.test(password)) score += 1;
if (/[A-Z]/.test(password)) score += 1;
if (/[0-9]/.test(password)) score += 1;
if (/[^A-Za-z0-9]/.test(password)) score += 1;

// Complexity bonus
if (password.length >= 20) score += 1;
if (/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(password)) score += 1;

// Convert to 0-3 scale
if (score <= 3) return 0; // Weak
if (score <= 5) return 1; // Fair
if (score <= 7) return 2; // Good
return 3; // Strong
```

#### updateStrengthIndicator()

```javascript
updateStrengthIndicator(password: string): void
```

**Description**: Updates the visual strength indicator based on password analysis.

**Parameters**:
- `password`: Password to analyze and display strength for

**Visual Updates**:
- Progress bar width and color
- Strength text label
- CSS class application for styling

## Storage API

### Chrome Storage Integration

#### Settings Management

```javascript
// Load settings
chrome.storage.sync.get(defaults, callback);

// Save settings
chrome.storage.sync.set(settings);
```

**Storage Quota**: 100KB total, 8KB per item (Chrome Storage Sync limits)

**Data Structure**:
```javascript
{
    "securepass_settings": {
        "theme": "dark",
        "length": 16,
        "uppercase": true,
        "lowercase": true,
        "numbers": true,
        "symbols": true,
        "excludeSimilar": false,
        "version": "1.0.0"
    }
}
```

#### Error Handling

```javascript
chrome.storage.sync.set(settings, () => {
    if (chrome.runtime.lastError) {
        console.error('Storage error:', chrome.runtime.lastError);
        // Fallback to local storage
        localStorage.setItem('securepass_settings', JSON.stringify(settings));
    }
});
```

## Content Script API

### Auto-fill Functionality

#### Message Handling

```javascript
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'fillPassword') {
        const success = fillPasswordIntoForm(request.password);
        sendResponse({ success: success });
    }
});
```

**Message Format**:
```typescript
interface FillPasswordMessage {
    action: 'fillPassword';
    password: string;
}

interface FillPasswordResponse {
    success: boolean;
}
```

#### Form Detection

```javascript
fillPasswordIntoForm(password: string): boolean
```

**Detection Strategy**:
1. Primary selectors: `input[type="password"]`
2. Name-based: `input[name*="password" i]`
3. ID-based: `input[id*="password" i]`
4. Placeholder-based: `input[placeholder*="password" i]`
5. Fallback: Attribute analysis for password-related terms

**Selector Priority**:
```javascript
const selectors = [
    'input[type="password"]',
    'input[name*="password" i]',
    'input[id*="password" i]',
    'input[placeholder*="password" i]',
    'input[data-testid*="password" i]',
    'input[aria-label*="password" i]'
];
```

#### Field Filling

```javascript
fillField(field: HTMLInputElement, value: string): void
```

**Process**:
1. Focus the target field
2. Clear existing value
3. Set new value
4. Trigger framework events (input, change, keyup, paste)
5. Handle React/Vue specific value setting
6. Provide visual feedback

**Framework Compatibility**:
```javascript
// React compatibility
const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    'value'
).set;

if (nativeInputValueSetter) {
    nativeInputValueSetter.call(field, value);
    const inputEvent = new Event('input', { bubbles: true });
    field.dispatchEvent(inputEvent);
}
```

### Visual Indicators

#### Password Field Detection

```javascript
addPasswordFieldIndicators(): void
```

**Description**: Adds visual indicators to detected password fields on the page.

**Indicator Styling**:
```css
.securepass-indicator {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 16px;
    height: 16px;
    background: #60a5fa;
    border-radius: 50%;
    font-size: 10px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    pointer-events: none;
    opacity: 0.7;
}
```

#### Dynamic Detection

```javascript
const observer = new MutationObserver((mutations) => {
    // Watch for dynamically added password fields
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
```

## Event System

### UI Events

#### Button Events

```javascript
// Generate button
this.elements.generateBtn.addEventListener('click', () => this.generatePassword());

// Copy button
this.elements.copyBtn.addEventListener('click', () => this.copyPassword());

// Fill button
this.elements.fillBtn.addEventListener('click', () => this.fillPassword());

// Theme toggle
this.elements.themeToggle.addEventListener('click', () => this.toggleTheme());
```

#### Input Events

```javascript
// Length slider
this.elements.lengthSlider.addEventListener('input', () => this.updateLength());

// Character set checkboxes
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        this.saveSettings();
        this.generatePassword();
    });
});
```

#### Keyboard Events

```javascript
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        this.generatePassword();
    }
});
```

### Extension Events

#### Storage Events

```javascript
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync' && changes.securepass_settings) {
        // Handle settings changes from other instances
        this.loadSettings();
    }
});
```

#### Tab Events

```javascript
chrome.tabs.onActivated.addListener((activeInfo) => {
    // Handle tab switching if needed
});
```

## Extension APIs

### Chrome Extension APIs Used

#### Permissions

```json
{
    "permissions": [
        "activeTab",
        "storage"
    ]
}
```

**Permission Usage**:
- `activeTab`: Required for auto-fill functionality
- `storage`: Required for settings persistence

#### Action API

```json
{
    "action": {
        "default_popup": "popup.html",
        "default_title": "SecurePass Generator"
    }
}
```

#### Content Scripts

```json
{
    "content_scripts": [
        {
            "matches": ["<all_urls>"],
            "js": ["content.js"]
        }
    ]
}
```

### Web APIs Used

#### Crypto API

```javascript
// Secure random number generation
const array = new Uint8Array(length);
crypto.getRandomValues(array);
```

**Security**: Uses cryptographically secure random number generator provided by the browser.

#### Clipboard API

```javascript
// Modern clipboard access
await navigator.clipboard.writeText(password);

// Fallback for older browsers
document.execCommand('copy');
```

#### Storage API

```javascript
// Chrome Storage Sync
chrome.storage.sync.get(keys, callback);
chrome.storage.sync.set(items, callback);
```

## Security Implementation

### Cryptographic Security

#### Random Number Generation

```javascript
// Secure implementation
const array = new Uint8Array(length);
crypto.getRandomValues(array);

// Character selection
for (let i = 0; i < length; i++) {
    password += charset[array[i] % charset.length];
}
```

**Security Properties**:
- Uses browser's cryptographically secure random number generator
- No predictable patterns or seeds
- Uniform distribution across character set
- Sufficient entropy for password security

#### Entropy Calculation

```javascript
// Entropy = log2(charset_size^password_length)
const entropy = Math.log2(Math.pow(charsetSize, passwordLength));
```

**Minimum Entropy Targets**:
- 40 bits: Minimum acceptable
- 60 bits: Good security
- 80 bits: Strong security
- 100+ bits: Excellent security

### Privacy Protection

#### Data Handling

**Local Processing**:
- All password generation occurs locally
- No network requests during generation
- No password storage or logging
- Settings stored locally only

**No Data Collection**:
- No analytics or telemetry
- No user tracking
- No password transmission
- No external dependencies for core functionality

#### Content Security Policy

```json
{
    "content_security_policy": {
        "extension_pages": "script-src 'self'; object-src 'self'; img-src 'self' https://api.iconify.design;"
    }
}
```

**Security Restrictions**:
- No inline scripts allowed
- No external script loading
- Limited image sources (icons only)
- No eval() or similar dangerous functions

### Input Validation

#### Length Validation

```javascript
const length = Math.max(4, Math.min(50, parseInt(value)));
```

#### Character Set Validation

```javascript
if (!charset) {
    this.showToast('At least one option must be selected!', 'error');
    return '';
}
```

#### DOM Sanitization

```javascript
// Safe text content setting
element.textContent = userInput; // Not innerHTML

// Safe attribute setting
element.setAttribute('title', sanitizedValue);
```

---

**Note**: This API documentation covers the internal implementation details. For usage instructions, see the [User Guide](User-Guide.md). For installation help, see the [Installation Guide](Installation-Guide.md).