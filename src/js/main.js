// ========================================
// MAIN APP - STREETWEAR E-COMMERCE
// Coordinates all modules and global features
// ========================================

// Product Database
const PRODUCTS = [
  {
    id: 'urban-legends-001',
    name: 'Urban Legends Tee',
    description: 'Premium heavyweight cotton with graffiti-inspired print',
    price: 65,
    image: '/public/assets/shirt-1.png',
    badge: 'NEW DROP',
    category: 'graphic'
  },
  {
    id: 'shadow-ops-002',
    name: 'Shadow Ops Tee',
    description: 'Dark aesthetic meets street culture',
    price: 70,
    image: '/public/assets/shirt-2.png',
    badge: 'LIMITED',
    category: 'graphic'
  },
  {
    id: 'neon-nights-003',
    name: 'Neon Nights Tee',
    description: 'Reflective print with neon accents',
    price: 75,
    image: '/public/assets/shirt-3.png',
    badge: 'HOT',
    category: 'graphic'
  },
  {
    id: 'smoke-signal-004',
    name: 'Smoke Signal Tee',
    description: 'Minimalist design with maximum impact',
    price: 60,
    image: '/public/assets/shirt-4.png',
    badge: null,
    category: 'minimal'
  },
  {
    id: 'street-cipher-005',
    name: 'Street Cipher Tee',
    description: 'Hidden messages in graffiti code',
    price: 68,
    image: '/public/assets/shirt-5.png',
    badge: 'NEW',
    category: 'graphic'
  },
  {
    id: 'midnight-run-006',
    name: 'Midnight Run Tee',
    description: 'Night culture collection piece',
    price: 72,
    image: '/public/assets/shirt-6.png',
    badge: 'EXCLUSIVE',
    category: 'graphic'
  },
  {
    id: 'concrete-jungle-007',
    name: 'Concrete Jungle Tee',
    description: 'Urban exploration meets fashion',
    price: 65,
    image: '/public/assets/shirt-7.png',
    badge: null,
    category: 'minimal'
  },
  {
    id: 'skyline-kings-008',
    name: 'Skyline Kings Tee',
    description: 'City silhouette with neon highlights',
    price: 70,
    image: '/public/assets/shirt-8.png',
    badge: 'TRENDING',
    category: 'graphic'
  }
];

// Main App Class
class StreetWearApp {
  constructor() {
    this.products = PRODUCTS;
    this.init();
  }

  init() {
    this.setupGlobalEventListeners();
    this.loadPageSpecificFeatures();
    this.setupProductFilters();
    this.addSmoothScrolling();
    this.setupImageFallbacks();
  }

  // Setup global event listeners
  setupGlobalEventListeners() {
    // Prevent default form submissions
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', (e) => {
        if (!form.hasAttribute('data-allow-submit')) {
          e.preventDefault();
        }
      });
    });

    // Add click analytics (can be extended)
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn')) {
        this.trackButtonClick(e.target);
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // ESC to close modals/drawers
      if (e.key === 'Escape') {
        this.closeAllOverlays();
      }

      // Ctrl/Cmd + K for search (future feature)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Open search modal
      }
    });
  }

  // Load page-specific features
  loadPageSpecificFeatures() {
    const currentPage = this.getCurrentPage();

    switch (currentPage) {
      case 'index.html':
      case '':
        this.initHomePage();
        break;
      case 'shop.html':
        this.initShopPage();
        break;
      case 'drops.html':
        this.initDropsPage();
        break;
      case 'size.html':
        this.initSizePage();
        break;
      case 'cart.html':
        this.initCartPage();
        break;
      case 'contact.html':
        this.initContactPage();
        break;
    }
  }

  // Get current page
  getCurrentPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
  }

  // Initialize Home Page
  initHomePage() {
    this.renderFeaturedProducts();

    // Add typewriter effect to hero if needed
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle && heroSubtitle.dataset.typewriter) {
      const text = heroSubtitle.textContent;
      Animations.typewriter(heroSubtitle, text, 100);
    }
  }

  // Initialize Shop Page
  initShopPage() {
    this.renderAllProducts();
  }

  // Initialize Drops Page
  initDropsPage() {
    // Set countdown for next drop (example: 7 days from now)
    const nextDrop = new Date();
    nextDrop.setDate(nextDrop.getDate() + 7);
    nextDrop.setHours(18, 0, 0, 0); // 6 PM

    Animations.startCountdown(nextDrop.getTime(), 'dropCountdown');

    // Render upcoming drop products
    this.renderDropProducts();
  }

  // Initialize Size Page
  initSizePage() {
    // Sizing is handled by sizing.js
  }

  // Initialize Cart Page
  initCartPage() {
    this.renderCartPage();
  }

  // Initialize Contact Page
  initContactPage() {
    this.setupContactForm();
  }

  // Render featured products on home page
  renderFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;

    const featured = this.products.slice(0, 4);
    container.innerHTML = featured.map(product => this.createProductCard(product)).join('');

    // Add stagger animation
    setTimeout(() => {
      Animations.staggerAnimation('#featuredProducts .product-card', 150);
    }, 100);
  }

  // Render all products on shop page
  renderAllProducts() {
    const container = document.getElementById('productGrid');
    if (!container) return;

    container.innerHTML = this.products.map(product => this.createProductCard(product)).join('');
  }

  // Render drop products
  renderDropProducts() {
    const container = document.getElementById('dropProducts');
    if (!container) return;

    const drops = this.products.filter(p => p.badge === 'NEW DROP' || p.badge === 'LIMITED');
    container.innerHTML = drops.map(product => this.createProductCard(product)).join('');
  }

  // Create product card HTML
  createProductCard(product) {
    return `
      <div class="product-card tilt-card" data-id="${product.id}" data-category="${product.category}">
        <div class="product-image-wrapper">
          <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='/public/assets/placeholder-shirt.png'">
          <div class="product-graffiti-overlay"></div>
          ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
        </div>
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-footer">
            <span class="product-price">$${product.price}</span>
            <button class="product-add-btn">ADD TO CART</button>
          </div>
        </div>
      </div>
    `;
  }

  // Setup product filters
  setupProductFilters() {
    const filterSelects = document.querySelectorAll('.filter-select');

    filterSelects.forEach(select => {
      select.addEventListener('change', () => {
        this.applyFilters();
      });
    });
  }

  // Apply product filters
  applyFilters() {
    const categoryFilter = document.getElementById('categoryFilter')?.value || 'all';
    const sortFilter = document.getElementById('sortFilter')?.value || 'featured';

    let filteredProducts = [...this.products];

    // Filter by category
    if (categoryFilter !== 'all') {
      filteredProducts = filteredProducts.filter(p => p.category === categoryFilter);
    }

    // Sort
    switch (sortFilter) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    // Re-render products
    const container = document.getElementById('productGrid');
    if (container) {
      container.innerHTML = filteredProducts.map(product => this.createProductCard(product)).join('');
    }
  }

  // Render cart page
  renderCartPage() {
    const container = document.getElementById('cartPageItems');
    if (!container || !window.cart) return;

    const cartItems = window.cart.cart;

    if (cartItems.length === 0) {
      container.innerHTML = `
        <div class="cart-empty" style="padding: 4rem; text-align: center;">
          <div style="font-size: 5rem; opacity: 0.3;">🛒</div>
          <h2 style="margin: 1rem 0;">Your cart is empty</h2>
          <p style="opacity: 0.7; margin-bottom: 2rem;">Add some fresh streetwear!</p>
          <a href="./shop.html" class="btn btn-primary">SHOP NOW</a>
        </div>
      `;
      return;
    }

    container.innerHTML = cartItems.map(item => `
      <div class="cart-page-item">
        <img src="${item.image}" alt="${item.name}" class="cart-page-item-image" onerror="this.src='/public/assets/placeholder-shirt.png'">
        <div class="cart-page-item-details">
          <h3>${item.name}</h3>
          <p>Size: ${item.size}</p>
          <p class="price">$${item.price.toFixed(2)}</p>
        </div>
        <div class="cart-page-item-controls">
          <div class="quantity-controls">
            <button onclick="window.cart.updateQuantity('${item.id}', '${item.size}', ${item.quantity - 1})">−</button>
            <span>${item.quantity}</span>
            <button onclick="window.cart.updateQuantity('${item.id}', '${item.size}', ${item.quantity + 1})">+</button>
          </div>
          <button class="remove-btn" onclick="window.cart.removeFromCart('${item.id}', '${item.size}')">Remove</button>
        </div>
        <div class="cart-page-item-total">
          $${(item.price * item.quantity).toFixed(2)}
        </div>
      </div>
    `).join('');

    // Update total
    const totalEl = document.getElementById('cartPageTotal');
    if (totalEl) {
      totalEl.textContent = `$${window.cart.getTotal().toFixed(2)}`;
    }
  }

  // Setup contact form
  setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = {
        name: form.querySelector('[name="name"]')?.value,
        email: form.querySelector('[name="email"]')?.value,
        message: form.querySelector('[name="message"]')?.value
      };

      // Simulate form submission
      this.submitContactForm(formData);
    });
  }

  // Submit contact form
  submitContactForm(data) {
    console.log('Contact form submitted:', data);

    // Show success message
    alert('Thanks for reaching out! We\'ll get back to you soon. 🔥');

    // Reset form
    document.getElementById('contactForm')?.reset();
  }

  // Add smooth scrolling to anchor links
  addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // Setup image fallbacks
  setupImageFallbacks() {
    document.querySelectorAll('img').forEach(img => {
      img.addEventListener('error', function() {
        if (!this.dataset.fallbackApplied) {
          this.src = '/public/assets/placeholder-shirt.png';
          this.dataset.fallbackApplied = 'true';
        }
      });
    });
  }

  // Close all overlays
  closeAllOverlays() {
    // Close cart drawer
    if (window.cart && window.cart.isDrawerOpen) {
      window.cart.closeDrawer();
    }

    // Close radial nav
    if (window.navigation && window.navigation.isRadialOpen) {
      window.navigation.closeRadialNav();
    }

    // Close mobile menu
    if (window.navigation && window.navigation.isMobileMenuOpen) {
      window.navigation.closeMobileMenu();
    }
  }

  // Track button clicks (for analytics)
  trackButtonClick(button) {
    const buttonText = button.textContent.trim();
    const buttonClass = button.className;
    console.log(`Button clicked: ${buttonText} (${buttonClass})`);
    // Extend with real analytics
  }
}

// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.app = new StreetWearApp();
  });
} else {
  window.app = new StreetWearApp();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StreetWearApp;
}
