# Settings Page Setup Guide

## Overview
The Settings page is now fully functional with the ability to:
- Save site information (name, URL, contact email)
- Configure API keys (Google Places API)
- Perform dangerous operations (Clear Reviews, Reset Hours)

## Database Setup

### Step 1: Create the Settings Table

You need to run the SQL migration to create the `settings` table in your Supabase database.

**Option A: Using Supabase SQL Editor (Recommended)**

1. Go to your Supabase Dashboard: https://app.supabase.com/project/xibfpzbpiacrheabxjpo/editor
2. Click on "SQL Editor" in the left sidebar
3. Copy the contents of `supabase/migrations/create-settings-table.sql`
4. Paste into the SQL Editor
5. Click "Run" to execute

**Option B: Using the Helper Script**

```bash
cd canada-tire-directory
npx tsx scripts/run-settings-migration.ts
```

This will display the SQL that needs to be run in the Supabase SQL Editor.

### Step 2: Verify the Table Was Created

1. In Supabase Dashboard, go to "Table Editor"
2. Look for the `settings` table
3. You should see 4 default rows:
   - `site_name`: TireShopPro.ca
   - `site_url`: https://tireshoppro.ca
   - `contact_email`: (empty)
   - `google_places_api_key`: (empty)

## Features

### 1. Site Information Management

**Editable Fields:**
- **Site Name**: Your site's display name
- **Site URL**: Your site's public URL
- **Contact Email**: Admin contact email for notifications

**How to Use:**
1. Navigate to `/admin/settings`
2. Update the fields as needed
3. Click "Save Settings"
4. Success message will appear when saved

### 2. API Configuration

**Google Places API Key:**
- Used for automated working hours updates
- Stored securely in the database
- Displayed as password field (masked)

### 3. Danger Zone

#### Clear All Reviews
- **What it does**: Permanently deletes all reviews from the database and resets shop ratings
- **Safety**: Requires double confirmation
- **Use case**: Starting fresh with reviews or removing spam

**Process:**
1. Click "Clear Reviews" button
2. Confirm first warning
3. Confirm second warning
4. All reviews are deleted
5. All shop ratings are reset to 0

#### Reset Working Hours
- **What it does**: Permanently removes all working hours data from all shops
- **Safety**: Requires double confirmation
- **Use case**: Re-importing fresh hours data or fixing corrupted data

**Process:**
1. Click "Reset Hours" button
2. Confirm first warning
3. Confirm second warning
4. All working hours fields are cleared

## API Endpoints

### GET /api/settings
Fetches all settings from the database.

**Response:**
```json
{
  "site_name": "TireShopPro.ca",
  "site_url": "https://tireshoppro.ca",
  "contact_email": "admin@example.com",
  "google_places_api_key": "your-api-key"
}
```

### PUT /api/settings
Updates settings in the database.

**Request Body:**
```json
{
  "site_name": "New Site Name",
  "site_url": "https://newurl.com",
  "contact_email": "new@email.com",
  "google_places_api_key": "new-key"
}
```

### POST /api/admin/clear-reviews
Deletes all reviews and resets shop ratings.

**Response:**
```json
{
  "success": true,
  "message": "All reviews cleared successfully"
}
```

### POST /api/admin/reset-hours
Resets all working hours data.

**Response:**
```json
{
  "success": true,
  "message": "All working hours reset successfully"
}
```

## Security

### Authentication Required
- All settings operations require authentication
- Middleware checks user session before allowing access
- API endpoints verify user authentication

### Row Level Security (RLS)
The settings table has RLS policies:
- Authenticated users can read, insert, and update settings
- Public users can only read `site_name` and `site_url` (optional)

### Danger Zone Protection
- Double confirmation for destructive actions
- Clear warning messages
- Cannot be undone

## Troubleshooting

### Settings Won't Save
1. Check browser console for errors
2. Verify you're logged in
3. Check Supabase connection in `/admin/settings` database status
4. Verify the `settings` table exists

### API Errors
- **401 Unauthorized**: Not logged in - go to `/admin/login`
- **500 Server Error**: Check Supabase credentials in `.env.local`
- **Table doesn't exist**: Run the SQL migration

### Danger Zone Buttons Not Working
1. Check authentication
2. Verify API routes are accessible
3. Check browser console for errors

## File Structure

```
canada-tire-directory/
├── app/
│   ├── admin/
│   │   └── settings/
│   │       └── page.tsx                    # Settings page UI
│   └── api/
│       ├── settings/
│       │   └── route.ts                    # Settings CRUD endpoint
│       └── admin/
│           ├── clear-reviews/
│           │   └── route.ts                # Clear reviews endpoint
│           └── reset-hours/
│               └── route.ts                # Reset hours endpoint
├── supabase/
│   └── migrations/
│       └── create-settings-table.sql       # Database migration
├── scripts/
│   └── run-settings-migration.ts           # Helper script
└── docs/
    └── SETTINGS_PAGE_SETUP.md              # This file
```

## Next Steps

1. Run the SQL migration to create the settings table
2. Login to the admin dashboard
3. Navigate to Settings page
4. Customize your site information
5. Add API keys if needed

## Testing

To test the Settings page:

1. **Save Settings Test:**
   - Update site name
   - Update contact email
   - Click "Save Settings"
   - Refresh page and verify changes persist

2. **Danger Zone Test (Use with caution!):**
   - Create a test review
   - Click "Clear Reviews"
   - Confirm both warnings
   - Verify reviews are deleted

Remember: The Danger Zone actions are irreversible in production!
