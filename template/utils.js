// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// FAQ TOGGLE
// ============================================

function initFAQ() {
    const faqButtons = document.querySelectorAll('[data-faq-toggle]');
    
    faqButtons.forEach(button => {
        button.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Initialize FAQ on page load
document.addEventListener('DOMContentLoaded', initFAQ);

// ============================================
// FORM HANDLER (NETLIFY)
// ============================================

function initForms() {
    const forms = document.querySelectorAll('form[data-netlify]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitButton = form.querySelector('button[type="submit"]');
            
            // Add loading state
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Envoi en cours...';
            }
        });
    });
}

// Initialize forms on page load
document.addEventListener('DOMContentLoaded', initForms);

// ============================================
// SCROLL ANIMATIONS (INTERSECTION OBSERVER)
// ============================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.slide-up, .fade-in');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        if (element.classList.contains('slide-up')) {
            element.style.transform = 'translateY(30px)';
        }
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

// Initialize scroll animations on page load
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// ============================================
// MOBILE MENU TOGGLE (if needed)
// ============================================

function initMobileMenu() {
    const menuToggle = document.querySelector('[data-menu-toggle]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
}

// Initialize mobile menu on page load
document.addEventListener('DOMContentLoaded', initMobileMenu);

// ============================================
// LAZY LOADING IMAGES (optional)
// ============================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading on page load
document.addEventListener('DOMContentLoaded', initLazyLoading);

// ============================================
// STICKY HEADER (optional)
// ============================================

function initStickyHeader() {
    const header = document.querySelector('[data-sticky-header]');
    
    if (header) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }
}

// Initialize sticky header on page load
document.addEventListener('DOMContentLoaded', initStickyHeader);

// ============================================
// COPY TO CLIPBOARD (utility)
// ============================================

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copied to clipboard');
        });
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

// ============================================
// DETECT SCROLL DIRECTION (utility)
// ============================================

let lastScrollTop = 0;

function getScrollDirection() {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    let direction = '';
    
    if (st > lastScrollTop) {
        direction = 'down';
    } else if (st < lastScrollTop) {
        direction = 'up';
    }
    
    lastScrollTop = st <= 0 ? 0 : st;
    return direction;
}

// ============================================
// THROTTLE FUNCTION (utility)
// ============================================

function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    
    return function(...args) {
        const currentTime = Date.now();
        const timeSinceLastExec = currentTime - lastExecTime;
        
        if (timeSinceLastExec >= delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - timeSinceLastExec);
        }
    };
}

// ============================================
// DEBOUNCE FUNCTION (utility)
// ============================================

function debounce(func, delay) {
    let timeoutId;
    
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// ============================================
// EXPORT FUNCTIONS (if using modules)
// ============================================

// Export functions for use in other files if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initFAQ,
        initForms,
        initScrollAnimations,
        initMobileMenu,
        initLazyLoading,
        initStickyHeader,
        copyToClipboard,
        getScrollDirection,
        throttle,
        debounce
    };
}
