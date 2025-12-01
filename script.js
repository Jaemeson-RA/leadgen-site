document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
});

const header = document.getElementById('header');
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
});

const navToggle = document.getElementById('nav-toggle');
const navMenu = document.querySelector('.nav__menu');
if (navToggle) {
    navToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) navMenu.classList.remove('active');
    });
    navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navMenu.classList.remove('active')));
}

// EFFET VAGUE EN BOUCLE
const howItWorksSection = document.querySelector('.how-it-works');
if (howItWorksSection) {
    const cards = howItWorksSection.querySelectorAll('.step-card');
    let currentActiveIndex = 0, waveInterval = null, hasStarted = false;
    
    function activateCard(index) {
        cards.forEach((card, i) => card.classList.toggle('active', i === index));
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
                    cards.forEach((card, i) => setTimeout(() => card.classList.add('visible'), i * 150));
                    setTimeout(startWave, 600);
                    hasStarted = true;
                } else startWave();
            } else stopWave();
        });
    }, { threshold: 0.3 });
    observer.observe(howItWorksSection);
}

// PRICING
const employeesSlider = document.getElementById('employees');
if (employeesSlider) {
    const employeesCount = document.getElementById('employees-count');
    const priceDisplay = document.getElementById('price');
    const pricePerUserDisplay = document.getElementById('price-per-user');
    
    employeesSlider.addEventListener('input', function() {
        const emp = parseInt(this.value);
        let ppu = emp <= 10 ? 7.90 : emp <= 50 ? 6.90 : emp <= 100 ? 5.90 : emp <= 200 ? 4.90 : 3.90;
        employeesCount.textContent = emp;
        priceDisplay.textContent = Math.round(emp * ppu);
        pricePerUserDisplay.textContent = ppu.toFixed(2);
    });
}

// CAROUSEL TÉMOIGNAGES
const track = document.getElementById('flo-testimonials-track');
const slides = document.querySelectorAll('.flo-testimonials-slide');
const prevBtn = document.getElementById('flo-carousel-prev');
const nextBtn = document.getElementById('flo-carousel-next');
const dots = document.querySelectorAll('.flo-testimonials-dot');
let currentIndex = 0, autoplayInterval;
const totalSlides = slides.length;

function updateCarousel() {
    slides.forEach((slide, index) => {
        const offset = index - currentIndex;
        const absOffset = Math.abs(offset);
        
        let translateX = offset * 60;
        let translateZ = -absOffset * 150;
        let scale = 1 - (absOffset * 0.15);
        let opacity = absOffset === 0 ? 1 : 0.6;
        
        slide.style.transform = `translateX(${translateX}%) translateZ(${translateZ}px) scale(${scale})`;
        slide.style.opacity = opacity;
        slide.style.zIndex = totalSlides - absOffset;
        slide.classList.toggle('active', absOffset === 0);
    });
    dots.forEach((dot, i) => dot.classList.toggle('flo-testimonials-dot--active', i === currentIndex));
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
    dots.forEach((dot, i) => dot.addEventListener('click', () => { stopAutoplay(); currentIndex = i; updateCarousel(); startAutoplay(); }));
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
        if (!isOpen) { item.classList.add('active'); answer.style.maxHeight = answer.scrollHeight + 'px'; }
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
