document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
});

const header = document.getElementById('header');
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

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
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navMenu.classList.remove('active'));
    });
}

// EFFET VAGUE EN BOUCLE
const howItWorksSection = document.querySelector('.how-it-works');
if (howItWorksSection) {
    const cards = howItWorksSection.querySelectorAll('.step-card');
    let currentActiveIndex = 0;
    let waveInterval = null;
    let hasStarted = false;
    
    function activateCard(index) {
        cards.forEach((card, i) => {
            if (i === index) card.classList.add('active');
            else card.classList.remove('active');
        });
    }
    
    function startWave() {
        if (waveInterval) return;
        activateCard(0);
        currentActiveIndex = 0;
        waveInterval = setInterval(() => {
            currentActiveIndex = (currentActiveIndex + 1) % cards.length;
            activateCard(currentActiveIndex);
        }, 1200);
    }
    
    function stopWave() {
        if (waveInterval) { clearInterval(waveInterval); waveInterval = null; }
        cards.forEach(card => card.classList.remove('active'));
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!hasStarted) {
                    cards.forEach((card, index) => {
                        setTimeout(() => card.classList.add('visible'), index * 150);
                    });
                    setTimeout(() => startWave(), 600);
                    hasStarted = true;
                } else { startWave(); }
            } else { stopWave(); }
        });
    }, { threshold: 0.3 });
    observer.observe(howItWorksSection);
}

// PRICING
const employeesSlider = document.getElementById('employees');
const employeesCount = document.getElementById('employees-count');
const priceDisplay = document.getElementById('price');
const pricePerUserDisplay = document.getElementById('price-per-user');

if (employeesSlider) {
    function calculatePrice(employees) {
        let pricePerEmployee;
        if (employees <= 10) pricePerEmployee = 7.90;
        else if (employees <= 50) pricePerEmployee = 6.90;
        else if (employees <= 100) pricePerEmployee = 5.90;
        else if (employees <= 200) pricePerEmployee = 4.90;
        else pricePerEmployee = 3.90;
        return { totalPrice: Math.round(employees * pricePerEmployee), pricePerEmployee };
    }
    employeesSlider.addEventListener('input', function() {
        const { totalPrice, pricePerEmployee } = calculatePrice(parseInt(this.value));
        employeesCount.textContent = this.value;
        priceDisplay.textContent = totalPrice;
        pricePerUserDisplay.textContent = pricePerEmployee.toFixed(2);
    });
}

// CAROUSEL
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
        slide.style.transform = `translateX(${offset * 110}%) translateZ(${-absOffset * 200}px) scale(${1 - absOffset * 0.2})`;
        slide.style.opacity = absOffset === 0 ? 1 : 0.5;
        slide.style.zIndex = totalSlides - absOffset;
        slide.classList.toggle('active', absOffset === 0);
    });
    dots.forEach((dot, index) => dot.classList.toggle('flo-testimonials-dot--active', index === currentIndex));
}

function nextSlide() { currentIndex = (currentIndex + 1) % totalSlides; updateCarousel(); }
function prevSlide() { currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; updateCarousel(); }
function startAutoplay() { autoplayInterval = setInterval(nextSlide, 5000); }
function stopAutoplay() { clearInterval(autoplayInterval); }

if (track) {
    updateCarousel();
    startAutoplay();
    if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoplay(); prevSlide(); startAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoplay(); nextSlide(); startAutoplay(); });
    dots.forEach((dot, index) => dot.addEventListener('click', () => { stopAutoplay(); currentIndex = index; updateCarousel(); startAutoplay(); }));
    track.addEventListener('mouseenter', stopAutoplay);
    track.addEventListener('mouseleave', startAutoplay);
}

// FAQ
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-item__question');
    const answer = item.querySelector('.faq-item__answer');
    question.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('active');
            i.querySelector('.faq-item__answer').style.maxHeight = null;
        });
        if (!isOpen) {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') { e.preventDefault(); return; }
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - header.offsetHeight, behavior: 'smooth' });
        }
    });
});
