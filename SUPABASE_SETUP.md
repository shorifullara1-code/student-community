# Supabase Integration Setup

Supabase has been integrated into the "Savar Student Community" website. The application automatically fetches website content and configuration from your Supabase database and syncs changes made in the Admin panel.

## Required Setup in Supabase

To make the integration work, you need to execute the following SQL command in your Supabase project's **SQL Editor**. This will create the `settings` table that stores the website content.

```sql
-- 1. Create the settings table
CREATE TABLE IF NOT EXISTS settings (
  id int primary key,
  data jsonb not null
);

-- 2. Insert the default data row
INSERT INTO settings (id, data) VALUES (1, '{}') ON CONFLICT DO NOTHING;

-- 3. (Optional but recommended) Disable Row Level Security (RLS) if you want the public and the admin panel to easily read/write data using the anon key.
-- Alternatively, set up proper RLS policies for a production app.
ALTER TABLE settings DISABLE ROW LEVEL SECURITY;
```

### Steps to execute:
1. Go to your Supabase project dashboard at https://aobfohlsidjwxofnrmuv.supabase.co
2. Click on the **SQL Editor** tab on the left sidebar.
3. Click **New Query**.
4. Paste the SQL snippet above into the text area.
5. Click **Run**.

Once you have run this script, any changes made in the Admin Panel will be saved securely to your Supabase database instead of your browser's local storage.
