# CSV Import Guide - Working Hours

This guide shows you how to import working hours from a CSV file - **much simpler and 100% free** compared to using Google Places API!

## Why Use CSV?

✅ **Completely free** - No API costs
✅ **Full control** - Verify and edit hours manually
✅ **Faster** - No API rate limits
✅ **Flexible** - Easy to update later
✅ **Simple** - Just edit a spreadsheet

## Quick Start (3 Steps)

### Step 1: Export Shops to CSV Template

Generate a CSV file with all your shops:

```bash
npx tsx export-shops-to-csv.ts
```

This creates **`working-hours-template.csv`** with all 6,730+ shops ready for you to fill in.

### Step 2: Fill in Working Hours

Open `working-hours-template.csv` in:
- **Microsoft Excel**
- **Google Sheets**
- **LibreOffice Calc**
- **Apple Numbers**
- Any spreadsheet software

Fill in the hours columns for each shop.

### Step 3: Import the CSV

Import your completed CSV:

```bash
npx tsx import-hours-from-csv.ts working-hours-template.csv
```

**That's it!** Hours are now in your database.

---

## CSV Format

### Required Columns

| Column | Description | Example |
|--------|-------------|---------|
| `shop_id` | Shop UUID from database | `123e4567-e89b-12d3-a456-426614174000` |
| `shop_name` | Shop name | `Canadian Tire - Calgary` |
| `monday` | Monday hours | `9:00 AM - 6:00 PM` |
| `tuesday` | Tuesday hours | `9:00 AM - 6:00 PM` |
| `wednesday` | Wednesday hours | `9:00 AM - 6:00 PM` |
| `thursday` | Thursday hours | `9:00 AM - 9:00 PM` |
| `friday` | Friday hours | `9:00 AM - 9:00 PM` |
| `saturday` | Saturday hours | `10:00 AM - 4:00 PM` |
| `sunday` | Sunday hours | `Closed` |

### Optional Columns

| Column | Description | Values |
|--------|-------------|---------|
| `is_24_hours` | 24-hour shop? | `true` or `false` |
| `is_open_now` | Currently open? | `true` or `false` |
| `address` | For reference | `123 Main St` |
| `phone` | For reference | `(403) 555-1234` |
| `city` | For reference | `Calgary` |
| `province` | For reference | `Alberta` |

### Hour Format Options

**Standard hours:**
```
9:00 AM - 6:00 PM
8:30 AM - 5:30 PM
10:00 AM - 8:00 PM
```

**Closed:**
```
Closed
```

**24 hours:**
```
Open 24 hours
24/7
```

**Unknown:**
```
N/A
-
(leave blank)
```

---

## Sample CSV

Here's what your CSV should look like:

```csv
shop_id,shop_name,address,phone,city,province,monday,tuesday,wednesday,thursday,friday,saturday,sunday,is_24_hours,is_open_now
550e8400-e29b-41d4-a716-446655440000,Canadian Tire - Calgary,123 Main St,(403) 555-1234,Calgary,Alberta,9:00 AM - 6:00 PM,9:00 AM - 6:00 PM,9:00 AM - 6:00 PM,9:00 AM - 9:00 PM,9:00 AM - 9:00 PM,10:00 AM - 4:00 PM,Closed,false,
550e8400-e29b-41d4-a716-446655440001,Fountain Tire - Edmonton,456 Oak Ave,(780) 555-5678,Edmonton,Alberta,8:00 AM - 5:00 PM,8:00 AM - 5:00 PM,8:00 AM - 5:00 PM,8:00 AM - 5:00 PM,8:00 AM - 5:00 PM,9:00 AM - 2:00 PM,Closed,false,
550e8400-e29b-41d4-a716-446655440002,24 Hour Tire Shop,789 Night Rd,(604) 555-9012,Vancouver,British Columbia,Open 24 hours,Open 24 hours,Open 24 hours,Open 24 hours,Open 24 hours,Open 24 hours,Open 24 hours,true,true
```

---

## Working with Large CSVs

### Split into Batches

For easier editing, split into smaller files:

1. **By Province:**
   - working-hours-alberta.csv
   - working-hours-ontario.csv
   - working-hours-bc.csv

2. **By City:**
   - working-hours-calgary.csv
   - working-hours-toronto.csv
   - working-hours-vancouver.csv

3. **By Progress:**
   - working-hours-batch-1.csv (shops 1-1000)
   - working-hours-batch-2.csv (shops 1001-2000)
   - etc.

Import each file separately:
```bash
npx tsx import-hours-from-csv.ts working-hours-alberta.csv
npx tsx import-hours-from-csv.ts working-hours-ontario.csv
```

### Update Partial Data

You can import a CSV with just some shops:

```csv
shop_id,shop_name,monday,tuesday,wednesday,thursday,friday,saturday,sunday
123-abc,Shop A,9:00 AM - 5:00 PM,9:00 AM - 5:00 PM,9:00 AM - 5:00 PM,9:00 AM - 5:00 PM,9:00 AM - 5:00 PM,Closed,Closed
456-def,Shop B,8:00 AM - 6:00 PM,8:00 AM - 6:00 PM,8:00 AM - 6:00 PM,8:00 AM - 6:00 PM,8:00 AM - 6:00 PM,10:00 AM - 2:00 PM,Closed
```

Only these shops will be updated.

---

## Matching Shops

The import script can match shops by either:

### Option 1: shop_id (Recommended)

Most accurate - uses the UUID from database:
```csv
shop_id,monday,tuesday,wednesday,...
550e8400-e29b-41d4-a716-446655440000,9:00 AM - 6:00 PM,9:00 AM - 6:00 PM,...
```

### Option 2: shop_name

Matches by exact name:
```csv
shop_name,monday,tuesday,wednesday,...
Canadian Tire - Calgary,9:00 AM - 6:00 PM,9:00 AM - 6:00 PM,...
```

**Pro tip:** Use `shop_id` for 100% accuracy. Names might have slight variations.

---

## Getting Shop IDs

### Export from Database

Use the export script (includes IDs):
```bash
npx tsx export-shops-to-csv.ts
```

### Query Supabase

In Supabase SQL Editor:
```sql
SELECT id, name, city, state
FROM listings
ORDER BY name;
```

Copy the results to your CSV.

---

## Common Use Cases

### 1. Standard Business Hours

Most shops have similar hours:

```csv
shop_id,shop_name,monday,tuesday,wednesday,thursday,friday,saturday,sunday
...,Shop 1,9:00 AM - 6:00 PM,9:00 AM - 6:00 PM,9:00 AM - 6:00 PM,9:00 AM - 6:00 PM,9:00 AM - 6:00 PM,10:00 AM - 4:00 PM,Closed
...,Shop 2,9:00 AM - 6:00 PM,9:00 AM - 6:00 PM,9:00 AM - 6:00 PM,9:00 AM - 6:00 PM,9:00 AM - 6:00 PM,10:00 AM - 4:00 PM,Closed
```

**Tip:** Use Excel's fill-down feature to copy hours to multiple rows.

### 2. Extended Thursday/Friday Hours

```csv
shop_id,shop_name,monday,tuesday,wednesday,thursday,friday,saturday,sunday
...,Shop 1,9:00 AM - 6:00 PM,9:00 AM - 6:00 PM,9:00 AM - 6:00 PM,9:00 AM - 9:00 PM,9:00 AM - 9:00 PM,10:00 AM - 4:00 PM,Closed
```

### 3. 24-Hour Shops

```csv
shop_id,shop_name,monday,tuesday,wednesday,thursday,friday,saturday,sunday,is_24_hours
...,24hr Shop,Open 24 hours,Open 24 hours,Open 24 hours,Open 24 hours,Open 24 hours,Open 24 hours,Open 24 hours,true
```

### 4. Seasonal Hours

Add notes in a comment column (will be ignored):

```csv
shop_id,shop_name,monday,notes
...,Shop 1,9:00 AM - 6:00 PM,Winter hours - check in summer
```

---

## Excel/Sheets Tips

### Use Formulas

Create a formula to generate hours:

```excel
="9:00 AM - 6:00 PM"
```

Drag down to fill multiple rows.

### Conditional Formatting

Highlight empty cells to see what's missing:
- Select hours columns
- Format → Conditional Formatting
- Highlight cells that are empty

### Data Validation

Create dropdown for common hours:

1. Select hours column
2. Data → Data Validation
3. List: `9:00 AM - 6:00 PM, Closed, Open 24 hours, N/A`

### Find & Replace

Quickly update hours:
- Find: `9:00 AM - 5:00 PM`
- Replace: `9:00 AM - 6:00 PM`
- Replace All

---

## Verification

### Before Import

**Check your CSV:**
- ✅ All shops have shop_id or shop_name
- ✅ Hour format is consistent
- ✅ No typos (e.g., "CLosed" instead of "Closed")
- ✅ File saved as `.csv` format

### During Import

Watch the console output:
```
✅ [1/6730] Updated: Canadian Tire - Calgary
✅ [2/6730] Updated: Fountain Tire - Edmonton
⚠️  [3/6730] Shop not found: ABC Tire (check name)
```

### After Import

Query the database to verify:

```sql
SELECT
  name,
  hours_monday,
  hours_tuesday,
  hours_last_updated
FROM listings
WHERE hours_last_updated IS NOT NULL
ORDER BY hours_last_updated DESC
LIMIT 10;
```

---

## Troubleshooting

### "Shop not found" Errors

**Problem:** Shop name doesn't match exactly

**Solutions:**
1. Use `shop_id` instead of `shop_name`
2. Check for exact name in database:
   ```sql
   SELECT name FROM listings WHERE name LIKE '%Canadian Tire%';
   ```
3. Fix name in CSV to match exactly

### Import Shows 0 Updates

**Problem:** CSV format incorrect

**Solutions:**
1. Ensure file is saved as `.csv` (not `.xlsx`)
2. Check column headers match exactly
3. Make sure there's data in the rows

### Special Characters

**Problem:** Names with commas, quotes, or accents

**Solutions:**
1. Use quotes around values: `"Tim's Tires, Ltd."`
2. Escape quotes: `"Mike ""The Tire Guy"" Shop"`
3. Use shop_id instead of shop_name

### File Encoding

**Problem:** Special characters look wrong (é, ü, ñ)

**Solution:** Save CSV as UTF-8:
- Excel: File → Save As → CSV UTF-8
- Google Sheets: File → Download → CSV (UTF-8)

---

## Updating Hours Later

### Full Update

Export, edit, and re-import:

```bash
# Export current data
npx tsx export-shops-to-csv.ts

# Edit working-hours-template.csv

# Re-import
npx tsx import-hours-from-csv.ts working-hours-template.csv
```

### Partial Update

Create a CSV with just the shops to update:

```csv
shop_id,monday,tuesday,wednesday,thursday,friday,saturday,sunday
123-abc,10:00 AM - 7:00 PM,10:00 AM - 7:00 PM,10:00 AM - 7:00 PM,10:00 AM - 7:00 PM,10:00 AM - 7:00 PM,Closed,Closed
```

Import updates only these shops.

---

## Best Practices

### 1. Start Small

Test with a small sample:

```csv
shop_id,shop_name,monday,tuesday,wednesday,thursday,friday,saturday,sunday
123-abc,Test Shop 1,9:00 AM - 5:00 PM,9:00 AM - 5:00 PM,9:00 AM - 5:00 PM,9:00 AM - 5:00 PM,9:00 AM - 5:00 PM,Closed,Closed
456-def,Test Shop 2,8:00 AM - 6:00 PM,8:00 AM - 6:00 PM,8:00 AM - 6:00 PM,8:00 AM - 6:00 PM,8:00 AM - 6:00 PM,Closed,Closed
```

Import and verify before doing all shops.

### 2. Keep Backups

Before importing, backup your CSV:
- `working-hours-2024-11-06.csv`
- `working-hours-backup.csv`

### 3. Document Sources

Add a notes column to track where hours came from:
```csv
shop_id,monday,tuesday,notes
123-abc,9:00 AM - 5:00 PM,9:00 AM - 5:00 PM,From shop website
456-def,8:00 AM - 6:00 PM,8:00 AM - 6:00 PM,Called shop directly
```

### 4. Regular Updates

Update hours quarterly or when notified:
- Export → Edit → Import
- Takes minutes, not hours

---

## Comparison: CSV vs Google API

| Feature | CSV Import | Google Places API |
|---------|-----------|-------------------|
| Cost | **FREE** | ~$29 (after $200 credit) |
| Speed | **Instant** | 20-30 minutes |
| Accuracy | Your verification | Google's data |
| Control | **Full control** | Automated |
| Updates | Manual | Automated |
| Best For | **Most users** | Large-scale automation |

**Recommendation:** Use CSV for initial setup. Add Google API later if you need automated updates.

---

## Need Help?

### Common Questions

**Q: Do I need all columns?**
A: No, minimum is: `shop_id` (or `shop_name`) + hour columns (monday-sunday)

**Q: Can I update just one day?**
A: Yes, but you'll overwrite existing data. Export first, edit, then import.

**Q: What if I don't know the hours?**
A: Use "N/A" or leave blank. You can update later.

**Q: Can I import multiple times?**
A: Yes! Each import overwrites previous data for those shops.

### Example Workflow

1. Export template: `npx tsx export-shops-to-csv.ts`
2. Fill in known hours
3. Import: `npx tsx import-hours-from-csv.ts working-hours-template.csv`
4. Check results
5. Fill in more hours
6. Re-import with updates

---

## Summary

Using CSV for working hours is:
- ✅ **Free** (no API costs)
- ✅ **Simple** (just edit a spreadsheet)
- ✅ **Fast** (instant import)
- ✅ **Flexible** (update anytime)
- ✅ **Reliable** (you verify the data)

**Perfect for getting accurate hours into your database without any costs or complexity!**
