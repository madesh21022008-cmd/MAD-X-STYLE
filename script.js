/* ============================
   NAVBAR SCROLL EFFECT
   ============================ */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.navbar-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/* ============================
   HAMBURGER MENU
   ============================ */
const hamburger = document.getElementById('hamburger');
const navbarMenu = document.getElementById('navbar-menu');

hamburger.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

/* ============================
   WISHLIST FUNCTIONALITY
   ============================ */
const wishlistButtons = document.querySelectorAll('.wishlist-btn');
const wishlistSet = new Set(localStorage.getItem('wishlist')?.split(',').filter(Boolean) || []);

// Initialize wishlist display
wishlistButtons.forEach(btn => {
    const productId = btn.getAttribute('data-product');
    if (wishlistSet.has(productId)) {
        btn.classList.add('active');
    }
});

wishlistButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = btn.getAttribute('data-product');
        
        if (wishlistSet.has(productId)) {
            wishlistSet.delete(productId);
            btn.classList.remove('active');
        } else {
            wishlistSet.add(productId);
            btn.classList.add('active');
        }
        
        // Save to localStorage
        localStorage.setItem('wishlist', Array.from(wishlistSet).join(','));
    });
});

/* ============================
   ANIMATED COUNTERS
   ============================ */
function animateCounter(element, target) {
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Intersection Observer for counter animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(element => {
    counterObserver.observe(element);
});

/* ============================
   SCROLL ANIMATIONS
   ============================ */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in-on-scroll class to elements that should animate on scroll
document.addEventListener('DOMContentLoaded', () => {
    // Collection cards
    document.querySelectorAll('.collection-card').forEach((card, index) => {
        card.classList.add('fade-in-on-scroll');
        card.style.animationDelay = `${index * 0.1}s`;
        scrollObserver.observe(card);
    });

    // Product cards
    document.querySelectorAll('.product-card').forEach((card, index) => {
        card.classList.add('fade-in-on-scroll');
        card.style.animationDelay = `${index * 0.1}s`;
        scrollObserver.observe(card);
    });

    // Testimonial cards
    document.querySelectorAll('.testimonial-card').forEach((card, index) => {
        card.classList.add('fade-in-on-scroll');
        card.style.animationDelay = `${index * 0.1}s`;
        scrollObserver.observe(card);
    });

    // Gallery items
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.classList.add('fade-in-on-scroll');
        item.style.animationDelay = `${index * 0.1}s`;
        scrollObserver.observe(item);
    });

    // Section headers
    document.querySelectorAll('.section-header').forEach((header, index) => {
        header.classList.add('fade-in-on-scroll');
        scrollObserver.observe(header);
    });
});

/* ============================
   NEWSLETTER FORM HANDLING
   ============================ */
const newsletterForm = document.getElementById('newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    // Proper email validation using HTML5 constraint validation API
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    if (isValidEmail) {
        // Show success message
        const btn = newsletterForm.querySelector('.newsletter-btn');
        const originalText = btn.textContent;
        btn.textContent = '✓ Subscribed!';
        btn.style.background = 'linear-gradient(135deg, #8B7355 0%, #C9A96E 100%)';
        
        // Reset after 2 seconds
        setTimeout(() => {
            newsletterForm.reset();
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
        
        // Save email to localStorage (in a real app, this would go to a server)
        const emails = JSON.parse(localStorage.getItem('newsletter') || '[]');
        if (!emails.includes(email)) {
            emails.push(email);
            localStorage.setItem('newsletter', JSON.stringify(emails));
        }
    }
});

/* ============================
   SMOOTH SCROLL BEHAVIOR
   ============================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                const headerOffset = 100;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

/* ============================
   PARALLAX EFFECT (OPTIONAL)
   ============================ */
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-content');
    if (hero) {
        const scrollY = window.scrollY;
        hero.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
});

/* ============================
   IMAGE LAZY LOADING SUPPORT
   ============================ */
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, imageObserver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

/* ============================
   UTILITY FUNCTIONS
   ============================ */

// Get all wishlist items
function getWishlist() {
    return Array.from(wishlistSet);
}

// Clear wishlist
function clearWishlist() {
    wishlistSet.clear();
    localStorage.removeItem('wishlist');
    wishlistButtons.forEach(btn => btn.classList.remove('active'));
}

// Export for console debugging
window.MAD_X_STYLE = {
    getWishlist,
    clearWishlist
};

console.log('MAD X STYLE - Luxury Streetwear Brand');
console.log('Premium Fashion Experience Loaded ✨');
