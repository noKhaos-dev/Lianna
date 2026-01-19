// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Thank You!';
        submitButton.style.background = '#6b5d47';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.background = '';
        }, 3000);
    });
}

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            // Don't observe again once animated
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Staggered animation observer
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, index * 100);
            staggerObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Observe service cards with stagger
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        staggerObserver.observe(card);
    });
    
    // Observe testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        observer.observe(card);
    });
    
    // Observe case studies
    const caseStudies = document.querySelectorAll('.case-study');
    caseStudies.forEach((study, index) => {
        observer.observe(study);
    });
    
    // Observe section titles and descriptions
    const sectionTitles = document.querySelectorAll('.section-title, .section-description');
    sectionTitles.forEach(el => {
        observer.observe(el);
    });
    
    // Observe about text elements
    const aboutElements = document.querySelectorAll('.about-text > *');
    aboutElements.forEach((el, index) => {
        setTimeout(() => {
            observer.observe(el);
        }, index * 100);
    });
    
    // Observe detail items in case studies
    const detailItems = document.querySelectorAll('.detail-item');
    detailItems.forEach((item, index) => {
        setTimeout(() => {
            observer.observe(item);
        }, index * 150);
    });
    
    // Observe results list items
    const resultsItems = document.querySelectorAll('.results-list li');
    resultsItems.forEach((item, index) => {
        setTimeout(() => {
            observer.observe(item);
        }, index * 100);
    });
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    .service-card,
    .testimonial-card,
    .case-study {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .service-card.animate,
    .testimonial-card.animate,
    .case-study.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Active section highlighting in navigation
const sections = document.querySelectorAll('section[id]');

const highlightNav = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
};

window.addEventListener('scroll', highlightNav);

// Add active state styling for nav links
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-link.active {
        color: var(--text-dark) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(navStyle);

// Performance optimization: Debounce scroll events
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

// Apply debounce to scroll handlers
const debouncedHighlightNav = debounce(highlightNav, 10);

window.addEventListener('scroll', debouncedHighlightNav);

// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
});

// Parallax effect for hero image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image-placeholder');
    if (heroImage && scrolled < window.innerHeight) {
        const speed = 0.3;
        heroImage.style.transform = `translateY(${scrolled * speed}px)`;
    }
});

// Smooth reveal animation for text
const textRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const text = entry.target;
            const words = text.textContent.split(' ');
            text.innerHTML = words.map((word, i) => 
                `<span style="opacity: 0; animation: fadeInWord 0.5s ease ${i * 0.05}s forwards">${word}</span>`
            ).join(' ');
            textRevealObserver.unobserve(text);
        }
    });
}, { threshold: 0.5 });

// Add word fade-in animation
const wordAnimationStyle = document.createElement('style');
wordAnimationStyle.textContent = `
    @keyframes fadeInWord {
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(wordAnimationStyle);

// Initialize body loaded state
document.body.classList.add('loaded');

// Enhanced button ripple effect
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn-primary {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Navbar hide/show on scroll
let lastScrollTop = 0;
let scrollTimeout;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const navbar = document.getElementById('navbar');
    
    clearTimeout(scrollTimeout);
    
    if (currentScroll > lastScrollTop && currentScroll > 200) {
        // Scrolling down
        navbar.classList.add('hidden');
    } else {
        // Scrolling up
        navbar.classList.remove('hidden');
    }
    
    lastScrollTop = currentScroll;
    
    scrollTimeout = setTimeout(() => {
        navbar.classList.remove('hidden');
    }, 150);
});

// Custom Cursor Effect
let cursor = null;
let cursorDot = null;
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let cursorDotX = 0;
let cursorDotY = 0;

// Create custom cursor elements
function createCustomCursor() {
    // Only create on desktop
    if (window.innerWidth <= 768) return;
    
    cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    document.body.appendChild(cursorDot);
}

// Initialize cursor
createCustomCursor();

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Immediate update for dot (faster)
    if (cursorDot) {
        cursorDotX = mouseX;
        cursorDotY = mouseY;
        cursorDot.style.left = cursorDotX + 'px';
        cursorDot.style.top = cursorDotY + 'px';
    }
});

// Smooth cursor animation
function animateCursor() {
    if (cursor) {
        // Smooth follow for main cursor (slower)
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
    }
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Hover effects on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .btn, .service-card, .testimonial-card, .case-study, input, textarea');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursor) cursor.classList.add('hover');
        if (cursorDot) cursorDot.classList.add('hover');
    });
    
    el.addEventListener('mouseleave', () => {
        if (cursor) cursor.classList.remove('hover');
        if (cursorDot) cursorDot.classList.remove('hover');
    });
    
    el.addEventListener('mousedown', () => {
        if (cursor) cursor.classList.add('click');
    });
    
    el.addEventListener('mouseup', () => {
        if (cursor) cursor.classList.remove('click');
    });
});

// Hide cursor when mouse leaves window
document.addEventListener('mouseleave', () => {
    if (cursor) cursor.style.opacity = '0';
    if (cursorDot) cursorDot.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    if (cursor) cursor.style.opacity = '1';
    if (cursorDot) cursorDot.style.opacity = '1';
});

// Recreate cursor on resize (for mobile/desktop switching)
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth <= 768) {
            if (cursor) cursor.remove();
            if (cursorDot) cursorDot.remove();
            cursor = null;
            cursorDot = null;
        } else if (!cursor) {
            createCustomCursor();
        }
    }, 250);
});

// Page load animation
window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Calendar Popup Functionality
const calendarPopup = document.getElementById('calendarPopup');
const closeCalendarPopup = document.getElementById('closeCalendarPopup');
const bookCallButtons = document.querySelectorAll('#bookCallBtn, #bookCallBtn2');

// Open popup when clicking "Book a Discovery Call" buttons
bookCallButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        calendarPopup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
});

// Close popup when clicking close button
if (closeCalendarPopup) {
    closeCalendarPopup.addEventListener('click', () => {
        calendarPopup.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });
}

// Close popup when clicking overlay
if (calendarPopup) {
    const overlay = calendarPopup.querySelector('.calendar-popup-overlay');
    if (overlay) {
        overlay.addEventListener('click', () => {
            calendarPopup.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }
}

// Close popup with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && calendarPopup.classList.contains('active')) {
        calendarPopup.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
});

