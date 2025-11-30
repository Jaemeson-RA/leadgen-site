// ============================================
// CARROUSEL 3D TÉMOIGNAGES
// ============================================

class FloTestimonialsCarousel {
    constructor() {
        this.track = document.getElementById('flo-testimonials-track');
        this.prevButton = document.getElementById('flo-carousel-prev');
        this.nextButton = document.getElementById('flo-carousel-next');
        this.dotsContainer = document.getElementById('flo-testimonials-dots');
        
        if (!this.track) return;
        
        this.slides = Array.from(this.track.querySelectorAll('.flo-testimonials-slide'));
        this.dots = Array.from(this.dotsContainer?.querySelectorAll('.flo-testimonials-dot') || []);
        
        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        this.autoplayInterval = null;
        this.autoplayDuration = 5000; // 5 secondes
        this.transitionDuration = 600; // ms
        
        this.init();
    }
    
    init() {
        if (this.totalSlides === 0) return;
        
        // Event listeners
        this.prevButton?.addEventListener('click', () => this.prev());
        this.nextButton?.addEventListener('click', () => this.next());
        
        // Dots navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
            
            // Keyboard navigation on dots
            dot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.goToSlide(index);
                }
            });
        });
        
        // Pause autoplay on hover
        this.track.addEventListener('mouseenter', () => this.stopAutoplay());
        this.track.addEventListener('mouseleave', () => this.startAutoplay());
        
        // Initial state
        this.updateSlides();
        
        // Start autoplay
        this.startAutoplay();
    }
    
    updateSlides() {
        this.slides.forEach((slide, index) => {
            const offset = index - this.currentIndex;
            
            // Remove all states
            slide.removeAttribute('data-state');
            
            // Determine state
            if (offset === 0) {
                slide.setAttribute('data-state', 'active');
            } else if (offset === -1 || (this.currentIndex === 0 && index === this.totalSlides - 1)) {
                slide.setAttribute('data-state', 'prev');
            } else if (offset === 1 || (this.currentIndex === this.totalSlides - 1 && index === 0)) {
                slide.setAttribute('data-state', 'next');
            } else {
                slide.setAttribute('data-state', 'hidden');
            }
        });
        
        // Update dots
        this.dots.forEach((dot, index) => {
            if (index === this.currentIndex) {
                dot.classList.add('flo-testimonials-dot--active');
                dot.setAttribute('aria-current', 'true');
            } else {
                dot.classList.remove('flo-testimonials-dot--active');
                dot.removeAttribute('aria-current');
            }
        });
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        this.updateSlides();
        this.resetAutoplay();
    }
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlides();
        this.resetAutoplay();
    }
    
    goToSlide(index) {
        if (index >= 0 && index < this.totalSlides) {
            this.currentIndex = index;
            this.updateSlides();
            this.resetAutoplay();
        }
    }
    
    startAutoplay() {
        this.autoplayInterval = setInterval(() => this.next(), this.autoplayDuration);
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
    
    resetAutoplay() {
        this.stopAutoplay();
        this.startAutoplay();
    }
}

// Initialize carousel when DOM is ready
function initTestimonialsCarousel() {
    new FloTestimonialsCarousel();
}

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
    initTestimonialsCarousel(); // Ajouter le carrousel
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

// ============================================
// NAVIGATION MOBILE DOTS (< et >) 
// ============================================

function initMobileDotsNavigation() {
    const dotsContainer = document.getElementById('flo-testimonials-dots');
    const prevBtn = document.getElementById('flo-carousel-prev');
    const nextBtn = document.getElementById('flo-carousel-next');
    
    if (!dotsContainer || !prevBtn || !nextBtn) return;
    
    // Créer des zones cliquables invisibles pour les flèches
    const leftArrow = document.createElement('div');
    const rightArrow = document.createElement('div');
    
    leftArrow.style.cssText = 'position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 40px; height: 40px; cursor: pointer; z-index: 10;';
    rightArrow.style.cssText = 'position: absolute; right: 0; top: 50%; transform: translateY(-50%); width: 40px; height: 40px; cursor: pointer; z-index: 10;';
    
    dotsContainer.style.position = 'relative';
    dotsContainer.appendChild(leftArrow);
    dotsContainer.appendChild(rightArrow);
    
    leftArrow.addEventListener('click', (e) => {
        e.stopPropagation();
        prevBtn.click();
    });
    
    rightArrow.addEventListener('click', (e) => {
        e.stopPropagation();
        nextBtn.click();
    });
}

// Initialiser la navigation mobile au chargement
if (window.innerWidth <= 768) {
    document.addEventListener('DOMContentLoaded', initMobileDotsNavigation);
}

// ============================================
// ANIMATION APPARITION CARTES "COMMENT ÇA MARCHE"
// ============================================

function initStepCardsAnimation() {
    const stepCards = document.querySelectorAll('.step-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2
    });
    
    stepCards.forEach(card => observer.observe(card));
}

document.addEventListener('DOMContentLoaded', initStepCardsAnimation);

// ============================================
// SWIPE MOBILE POUR CARTES "COMMENT ÇA MARCHE"
// ============================================

function initStepCardsSwipe() {
    if (window.innerWidth > 768) return; // Desktop seulement flip
    
    const stepCards = document.querySelectorAll('.step-card__inner');
    
    stepCards.forEach(card => {
        let touchStartX = 0;
        let touchEndX = 0;
        
        card.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        card.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe(card);
        }, { passive: true });
        
        function handleSwipe(element) {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe gauche - montrer le verso
                    element.classList.add('show-back');
                } else {
                    // Swipe droite - montrer le recto
                    element.classList.remove('show-back');
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', initStepCardsSwipe);
