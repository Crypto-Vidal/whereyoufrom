# STREETWEAR CO. - Premium E-Commerce Website

A fully functional, multi-page streetwear e-commerce website with a dark, smoky cinematic aesthetic inspired by Michael Jordan sneaker drops, Nike-level polish, hip-hop culture, and graffiti art.

## 🔥 Features

### Core Features
- **Multi-page architecture** with seamless navigation between 7 pages
- **Radial cursor navigation** - Click logo for circular menu that blooms around cursor
- **Smoky parallax hero** with layered smoke textures and graffiti backgrounds
- **Product spotlight effect** - Cursor-tracking spotlight on product grids
- **Smart Size System** - 3-question deterministic quiz with fit meter
- **Cart system** - Slide-out drawer + full cart page with localStorage persistence
- **Countdown timers** - Sneaker-drop style hype for new releases
- **Responsive design** - Mobile and desktop optimized

### Pages
1. **Home (index.html)** - Smoky parallax hero, featured products, brand story
2. **Shop (shop.html)** - Full product grid with filters and spotlight effects
3. **Drops (drops.html)** - Countdown timers, hype graphics, limited releases
4. **Size Guide (size.html)** - Interactive 3-question quiz with deterministic logic
5. **About (about.html)** - Hip-hop inspired brand story and values
6. **Cart (cart.html)** - Full cart page with checkout
7. **Contact (contact.html)** - Contact form with smoky graffiti background

### Design Language
- **Colors**: Deep blacks (#05080B), neon cyan (#00F0FF), neon red (#FF0055)
- **Typography**: Bebas Neue for headers, Inter for body
- **Aesthetic**: Graffiti textures, smoke effects, street grit, premium polish
- **Animations**: Parallax scrolling, tilt cards, graffiti transitions, neon pulses

## 📁 Project Structure

```
/whereyoufrom
├── public/
│   └── assets/                 # Placeholder images
│       ├── graffiti-1.png
│       ├── graffiti-2.png
│       ├── smoke-layer.png
│       ├── logo.png
│       ├── shirt-1.png through shirt-8.png
│       └── placeholder-shirt.png
├── src/
│   ├── pages/
│   │   ├── index.html         # Home page
│   │   ├── shop.html          # Shop page
│   │   ├── drops.html         # Drops page
│   │   ├── size.html          # Size guide
│   │   ├── about.html         # About page
│   │   ├── cart.html          # Cart page
│   │   └── contact.html       # Contact page
│   ├── css/
│   │   ├── global.css         # Global styles, variables, utilities
│   │   ├── components.css     # Component-specific styles
│   │   └── animations.css     # Animation keyframes and effects
│   └── js/
│       ├── main.js            # Main app logic and coordination
│       ├── navigation.js      # Radial nav and standard navigation
│       ├── cart.js            # Shopping cart with localStorage
│       ├── sizing.js          # Smart size quiz logic
│       └── animations.js      # Parallax, spotlight, scroll effects
├── vercel.json                # Vercel deployment config
└── README.md                  # This file
```

## 🚀 Setup & Installation

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd whereyoufrom
   ```

2. **No build step required!**
   This is a pure HTML/CSS/JS project with no dependencies.

3. **Open locally**
   - Simply open `src/pages/index.html` in your browser, OR
   - Use a local server (recommended):
   ```bash
   # Using Python
   python -m http.server 8000
   # Then visit http://localhost:8000/src/pages/index.html

   # Using Node.js npx
   npx serve
   ```

### Deploy to Vercel

1. **Install Vercel CLI** (optional)
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

   Or simply:
   - Push to GitHub
   - Connect repo to Vercel
   - Auto-deploys on push

The `vercel.json` configuration handles routing automatically.

## 🛍️ Managing Products

Products are defined in `/src/js/main.js` in the `PRODUCTS` array:

```javascript
const PRODUCTS = [
  {
    id: 'unique-id-here',
    name: 'Product Name',
    description: 'Product description',
    price: 65,
    image: '/public/assets/shirt-1.png',
    badge: 'NEW DROP',  // Optional: NEW DROP, LIMITED, HOT, etc.
    category: 'graphic' // graphic or minimal
  },
  // Add more products...
];
```

### To Add a New Product:
1. Add product image to `/public/assets/`
2. Add product object to `PRODUCTS` array in `main.js`
3. Page will automatically render the new product

### To Remove a Product:
1. Remove the product object from the `PRODUCTS` array

## 🎨 Customizing Assets

### Graffiti Textures
Replace these files in `/public/assets/`:
- `graffiti-1.png` - Main graffiti background
- `graffiti-2.png` - Secondary graffiti overlay
- `smoke-layer.png` - Smoke texture overlay

**Recommended specs:**
- Format: PNG with transparency
- Size: 1920x1080 or larger
- Keep file size under 500KB for performance

### Product Images
Product images should be:
- Format: PNG or JPG
- Aspect ratio: 4:5 (e.g., 800x1000px)
- Background: Transparent or solid color
- File naming: `shirt-1.png`, `shirt-2.png`, etc.

### Logo
Replace `logo.png` with your brand logo:
- Transparent PNG recommended
- Size: 200x200px minimum
- The logo text in the header is in the HTML - edit in each page's `.logo` element

## ⚙️ Customizing the Smart Size Quiz

The sizing logic is in `/src/js/sizing.js`:

### Size Matrix
Modify the `getBaseSize()` method:

```javascript
getBaseSize(height, chest) {
  const sizeMatrix = {
    'short-slim': 'S',
    'short-average': 'M',
    'short-broad': 'L',
    'average-slim': 'S',
    'average-average': 'M',
    'average-broad': 'L',
    'tall-slim': 'M',
    'tall-average': 'L',
    'tall-broad': 'XL'
  };
  return sizeMatrix[`${height}-${chest}`] || 'M';
}
```

### Measurements
Update the `getMeasurements()` method to match your products:

```javascript
getMeasurements(size) {
  const measurements = {
    'S': { chest: '36-38"', length: '28"', shoulders: '18"' },
    'M': { chest: '38-40"', length: '29"', shoulders: '19"' },
    // ... update these values
  };
  return measurements[size];
}
```

## 🎨 Customizing Colors

All colors are defined in CSS variables in `/src/css/global.css`:

```css
:root {
  --color-black: #05080B;
  --color-neon-cyan: #00F0FF;
  --color-neon-red: #FF0055;
  /* ... etc */
}
```

Change these values to customize the entire color scheme.

## 🔧 Key Functionality

### Cart System
- **Add to cart**: Click "ADD TO CART" on any product
- **View cart**: Click cart icon (🛒) or visit `/cart.html`
- **Persistence**: Cart data saved to localStorage
- **Functions**: Add, remove, update quantity
- **Drawer**: Slide-out drawer on any page

### Navigation
- **Standard nav**: Top navigation bar with links
- **Radial nav**: Click logo to open circular menu
- **Mobile**: Hamburger menu for mobile devices

### Animations
- **Parallax**: Mouse movement parallax on hero
- **Spotlight**: Cursor-tracking spotlight on product grids
- **Scroll reveal**: Elements fade in on scroll
- **Tilt cards**: 3D tilt effect on product cards

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Performance

- No external dependencies
- Optimized CSS animations
- GPU-accelerated transforms
- Lazy loading ready (add to images if needed)
- Lightweight (~100KB total CSS/JS)

## 🐛 Troubleshooting

### Images not loading
- Check that images exist in `/public/assets/`
- Verify image paths in HTML/JS are correct
- Use browser DevTools to check 404 errors

### Cart not working
- Check browser console for errors
- Verify localStorage is enabled
- Clear localStorage and test: `localStorage.clear()`

### Navigation issues
- Verify all page links use correct relative paths
- Check that JS files are loading in correct order

### Animations not working
- Check if browser supports CSS animations
- Verify JS files are loading without errors
- Check for JavaScript console errors

## 📝 Credits

**Built with:**
- Pure HTML5, CSS3, JavaScript (ES6+)
- No frameworks or libraries
- Google Fonts (Inter, Bebas Neue)

**Design Inspiration:**
- Nike SNKRS app
- Supreme drops
- Graffiti culture
- Hip-hop aesthetics
- Jordan Brand launches

## 📄 License

This is a demo/portfolio project. Customize and use as needed for your projects.

---

**Questions?** Check the Contact page or open an issue!

**Built with street culture energy.** 🔥
