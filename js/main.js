// Main JavaScript for Nationwide Game Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initMobileNavigation();
    initScrollEffects();
    initParallaxEffects();
    initAnimationObserver();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 70; // Account for fixed navbar
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// Mobile navigation functionality
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            navbar.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Handle mobile dropdown clicks
        const dropdowns = document.querySelectorAll('.nav-dropdown > a');
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const parent = this.parentElement;
                    const isActive = parent.classList.contains('active');
                    
                    // Close all other dropdowns
                    document.querySelectorAll('.nav-dropdown.active').forEach(item => {
                        if (item !== parent) item.classList.remove('active');
                    });
                    
                    // Toggle current dropdown
                    parent.classList.toggle('active', !isActive);
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
}

function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    
    if (hamburger && navMenu && navbar) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        navbar.classList.remove('menu-open');
    }
}

// Scroll effects for navbar
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Add background opacity based on scroll
        if (currentScrollY > 50) {
            navbar.style.backgroundColor = 'rgba(10, 14, 26, 0.98)';
        } else {
            navbar.style.backgroundColor = 'rgba(10, 14, 26, 0.95)';
        }
        
        // Hide/show navbar on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Parallax effects for hero section
function initParallaxEffects() {
    const stars = document.querySelector('.stars');
    const nebula = document.querySelector('.nebula');
    
    if (stars && nebula) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            const rateNebula = scrolled * -0.3;
            
            stars.style.transform = `translateY(${rate}px)`;
            nebula.style.transform = `translateY(${rateNebula}px) scale(1.1)`;
        });
    }
}

// Intersection Observer for animations
function initAnimationObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.about-card, .step, .feature-card, .community-card, .section-header'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Dynamic typing effect for hero subtitle (optional enhancement)
function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.textContent = '';
    
    let i = 0;
    const typeSpeed = 100;
    
    function typeWriter() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, typeSpeed);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
}

// Easter egg: Konami code for special effects
function initKonamiCode() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateSpecialEffects();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateSpecialEffects() {
    // Add special visual effects
    document.body.style.animation = 'rainbow-bg 2s ease-in-out';
    
    // Create floating elements
    createFloatingElements();
    
    // Show easter egg message
    showEasterEggMessage();
}

function createFloatingElements() {
    const symbols = ['🚀', '🌟', '⭐', '💫', '🛸'];
    
    for (let i = 0; i < 20; i++) {
        const element = document.createElement('div');
        element.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        element.style.cssText = `
            position: fixed;
            font-size: 2rem;
            pointer-events: none;
            z-index: 9999;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            animation: float-away 3s ease-out forwards;
        `;
        
        document.body.appendChild(element);
        
        setTimeout(() => element.remove(), 3000);
    }
}

function showEasterEggMessage() {
    const message = document.createElement('div');
    message.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: #00d4aa;
            padding: 2rem;
            border-radius: 12px;
            border: 2px solid #0066ff;
            text-align: center;
            z-index: 10000;
            animation: pulse 0.5s ease-in-out;
        ">
            <h3>🎮 EASTER EGG ACTIVATED! 🎮</h3>
            <p>You've discovered the secret galactic protocol!</p>
            <p><em>"The galaxy remembers its strategic commanders..."</em></p>
        </div>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => message.remove(), 4000);
}

// Add CSS animations dynamically
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes animate-in {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-in {
            animation: animate-in 0.6s ease-out forwards;
        }
        
        @keyframes float-away {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-200px) scale(0.5) rotate(360deg);
            }
        }
        
        @keyframes rainbow-bg {
            0% { filter: hue-rotate(0deg); }
            50% { filter: hue-rotate(180deg); }
            100% { filter: hue-rotate(360deg); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.05); }
        }
        
        /* Mobile menu styles */
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                left: -100%;
                top: 70px;
                flex-direction: column;
                background-color: rgba(10, 14, 26, 0.98);
                width: 100%;
                text-align: center;
                transition: 0.3s;
                box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                padding: 2rem 0;
                gap: 1rem;
            }
            
            .nav-menu.active {
                left: 0;
            }
            
            .nav-menu li {
                margin: 1rem 0;
            }
            
            .hamburger.active span:nth-child(1) {
                transform: rotate(-45deg) translate(-5px, 6px);
            }
            
            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger.active span:nth-child(3) {
                transform: rotate(45deg) translate(-5px, -6px);
            }
            
            .navbar {
                transition: transform 0.3s ease-in-out, background-color 0.3s ease;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize dynamic styles and Konami code
addDynamicStyles();
initKonamiCode();

// Utility function for debouncing scroll events
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

// Performance optimization for scroll events
const debouncedScrollHandler = debounce(() => {
    // Any heavy scroll computations can go here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Initialize typing effect (uncomment if desired)
// initTypingEffect();

console.log('🚀 Nationwide website loaded successfully! Ready to conquer the galaxy...');