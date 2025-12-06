# 🚀 Vercel Deployment Guide

## ✅ FIXED - Updated for Vercel

The `vercel.json` configuration has been updated to work properly with Vercel deployment.

---

## 📋 Deployment Steps

### Option 1: Deploy via GitHub (Recommended)

1. **Push to GitHub** (already done)
   ```bash
   git push origin claude/streetwear-ecommerce-site-0163MqddCBtnHNpoTyV56Kej
   ```

2. **Go to Vercel**
   - Visit: https://vercel.com
   - Sign in with GitHub

3. **Import Project**
   - Click "Add New" → "Project"
   - Select your GitHub repository
   - Click "Import"

4. **Configure Project**
   - Framework Preset: **Other**
   - Root Directory: **Leave as `.`** (root)
   - Build Command: **Leave empty**
   - Output Directory: **Leave empty**
   - Install Command: **Leave empty**

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Visit your live URL!

---

### Option 2: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

---

## 🌐 After Deployment

Your site will be live at a URL like:
```
https://yourproject.vercel.app
```

### Pages will be accessible at:
- `https://yourproject.vercel.app/` - Home
- `https://yourproject.vercel.app/shop` - Shop
- `https://yourproject.vercel.app/drops` - Drops
- `https://yourproject.vercel.app/size` - Size Guide
- `https://yourproject.vercel.app/about` - About
- `https://yourproject.vercel.app/cart` - Cart
- `https://yourproject.vercel.app/contact` - Contact

**Note:** URLs are clean (no `.html` extension) on Vercel!

---

## 🔧 Vercel Configuration

The `vercel.json` file handles:
- **Clean URLs** - No .html extensions needed
- **Routing** - All pages accessible from root
- **Rewrites** - Proper path resolution

---

## 📁 What Gets Deployed

Vercel will deploy:
```
✅ All HTML pages from src/pages/
✅ All CSS from src/css/
✅ All JavaScript from src/js/
✅ All assets from public/assets/
✅ Root index.html
```

---

## ⚡ Auto-Deploy on Push

After initial setup:
1. Make changes locally
2. Commit: `git commit -m "your changes"`
3. Push: `git push`
4. Vercel auto-deploys! ✨

---

## 🐛 Troubleshooting Vercel Deployment

### 404 Errors
✅ **FIXED** - Updated `vercel.json` to use clean URLs and proper rewrites

### Images Not Loading
- Make sure images are in `/public/assets/`
- Check paths use `../../public/assets/` (relative)
- Placeholder images should work immediately

### JavaScript Not Working
- Check Vercel deployment logs for errors
- Visit: Dashboard → Your Project → Deployments → Click latest → View Logs

### Styles Not Loading
- Verify CSS files are in `/src/css/`
- Check browser console for 404 errors
- Make sure relative paths are correct

---

## 🔄 Redeploy

If you need to force a redeploy:

### Via Dashboard:
1. Go to Vercel Dashboard
2. Select your project
3. Click "Deployments"
4. Click "..." on latest deployment
5. Select "Redeploy"

### Via CLI:
```bash
vercel --prod --force
```

---

## 📊 Monitoring

### View Analytics:
- Go to Vercel Dashboard
- Select your project
- Click "Analytics" tab

### View Logs:
- Deployments → Latest → View Function Logs
- Check for any errors or warnings

---

## 🎯 Next Steps After Deployment

1. ✅ Visit your live site
2. ✅ Test all 7 pages
3. ✅ Test cart functionality
4. ✅ Test size quiz
5. ✅ Share your URL!

---

## 💡 Tips

- **Custom Domain**: Add in Vercel Dashboard → Settings → Domains
- **Environment Variables**: Settings → Environment Variables (if needed later)
- **Preview Deployments**: Every git push creates a preview
- **Production**: Only deploys from main/master or manual deploy

---

## 🔗 Useful Links

- **Vercel Docs**: https://vercel.com/docs
- **Vercel CLI Docs**: https://vercel.com/docs/cli
- **Vercel Support**: https://vercel.com/support

---

## ✨ Your Site is Ready for the World!

Once deployed, share your premium streetwear site! 🔥

**Built with street culture energy.**
