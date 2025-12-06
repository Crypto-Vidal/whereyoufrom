// ========================================
// NAVIGATION - STREETWEAR E-COMMERCE
// Radial Menu & Standard Navigation
// ========================================

class Navigation {
  constructor() {
    this.radialNav = null;
    this.radialNavCircle = null;
    this.logo = null;
    this.mobileMenuToggle = null;
    this.navLinks = null;
    this.isRadialOpen = false;
    this.isMobileMenuOpen = false;

    this.init();
  }

  init() {
    this.createRadialNav();
    this.setupEventListeners();
    this.highlightActivePage();
    this.setupScrollBehavior();
  }

  // Create Radial Navigation Menu
  createRadialNav() {
    // Create radial nav container
    const radialNav = document.createElement('div');
    radialNav.className = 'radial-nav';
    radialNav.innerHTML = `
      <div class="radial-nav-circle" id="radialNavCircle">
        ${this.createRadialMenuItems()}
      </div>
      <div class="radial-nav-close" id="radialNavClose">&times;</div>
    `;
    document.body.appendChild(radialNav);

    this.radialNav = radialNav;
    this.radialNavCircle = document.getElementById('radialNavCircle');
  }

  // Create radial menu items with proper positioning
  createRadialMenuItems() {
    const menuItems = [
      { name: 'Home', icon: '🏠', url: './index.html' },
      { name: 'Shop', icon: '🛍️', url: './shop.html' },
      { name: 'Drops', icon: '🔥', url: './drops.html' },
      { name: 'Size', icon: '📏', url: './size.html' },
      { name: 'About', icon: '💎', url: './about.html' },
      { name: 'Cart', icon: '🛒', url: './cart.html' },
      { name: 'Contact', icon: '📧', url: './contact.html' }
    ];

    const radius = 180; // Distance from center
    const angleStep = (2 * Math.PI) / menuItems.length;
    let startAngle = -Math.PI / 2; // Start from top

    return menuItems.map((item, index) => {
      const angle = startAngle + (angleStep * index);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      return `
        <a href="${item.url}" class="radial-nav-item" style="transform: translate(${x}px, ${y}px);" data-page="${item.name.toLowerCase()}">
          <div class="radial-nav-icon">${item.icon}</div>
          <span>${item.name}</span>
        </a>
      `;
    }).join('');
  }

  // Setup Event Listeners
  setupEventListeners() {
    // Logo click to open radial menu
    this.logo = document.querySelector('.logo');
    if (this.logo) {
      this.logo.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleRadialNav();
      });
    }

    // Close radial nav
    const closeBtn = document.getElementById('radialNavClose');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeRadialNav());
    }

    // Close on background click
    this.radialNav.addEventListener('click', (e) => {
      if (e.target === this.radialNav) {
        this.closeRadialNav();
      }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isRadialOpen) {
        this.closeRadialNav();
      }
    });

    // Mobile menu toggle
    this.mobileMenuToggle = document.querySelector('.menu-toggle');
    this.navLinks = document.querySelector('.nav-links');

    if (this.mobileMenuToggle) {
      this.mobileMenuToggle.addEventListener('click', () => {
        this.toggleMobileMenu();
      });
    }

    // Close mobile menu on link click
    if (this.navLinks) {
      const links = this.navLinks.querySelectorAll('a');
      links.forEach(link => {
        link.addEventListener('click', () => {
          this.closeMobileMenu();
        });
      });
    }
  }

  // Toggle Radial Navigation
  toggleRadialNav() {
    if (this.isRadialOpen) {
      this.closeRadialNav();
    } else {
      this.openRadialNav();
    }
  }

  // Open Radial Navigation
  openRadialNav() {
    this.radialNav.classList.add('active');
    this.isRadialOpen = true;
    document.body.style.overflow = 'hidden';
  }

  // Close Radial Navigation
  closeRadialNav() {
    this.radialNav.classList.remove('active');
    this.isRadialOpen = false;
    document.body.style.overflow = '';
  }

  // Toggle Mobile Menu
  toggleMobileMenu() {
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  // Open Mobile Menu
  openMobileMenu() {
    this.navLinks.classList.add('mobile-open');
    this.isMobileMenuOpen = true;
    document.body.style.overflow = 'hidden';
  }

  // Close Mobile Menu
  closeMobileMenu() {
    if (this.navLinks) {
      this.navLinks.classList.remove('mobile-open');
    }
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  // Highlight active page in navigation
  highlightActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
      const linkPage = link.getAttribute('href').split('/').pop();
      if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // Setup scroll behavior for header
  setupScrollBehavior() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    });
  }

  // Navigate with graffiti transition
  navigateWithTransition(url) {
    // Create transition overlay
    const transition = document.createElement('div');
    transition.className = 'graffiti-transition';
    transition.innerHTML = '<div class="graffiti-spray"></div>';
    document.body.appendChild(transition);

    // Trigger animation
    setTimeout(() => {
      transition.classList.add('active');
    }, 10);

    // Navigate after animation
    setTimeout(() => {
      window.location.href = url;
    }, 600);
  }
}

// Initialize navigation when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.navigation = new Navigation();
  });
} else {
  window.navigation = new Navigation();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Navigation;
}
