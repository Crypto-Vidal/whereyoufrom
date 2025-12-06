# 🚀 QUICK START GUIDE

## ✅ FIXED! Site is now working

All issues have been resolved:
- ✅ Image paths corrected
- ✅ Placeholder images added
- ✅ All pages functional
- ✅ Navigation working
- ✅ Cart system active

---

## 📖 How to View the Site

### Option 1: Direct Open (Simplest)

**Just double-click:**
```
index.html (in the root folder)
```

This will automatically redirect to the home page.

---

### Option 2: Use a Local Server (Recommended)

#### Python (if installed):
```bash
python -m http.server 8000
```
Then visit: **http://localhost:8000**

#### Python 3:
```bash
python3 -m http.server 8000
```
Then visit: **http://localhost:8000**

#### Node.js (if installed):
```bash
npx serve
```
Follow the URL shown in terminal

#### VS Code:
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

---

## 🧪 What to Test

### Navigation
1. ✅ **Click the STREETWEAR logo** - Opens radial circular menu
2. ✅ **Top navigation** - Click each link (Home, Shop, Drops, etc.)
3. ✅ **Mobile menu** - Resize browser, click hamburger icon

### Shopping Cart
1. ✅ Go to **Shop** page
2. ✅ Click **ADD TO CART** on any product
3. ✅ Click the **🛒 cart icon** (top right)
4. ✅ Cart drawer slides in from right
5. ✅ Adjust quantities with +/- buttons
6. ✅ Visit full **Cart** page

### Smart Size Quiz
1. ✅ Go to **Size Guide** page
2. ✅ Click **START QUIZ**
3. ✅ Answer 3 questions
4. ✅ See your recommended size with fit meter

### Drops Countdown
1. ✅ Go to **Drops** page
2. ✅ See countdown timer running
3. ✅ Scroll down to see available drops

### Effects to Notice
- 🌫️ **Smoky parallax** on home page hero
- ✨ **Spotlight effect** when hovering over products
- 🎨 **Graffiti textures** fading in on hover
- 📐 **3D tilt** on product cards
- 💫 **Scroll animations** throughout

---

## 📱 All Pages

Click through each page to see the full site:

1. **Home** - Hero with parallax, featured products
2. **Shop** - All products with filters
3. **Drops** - Countdown timer, limited releases
4. **Size Guide** - Interactive quiz
5. **About** - Brand story
6. **Cart** - Shopping cart (add items first)
7. **Contact** - Contact form

---

## 🎨 Current Placeholder Images

The site includes **SVG placeholder images** that say:
- "SHIRT #1", "SHIRT #2", etc. for products
- Graffiti textures with street art text
- Logo placeholder

**These work perfectly for testing!**

To add real images later:
1. Replace files in `/public/assets/`
2. Keep same filenames
3. Refresh browser

---

## 🔧 Features Working

✅ **Radial Navigation** - Click logo
✅ **Cart System** - Add/remove items
✅ **Size Quiz** - 3-question system
✅ **Countdown Timer** - Live countdown
✅ **Filters** - Category and sort
✅ **Animations** - Parallax, spotlight, scroll
✅ **Mobile Responsive** - Works on all screens
✅ **localStorage** - Cart persists on refresh

---

## ❓ Troubleshooting

### "Site looks plain/no styles"
- Make sure you opened `index.html` or used a local server
- Check browser console (F12) for errors

### "Images not showing"
- Placeholder SVG images should show - they look like labeled boxes
- If completely broken, check browser console

### "JavaScript not working"
- Make sure you're using a modern browser (Chrome, Firefox, Safari, Edge)
- Check browser console for errors
- Try hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)

### "Cart not saving"
- localStorage must be enabled in browser
- Private/Incognito mode may block it

---

## 🚀 Deploy to Vercel

Ready to put it online?

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or:
1. Push to GitHub
2. Connect to Vercel
3. Auto-deploys on push

---

## 📝 Next Steps

1. **Test all features** (checklist above)
2. **Replace placeholder images** with real photos
3. **Customize colors** in `src/css/global.css`
4. **Add/edit products** in `src/js/main.js`
5. **Deploy to Vercel** when ready

---

## 💡 Tips

- **Radial menu is the coolest feature** - Click the logo!
- **Cart persists** - Add items, refresh page, they stay
- **Size quiz is smart** - Try different combinations
- **Spotlight effect** - Move mouse over product grid
- **Mobile works great** - Try resizing browser

---

## ✨ Enjoy Your Premium Streetwear Site!

**Built with street culture energy** 🔥

Need help? Check README.md for full documentation.
