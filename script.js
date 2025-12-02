document.addEventListener('DOMContentLoaded', function() {
    // Initialiser les icônes Lucide
    lucide.createIcons();
    
    // CARROUSEL TÉMOIGNAGES - BOUCLE INFINIE
    const track = document.getElementById('testimonials-track');
    if (track) {
        const cards = track.children;
        const cardsArray = Array.from(cards);
        cardsArray.forEach(card => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
        });
    }
});

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
});

// Navigation mobile
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.querySelector('.nav__menu');
if (navToggle) {
    navToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) navMenu.classList.remove('active');
    });
    navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navMenu.classList.remove('active')));
}

// ============================================
// COMMENT ÇA MARCHE - EFFET VAGUE BLEU
// ============================================
const howItWorksSection = document.querySelector('.how-it-works');
if (howItWorksSection) {
    const items = howItWorksSection.querySelectorAll('.step-item');
    let currentIndex = 0;
    let waveInterval = null;
    
    function activateItem(index) {
        items.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    function startWave() {
        if (waveInterval) return;
        activateItem(0);
        currentIndex = 0;
        waveInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % items.length;
            activateItem(currentIndex);
        }, 1500);
    }
    
    function stopWave() {
        if (waveInterval) {
            clearInterval(waveInterval);
            waveInterval = null;
        }
        items.forEach(item => item.classList.remove('active'));
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startWave();
            } else {
                stopWave();
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(howItWorksSection);
}

// PRICING SLIDER
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
            window.scrollTo({ 
                top: target.getBoundingClientRect().top + window.pageYOffset - header.offsetHeight, 
                behavior: 'smooth' 
            });
        }
    });
});
