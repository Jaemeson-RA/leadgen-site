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
        console.log('Carrousel: ' + track.children.length + ' cartes');
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
// COMMENT ÇA MARCHE - EFFET BLEU EN BOUCLE
// ============================================
const howItWorksSection = document.querySelector('.how-it-works');
if (howItWorksSection) {
    const cards = howItWorksSection.querySelectorAll('.step-card');
    const arrows = howItWorksSection.querySelectorAll('.step__arrow');
    let currentActiveIndex = 0;
    let waveInterval = null;
    let hasStarted = false;
    
    function activateCard(index) {
        // Désactiver toutes les cartes et flèches
        cards.forEach((card, i) => {
            if (i === index) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
        
        // Activer les flèches jusqu'à la carte active
        arrows.forEach((arrow, i) => {
            if (i < index) {
                arrow.classList.add('active');
            } else {
                arrow.classList.remove('active');
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
        }, 1500); // 1.5 secondes entre chaque carte
    }
    
    function stopWave() {
        if (waveInterval) {
            clearInterval(waveInterval);
            waveInterval = null;
        }
        cards.forEach(card => card.classList.remove('active'));
        arrows.forEach(arrow => arrow.classList.remove('active'));
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!hasStarted) {
                    // Première fois : faire apparaître les cartes
                    cards.forEach((card, i) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, i * 200);
                    });
                    // Puis démarrer l'effet vague
                    setTimeout(startWave, 800);
                    hasStarted = true;
                } else {
                    startWave();
                }
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
