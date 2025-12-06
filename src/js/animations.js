// ========================================
// ANIMATIONS - STREETWEAR E-COMMERCE
// Parallax, Spotlight, Scroll Reveals
// ========================================

class Animations {
  constructor() {
    this.init();
  }

  init() {
    this.initParallax();
    this.initSpotlight();
    this.initScrollReveal();
    this.initTiltCards();
    this.initSmokeParticles();
  }

  // Parallax Effect for Hero Section
  initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-layer');

    if (parallaxElements.length > 0) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(el => {
          const speed = el.dataset.speed || 0.5;
          const yPos = -(scrolled * speed);
          el.style.transform = `translateY(${yPos}px)`;
        });
      });
    }

    // Mouse parallax for hero content
    const hero = document.querySelector('.hero');
    if (hero) {
      document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        const moveX = (mouseX - 0.5) * 30;
        const moveY = (mouseY - 0.5) * 30;

        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
          heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
      });
    }
  }

  // Spotlight Effect for Product Grids
  initSpotlight() {
    const containers = document.querySelectorAll('.spotlight-container');

    containers.forEach(container => {
      // Create spotlight element
      const spotlight = document.createElement('div');
      spotlight.className = 'spotlight';
      container.appendChild(spotlight);

      // Track mouse movement
      container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        spotlight.style.left = `${x}px`;
        spotlight.style.top = `${y}px`;
      });

      container.addEventListener('mouseenter', () => {
        spotlight.style.opacity = '1';
      });

      container.addEventListener('mouseleave', () => {
        spotlight.style.opacity = '0';
      });
    });
  }

  // Scroll Reveal Animations
  initScrollReveal() {
    const revealElements = document.querySelectorAll(
      '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale'
    );

    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;

      revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
          el.classList.add('revealed');
        }
      });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on load
  }

  // Tilt Card Effect
  initTiltCards() {
    const tiltCards = document.querySelectorAll('.tilt-card, .product-card');

    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.setProperty('--tilt-x', `${rotateX}deg`);
        card.style.setProperty('--tilt-y', `${rotateY}deg`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
      });
    });
  }

  // Smoke Particles Effect
  initSmokeParticles() {
    const smokeContainers = document.querySelectorAll('.hero-smoke, .smoke-container');

    smokeContainers.forEach(container => {
      // Create smoke particles
      for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'smoke-particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.animationDuration = `${8 + Math.random() * 4}s`;
        container.appendChild(particle);
      }
    });
  }

  // Graffiti Transition Effect
  static triggerGraffitiTransition() {
    const transition = document.createElement('div');
    transition.className = 'graffiti-transition';
    transition.innerHTML = '<div class="graffiti-spray"></div>';
    document.body.appendChild(transition);

    setTimeout(() => {
      transition.classList.add('active');
    }, 10);

    setTimeout(() => {
      transition.remove();
    }, 1000);
  }

  // Countdown Timer
  static startCountdown(targetDate, elementId) {
    const countdownElement = document.getElementById(elementId);
    if (!countdownElement) return;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        countdownElement.innerHTML = '<span class="text-neon-red">LIVE NOW!</span>';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      countdownElement.innerHTML = `
        <div class="countdown-segment">
          <span class="countdown-number">${String(days).padStart(2, '0')}</span>
          <span class="countdown-label">DAYS</span>
        </div>
        <div class="countdown-separator">:</div>
        <div class="countdown-segment">
          <span class="countdown-number">${String(hours).padStart(2, '0')}</span>
          <span class="countdown-label">HRS</span>
        </div>
        <div class="countdown-separator">:</div>
        <div class="countdown-segment">
          <span class="countdown-number">${String(minutes).padStart(2, '0')}</span>
          <span class="countdown-label">MIN</span>
        </div>
        <div class="countdown-separator">:</div>
        <div class="countdown-segment">
          <span class="countdown-number">${String(seconds).padStart(2, '0')}</span>
          <span class="countdown-label">SEC</span>
        </div>
      `;
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // Typewriter Effect
  static typewriter(element, text, speed = 50) {
    if (!element) return;

    let i = 0;
    element.textContent = '';

    const type = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    };

    type();
  }

  // Stagger Animation for Lists
  static staggerAnimation(selector, delay = 100) {
    const items = document.querySelectorAll(selector);

    items.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px)';

      setTimeout(() => {
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, index * delay);
    });
  }

  // Page Transition
  static pageTransition(url) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, var(--color-neon-cyan), var(--color-neon-red));
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.4s ease;
    `;
    document.body.appendChild(overlay);

    setTimeout(() => {
      overlay.style.opacity = '1';
    }, 10);

    setTimeout(() => {
      window.location.href = url;
    }, 400);
  }

  // Shake Animation
  static shake(element) {
    if (!element) return;

    element.classList.remove('shake');
    void element.offsetWidth; // Trigger reflow
    element.classList.add('shake');

    setTimeout(() => {
      element.classList.remove('shake');
    }, 500);
  }

  // Pulse Animation
  static pulse(element, duration = 1000) {
    if (!element) return;

    const originalTransform = element.style.transform;

    element.style.transition = `transform ${duration / 2}ms ease`;
    element.style.transform = 'scale(1.1)';

    setTimeout(() => {
      element.style.transform = originalTransform;

      setTimeout(() => {
        element.style.transition = '';
      }, duration / 2);
    }, duration / 2);
  }

  // Fade In Element
  static fadeIn(element, duration = 600) {
    if (!element) return;

    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ease`;

    setTimeout(() => {
      element.style.opacity = '1';
    }, 10);
  }

  // Slide In Element
  static slideIn(element, direction = 'up', duration = 600) {
    if (!element) return;

    const transforms = {
      up: 'translateY(50px)',
      down: 'translateY(-50px)',
      left: 'translateX(50px)',
      right: 'translateX(-50px)'
    };

    element.style.opacity = '0';
    element.style.transform = transforms[direction] || transforms.up;
    element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;

    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translate(0, 0)';
    }, 10);
  }
}

// Initialize animations when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.animations = new Animations();
  });
} else {
  window.animations = new Animations();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Animations;
}
