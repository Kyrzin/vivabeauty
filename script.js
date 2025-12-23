// ============================================
// VIVA BEAUTY FULDA - ENHANCED JAVASCRIPT
// ============================================

// === EMAILJS CONFIGURATION ===
// Replace these with your actual EmailJS credentials from https://www.emailjs.com/
const EMAILJS_CONFIG = {
    SERVICE_ID: 'YOUR_SERVICE_ID',      // e.g., 'service_abc123'
    TEMPLATE_ID: 'YOUR_TEMPLATE_ID',    // e.g., 'template_xyz789'
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY'       // e.g., 'user_abcdefghijk'
};

// Initialize EmailJS
(function () {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        console.log('✅ EmailJS initialized');
    } else {
        console.warn('⚠️ EmailJS library not loaded');
    }
})();

// === GOOGLE ANALYTICS EVENT TRACKING ===
function trackEvent(eventName, eventParams = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventParams);
        console.log('📊 GA Event:', eventName, eventParams);
    }
}

// === SMOOTH SCROLLING FOR NAVIGATION ===
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Track navigation clicks
        trackEvent('navigation_click', {
            link_text: this.textContent,
            link_url: href
        });

        // Only if link starts with # (anchor on current page)
        if (href.startsWith('#')) {
            e.preventDefault();

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// === SCROLL ANIMATIONS ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.fade-in, .scale-in').forEach(el => {
    observer.observe(el);
});

// === HEADER SCROLL EFFECT ===
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// === MAGNETIC BUTTON EFFECT ===
const magneticButtons = document.querySelectorAll('.button');

magneticButtons.forEach(button => {
    button.addEventListener('mousemove', function (e) {
        const rect = button.getBoundingClientRect();
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - buttonCenterX) * 0.3;
        const deltaY = (e.clientY - buttonCenterY) * 0.3;

        button.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
    });

    button.addEventListener('mouseleave', function () {
        button.style.transform = 'translate(0, 0) scale(1)';
    });
});



// === TYPING EFFECT FOR HERO SUBTITLE ===
const subtitle = document.getElementById('hero-subtitle');

if (subtitle) {
    const text = subtitle.getAttribute('data-text');
    subtitle.textContent = '';
    subtitle.classList.add('typing');

    let charIndex = 0;

    function typeCharacter() {
        if (charIndex < text.length) {
            subtitle.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeCharacter, 50); // 50ms per character
        } else {
            // Keep cursor blinking for 2 more seconds, then remove
            setTimeout(() => {
                subtitle.classList.remove('typing');
            }, 2000);
        }
    }

    // Start typing after 1 second delay
    setTimeout(typeCharacter, 1000);
}

// === FORM HANDLING WITH EMAILJS ===
const contactForm = document.querySelector('#contact form');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!name || !email || !message) {
            showNotification('Bitte füllen Sie alle Felder aus.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
            return;
        }

        // Get submit button
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;

        // Show loading state
        submitButton.disabled = true;
        submitButton.classList.add('loading');

        try {
            // Check if EmailJS is configured
            if (EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID') {
                // Demo mode - simulate email sending
                console.log('📧 Demo Mode: Email would be sent with:', { name, email, message });

                await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay

                showNotification(
                    '✅ Vielen Dank für Ihre Nachricht! (Demo-Modus - konfigurieren Sie EmailJS für echten Versand)',
                    'success'
                );

                // Track form submission
                trackEvent('form_submission', {
                    form_name: 'contact_form',
                    demo_mode: true
                });

                contactForm.reset();
            } else {
                // Real EmailJS sending
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    message: message,
                    reply_to: email
                };

                const response = await emailjs.send(
                    EMAILJS_CONFIG.SERVICE_ID,
                    EMAILJS_CONFIG.TEMPLATE_ID,
                    templateParams
                );

                console.log('✅ Email sent successfully:', response);

                showNotification(
                    'Vielen Dank für Ihre Nachricht! Wir werden uns in Kürze bei Ihnen melden.',
                    'success'
                );

                // Track successful submission
                trackEvent('form_submission', {
                    form_name: 'contact_form',
                    success: true
                });

                contactForm.reset();
            }
        } catch (error) {
            console.error('❌ Error sending email:', error);

            showNotification(
                'Beim Senden der Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns telefonisch.',
                'error'
            );

            // Track error
            trackEvent('form_submission', {
                form_name: 'contact_form',
                success: false,
                error: error.message
            });
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
        }
    });
}

// === NOTIFICATION SYSTEM ===
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    const icon = type === 'success' ? '✓' : '✕';

    notification.innerHTML = `
        <div class="icon">${icon}</div>
        <div class="message">${message}</div>
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease-out';
        setTimeout(() => notification.remove(), 400);
    }, 5000);
}

// === SOCIAL MEDIA CLICK TRACKING ===
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('click', function () {
        const platform = this.getAttribute('aria-label');
        trackEvent('social_click', {
            platform: platform,
            url: this.href
        });
    });
});

// === CTA BUTTON TRACKING ===
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function () {
        trackEvent('cta_click', {
            button_text: this.textContent,
            button_location: this.closest('section')?.id || 'unknown'
        });
    });
});

// === PAGE LOAD TRACKING ===
window.addEventListener('load', () => {
    trackEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href
    });

    console.log('🎉 Page loaded successfully');
});

// === CAROUSEL FUNCTIONALITY ===
const carousel = {
    track: null,
    slides: null,
    prevBtn: null,
    nextBtn: null,
    dots: null,
    currentIndex: 0,
    autoPlayInterval: null,
    autoPlayDelay: 5000,

    init() {
        // Get DOM elements
        this.track = document.querySelector('.carousel-track');
        this.slides = document.querySelectorAll('.carousel-slide');
        this.prevBtn = document.querySelector('.carousel-btn-prev');
        this.nextBtn = document.querySelector('.carousel-btn-next');
        this.dots = document.querySelectorAll('.pagination-dot');

        if (!this.track || !this.slides.length) {
            console.log('⚠️ Carousel elements not found');
            return;
        }

        console.log('🎠 Carousel initialized with', this.slides.length, 'slides');

        // Set up event listeners
        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());

        // Pagination dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });

        // Touch/swipe support
        this.addTouchSupport();

        // Auto-play
        this.startAutoPlay();

        // Pause on hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => this.stopAutoPlay());
            carouselContainer.addEventListener('mouseleave', () => this.startAutoPlay());
        }

        // Track carousel interactions
        this.prevBtn?.addEventListener('click', () => {
            trackEvent('carousel_navigation', { direction: 'previous' });
        });
        this.nextBtn?.addEventListener('click', () => {
            trackEvent('carousel_navigation', { direction: 'next' });
        });
    },

    goToSlide(index) {
        // Remove active class from current slide and dot
        this.slides[this.currentIndex]?.classList.remove('active');
        this.dots[this.currentIndex]?.classList.remove('active');

        // Update index
        this.currentIndex = index;

        // Add active class to new slide and dot
        this.slides[this.currentIndex]?.classList.add('active');
        this.dots[this.currentIndex]?.classList.add('active');

        // Move track
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;

        // Track slide view
        trackEvent('carousel_slide_view', {
            slide_index: this.currentIndex,
            slide_alt: this.slides[this.currentIndex]?.querySelector('img')?.alt
        });
    },

    next() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    },

    prev() {
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    },

    startAutoPlay() {
        this.stopAutoPlay(); // Clear any existing interval
        this.autoPlayInterval = setInterval(() => this.next(), this.autoPlayDelay);
    },

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    },

    addTouchSupport() {
        let touchStartX = 0;
        let touchEndX = 0;

        this.track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        this.track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, { passive: true });
    },

    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                this.next();
                trackEvent('carousel_swipe', { direction: 'left' });
            } else {
                // Swipe right - previous slide
                this.prev();
                trackEvent('carousel_swipe', { direction: 'right' });
            }
        }
    }
};

// Initialize carousel when page is fully loaded
window.addEventListener('load', () => {
    carousel.init();
});

// === GOLD DUST / FIREFLIES EFFECT ===
const particlesEffect = {
    canvas: null,
    ctx: null,
    particles: [],
    animationId: null,
    isActive: true,
    mouse: { x: null, y: null, radius: 100 },

    // Configuration
    config: {
        particleCount: 70, // Number of particles
        colors: [
            { r: 212, g: 175, b: 55 },   // Classic Gold
            { r: 255, g: 215, b: 0 },    // Bright Gold
            { r: 255, g: 223, b: 186 },  // Pale Gold
            { r: 244, g: 228, b: 193 }   // Champagne
        ],
        minRadius: 1,
        maxRadius: 3,
        minSpeed: 0.1,
        maxSpeed: 0.4, // Slow movement
        glowStrength: 10,
        mouseRepelForce: 2, // Slight push
    },

    init() {
        this.canvas = document.getElementById('particles-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.resize();
        this.createParticles();
        this.addEventListeners();
        this.animate();

        console.log('✨ Gold Dust effect initialized');
    },

    resize() {
        const heroSection = document.getElementById('hero');
        if (!heroSection) return;
        this.canvas.width = heroSection.offsetWidth;
        this.canvas.height = heroSection.offsetHeight;
    },

    createParticles() {
        this.particles = [];
        const count = this.getParticleCount();

        for (let i = 0; i < count; i++) {
            this.particles.push(this.createParticle());
        }
    },

    getParticleCount() {
        const width = this.canvas.width;
        if (width < 768) return Math.floor(this.config.particleCount * 0.5);
        if (width < 1200) return Math.floor(this.config.particleCount * 0.75);
        return this.config.particleCount;
    },

    createParticle() {
        const color = this.config.colors[Math.floor(Math.random() * this.config.colors.length)];

        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            radius: Math.random() * (this.config.maxRadius - this.config.minRadius) + this.config.minRadius,
            color: color,
            // Random direction
            vx: (Math.random() - 0.5) * this.config.maxSpeed,
            vy: (Math.random() - 0.5) * this.config.maxSpeed,
            // Floating properties
            angle: Math.random() * Math.PI * 2,
            angleSpeed: (Math.random() - 0.5) * 0.02,
            // Opacity animation (fading in/out)
            alpha: Math.random() * 0.5 + 0.1,
            alphaSpeed: Math.random() * 0.005 + 0.002,
            targetAlpha: Math.random() * 0.6 + 0.2,
        };
    },

    addEventListeners() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });

        const hero = document.getElementById('hero');
        if (hero) {
            hero.addEventListener('mousemove', (e) => {
                const rect = hero.getBoundingClientRect();
                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
            });

            hero.addEventListener('mouseleave', () => {
                this.mouse.x = null;
                this.mouse.y = null;
            });
        }
    },

    animate() {
        if (!this.isActive) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.updateParticles();
        this.drawParticles();
        this.animationId = requestAnimationFrame(() => this.animate());
    },

    updateParticles() {
        for (let p of this.particles) {
            // Natural floating movement using sine waves
            p.angle += p.angleSpeed;
            p.x += Math.cos(p.angle) * 0.3 + p.vx;
            p.y += Math.sin(p.angle) * 0.3 + p.vy;

            // Opacity blinking (firefly effect)
            p.alpha += p.alphaSpeed;
            if (p.alpha > p.targetAlpha || p.alpha < 0.1) {
                p.alphaSpeed *= -1; // Reverse fading direction
            }
            // Clamp alpha
            p.alpha = Math.max(0, Math.min(1, p.alpha));

            // Mouse Interaction (Repel)
            if (this.mouse.x !== null) {
                const dx = p.x - this.mouse.x;
                const dy = p.y - this.mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < this.mouse.radius) {
                    const angle = Math.atan2(dy, dx);
                    const force = (this.mouse.radius - dist) / this.mouse.radius;
                    // Move away gently
                    p.x += Math.cos(angle) * force * this.config.mouseRepelForce;
                    p.y += Math.sin(angle) * force * this.config.mouseRepelForce;
                }
            }

            // Screen wrapping (infinite loop)
            if (p.x < -10) p.x = this.canvas.width + 10;
            if (p.x > this.canvas.width + 10) p.x = -10;
            if (p.y < -10) p.y = this.canvas.height + 10;
            if (p.y > this.canvas.height + 10) p.y = -10;
        }
    },

    drawParticles() {
        for (let p of this.particles) {
            this.ctx.save();

            // Draw Glow
            this.ctx.shadowBlur = this.config.glowStrength;
            this.ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha})`;

            // Draw Core
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha})`;
            this.ctx.fill();

            this.ctx.restore();
        }
    },

    destroy() {
        if (this.animationId) cancelAnimationFrame(this.animationId);
        this.particles = [];
        this.isActive = false;
    }
};

// Initialize particles when page is fully loaded
window.addEventListener('load', () => {
    particlesEffect.init();
});

// === CONSOLE WELCOME MESSAGE ===
console.log('%c🌟 Viva Beauty Fulda', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cWebsite loaded successfully!', 'font-size: 14px; color: #764ba2;');
console.log('%c📧 EmailJS Status:', EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID' ? 'Demo Mode' : 'Configured', 'font-size: 12px;');
console.log('%c📊 Google Analytics:', typeof gtag !== 'undefined' ? 'Active' : 'Not configured', 'font-size: 12px;');