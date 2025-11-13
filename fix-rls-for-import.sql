-- Temporarily allow inserts for import script
-- Run this BEFORE importing data

-- Option 1: Add insert policy (Recommended)
CREATE POLICY "Allow insert for import"
    ON tire_shops FOR INSERT
    WITH CHECK (true);

-- After import is done, you can optionally drop this policy if you want:
-- DROP POLICY "Allow insert for import" ON tire_shops;
