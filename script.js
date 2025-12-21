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

// === GALLERY IMAGE CLICK TRACKING ===
document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', function () {
        trackEvent('gallery_image_click', {
            image_alt: this.alt,
            image_src: this.src
        });
    });
});

// === CONSOLE WELCOME MESSAGE ===
console.log('%c🌟 Viva Beauty Fulda', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cWebsite loaded successfully!', 'font-size: 14px; color: #764ba2;');
console.log('%c📧 EmailJS Status:', EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID' ? 'Demo Mode' : 'Configured', 'font-size: 12px;');
console.log('%c📊 Google Analytics:', typeof gtag !== 'undefined' ? 'Active' : 'Not configured', 'font-size: 12px;');