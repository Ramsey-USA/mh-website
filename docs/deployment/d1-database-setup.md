# Cloudflare D1 Database Deployment Guide

**Created:** November 2025  
**Status:** Ready for deployment  
**Database:** Cloudflare D1 (SQLite at the edge)

---

## Quick Deployment Steps

### 1. Create D1 Database

```bash
# Create production database
npx wrangler d1 create mh-construction-db

# Create preview/development database
npx wrangler d1 create mh-construction-db-preview
```

**Save the output!** You'll receive database IDs like:

```text
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

### 2. Update Environment Configuration

Add to your `.env.local`:

```bash
# Cloudflare D1 Database
D1_DATABASE_ID="your-production-database-id"
D1_PREVIEW_DATABASE_ID="your-preview-database-id"
```

The `wrangler.toml` is already configured with D1 bindings:

```toml
[[d1_databases]]
binding = "DB"
database_name = "mh-construction-db"
database_id = "${D1_DATABASE_ID}"
preview_database_id = "${D1_PREVIEW_DATABASE_ID}"
```

### 3. Run Database Migrations

```bash
# Navigate to project root
cd /workspaces/mh-website

# Apply migrations to LOCAL database (for testing)
npx wrangler d1 execute mh-construction-db --local --file=./migrations/0001_create_consultations.sql
npx wrangler d1 execute mh-construction-db --local --file=./migrations/0002_create_job_applications.sql
npx wrangler d1 execute mh-construction-db --local --file=./migrations/0003_create_contact_submissions.sql
npx wrangler d1 execute mh-construction-db --local --file=./migrations/0004_create_users.sql
npx wrangler d1 execute mh-construction-db --local --file=./migrations/0005_create_sessions.sql

# Verify local tables created
npx wrangler d1 execute mh-construction-db --local \
  --command="SELECT name FROM sqlite_master WHERE type='table';"
```

### 4. Test Locally

```bash
# Start development server with wrangler
npx wrangler pages dev .next --compatibility-date=2024-10-16

# Or use regular Next.js dev (D1 won't be available but gracefully falls back)
npm run dev
```

### 5. Deploy to Production

```bash
# Apply migrations to REMOTE database
npx wrangler d1 execute mh-construction-db --remote --file=./migrations/0001_create_consultations.sql
npx wrangler d1 execute mh-construction-db --remote --file=./migrations/0002_create_job_applications.sql
npx wrangler d1 execute mh-construction-db --remote --file=./migrations/0003_create_contact_submissions.sql
npx wrangler d1 execute mh-construction-db --remote --file=./migrations/0004_create_users.sql
npx wrangler d1 execute mh-construction-db --remote --file=./migrations/0005_create_sessions.sql

# Verify production tables
npx wrangler d1 execute mh-construction-db --remote \
  --command="SELECT name FROM sqlite_master WHERE type='table';"

# Deploy to Cloudflare Pages
npm run build
npx @cloudflare/next-on-pages
npx wrangler pages deploy .vercel/output/static
```

---

## API Endpoints with D1 Integration

### ✅ Consultations API

- **POST** `/api/consultations` - Create consultation (stores in D1)
- **GET** `/api/consultations` - List all consultations
- **GET** `/api/consultations/[id]` - Get specific consultation
- **PUT** `/api/consultations/[id]` - Update consultation
- **DELETE** `/api/consultations/[id]` - Delete consultation

### ✅ Job Applications API

- **POST** `/api/job-applications` - Submit application (stores in D1)
- **GET** `/api/job-applications` - List all applications

### ✅ Contact Submissions API

- **POST** `/api/contact` - Submit contact form (stores in D1)
- **GET** `/api/contact` - List all submissions

---

## Database Schema Summary

| Table                 | Records             | Purpose                                   |
| --------------------- | ------------------- | ----------------------------------------- |
| `consultations`       | Client bookings     | Consultation requests with scheduling     |
| `job_applications`    | Career applications | Employment applications with resume links |
| `contact_submissions` | Contact forms       | General inquiries and contact requests    |
| `users`               | User accounts       | Authentication and admin access           |
| `sessions`            | Active sessions     | JWT token management                      |

---

## Verification Commands

```bash
# Check tables exist
npx wrangler d1 execute mh-construction-db --remote \
  --command="SELECT name FROM sqlite_master WHERE type='table';"

# Count records in consultations
npx wrangler d1 execute mh-construction-db --remote \
  --command="SELECT COUNT(*) as count FROM consultations;"

# View recent consultations
npx wrangler d1 execute mh-construction-db --remote \
  --command="SELECT id, client_name, email, status, created_at FROM consultations ORDER BY created_at DESC LIMIT 5;"

# View recent job applications
npx wrangler d1 execute mh-construction-db --remote \
  --command="SELECT id, first_name, last_name, position, status, created_at FROM job_applications ORDER BY created_at DESC LIMIT 5;"

# View recent contact submissions
npx wrangler d1 execute mh-construction-db --remote \
  --command="SELECT id, first_name, last_name, email, urgency, status, created_at FROM contact_submissions ORDER BY created_at DESC LIMIT 5;"
```

---

## Troubleshooting

### "Database not found"

- Make sure you created the database with `wrangler d1 create`
- Verify the database ID in `wrangler.toml` matches the one from creation
- Check you're using `--remote` for production or `--local` for development

### "Table does not exist"

- Run the migration files in order (0001, 0002, etc.)
- Check migrations completed successfully with `SELECT name FROM sqlite_master`

### "D1 database not available"

- This is normal in local Next.js development (`npm run dev`)
- API endpoints gracefully handle missing D1 and log warnings
- Use `wrangler pages dev` for full Cloudflare Workers environment

### Data not persisting locally

- Use `wrangler pages dev` instead of `npm run dev`
- Or deploy to Cloudflare Pages staging for testing

---

## Next Steps

1. **Test API Endpoints**: Use curl or Postman to test each endpoint
2. **Add Authentication**: Implement JWT authentication for admin routes
3. **Build Admin Dashboard**: Create UI to view submissions
4. **Add R2 Integration**: Upload resumes to Cloudflare R2
5. **Set Up Monitoring**: Track database size and query performance

---

## Important Notes

- **Graceful Fallback**: All APIs work without D1 (email-only mode) for development
- **Type Safety**: Full TypeScript types for all database operations
- **Edge Runtime**: All APIs use `export const runtime = "edge"` for Cloudflare Workers
- **Security**: Add authentication before exposing GET endpoints in production
- **Backups**: D1 data is automatically backed up by Cloudflare

---

**Status:** ✅ Ready for deployment  
**Database Files:** 5 migration files in `/migrations/`  
**API Routes:** 3 fully integrated (consultations, job-applications, contact)  
**Next Action:** Run migrations and deploy to Cloudflare Pages
