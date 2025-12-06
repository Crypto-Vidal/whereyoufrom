// ========================================
// CART SYSTEM - STREETWEAR E-COMMERCE
// LocalStorage, Drawer, Add/Remove
// ========================================

class ShoppingCart {
  constructor() {
    this.cart = [];
    this.drawer = null;
    this.cartIcon = null;
    this.cartCount = null;
    this.isDrawerOpen = false;

    this.init();
  }

  init() {
    this.loadCartFromStorage();
    this.createCartDrawer();
    this.setupEventListeners();
    this.updateCartUI();
  }

  // Create Cart Drawer HTML
  createCartDrawer() {
    const drawer = document.createElement('div');
    drawer.className = 'cart-drawer';
    drawer.id = 'cartDrawer';
    drawer.innerHTML = `
      <div class="cart-drawer-header">
        <h2 class="cart-drawer-title">YOUR CART</h2>
        <span class="cart-drawer-close" id="cartDrawerClose">&times;</span>
      </div>
      <div class="cart-items" id="cartItemsContainer">
        <!-- Cart items will be inserted here -->
      </div>
      <div class="cart-drawer-footer">
        <div class="cart-total">
          <span class="cart-total-label">Total:</span>
          <span class="cart-total-amount" id="cartTotalAmount">$0.00</span>
        </div>
        <button class="cart-checkout-btn" id="cartCheckoutBtn">
          CHECKOUT NOW
        </button>
      </div>
    `;
    document.body.appendChild(drawer);

    this.drawer = drawer;
  }

  // Setup Event Listeners
  setupEventListeners() {
    // Cart icon click to open drawer
    this.cartIcon = document.querySelector('.cart-icon');
    if (this.cartIcon) {
      this.cartIcon.addEventListener('click', () => this.toggleDrawer());
    }

    // Close drawer button
    const closeBtn = document.getElementById('cartDrawerClose');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeDrawer());
    }

    // Checkout button
    const checkoutBtn = document.getElementById('cartCheckoutBtn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => this.checkout());
    }

    // Close drawer on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isDrawerOpen) {
        this.closeDrawer();
      }
    });

    // Close drawer on outside click
    this.drawer.addEventListener('click', (e) => {
      if (e.target === this.drawer) {
        this.closeDrawer();
      }
    });

    // Listen for add to cart events
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('product-add-btn')) {
        e.preventDefault();
        const productCard = e.target.closest('.product-card');
        if (productCard) {
          this.addToCartFromCard(productCard);
        }
      }
    });
  }

  // Add product to cart from product card
  addToCartFromCard(card) {
    const product = {
      id: card.dataset.id || Math.random().toString(36).substr(2, 9),
      name: card.querySelector('.product-name')?.textContent || 'Product',
      price: parseFloat(card.querySelector('.product-price')?.textContent.replace('$', '') || '0'),
      image: card.querySelector('.product-image')?.src || '../../public/assets/placeholder-shirt.png',
      size: card.querySelector('.product-size-select')?.value || 'M',
      quantity: 1
    };

    this.addToCart(product);
  }

  // Add item to cart
  addToCart(product) {
    // Check if product already exists in cart
    const existingItem = this.cart.find(item =>
      item.id === product.id && item.size === product.size
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push(product);
    }

    this.saveCartToStorage();
    this.updateCartUI();
    this.openDrawer();
    this.showAddedNotification(product.name);
  }

  // Remove item from cart
  removeFromCart(productId, size) {
    this.cart = this.cart.filter(item =>
      !(item.id === productId && item.size === size)
    );

    this.saveCartToStorage();
    this.updateCartUI();
  }

  // Update item quantity
  updateQuantity(productId, size, newQuantity) {
    const item = this.cart.find(item =>
      item.id === productId && item.size === size
    );

    if (item) {
      if (newQuantity <= 0) {
        this.removeFromCart(productId, size);
      } else {
        item.quantity = newQuantity;
        this.saveCartToStorage();
        this.updateCartUI();
      }
    }
  }

  // Get cart total
  getTotal() {
    return this.cart.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

  // Get cart item count
  getItemCount() {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }

  // Update Cart UI
  updateCartUI() {
    this.updateCartCount();
    this.renderCartItems();
    this.updateCartTotal();
  }

  // Update cart count badge
  updateCartCount() {
    this.cartCount = document.querySelector('.cart-count');
    const count = this.getItemCount();

    if (this.cartCount) {
      this.cartCount.textContent = count;
      this.cartCount.style.display = count > 0 ? 'block' : 'none';

      // Bounce animation
      this.cartCount.classList.remove('badge-bounce');
      void this.cartCount.offsetWidth; // Trigger reflow
      this.cartCount.classList.add('badge-bounce');
    }
  }

  // Render cart items in drawer
  renderCartItems() {
    const container = document.getElementById('cartItemsContainer');
    if (!container) return;

    if (this.cart.length === 0) {
      container.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty-icon">🛒</div>
          <p>Your cart is empty</p>
          <p style="font-size: 0.9rem; margin-top: 8px;">Add some fresh streetwear!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = this.cart.map(item => `
      <div class="cart-item cart-item-add" data-id="${item.id}" data-size="${item.size}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='../../public/assets/placeholder-shirt.png'">
        <div class="cart-item-details">
          <h4 class="cart-item-name">${item.name}</h4>
          <p class="cart-item-size">Size: ${item.size}</p>
          <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
          <div class="cart-item-controls">
            <div class="cart-item-qty">
              <button onclick="window.cart.updateQuantity('${item.id}', '${item.size}', ${item.quantity - 1})">−</button>
              <span>${item.quantity}</span>
              <button onclick="window.cart.updateQuantity('${item.id}', '${item.size}', ${item.quantity + 1})">+</button>
            </div>
            <button class="cart-item-remove" onclick="window.cart.removeFromCart('${item.id}', '${item.size}')">
              🗑️
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Update cart total
  updateCartTotal() {
    const totalElement = document.getElementById('cartTotalAmount');
    if (totalElement) {
      totalElement.textContent = `$${this.getTotal().toFixed(2)}`;
    }
  }

  // Toggle drawer
  toggleDrawer() {
    if (this.isDrawerOpen) {
      this.closeDrawer();
    } else {
      this.openDrawer();
    }
  }

  // Open drawer
  openDrawer() {
    this.drawer.classList.add('open');
    this.isDrawerOpen = true;
  }

  // Close drawer
  closeDrawer() {
    this.drawer.classList.remove('open');
    this.isDrawerOpen = false;
  }

  // Checkout
  checkout() {
    if (this.cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    // In a real app, this would navigate to checkout page
    alert(`Checkout coming soon!\n\nTotal: $${this.getTotal().toFixed(2)}\nItems: ${this.getItemCount()}`);

    // Optionally redirect to cart page
    // window.location.href = './cart.html';
  }

  // Show added notification
  showAddedNotification(productName) {
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification slide-in-down';
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: linear-gradient(135deg, var(--color-neon-cyan), var(--color-neon-red));
      color: var(--color-black);
      padding: 1rem 1.5rem;
      border-radius: 8px;
      font-family: var(--font-display);
      font-weight: 700;
      z-index: 1000;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    `;
    notification.textContent = `✓ ${productName} added to cart!`;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideInUp 0.4s ease-out reverse';
      setTimeout(() => {
        notification.remove();
      }, 400);
    }, 3000);
  }

  // Save cart to localStorage
  saveCartToStorage() {
    try {
      localStorage.setItem('streetwearCart', JSON.stringify(this.cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }

  // Load cart from localStorage
  loadCartFromStorage() {
    try {
      const saved = localStorage.getItem('streetwearCart');
      if (saved) {
        this.cart = JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
      this.cart = [];
    }
  }

  // Clear cart
  clearCart() {
    this.cart = [];
    this.saveCartToStorage();
    this.updateCartUI();
  }
}

// Initialize cart when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.cart = new ShoppingCart();
  });
} else {
  window.cart = new ShoppingCart();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ShoppingCart;
}
