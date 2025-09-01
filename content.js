// Content script for filling passwords into forms
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'fillPassword') {
        const success = fillPasswordIntoForm(request.password);
        sendResponse({ success: success });
    }
});

function fillPasswordIntoForm(password) {
    // Find password input fields
    const passwordFields = document.querySelectorAll(
        'input[type="password"], input[name*="password" i], input[id*="password" i], input[placeholder*="password" i]'
    );
    
    if (passwordFields.length === 0) {
        // Try to find any input field that might be a password field
        const allInputs = document.querySelectorAll('input[type="text"], input:not([type])');
        const possiblePasswordFields = Array.from(allInputs).filter(input => {
            const attributes = [
                input.name,
                input.id,
                input.placeholder,
                input.className,
                input.getAttribute('data-testid'),
                input.getAttribute('aria-label')
            ].join(' ').toLowerCase();
            
            return attributes.includes('password') || 
                   attributes.includes('pass') || 
                   attributes.includes('pwd') ||
                   attributes.includes('secret');
        });
        
        if (possiblePasswordFields.length > 0) {
            fillField(possiblePasswordFields[0], password);
            return true;
        }
        
        return false;
    }
    
    // Fill the first password field found
    fillField(passwordFields[0], password);
    
    // If there are multiple password fields (like confirm password), fill the second one too
    if (passwordFields.length > 1) {
        fillField(passwordFields[1], password);
    }
    
    return true;
}

function fillField(field, value) {
    // Focus the field
    field.focus();
    
    // Clear existing value
    field.value = '';
    
    // Set the new value
    field.value = value;
    
    // Trigger events that frameworks might be listening for
    const events = ['input', 'change', 'keyup', 'paste'];
    events.forEach(eventType => {
        const event = new Event(eventType, { bubbles: true, cancelable: true });
        field.dispatchEvent(event);
    });
    
    // For React and other frameworks
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
    ).set;
    
    if (nativeInputValueSetter) {
        nativeInputValueSetter.call(field, value);
        const inputEvent = new Event('input', { bubbles: true });
        field.dispatchEvent(inputEvent);
    }
    
    // Add visual feedback
    field.style.transition = 'all 0.3s ease';
    field.style.backgroundColor = '#dcfce7';
    field.style.borderColor = '#10b981';
    
    setTimeout(() => {
        field.style.backgroundColor = '';
        field.style.borderColor = '';
    }, 1000);
}

// Auto-detect password fields and add visual indicators (only on user interaction)
function addPasswordFieldIndicators() {
    // Only add indicators if user has interacted with the page
    if (!document.body.dataset.userInteracted) {
        return;
    }
    
    const passwordFields = document.querySelectorAll(
        'input[type="password"], input[name*="password" i], input[id*="password" i]'
    );
    
    passwordFields.forEach(field => {
        if (!field.dataset.securepassIndicator) {
            field.dataset.securepassIndicator = 'true';
            
            // Add a subtle indicator only when field is focused
            field.addEventListener('focus', () => {
                if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('securepass-indicator')) {
                    const indicator = document.createElement('div');
                    indicator.className = 'securepass-indicator';
                    indicator.style.cssText = `
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
                        font-weight: bold;
                        z-index: 10000;
                        pointer-events: none;
                        opacity: 0.7;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                    `;
                    indicator.innerHTML = '🔒';
                    
                    // Position relative to field
                    if (field.parentElement) {
                        const parent = field.parentElement;
                        if (getComputedStyle(parent).position === 'static') {
                            parent.style.position = 'relative';
                        }
                        parent.appendChild(indicator);
                        
                        // Remove indicator when field loses focus
                        field.addEventListener('blur', () => {
                            setTimeout(() => {
                                if (indicator.parentElement) {
                                    indicator.remove();
                                }
                            }, 2000);
                        });
                    }
                }
            });
        }
    });
}

// Track user interaction
document.addEventListener('click', () => {
    document.body.dataset.userInteracted = 'true';
}, { once: true });

document.addEventListener('keydown', () => {
    document.body.dataset.userInteracted = 'true';
}, { once: true });

// Run only after user interaction and DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(addPasswordFieldIndicators, 1000);
    });
} else {
    setTimeout(addPasswordFieldIndicators, 1000);
}

// Watch for dynamically added password fields (less aggressive)
let observerTimeout;
const observer = new MutationObserver((mutations) => {
    // Debounce the observer to avoid excessive calls
    clearTimeout(observerTimeout);
    observerTimeout = setTimeout(() => {
        let hasPasswordFields = false;
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const passwordFields = node.querySelectorAll 
                            ? node.querySelectorAll('input[type="password"], input[name*="password" i], input[id*="password" i]')
                            : [];
                        
                        if (passwordFields.length > 0) {
                            hasPasswordFields = true;
                        }
                    }
                });
            }
        });
        
        if (hasPasswordFields) {
            addPasswordFieldIndicators();
        }
    }, 500);
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});