# Database Migrations

This directory contains SQL migration files for the Cloudflare D1 database.

## Quick Start

### 1. Create the D1 Database

```bash
# Create production database
npx wrangler d1 create mh-construction-db

# Create preview/development database
npx wrangler d1 create mh-construction-db-preview
```

Copy the `database_id` values into your `wrangler.toml` and `.env.local` files.

### 2. Run Migrations

```bash
# Apply all migrations to local database
npx wrangler d1 execute mh-construction-db --local --file=./migrations/0001_create_consultations.sql
npx wrangler d1 execute mh-construction-db --local --file=./migrations/0002_create_job_applications.sql
npx wrangler d1 execute mh-construction-db --local --file=./migrations/0003_create_contact_submissions.sql
npx wrangler d1 execute mh-construction-db --local --file=./migrations/0004_create_users.sql
npx wrangler d1 execute mh-construction-db --local --file=./migrations/0005_create_sessions.sql

# Apply to production (after testing!)
npx wrangler d1 execute mh-construction-db --remote --file=./migrations/0001_create_consultations.sql
# ... repeat for each migration
```

### 3. Verify Schema

```bash
# Check local database
npx wrangler d1 execute mh-construction-db --local --command="SELECT name FROM sqlite_master WHERE type='table';"

# Check production database
npx wrangler d1 execute mh-construction-db --remote --command="SELECT name FROM sqlite_master WHERE type='table';"
```

## Migration Files

| File | Table | Purpose |
|------|-------|---------|
| `0001_create_consultations.sql` | consultations | Store consultation booking requests |
| `0002_create_job_applications.sql` | job_applications | Store career/job applications |
| `0003_create_contact_submissions.sql` | contact_submissions | Store general contact form submissions |
| `0004_create_users.sql` | users | Store user accounts for authentication |
| `0005_create_sessions.sql` | sessions | Store JWT session tokens |

## Schema Overview

### consultations

- Stores client consultation requests
- Tracks booking dates, times, and project details
- Status tracking: new, contacted, scheduled, completed, cancelled

### job_applications

- Stores employment applications
- Links to resume files in R2 storage
- Status tracking: new, reviewing, interviewed, hired, rejected

### contact_submissions

- Stores general inquiries from contact form
- Urgency levels: low, medium, high
- Status tracking: new, in_progress, resolved, closed

### users

- Authentication and authorization
- Roles: user, admin, manager
- Password hashing required (use bcrypt)

### sessions

- JWT token management
- Session expiration tracking
- IP and user agent logging for security

## Development Workflow

1. **Local Development**: Use `--local` flag to test against local D1 instance
2. **Testing**: Verify CRUD operations work correctly
3. **Staging**: Apply migrations to preview database first
4. **Production**: Apply migrations to production after validation

## Helper Commands

```bash
# Query consultations
npx wrangler d1 execute mh-construction-db --local \
  --command="SELECT * FROM consultations LIMIT 10;"

# Check table structure
npx wrangler d1 execute mh-construction-db --local \
  --command="PRAGMA table_info(consultations);"

# Count records
npx wrangler d1 execute mh-construction-db --local \
  --command="SELECT COUNT(*) as total FROM consultations;"

# Drop table (CAREFUL!)
npx wrangler d1 execute mh-construction-db --local \
  --command="DROP TABLE IF EXISTS consultations;"
```

## Environment Variables

Add these to `.env.local`:

```bash
D1_DATABASE_ID="your-database-id-here"
D1_PREVIEW_DATABASE_ID="your-preview-database-id-here"
```

## Rollback Strategy

To rollback a migration, create a corresponding down migration:

```sql
-- Example: 0001_create_consultations_down.sql
DROP TABLE IF EXISTS consultations;
DROP INDEX IF EXISTS idx_consultations_status;
DROP INDEX IF EXISTS idx_consultations_date;
DROP INDEX IF EXISTS idx_consultations_email;
```

## Security Notes

- Never commit actual database IDs to git
- Use environment variables for all credentials
- Hash passwords before storing (bcrypt, scrypt, or argon2)
- Sanitize all user inputs before database operations
- Use parameterized queries to prevent SQL injection

## Troubleshooting

**Problem**: "No such table" error  
**Solution**: Run migrations in order (0001, 0002, etc.)

**Problem**: "Unique constraint failed"  
**Solution**: Check for duplicate data before inserting

**Problem**: "Database locked"  
**Solution**: Close other database connections, retry operation

**Problem**: Foreign key constraint failed  
**Solution**: Ensure referenced records exist (e.g., user_id in sessions must exist in users table)

## Next Steps

After running migrations:

1. Create `src/lib/db/client.ts` - Database connection wrapper
2. Update API routes to use D1 instead of in-memory storage
3. Test all CRUD operations
4. Add data validation and error handling
5. Implement admin dashboard for viewing records

---

**Last Updated**: November 5, 2025  
**Migration Version**: v1.0.0
