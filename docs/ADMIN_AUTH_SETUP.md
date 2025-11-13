# Admin Authentication Setup Guide

## Overview
The admin dashboard is now protected with Supabase Authentication. Only authenticated users can access the admin pages.

## What Was Implemented

1. **Supabase Auth Integration**
   - Updated Supabase client to enable session persistence
   - Created server-side auth utilities for middleware and server components

2. **Login Page**
   - Created `/admin/login` page for admin authentication
   - Email and password authentication

3. **Middleware Protection**
   - All `/admin/*` routes are protected
   - Automatic redirect to login if not authenticated
   - Automatic redirect to dashboard if already logged in

4. **Admin Layout Updates**
   - Shows logged-in user's email
   - Dropdown menu with logout functionality
   - Real-time auth state updates

## Creating Your First Admin User

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard: https://app.supabase.com
2. Navigate to **Authentication** → **Users**
3. Click **Add User** → **Create new user**
4. Enter email and password for your admin account
5. Click **Create User**

### Option 2: Using Supabase SQL Editor

Run this SQL command in your Supabase SQL Editor:

```sql
-- This will create a user with email and password
-- Note: You'll need to confirm the email or disable email confirmation in Auth settings

INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@yourdomain.com', -- Change this
  crypt('your-secure-password', gen_salt('bf')), -- Change this
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);
```

### Option 3: Disable Email Confirmation (Development Only)

For development, you can disable email confirmation:

1. Go to **Authentication** → **Settings** in Supabase Dashboard
2. Scroll to **Auth Providers** → **Email**
3. Disable **Confirm email**
4. Now users can sign in immediately after creation

## Testing the Authentication

1. Start your development server:
   ```bash
   cd canada-tire-directory
   npm run dev
   ```

2. Navigate to: http://localhost:3000/admin

3. You should be redirected to: http://localhost:3000/admin/login

4. Login with your admin credentials

5. Upon successful login, you'll be redirected to the admin dashboard

## Security Considerations

### For Production:

1. **Enable Email Confirmation**
   - Always require email confirmation in production
   - Set up proper email templates in Supabase

2. **Strong Passwords**
   - Enforce strong password policies
   - Consider enabling password strength requirements in Supabase

3. **Multi-Factor Authentication**
   - Consider enabling MFA for admin accounts
   - Available in Supabase Auth settings

4. **Row Level Security (RLS)**
   - Consider adding RLS policies to restrict data access
   - Only allow authenticated users to modify data

5. **Rate Limiting**
   - Implement rate limiting on login attempts
   - Configure in Supabase Auth settings

## Troubleshooting

### Can't Login?
- Check that your Supabase credentials in `.env.local` are correct
- Verify the user exists in Supabase Dashboard → Authentication → Users
- Check if email confirmation is required and the email is confirmed

### Middleware Not Working?
- Restart your dev server after adding middleware
- Check browser console for errors
- Verify `middleware.ts` is in the root directory

### Session Not Persisting?
- Clear your browser cookies and try again
- Check that localStorage is enabled in your browser
- Verify Supabase URL and keys are correct

## Next Steps

Now that authentication is set up, you can:
1. Make the Settings page functional
2. Add more granular permissions (if needed)
3. Create additional admin users
4. Set up email templates in Supabase

## File Structure

```
canada-tire-directory/
├── middleware.ts                    # Route protection
├── lib/
│   ├── supabase.ts                 # Client-side Supabase client
│   └── supabase-server.ts          # Server-side Supabase client
├── app/
│   └── admin/
│       ├── login/
│       │   └── page.tsx            # Login page
│       ├── page.tsx                # Dashboard (protected)
│       └── ...                     # Other protected pages
└── components/
    └── AdminLayout.tsx             # Layout with logout
```
