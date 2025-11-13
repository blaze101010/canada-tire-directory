# CSV Import Guide - 12,000+ Tire Shop Listings

## 📋 **Best Practices for Large Dataset Import**

For **12,000 rows**, using a script is the most reliable approach.

---

## ✅ **Recommended Approach: Node.js Import Script**

### **Why This Method?**
- ✅ Handles large files (12K+ rows)
- ✅ Batch processing (500 rows at a time)
- ✅ Progress tracking
- ✅ Error handling and recovery
- ✅ Data validation
- ✅ Automatic retry on failure
- ✅ Much faster than manual import

---

## 🚀 **Step-by-Step Import Process**

### **Step 1: Prepare Your CSV File**

1. Place your CSV file in the project root or note its path
2. Ensure it uses **semicolon (;)** as delimiter (your current format)
3. Verify column headers match:
   - `name`, `site`, `phone`, `full_address`, `street`, `city`, `postal_code`, `state`
   - `latitude`, `longitude`, `reviews`, `photo`, `street_view`
   - `business_status`, `booking_appointment_link`, etc.

### **Step 2: Run the Import Script**

**Option A: Import from default location**
```bash
npm run import-csv
```

**Option B: Specify custom CSV file path**
```bash
npm run import-csv "/path/to/your/file.csv"
```

**Example:**
```bash
npm run import-csv "/Users/philipobaye/Downloads/Outscraper-20251105070352s7c_tire_shop copy.csv"
```

### **Step 3: Monitor Progress**

You'll see real-time progress:
```
🚀 Starting CSV import...

📁 File: /path/to/file.csv
📦 Batch size: 500 rows

⏳ Progress: 6500/12000 rows (54.2%)
```

### **Step 4: Wait for Completion**

The script will show final statistics:
```
✅ Import completed!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Total rows processed: 12000
✅ Successful imports: 11950
❌ Errors: 50
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔄 Running post-import processing...
✅ Post-import processing completed!

📊 Total shops in database: 11950

🎉 All done! You can now view your data at http://localhost:3000
```

---

## ⚙️ **What the Script Does**

1. **Reads CSV** - Parses your CSV file in streams (memory efficient)
2. **Transforms Data** - Converts CSV format to database format
3. **Validates** - Checks required fields (name, city)
4. **Batch Insert** - Imports 500 rows at a time (prevents timeout)
5. **Progress Tracking** - Shows real-time progress
6. **Error Handling** - Logs errors but continues processing
7. **Post-Processing** - Auto-generates slugs and province codes
8. **Statistics** - Shows final count and success rate

---

## 🔧 **Customization Options**

### **Change Batch Size**

Edit `scripts/import-csv.ts` line 16:
```typescript
const BATCH_SIZE = 500; // Change to 250 for slower connections, 1000 for faster
```

### **Handle Different CSV Formats**

If your CSV uses commas instead of semicolons, edit line 70:
```typescript
.pipe(csv({ separator: ',' })) // Change ';' to ','
```

### **Skip Duplicate Entries**

The script will fail on duplicates. To handle this, you can modify the Supabase insert to use `upsert`:

```typescript
.upsert(batch, { onConflict: 'name,city' })
```

---

## 🎯 **Alternative Methods**

### **Option 2: Supabase Dashboard (Not Recommended for 12K rows)**

**Pros:**
- No coding required
- Visual interface

**Cons:**
- ❌ May timeout with large files
- ❌ No progress tracking
- ❌ Hard to recover from errors
- ❌ Limited to ~5000 rows reliably

**Steps (if you still want to try):**
1. Split your CSV into smaller files (2000-3000 rows each)
2. Go to Supabase → Table Editor → tire_shops
3. Click "Insert" → "Import data from CSV"
4. Upload each file separately
5. Map columns manually for each upload

### **Option 3: SQL COPY Command (Advanced)**

**For very large datasets (50K+ rows)**

1. Upload CSV to Supabase Storage
2. Use SQL COPY command in Supabase SQL Editor:

```sql
COPY tire_shops (
  name, site, phone, full_address, street, city,
  postal_code, state, latitude, longitude, reviews_count,
  photo_url, street_view_url, business_status,
  booking_appointment_link, location_link
)
FROM '/path/to/file.csv'
DELIMITER ';'
CSV HEADER;
```

**Note:** This requires file access on Supabase server, which may not be available in all plans.

---

## 🛡️ **Pre-Import Checklist**

Before running the import:

- [ ] Database schema is created (`supabase-schema-from-csv.sql` executed)
- [ ] Environment variables are set in `.env.local`
- [ ] CSV file path is correct
- [ ] CSV uses semicolon (`;`) delimiter
- [ ] First row contains column headers
- [ ] Test with a small sample first (optional but recommended)

---

## 🧪 **Test with Sample Data First**

**Recommended:** Test with first 100 rows:

1. Create a test CSV with first 100 rows:
```bash
head -n 101 "/Users/philipobaye/Downloads/Outscraper-20251105070352s7c_tire_shop copy.csv" > test-sample.csv
```

2. Import the sample:
```bash
npm run import-csv test-sample.csv
```

3. Verify in browser at http://localhost:3000

4. If successful, import the full dataset

---

## 🐛 **Troubleshooting**

### **Issue: "Cannot find file"**
```
Solution: Provide full absolute path to CSV file
npm run import-csv "/full/path/to/file.csv"
```

### **Issue: High error count**
```
Solution: Check error messages in console
Common issues:
- Missing required fields (name, city)
- Invalid data formats
- CSV encoding issues (try saving as UTF-8)
```

### **Issue: Import stops/hangs**
```
Solution:
- Reduce BATCH_SIZE to 250
- Check internet connection
- Verify Supabase is accessible
```

### **Issue: Duplicate entries**
```
Solution: Clear table first or use upsert
SQL to clear: DELETE FROM tire_shops;
```

### **Issue: Wrong delimiter**
```
Solution: Check if CSV uses ',' instead of ';'
Edit line 70 in import-csv.ts
```

---

## 📊 **Performance Expectations**

For **12,000 rows**:
- **Import time:** 3-10 minutes (depending on connection)
- **Batch size 500:** ~24 batches
- **Average:** ~800-1200 rows per minute

---

## 🔄 **Post-Import Verification**

After import completes:

1. **Check count in Supabase:**
   - Go to Table Editor → tire_shops
   - Verify row count

2. **Check in your app:**
   - Visit http://localhost:3000
   - Search and filter should work
   - Sample shops should appear

3. **Run validation query:**
```sql
-- Check for missing required fields
SELECT COUNT(*) FROM tire_shops WHERE name IS NULL OR city IS NULL;

-- Check province distribution
SELECT province_code, COUNT(*)
FROM tire_shops
GROUP BY province_code
ORDER BY COUNT(*) DESC;

-- Check for duplicates
SELECT name, city, COUNT(*)
FROM tire_shops
GROUP BY name, city
HAVING COUNT(*) > 1;
```

---

## 💡 **Tips for Success**

1. **Start small** - Test with 100 rows first
2. **Monitor progress** - Watch the console output
3. **Keep terminal open** - Don't close while importing
4. **Stable connection** - Ensure good internet during import
5. **Backup first** - If re-importing, backup existing data
6. **Off-peak hours** - Import during low-traffic times for faster speeds

---

## 📞 **Next Steps After Import**

Once import is complete:

1. ✅ Verify data in browser
2. ✅ Test search and filtering
3. ✅ Check shop details display correctly
4. ✅ Validate phone numbers and URLs work
5. ✅ Set some shops as "featured" (optional)
6. ✅ Add reviews (optional)
7. ✅ Deploy to production

---

## 🎯 **Ready to Import?**

Run this command with your CSV file path:

```bash
npm run import-csv "/Users/philipobaye/Downloads/Outscraper-20251105070352s7c_tire_shop copy.csv"
```

**Estimated time:** 5-8 minutes for 12,000 rows

Good luck! 🚀
