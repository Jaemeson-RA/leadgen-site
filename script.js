document.addEventListener('DOMContentLoaded', function() {
    // Initialiser les icônes Lucide
    lucide.createIcons();
    
    // CARROUSEL TÉMOIGNAGES - BOUCLE INFINIE
    const track = document.getElementById('testimonials-track');
    if (track) {
        // Cloner TOUS les enfants pour une boucle seamless
        const cards = track.children;
        const cardsArray = Array.from(cards);
        
        // Dupliquer chaque carte
        cardsArray.forEach(card => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
        });
        
        console.log('Carrousel: ' + track.children.length + ' cartes (originales + clones)');
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

// EFFET VAGUE EN BOUCLE - COMMENT ÇA MARCHE
const howItWorksSection = document.querySelector('.how-it-works');
if (howItWorksSection) {
    const cards = howItWorksSection.querySelectorAll('.step-card');
    let currentActiveIndex = 0;
    let waveInterval = null;
    
    function activateCard(index) {
        cards.forEach((card, i) => {
            if (i === index) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
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
        if (waveInterval) {
            clearInterval(waveInterval);
            waveInterval = null;
        }
        cards.forEach(card => card.classList.remove('active'));
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startWave();
            } else {
                stopWave();
            }
        });
    }, { threshold: 0.2 });
    
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
