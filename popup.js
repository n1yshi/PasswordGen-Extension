class PasswordGenerator {
    constructor() {
        this.initializeElements();
        this.loadSettings();
        this.bindEvents();
        this.generatePassword();
    }

    initializeElements() {
        this.elements = {
            passwordOutput: document.getElementById('passwordOutput'),
            copyBtn: document.getElementById('copyBtn'),
            generateBtn: document.getElementById('generateBtn'),
            fillBtn: document.getElementById('fillBtn'),
            lengthSlider: document.getElementById('lengthSlider'),
            lengthValue: document.getElementById('lengthValue'),
            strengthFill: document.getElementById('strengthFill'),
            strengthText: document.getElementById('strengthText'),
            themeToggle: document.getElementById('themeToggle'),
            themeIcon: document.getElementById('themeIcon'),
            toast: document.getElementById('toast'),
            toastMessage: document.getElementById('toastMessage'),
            uppercase: document.getElementById('uppercase'),
            lowercase: document.getElementById('lowercase'),
            numbers: document.getElementById('numbers'),
            symbols: document.getElementById('symbols'),
            excludeSimilar: document.getElementById('excludeSimilar'),
            crackTime: document.getElementById('crackTime'),
            onlineTime: document.getElementById('onlineTime'),
            offlineTime: document.getElementById('offlineTime'),
            crackTimeSection: document.querySelector('.crack-time-section')
        };
    }

    bindEvents() {
        this.elements.generateBtn.addEventListener('click', () => this.generatePassword());
        this.elements.copyBtn.addEventListener('click', () => this.copyPassword());
        this.elements.fillBtn.addEventListener('click', () => this.fillPassword());
        this.elements.lengthSlider.addEventListener('input', () => this.updateLength());
        this.elements.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Auto-generate on option change
        const checkboxes = [
            this.elements.uppercase,
            this.elements.lowercase,
            this.elements.numbers,
            this.elements.symbols,
            this.elements.excludeSimilar
        ];
        
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.saveSettings();
                this.generatePassword();
            });
        });

        // Generate on Enter key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.generatePassword();
            }
        });
    }

    loadSettings() {
        chrome.storage.sync.get({
            theme: 'dark',
            length: 16,
            uppercase: true,
            lowercase: true,
            numbers: true,
            symbols: true,
            excludeSimilar: false
        }, (settings) => {
            document.body.setAttribute('data-theme', settings.theme);
            this.updateThemeIcon(settings.theme);
            this.elements.lengthSlider.value = settings.length;
            this.elements.lengthValue.textContent = settings.length;
            this.elements.uppercase.checked = settings.uppercase;
            this.elements.lowercase.checked = settings.lowercase;
            this.elements.numbers.checked = settings.numbers;
            this.elements.symbols.checked = settings.symbols;
            this.elements.excludeSimilar.checked = settings.excludeSimilar;
        });
    }

    saveSettings() {
        const settings = {
            theme: document.body.getAttribute('data-theme'),
            length: parseInt(this.elements.lengthSlider.value),
            uppercase: this.elements.uppercase.checked,
            lowercase: this.elements.lowercase.checked,
            numbers: this.elements.numbers.checked,
            symbols: this.elements.symbols.checked,
            excludeSimilar: this.elements.excludeSimilar.checked
        };
        
        chrome.storage.sync.set(settings);
    }

    updateLength() {
        const length = this.elements.lengthSlider.value;
        this.elements.lengthValue.textContent = length;
        this.saveSettings();
        this.generatePassword();
    }

    toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        this.updateThemeIcon(newTheme);
        this.saveSettings();
    }

    updateThemeIcon(theme) {
        const iconUrl = theme === 'dark' 
            ? 'https://api.iconify.design/material-symbols:light-mode.svg?color=%2394a3b8&width=20&height=20'
            : 'https://api.iconify.design/material-symbols:dark-mode.svg?color=%2364748b&width=20&height=20';
        this.elements.themeIcon.src = iconUrl;
    }

    generatePassword() {
        this.elements.generateBtn.classList.add('generating');
        this.elements.crackTimeSection.classList.add('calculating');
        
        setTimeout(() => {
            const options = this.getPasswordOptions();
            const password = this.createPassword(options);
            
            this.elements.passwordOutput.value = password;
            this.elements.passwordOutput.classList.add('updated');
            
            this.updateStrengthIndicator(password);
            this.updateCrackTimeEstimate(password, options);
            
            this.elements.generateBtn.classList.remove('generating');
            this.elements.crackTimeSection.classList.remove('calculating');
            
            // Remove animation class after animation completes
            setTimeout(() => {
                this.elements.passwordOutput.classList.remove('updated');
            }, 500);
        }, 300);
    }

    getPasswordOptions() {
        return {
            length: parseInt(this.elements.lengthSlider.value),
            uppercase: this.elements.uppercase.checked,
            lowercase: this.elements.lowercase.checked,
            numbers: this.elements.numbers.checked,
            symbols: this.elements.symbols.checked,
            excludeSimilar: this.elements.excludeSimilar.checked
        };
    }

    createPassword(options) {
        let charset = '';
        
        if (options.uppercase) {
            charset += options.excludeSimilar ? 'ABCDEFGHJKLMNPQRSTUVWXYZ' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        
        if (options.lowercase) {
            charset += options.excludeSimilar ? 'abcdefghjkmnpqrstuvwxyz' : 'abcdefghijklmnopqrstuvwxyz';
        }
        
        if (options.numbers) {
            charset += options.excludeSimilar ? '23456789' : '0123456789';
        }
        
        if (options.symbols) {
            charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        }

        if (!charset) {
            this.showToast('At least one option must be selected!', 'error');
            return '';
        }

        let password = '';
        const array = new Uint8Array(options.length);
        crypto.getRandomValues(array);
        
        for (let i = 0; i < options.length; i++) {
            password += charset[array[i] % charset.length];
        }

        // Ensure password meets requirements
        if (options.uppercase && !/[A-Z]/.test(password)) {
            const upperChars = options.excludeSimilar ? 'ABCDEFGHJKLMNPQRSTUVWXYZ' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            password = this.replaceRandomChar(password, upperChars);
        }
        
        if (options.lowercase && !/[a-z]/.test(password)) {
            const lowerChars = options.excludeSimilar ? 'abcdefghjkmnpqrstuvwxyz' : 'abcdefghijklmnopqrstuvwxyz';
            password = this.replaceRandomChar(password, lowerChars);
        }
        
        if (options.numbers && !/[0-9]/.test(password)) {
            const numberChars = options.excludeSimilar ? '23456789' : '0123456789';
            password = this.replaceRandomChar(password, numberChars);
        }
        
        if (options.symbols && !/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) {
            const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
            password = this.replaceRandomChar(password, symbolChars);
        }

        return password;
    }

    replaceRandomChar(password, charset) {
        const randomIndex = Math.floor(Math.random() * password.length);
        const randomChar = charset[Math.floor(Math.random() * charset.length)];
        return password.substring(0, randomIndex) + randomChar + password.substring(randomIndex + 1);
    }

    updateStrengthIndicator(password) {
        const strength = this.calculateStrength(password);
        const strengthClasses = ['strength-weak', 'strength-fair', 'strength-good', 'strength-strong'];
        const strengthTexts = ['Weak', 'Fair', 'Good', 'Strong'];
        
        // Remove all strength classes
        this.elements.strengthFill.parentElement.className = 'strength-bar';
        
        // Add current strength class with animation
        setTimeout(() => {
            this.elements.strengthFill.parentElement.classList.add(strengthClasses[strength]);
            this.elements.strengthText.textContent = strengthTexts[strength];
        }, 100);
    }

    calculateStrength(password) {
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
        
        // Convert score to strength level (0-3)
        if (score <= 3) return 0; // Weak
        if (score <= 5) return 1; // Fair
        if (score <= 7) return 2; // Good
        return 3; // Strong
    }

    updateCrackTimeEstimate(password, options) {
        const charsetSize = this.calculateCharsetSize(options);
        const combinations = Math.pow(charsetSize, password.length);
        
        // Average time to crack (half of all combinations)
        const avgCombinations = combinations / 2;
        
        // Attack speeds (attempts per second)
        const onlineAttackSpeed = 1000; // 1,000 attempts/sec (online brute force)
        const offlineAttackSpeed = 1000000000; // 1 billion attempts/sec (offline with GPU)
        
        // Calculate times in seconds
        const onlineSeconds = avgCombinations / onlineAttackSpeed;
        const offlineSeconds = avgCombinations / offlineAttackSpeed;
        
        // Format and display times
        const mainTime = this.formatTime(offlineSeconds);
        const onlineTime = this.formatTime(onlineSeconds);
        const offlineTime = this.formatTime(offlineSeconds);
        
        // Animate the updates
        setTimeout(() => {
            this.elements.crackTime.textContent = mainTime;
            this.elements.onlineTime.textContent = onlineTime;
            this.elements.offlineTime.textContent = offlineTime;
            
            // Add animation classes
            document.querySelectorAll('.scenario').forEach((scenario, index) => {
                setTimeout(() => {
                    scenario.classList.add('updated');
                    setTimeout(() => scenario.classList.remove('updated'), 400);
                }, index * 100);
            });
        }, 200);
    }

    calculateCharsetSize(options) {
        let size = 0;
        
        if (options.uppercase) {
            size += options.excludeSimilar ? 23 : 26; // A-Z
        }
        
        if (options.lowercase) {
            size += options.excludeSimilar ? 23 : 26; // a-z
        }
        
        if (options.numbers) {
            size += options.excludeSimilar ? 8 : 10; // 0-9
        }
        
        if (options.symbols) {
            size += 25; // Special characters
        }
        
        return size;
    }

    formatTime(seconds) {
        if (seconds < 1) {
            return 'Instantly';
        }
        
        const units = [
            { name: 'millennium', value: 31557600000 },
            { name: 'century', value: 3155760000 },
            { name: 'decade', value: 315576000 },
            { name: 'year', value: 31557600 },
            { name: 'month', value: 2629800 },
            { name: 'week', value: 604800 },
            { name: 'day', value: 86400 },
            { name: 'hour', value: 3600 },
            { name: 'minute', value: 60 },
            { name: 'second', value: 1 }
        ];
        
        for (const unit of units) {
            const value = Math.floor(seconds / unit.value);
            if (value >= 1) {
                if (value >= 1000000000000) {
                    return `${(value / 1000000000000).toFixed(1)} trillion ${unit.name}s`;
                } else if (value >= 1000000000) {
                    return `${(value / 1000000000).toFixed(1)} billion ${unit.name}s`;
                } else if (value >= 1000000) {
                    return `${(value / 1000000).toFixed(1)} million ${unit.name}s`;
                } else if (value >= 1000) {
                    return `${(value / 1000).toFixed(1)}k ${unit.name}s`;
                } else {
                    return `${value} ${unit.name}${value !== 1 ? 's' : ''}`;
                }
            }
        }
        
        return 'Less than a second';
    }

    async copyPassword() {
        const password = this.elements.passwordOutput.value;
        if (!password) {
            this.showToast('No password to copy!', 'error');
            return;
        }

        try {
            await navigator.clipboard.writeText(password);
            this.showToast('Password copied to clipboard!', 'success');
            
            // Enhanced visual feedback
            this.elements.copyBtn.style.background = '#10b981';
            this.elements.copyBtn.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.elements.copyBtn.style.background = '';
                this.elements.copyBtn.style.transform = '';
            }, 300);
        } catch (err) {
            // Fallback for older browsers
            this.elements.passwordOutput.select();
            document.execCommand('copy');
            this.showToast('Password copied to clipboard!', 'success');
        }
    }

    fillPassword() {
        const password = this.elements.passwordOutput.value;
        if (!password) {
            this.showToast('No password to fill!', 'error');
            return;
        }

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'fillPassword',
                password: password
            }, (response) => {
                if (chrome.runtime.lastError) {
                    this.showToast('Error filling password!', 'error');
                } else if (response && response.success) {
                    this.showToast('Password filled successfully!', 'success');
                } else {
                    this.showToast('No password field found!', 'error');
                }
            });
        });
    }

    showToast(message, type = 'success') {
        this.elements.toastMessage.textContent = message;
        this.elements.toast.className = `toast ${type}`;
        this.elements.toast.classList.add('show');
        
        setTimeout(() => {
            this.elements.toast.classList.remove('show');
        }, 3000);
    }
}

// Initialize the password generator when the popup loads
document.addEventListener('DOMContentLoaded', () => {
    new PasswordGenerator();
});