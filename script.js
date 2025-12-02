// ============================================
// INITIALISATION AU CHARGEMENT
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser Lucide icons
    lucide.createIcons();
    
    // Démarrer l'effet vague
    startWaveEffect();
    
    // Carrousel témoignages
    initTestimonialsCarousel();
});

// ============================================
// EFFET VAGUE BLEU - COMMENT ÇA MARCHE
// ============================================
function startWaveEffect() {
    const boxes = document.querySelectorAll('.step-box');
    
    if (boxes.length === 0) return;
    
    let currentIndex = 0;
    
    // Activer la première carte
    boxes[0].classList.add('active');
    
    // Changer de carte toutes les 1.5 secondes
    setInterval(function() {
        // Désactiver toutes les cartes
        boxes.forEach(box => box.classList.remove('active'));
        
        // Passer à la carte suivante
        currentIndex = (currentIndex + 1) % boxes.length;
        
        // Activer la nouvelle carte
        boxes[currentIndex].classList.add('active');
    }, 1500);
}

// ============================================
// CARROUSEL TÉMOIGNAGES
// ============================================
function initTestimonialsCarousel() {
    const track = document.getElementById('testimonials-track');
    if (track) {
        const cards = Array.from(track.children);
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
        });
    }
}

// ============================================
// HEADER SCROLL
// ============================================
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ============================================
// NAVIGATION MOBILE
// ============================================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.querySelector('.nav__menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// ============================================
// PRICING SLIDER
// ============================================
const employeesSlider = document.getElementById('employees');
if (employeesSlider) {
    const employeesCount = document.getElementById('employees-count');
    const priceDisplay = document.getElementById('price');
    const pricePerUserDisplay = document.getElementById('price-per-user');
    
    employeesSlider.addEventListener('input', function() {
        const emp = parseInt(this.value);
        let ppu;
        if (emp <= 10) ppu = 7.90;
        else if (emp <= 50) ppu = 6.90;
        else if (emp <= 100) ppu = 5.90;
        else if (emp <= 200) ppu = 4.90;
        else ppu = 3.90;
        
        employeesCount.textContent = emp;
        priceDisplay.textContent = Math.round(emp * ppu);
        pricePerUserDisplay.textContent = ppu.toFixed(2);
    });
}

// ============================================
// FAQ ACCORDION
// ============================================
document.querySelectorAll('.faq-item').forEach(function(item) {
    const question = item.querySelector('.faq-item__question');
    const answer = item.querySelector('.faq-item__answer');
    
    if (question && answer) {
        question.addEventListener('click', function() {
            const isOpen = item.classList.contains('active');
            
            // Fermer tous les autres
            document.querySelectorAll('.faq-item').forEach(function(i) {
                i.classList.remove('active');
                const a = i.querySelector('.faq-item__answer');
                if (a) a.style.maxHeight = null;
            });
            
            // Ouvrir celui-ci si fermé
            if (!isOpen) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    }
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target && header) {
            e.preventDefault();
            const offset = header.offsetHeight;
            const position = target.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: position,
                behavior: 'smooth'
            });
        }
    });
});
