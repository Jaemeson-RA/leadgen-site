// ============================================
// LUCIDE ICONS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
});

// ============================================
// STICKY HEADER
// ============================================
const header = document.getElementById('header');

window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.querySelector('.nav__menu');

if (navToggle) {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
        }
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ============================================
// STEP CARDS - TOGGLE RECTO/VERSO
// ============================================
const stepCards = document.querySelectorAll('.step-card');

stepCards.forEach(card => {
    const inner = card.querySelector('.step-card__inner');
    const toggleDots = card.querySelectorAll('.toggle-dot');
    
    toggleDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const targetFace = this.getAttribute('data-face');
            
            // Toggle flip state
            if (targetFace === 'back') {
                inner.classList.add('flipped');
            } else {
                inner.classList.remove('flipped');
            }
            
            // Update active dots
            const parentFace = this.closest('.step-card__face');
            const allDotsInCard = card.querySelectorAll('.toggle-dot');
            
            allDotsInCard.forEach(d => d.classList.remove('active'));
            
            // Activate correct dots
            if (targetFace === 'back') {
                card.querySelectorAll('[data-face="back"]').forEach(d => d.classList.add('active'));
            } else {
                card.querySelectorAll('[data-face="front"]').forEach(d => d.classList.add('active'));
            }
        });
    });
});

// ============================================
// PRICING SIMULATOR
// ============================================
const employeesSlider = document.getElementById('employees');
const employeesCount = document.getElementById('employees-count');
const priceDisplay = document.getElementById('price');
const pricePerUserDisplay = document.getElementById('price-per-user');

if (employeesSlider) {
    function calculatePrice(employees) {
        let pricePerEmployee;
        
        if (employees <= 10) {
            pricePerEmployee = 7.90;
        } else if (employees <= 50) {
            pricePerEmployee = 6.90;
        } else if (employees <= 100) {
            pricePerEmployee = 5.90;
        } else if (employees <= 200) {
            pricePerEmployee = 4.90;
        } else {
            pricePerEmployee = 3.90;
        }
        
        const totalPrice = Math.round(employees * pricePerEmployee);
        return { totalPrice, pricePerEmployee };
    }

    employeesSlider.addEventListener('input', function() {
        const employees = parseInt(this.value);
        const { totalPrice, pricePerEmployee } = calculatePrice(employees);
        
        employeesCount.textContent = employees;
        priceDisplay.textContent = totalPrice;
        pricePerUserDisplay.textContent = pricePerEmployee.toFixed(2);
    });
}

// ============================================
// TESTIMONIALS CAROUSEL 3D
// ============================================
const track = document.getElementById('flo-testimonials-track');
const slides = document.querySelectorAll('.flo-testimonials-slide');
const prevBtn = document.getElementById('flo-carousel-prev');
const nextBtn = document.getElementById('flo-carousel-next');
const dots = document.querySelectorAll('.flo-testimonials-dot');

let currentIndex = 0;
const totalSlides = slides.length;
let autoplayInterval;

function updateCarousel() {
    slides.forEach((slide, index) => {
        const offset = index - currentIndex;
        const absOffset = Math.abs(offset);
        
        // Position
        let translateX = offset * 110;
        let translateZ = -absOffset * 200;
        let scale = 1 - (absOffset * 0.2);
        let opacity = absOffset === 0 ? 1 : 0.5;
        let zIndex = totalSlides - absOffset;
        
        // Apply transforms
        slide.style.transform = `translateX(${translateX}%) translateZ(${translateZ}px) scale(${scale})`;
        slide.style.opacity = opacity;
        slide.style.zIndex = zIndex;
        
        // Active class
        if (absOffset === 0) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    // Update dots
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('flo-testimonials-dot--active');
        } else {
            dot.classList.remove('flo-testimonials-dot--active');
        }
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

if (track) {
    // Initialize
    updateCarousel();
    startAutoplay();
    
    // Navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoplay();
            prevSlide();
            startAutoplay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoplay();
            nextSlide();
            startAutoplay();
        });
    }
    
    // Dots navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoplay();
            goToSlide(index);
            startAutoplay();
        });
    });
    
    // Pause on hover
    track.addEventListener('mouseenter', stopAutoplay);
    track.addEventListener('mouseleave', startAutoplay);
}

// ============================================
// FAQ ACCORDION
// ============================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-item__question');
    const answer = item.querySelector('.faq-item__answer');
    const icon = item.querySelector('.faq-item__icon');
    
    question.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        
        // Close all items
        faqItems.forEach(i => {
            i.classList.remove('active');
            i.querySelector('.faq-item__answer').style.maxHeight = null;
        });
        
        // Open clicked item if it was closed
        if (!isOpen) {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            const headerHeight = header.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in, .fade-in-step').forEach(el => {
    observer.observe(el);
});
