// ============================================
// INITIALIZE LUCIDE ICONS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize all features
    initMobileMenu();
    initStickyHeader();
    initSmoothScroll();
    initFAQ();
    initScrollAnimations();
    initPricingSimulator();
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================

function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav__menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// ============================================
// STICKY HEADER
// ============================================

function initStickyHeader() {
    const header = document.getElementById('header');
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

// ============================================
// SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// FAQ ACCORDION
// ============================================

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-item__question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
            
            // Re-initialize Lucide icons for the FAQ icons
            lucide.createIcons();
        });
    });
}

// ============================================
// SCROLL ANIMATIONS (INTERSECTION OBSERVER)
// ============================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ============================================
// PRICING SIMULATOR
// ============================================

function initPricingSimulator() {
    const slider = document.getElementById('employees');
    const employeesCount = document.getElementById('employees-count');
    const price = document.getElementById('price');
    const pricePerUser = document.getElementById('price-per-user');
    
    if (!slider || !employeesCount || !price || !pricePerUser) return;
    
    // Pricing tiers (employees: price per month)
    const pricingTiers = [
        { min: 1, max: 10, basePrice: 49, pricePerEmployee: 4.9 },
        { min: 11, max: 50, basePrice: 79, pricePerEmployee: 5.5 },
        { min: 51, max: 100, basePrice: 299, pricePerEmployee: 5.0 },
        { min: 101, max: 200, basePrice: 499, pricePerEmployee: 4.5 },
        { min: 201, max: 500, basePrice: 899, pricePerEmployee: 4.0 }
    ];
    
    function calculatePrice(employees) {
        const tier = pricingTiers.find(t => employees >= t.min && employees <= t.max);
        
        if (!tier) {
            // For > 500 employees, custom pricing
            return { total: 'Sur mesure', perUser: '-' };
        }
        
        // If first tier and within base price range
        if (tier.min === 1 && employees <= 10) {
            return {
                total: tier.basePrice,
                perUser: (tier.basePrice / employees).toFixed(2)
            };
        }
        
        // Calculate price based on number of employees
        const totalPrice = Math.round(employees * tier.pricePerEmployee);
        
        return {
            total: totalPrice,
            perUser: tier.pricePerEmployee.toFixed(2)
        };
    }
    
    function updatePricing() {
        const employees = parseInt(slider.value);
        employeesCount.textContent = employees;
        
        const pricing = calculatePrice(employees);
        
        if (typeof pricing.total === 'number') {
            price.textContent = pricing.total;
            pricePerUser.textContent = pricing.perUser;
        } else {
            price.textContent = pricing.total;
            pricePerUser.parentElement.style.display = 'none';
        }
    }
    
    // Initialize
    updatePricing();
    
    // Update on slider change
    slider.addEventListener('input', updatePricing);
}

// ============================================
// FORM SUBMISSION (NETLIFY)
// ============================================

function initFormSubmission() {
    const forms = document.querySelectorAll('form[data-netlify]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitButton = form.querySelector('button[type="submit"]');
            
            // Add loading state
            if (submitButton) {
                submitButton.disabled = true;
                
                const originalContent = submitButton.innerHTML;
                submitButton.innerHTML = '<i data-lucide="loader"></i> Envoi en cours...';
                lucide.createIcons();
                
                // Re-enable after submission
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalContent;
                    lucide.createIcons();
                }, 3000);
            }
        });
    });
}

// Initialize form submission
document.addEventListener('DOMContentLoaded', initFormSubmission);

// ============================================
// PARALLAX EFFECT ON HERO
// ============================================

function initParallax() {
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero__background');
    
    if (!hero || !heroBackground) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        
        heroBackground.style.transform = `translateY(${rate}px)`;
    });
}

// Initialize parallax
document.addEventListener('DOMContentLoaded', initParallax);

// ============================================
// UTILITIES
// ============================================

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Scroll to top button (optional)
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i data-lucide="arrow-up"></i>';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--color-primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(scrollBtn);
    lucide.createIcons();
    
    window.addEventListener('scroll', throttle(() => {
        if (window.pageYOffset > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.pointerEvents = 'all';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.pointerEvents = 'none';
        }
    }, 100));
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top (optional - uncomment to enable)
// document.addEventListener('DOMContentLoaded', initScrollToTop);

// ============================================
// CONSOLE MESSAGE (BRANDING)
// ============================================

console.log('%cFLO SaaS', 'font-size: 24px; font-weight: bold; color: #4A90E2;');
console.log('%cCentralisez vos process internes', 'font-size: 14px; color: #6B7280;');
console.log('%c🚀 Créé avec le système de template master', 'font-size: 12px; color: #20C997;');
