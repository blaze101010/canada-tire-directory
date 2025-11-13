# Supabase Setup Guide for Canadian Tire Shop Directory

## ✅ Setup Complete!

Your Next.js application is now configured to connect to Supabase. Follow the final steps below to complete the setup.

---

## 📋 Final Steps

### 1. Add Your Supabase Credentials

Open `.env.local` and replace the placeholder values with your actual Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Where to find these values:**
1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click **Settings** → **API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. Create Database Schema

1. Go to your Supabase project
2. Navigate to **SQL Editor**
3. Copy the entire contents of `supabase-schema-from-csv.sql`
4. Paste and **Run** the SQL

### 3. Import Your CSV Data

**Option A: Using Supabase Dashboard**
1. Go to **Table Editor** → **tire_shops**
2. Click **Insert** → **Import data from CSV**
3. Upload your CSV file: `Outscraper-20251105070352s7c_tire_shop copy.csv`
4. Map the columns:
   - `name` → `name`
   - `site` → `site`
   - `phone` → `phone`
   - `full_address` → `full_address`
   - `street` → `street`
   - `city` → `city`
   - `postal_code` → `postal_code`
   - `state` → `state`
   - `latitude` → `latitude`
   - `longitude` → `longitude`
   - `reviews` → `reviews_count`
   - `photo` → `photo_url`
   - `street_view` → `street_view_url`
   - `working_hours` → `working_hours`
   - `business_status` → `business_status`
   - `booking_appointment_link` → `booking_appointment_link`
   - `location_link` → `location_link`

5. After import, run in SQL Editor:
   ```sql
   SELECT process_imported_shops();
   ```

### 4. Restart Development Server

After adding environment variables:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

---

## 🎯 What's Been Set Up

### Files Created/Modified:

✅ **`.env.local`** - Environment variables for Supabase credentials
✅ **`lib/supabase.ts`** - Supabase client configuration
✅ **`types/database.ts`** - TypeScript types for database schema
✅ **`types/index.ts`** - Updated application types
✅ **`app/page.tsx`** - Main page now fetches from Supabase
✅ **`components/ShopCard.tsx`** - Updated to display Supabase data
✅ **`.gitignore`** - Ensures `.env.local` is not committed

### Features Implemented:

✅ Real-time data fetching from Supabase
✅ Loading states
✅ Error handling with retry
✅ Search by name, city, address
✅ Filter by province
✅ Featured shop badges
✅ Clickable phone numbers
✅ Website links
✅ Review counts display

---

## 🧪 Testing the Connection

Once you've completed the steps above:

1. Open http://localhost:3000
2. You should see:
   - Loading spinner initially
   - Tire shops from your database
   - Working search and filter functionality

If you see an error:
- Check that `.env.local` has correct credentials
- Verify your Supabase database is set up
- Check browser console for detailed error messages

---

## 🔒 Security Notes

- ✅ `.env.local` is gitignored (credentials won't be committed)
- ✅ Row Level Security (RLS) is enabled on tables
- ✅ Public read access policy is configured
- ✅ Using `anon` key (safe for client-side use)

---

## 📝 Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 🚀 Next Steps

After everything is working:

1. Import your full CSV data
2. Test search and filtering
3. Customize the styling
4. Add more features (reviews, maps, etc.)
5. Deploy to Vercel/Netlify

---

## 💡 Troubleshooting

**Issue: "Missing Supabase environment variables"**
- Solution: Make sure `.env.local` exists and has the correct values
- Restart the dev server after adding environment variables

**Issue: No data showing**
- Check that you've run the SQL schema
- Verify data was imported successfully
- Check Supabase Table Editor to see if data exists

**Issue: Build errors**
- Run `npm install` to ensure all dependencies are installed
- Check that all imports are correct

---

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

**Need help?** Check the browser console and terminal for detailed error messages.
