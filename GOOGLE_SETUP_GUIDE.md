# Google Analytics & Search Console Setup Guide

## 🔍 Google Analytics 4 Setup

### Step 1: Create Google Analytics Account

1. Go to **https://analytics.google.com**
2. Click "Start measuring" or "Admin" (gear icon)
3. Click "Create Account"
4. Fill in account details:
   - Account name: "TireShopPro" (or your preferred name)
   - Check data sharing settings
   - Click "Next"

### Step 2: Create a Property

1. Property name: "TireShopPro.ca"
2. Time zone: Select your timezone (Canada/Eastern)
3. Currency: CAD - Canadian Dollar
4. Click "Next"

### Step 3: Set Up Data Stream

1. Select **"Web"** platform
2. Enter your website URL (e.g., `https://yourdomain.com`)
3. Stream name: "TireShopPro Website"
4. Click "Create stream"

### Step 4: Get Your Measurement ID

1. After creating the stream, you'll see your **Measurement ID**
2. It looks like: `G-XXXXXXXXXX`
3. Copy this ID

### Step 5: Add to Your Project

1. Open `.env.local` file
2. Add your Measurement ID:
   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
3. Restart your dev server

✅ **Google Analytics is now tracking your website!**

---

## 🔍 Google Search Console Setup

### Step 1: Add Your Property

1. Go to **https://search.google.com/search-console**
2. Click "Add property"
3. Choose **"URL prefix"** method
4. Enter your domain: `https://yourdomain.com`
5. Click "Continue"

### Step 2: Get Verification Code

1. Under "Verification methods", select **"HTML tag"**
2. You'll see a meta tag like:
   ```html
   <meta name="google-site-verification" content="ABC123xyz..." />
   ```
3. Copy only the **content value** (the part inside quotes after `content=`)
   - Example: `ABC123xyz...`

### Step 3: Add to Your Project

1. Open `.env.local` file
2. Add your verification code:
   ```env
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=ABC123xyz...
   ```
3. Restart your dev server
4. Deploy to production (Vercel)

### Step 4: Verify in Google Search Console

1. After deploying to production, go back to Search Console
2. Click "Verify" button
3. Wait a few seconds for verification

✅ **Your site is now verified with Google Search Console!**

---

## 📊 What You Get

### Google Analytics 4 Features:
- **Real-time visitors** tracking
- **Page views** and popular pages
- **Traffic sources** (Google, direct, social, etc.)
- **User demographics** (age, gender, location)
- **Conversion tracking** (contact form submissions, etc.)
- **Mobile vs Desktop** traffic
- **Bounce rate** and engagement metrics

### Google Search Console Features:
- **Search performance** (which keywords bring visitors)
- **Impressions** and **click-through rates**
- **Index coverage** (which pages are indexed)
- **Mobile usability** reports
- **Core Web Vitals** performance
- **Sitemap submission** for better indexing
- **Manual actions** and security issues alerts

---

## 🚀 After Setup

### Submit Your Sitemap

1. Go to Google Search Console
2. Click "Sitemaps" in the left menu
3. Add your sitemap URL:
   ```
   https://yourdomain.com/sitemap.xml
   ```
4. Click "Submit"

### Enable Enhanced Measurement (GA4)

1. Go to Google Analytics
2. Admin → Data Streams → Your Web Stream
3. Click "Enhanced Measurement"
4. Toggle it ON
5. This automatically tracks:
   - Page views
   - Scrolls
   - Outbound clicks
   - Site search
   - Video engagement
   - File downloads

---

## 📌 Important Notes

- **Analytics takes 24-48 hours** to start showing data
- **Search Console verification** must be done AFTER deploying to production
- **Keep your IDs private** - don't share them publicly
- **Monitor regularly** to understand your audience
- **Use data** to improve your SEO and user experience

---

## 🔗 Useful Links

- **Google Analytics Dashboard**: https://analytics.google.com
- **Google Search Console**: https://search.google.com/search-console
- **GA4 Learning Resources**: https://skillshop.withgoogle.com/analytics
- **Search Console Help**: https://support.google.com/webmasters

---

## Need Help?

If you encounter any issues:
1. Check that your `.env.local` IDs are correct
2. Restart your development server
3. Clear your browser cache
4. Verify your site is deployed to production for Search Console
