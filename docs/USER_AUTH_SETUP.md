# User Authentication Setup Guide

This guide explains the user authentication system for TireShopPro, which allows regular users to register, log in, and submit their tire shops to the directory.

## Overview

The user authentication system includes:

- User registration and login
- Protected routes requiring authentication
- User profile management
- Shop submission tracking
- Integration with Supabase Auth

## Architecture

### Authentication Flow

1. **User Registration** (`/signup`)
   - Users create an account with email, password, and profile information
   - Account information is stored in Supabase Auth
   - User metadata includes: full name, business name (optional), phone (optional)

2. **User Login** (`/login`)
   - Users authenticate with email and password
   - Session is maintained across page refreshes
   - Redirects to `/add-shop` after successful login

3. **Protected Routes**
   - `/add-shop` - Requires authentication to submit shops
   - `/my-shops` - View user's shop submissions
   - `/profile` - View and manage profile

### Components and Files

#### 1. Authentication Context (`contexts/AuthContext.tsx`)
Provides global authentication state to the entire application.

```typescript
const { user, session, loading, signOut } = useAuth();
```

**Features:**
- Tracks current user and session
- Loading state during authentication checks
- Sign out functionality
- Automatic session persistence

#### 2. Signup Page (`app/signup/page.tsx`)
User registration interface with:
- Email and password validation
- Profile information collection
- Success confirmation and auto-redirect

#### 3. Login Page (`app/login/page.tsx`)
User authentication interface with:
- Email/password login
- Remember me option
- Forgot password link
- Link to admin login

#### 4. Header Component (`components/Header.tsx`)
Updated to show:
- User avatar and email when authenticated
- Dropdown menu with:
  - My Shops
  - Profile
  - Sign Out
- Login/Sign Up buttons when not authenticated

#### 5. Add Shop Page (`app/add-shop/page.tsx`)
Protected page that:
- Requires authentication to access
- Shows login prompt for unauthenticated users
- Pre-fills email from user account
- Associates submissions with user ID

#### 6. My Shops Page (`app/my-shops/page.tsx`)
Dashboard for users to:
- View all their shop submissions
- Check submission status (pending/approved/rejected)
- See rejection reasons if applicable
- Add additional shops

#### 7. Profile Page (`app/profile/page.tsx`)
User profile interface showing:
- Account information
- Quick actions to manage shops
- Planned features (edit profile, change password, etc.)

### Database Schema

#### User Submissions Table (`user_submissions`)

```sql
CREATE TABLE user_submissions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),

  -- Shop information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  street TEXT NOT NULL,
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  website TEXT,
  description TEXT,
  services TEXT[],
  owner_name TEXT NOT NULL,
  additional_info TEXT,

  -- Submission tracking
  status TEXT DEFAULT 'pending',
  submitted_at TIMESTAMP DEFAULT NOW(),
  reviewed_at TIMESTAMP,
  reviewed_by UUID,
  rejection_reason TEXT,
  listing_id BIGINT REFERENCES listings(id),

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Status Values:**
- `pending` - Awaiting admin review
- `approved` - Shop added to public directory
- `rejected` - Submission declined with reason

### API Routes

#### POST `/api/add-shop`
Handles shop submission from authenticated users.

**Request Body:**
```json
{
  "name": "Shop Name",
  "email": "contact@shop.com",
  "phone": "(555) 123-4567",
  "street": "123 Main St",
  "city": "Toronto",
  "province": "Ontario",
  "postal_code": "M5H 2N2",
  "website": "https://shop.com",
  "description": "Shop description",
  "services": ["Tire Sales", "Tire Installation"],
  "owner_name": "John Doe",
  "additional_info": "Additional notes",
  "user_id": "uuid-of-user"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your shop submission has been received!"
}
```

## Setup Instructions

### 1. Run Database Migration

Run the user submissions migration in your Supabase project:

```bash
# Copy the migration SQL
cat supabase/migrations/create-user-submissions-table.sql

# Run it in Supabase SQL Editor or use the Supabase CLI
npx supabase db push
```

### 2. Configure Supabase Auth (Already Done)

The following is already configured in `lib/supabase.ts`:

```typescript
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
  },
});
```

### 3. Enable Email Auth in Supabase

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** > **Providers**
3. Ensure **Email** provider is enabled
4. Configure email templates (optional)
5. Set up SMTP for email verification (optional)

### 4. Test the System

1. Visit `/signup` to create a test account
2. Check that you're redirected to `/add-shop` after signup
3. Verify that Header shows user menu when logged in
4. Submit a test shop
5. Visit `/my-shops` to see your submission
6. Check `/profile` to view account info
7. Test logout functionality

## Row Level Security (RLS)

The `user_submissions` table has RLS policies:

### User Policies
- ✅ Users can **view** their own submissions
- ✅ Users can **create** new submissions
- ✅ Users can **update** their own pending submissions
- ❌ Users cannot delete submissions

### Admin Policies
- ✅ Admins can view all submissions
- ✅ Admins can update any submission (approve/reject)
- ✅ Admins can view submission history

## Security Considerations

1. **Authentication Required**: All submission operations require a valid user session
2. **User ID Validation**: Server-side validation ensures user_id matches authenticated user
3. **RLS Protection**: Database-level security prevents unauthorized data access
4. **HTTPS Only**: All auth operations use secure connections
5. **Session Management**: Automatic token refresh and secure storage

## User Flow

### New User Registration
```
Visit site → Click "Sign Up" → Fill registration form →
Submit → Auto login → Redirect to /add-shop → Submit shop →
View submission in /my-shops
```

### Returning User
```
Visit site → Click "Log In" → Enter credentials →
Submit → Redirect to /add-shop or previous page →
Access user menu → My Shops / Profile / Sign Out
```

### Unauthenticated Access
```
Try to visit /add-shop → See login prompt →
Options: Create Account or Sign In →
Complete auth → Access protected page
```

## Future Enhancements

- [ ] Email verification for new accounts
- [ ] Password reset functionality
- [ ] Edit profile information
- [ ] Two-factor authentication
- [ ] Email notifications for submission status changes
- [ ] User dashboard with analytics
- [ ] Social login (Google, Facebook)
- [ ] Account deletion option

## Troubleshooting

### Users can't sign up
- Check Supabase Auth is enabled in dashboard
- Verify email provider is configured
- Check browser console for errors
- Ensure Supabase anon key is valid

### Sessions not persisting
- Verify `persistSession: true` in supabase config
- Check localStorage is enabled in browser
- Clear browser cache and try again

### RLS errors when creating submissions
- Verify migration has been run
- Check RLS policies are active
- Ensure user is authenticated
- Verify user_id is being sent correctly

### "User authentication required" error
- User must be logged in to submit shops
- Check auth state in browser dev tools
- Verify AuthProvider is wrapping the app
- Check session hasn't expired

## Support

For issues or questions:
- Check browser console for error messages
- Review Supabase logs in dashboard
- Verify all migrations have been applied
- Test with different browsers
- Contact development team

---

**Last Updated:** 2025-11-07
**Version:** 1.0.0
