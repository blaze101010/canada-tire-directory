# TireShopPro.ca Deployment Guide

This guide covers everything needed to deploy the TireShopPro.ca tire shop directory to production.

## Prerequisites

- Node.js 18+ installed locally
- Supabase account with database configured
- Vercel account (or another Next.js hosting provider)
- Domain name (tireshoppro.ca) configured

## 1. Environment Variables

### Required Environment Variables

Create a `.env.local` file based on `.env.example`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=https://tireshoppro.ca
```

### Getting Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Settings** > **API**
3. Copy the **Project URL** for `NEXT_PUBLIC_SUPABASE_URL`
4. Copy the **anon public** key for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Production Site URL

- For production: `https://tireshoppro.ca`
- For staging: `https://staging.tireshoppro.ca` (if applicable)

## 2. Supabase Database Optimization

### Add Database Indexes for Performance

Run these SQL queries in your Supabase SQL Editor to create indexes for faster queries:

```sql
-- Index for state lookups (province pages)
CREATE INDEX IF NOT EXISTS idx_listings_state
ON listings (state);

-- Index for city lookups
CREATE INDEX IF NOT EXISTS idx_listings_city
ON listings (city);

-- Composite index for city + state lookups (city pages)
CREATE INDEX IF NOT EXISTS idx_listings_city_state
ON listings (city, state);

-- Index for name searches
CREATE INDEX IF NOT EXISTS idx_listings_name
ON listings (name);

-- Text search index for full-text search
CREATE INDEX IF NOT EXISTS idx_listings_search
ON listings USING gin(to_tsvector('english',
  coalesce(name, '') || ' ' ||
  coalesce(city, '') || ' ' ||
  coalesce(full_address, '')
));
```

### Enable Row Level Security (RLS)

Your database should have RLS enabled for security. Since this is a public directory, add a policy to allow public reads:

```sql
-- Enable RLS on listings table
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access"
ON listings FOR SELECT
TO public
USING (true);
```

### Verify Data Quality

Before deployment, run this query to check data quality:

```sql
-- Check for records with missing critical data
SELECT
  COUNT(*) as total_records,
  COUNT(CASE WHEN name IS NULL OR name = '' THEN 1 END) as missing_name,
  COUNT(CASE WHEN city IS NULL OR city = '' THEN 1 END) as missing_city,
  COUNT(CASE WHEN state IS NULL OR state = '' THEN 1 END) as missing_state,
  COUNT(CASE WHEN phone IS NULL OR phone = '' THEN 1 END) as missing_phone
FROM listings;
```

## 3. Local Testing Before Deployment

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Test Key Features

1. **Homepage**: Visit http://localhost:3000
   - Verify statistics load correctly
   - Test search functionality
   - Check city/province links

2. **Province Pages**: Visit http://localhost:3000/tire-shops/ontario
   - Verify shops load for province
   - Check city list appears
   - Test breadcrumb navigation

3. **City Pages**: Visit http://localhost:3000/tire-shops/ontario/toronto
   - Verify shops load for city
   - Check schema markup in page source
   - Verify SEO content displays

4. **Search Functionality**:
   - Try searching by city name
   - Try searching by postal code
   - Try searching by shop name
   - Verify results display correctly

### Build for Production

```bash
npm run build
```

Fix any build errors before deploying. Common issues:
- TypeScript errors
- Missing environment variables
- Import errors

## 4. Deploy to Vercel

### Option A: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel --prod
```

### Option B: Deploy via Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your Git repository
3. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: .next

4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL`

5. Click **Deploy**

### Vercel Configuration

Create `vercel.json` in your project root:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

## 5. Domain Configuration

### Connect Domain to Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** > **Domains**
3. Add `tireshoppro.ca` and `www.tireshoppro.ca`
4. Follow Vercel's DNS configuration instructions

### Update DNS Records

Add these records to your domain registrar:

```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

### SSL Certificate

Vercel automatically provisions SSL certificates. No action needed.

## 6. Post-Deployment Checklist

### SEO & Performance

- [ ] Verify sitemap.xml is accessible: https://tireshoppro.ca/sitemap.xml
- [ ] Check robots.txt: https://tireshoppro.ca/robots.txt
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Test page load speed with PageSpeed Insights
- [ ] Verify mobile responsiveness

### Functionality Testing

- [ ] Test homepage search
- [ ] Navigate to multiple province pages
- [ ] Navigate to multiple city pages
- [ ] Test all internal links
- [ ] Verify phone numbers are clickable on mobile
- [ ] Check that breadcrumbs work correctly
- [ ] Test 404 error page
- [ ] Test error boundaries

### Schema Markup Validation

- [ ] Use Google Rich Results Test: https://search.google.com/test/rich-results
- [ ] Verify WebSite schema
- [ ] Verify ItemList schema
- [ ] Verify FAQPage schema
- [ ] Verify LocalBusiness schema (city pages)
- [ ] Verify BreadcrumbList schema

### Analytics & Monitoring

- [ ] Add Google Analytics 4
- [ ] Add Google Tag Manager (optional)
- [ ] Set up Vercel Analytics
- [ ] Configure error monitoring (e.g., Sentry)

## 7. Performance Optimizations Applied

### Query Optimizations

- Homepage only loads statistics initially (2 fields vs all fields)
- Shops loaded on-demand when user searches
- Limited to 100 results on homepage search
- Province pages limited to 500 shops
- City pages limited to 200 shops
- Only necessary fields selected in queries

### Caching Strategy

- Static pages: Homepage, error pages
- Dynamic pages with loading states: Province and city pages
- Database queries are optimized with indexes

### Loading States

- Loading skeletons on all dynamic routes
- Error boundaries at multiple levels
- Graceful error handling with retry options

## 8. Maintenance & Updates

### Regular Tasks

**Weekly:**
- Monitor Vercel deployment logs
- Check for errors in Vercel dashboard
- Review Supabase usage metrics

**Monthly:**
- Update tire shop data if needed
- Review and respond to user feedback
- Check for Next.js and dependency updates

**Quarterly:**
- Review SEO performance in Search Console
- Analyze traffic patterns
- Update content and FAQs as needed

### Updating Tire Shop Data

To update or add new tire shops:

1. Prepare CSV file with new data
2. Use the import script: `npx tsx scripts/import-listings.ts`
3. Verify data in Supabase dashboard
4. Deployment automatically picks up new data

### Monitoring Performance

Use these tools to monitor performance:
- **Vercel Analytics**: Real-time performance metrics
- **Google Search Console**: Search performance and indexing
- **PageSpeed Insights**: Page load performance
- **Supabase Dashboard**: Database query performance

## 9. Troubleshooting

### Build Failures

**Issue**: TypeScript errors
- Run `npm run build` locally
- Fix type errors before deploying

**Issue**: Missing environment variables
- Verify all env vars are set in Vercel dashboard
- Check .env.example for required variables

### Runtime Errors

**Issue**: "Failed to load tire shops"
- Check Supabase connection
- Verify API keys are correct
- Check RLS policies allow public read

**Issue**: Slow page loads
- Check database indexes are created
- Review Supabase usage metrics
- Consider caching frequently accessed data

### SEO Issues

**Issue**: Pages not indexed by Google
- Submit sitemap to Search Console
- Check robots.txt doesn't block pages
- Verify canonical URLs are correct

**Issue**: Missing rich snippets
- Validate schema markup with Rich Results Test
- Check JSON-LD syntax is correct

## 10. Support & Resources

### Documentation

- Next.js: https://nextjs.org/docs
- Supabase: https://supabase.com/docs
- Vercel: https://vercel.com/docs

### Project Structure

```
/app                  # Next.js app directory
  /tire-shops         # Dynamic routes
  layout.tsx          # Root layout with metadata
  page.tsx            # Homepage
/components           # React components
/lib                  # Utilities and config
  config.ts           # Site configuration
  supabase.ts         # Supabase client
/types                # TypeScript types
```

### Key Files

- `lib/config.ts`: Centralized site configuration
- `.env.example`: Environment variable template
- `app/sitemap.ts`: Dynamic sitemap generation
- `app/robots.ts`: Robots.txt configuration

---

## Ready to Deploy!

Once you've completed all steps above, your TireShopPro.ca directory will be live and ready to help Canadians find tire shops near them.

For questions or issues, review the troubleshooting section or check the project documentation.
