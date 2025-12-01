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

    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
        }
    });

    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ============================================
// COMMENT ÇA MARCHE - EFFET VAGUE EN BOUCLE
// ============================================
const howItWorksSection = document.querySelector('.how-it-works');

if (howItWorksSection) {
    const cards = howItWorksSection.querySelectorAll('.step-card');
    let currentActiveIndex = 0;
    let waveInterval = null;
    let hasStarted = false;
    
    // Fonction pour activer une seule carte
    function activateCard(index) {
        cards.forEach((card, i) => {
            if (i === index) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }
    
    // Fonction pour démarrer la vague en boucle
    function startWave() {
        if (waveInterval) return; // Déjà en cours
        
        // Première activation
        activateCard(0);
        currentActiveIndex = 0;
        
        // Boucle toutes les 2000ms (comme la vidéo)
        waveInterval = setInterval(() => {
            currentActiveIndex = (currentActiveIndex + 1) % cards.length;
            activateCard(currentActiveIndex);
        }, 800);
    }
    
    // Fonction pour arrêter la vague
    function stopWave() {
        if (waveInterval) {
            clearInterval(waveInterval);
            waveInterval = null;
        }
        // Retirer toutes les classes active
        cards.forEach(card => card.classList.remove('active'));
    }
    
    // Observer pour détecter quand la section est visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Section visible
                if (!hasStarted) {
                    // Première fois : faire apparaître les cartes
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 150); // Apparition rapide
                    });
                    
                    // Démarrer la vague après l'apparition
                    setTimeout(() => {
                        startWave();
                    }, 600);
                    
                    hasStarted = true;
                } else {
                    // Reprendre la vague
                    startWave();
                }
            } else {
                // Section pas visible : arrêter la vague
                stopWave();
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(howItWorksSection);
}

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
        
        let translateX = offset * 110;
        let translateZ = -absOffset * 200;
        let scale = 1 - (absOffset * 0.2);
        let opacity = absOffset === 0 ? 1 : 0.5;
        let zIndex = totalSlides - absOffset;
        
        slide.style.transform = `translateX(${translateX}%) translateZ(${translateZ}px) scale(${scale})`;
        slide.style.opacity = opacity;
        slide.style.zIndex = zIndex;
        
        if (absOffset === 0) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
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
    updateCarousel();
    startAutoplay();
    
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
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoplay();
            goToSlide(index);
            startAutoplay();
        });
    });
    
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
    
    question.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        
        faqItems.forEach(i => {
            i.classList.remove('active');
            i.querySelector('.faq-item__answer').style.maxHeight = null;
        });
        
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
