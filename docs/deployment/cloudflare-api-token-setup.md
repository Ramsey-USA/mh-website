# Cloudflare API Token Setup for D1 Deployment

**Issue:** The current API token is missing required permissions for D1 database operations.

---

## Required Token Permissions

Your API token needs these permissions:

### Account Permissions

- **D1** → Edit
- **Workers Scripts** → Edit (for deployment)
- **Account Settings** → Read

### User Permissions

- **User Details** → Read
- **Memberships** → Read

### Zone Permissions (if deploying to a custom domain)

- **Zone** → Read
- **DNS** → Edit

---

## How to Create/Update Token

1. **Go to Cloudflare Dashboard:**
   - <https://dash.cloudflare.com/profile/api-tokens>

2. **Click "Create Token" or Edit existing token**

3. **Select "Create Custom Token"**

4. **Add Permissions:**

   ```text
   Account:
   ├── Account Settings → Read
   ├── D1 → Edit
   └── Workers Scripts → Edit
   
   User:
   ├── Memberships → Read
   └── User Details → Read
   
   Zone (optional):
   ├── Zone → Read
   └── DNS → Edit
   ```

5. **Set Account Resources:**
   - Select: "All accounts" or specific account

6. **Create Token and Copy**
   - Save the new token
   - Set in Codespaces: `export CLOUDFLARE_API_TOKEN="your-new-token"`

---

## Alternative: Use Cloudflare Account ID + API Key

If you prefer, you can use your Global API Key instead:

```bash
# Find these in Cloudflare Dashboard → Profile
export CLOUDFLARE_ACCOUNT_ID="your-account-id"
export CLOUDFLARE_API_KEY="your-global-api-key"
export CLOUDFLARE_EMAIL="your-email@example.com"
```

---

## Quick Test

After setting the token, test it:

```bash
npx wrangler whoami
npx wrangler d1 list
```

If both commands succeed, you're ready to create databases!

---

## Next Steps After Token Setup

```bash
# 1. Create databases
npx wrangler d1 create mh-construction-db
npx wrangler d1 create mh-construction-db-preview

# 2. Copy the database IDs from output

# 3. Update .env.local
echo "D1_DATABASE_ID=your-prod-id" >> .env.local
echo "D1_PREVIEW_DATABASE_ID=your-preview-id" >> .env.local

# 4. Run migrations
npx wrangler d1 execute mh-construction-db --remote --file=./migrations/0001_create_consultations.sql
npx wrangler d1 execute mh-construction-db --remote --file=./migrations/0002_create_job_applications.sql
npx wrangler d1 execute mh-construction-db --remote --file=./migrations/0003_create_contact_submissions.sql
npx wrangler d1 execute mh-construction-db --remote --file=./migrations/0004_create_users.sql
npx wrangler d1 execute mh-construction-db --remote --file=./migrations/0005_create_sessions.sql

# 5. Verify tables
npx wrangler d1 execute mh-construction-db --remote \
  --command="SELECT name FROM sqlite_master WHERE type='table';"
```

---

**Current Token:** Missing required permissions  
**Action Required:** Update token with D1 Edit + Memberships Read + User Details Read permissions  
**Status:** Waiting for token update
