# R2 Resume Storage Setup Guide

## Overview

The MH Construction website now uses Cloudflare R2 storage for handling job application resumes. This provides
secure, scalable file storage with automatic handling of file uploads and email attachments.

## Features

- ✅ **Resume Upload**: Applicants can upload PDF, DOC, or DOCX files (up to 10MB)
- ✅ **R2 Storage**: Files are stored in Cloudflare R2 bucket (`mh-construction-resumes`)
- ✅ **Smart Email Attachments**: Files under 2MB are automatically attached to notification emails
- ✅ **Download Links**: All files get a secure download URL included in emails
- ✅ **File Validation**: Automatic validation of file type and size
- ✅ **Metadata Tracking**: Each file stores applicant email, upload time, and original filename

## How It Works

### 1. Application Flow

```text
Applicant submits form with resume
         ↓
Resume uploaded to /api/upload/resume
         ↓
File stored in R2 bucket "RESUMES"
         ↓
R2 URL returned to client
         ↓
Application submitted to /api/job-applications with R2 URL
         ↓
Email sent with resume download link
         ↓
If file < 2MB: Resume also attached to email
```

### 2. File Organization in R2

```text
resumes/
  ├── email@example.com/
  │   ├── 1700000001-john-doe-resume.pdf
  │   └── 1700000002-updated-resume.pdf
  └── another@example.com/
      └── 1700000003-jane-smith-resume.docx
```

Files are organized by applicant email with timestamp prefixes to ensure uniqueness.

## Setup Instructions

### 1. Create R2 Bucket

```bash
# In Cloudflare Dashboard:
1. Navigate to R2 Object Storage
2. Create a new bucket named "mh-construction-resumes"
3. Set bucket to private (default)
```

### 2. Configure Wrangler

The `wrangler.toml` already includes:

```toml
[[r2_buckets]]
binding = "RESUMES"
bucket_name = "mh-construction-resumes"
```

### 3. Set Up Public Access (Optional)

If you want public URLs without signed access:

```bash
# In Cloudflare Dashboard:
1. Go to R2 bucket settings
2. Enable "Public Access"
3. Set custom domain or use default: pub-mh-construction-resumes.r2.dev
```

### 4. Environment Variables

No additional environment variables needed - R2 binding is automatic in Cloudflare Workers.

## API Endpoints

### Upload Resume

**POST** `/api/upload/resume`

**Content-Type**: `multipart/form-data`

**Body**:

- `file`: File (PDF, DOC, DOCX, max 10MB)
- `email`: string (applicant email)

**Response**:

```json
{
  "success": true,
  "data": {
    "key": "resumes/email@example.com/1700000001-resume.pdf",
    "url": "https://pub-mh-construction-resumes.r2.dev/resumes/email@example.com/1700000001-resume.pdf",
    "size": 245678,
    "filename": "resume.pdf"
  }
}
```

### Download Resume

**GET** `/api/upload/resume?key=resumes/email@example.com/1700000001-resume.pdf`

Returns the file with proper content-type headers for download.

## Email Notifications

### Small Files (< 2MB)

- ✅ Attached directly to email
- ✅ Download link included in email body
- ✅ Recipients can download immediately from email client

### Large Files (≥ 2MB)

- ✅ Download link included in email body
- ✅ Click link to download from R2
- ✅ No attachment to keep email size manageable

### Email Template Format

```text
New Job Application Received

Position: [Position]
Name: [First Last]
Email: [email]
Phone: [phone]
...

Resume: Available - Download at: https://pub-mh-construction-resumes.r2.dev/...
Filename: resume.pdf
Size: 245.67 KB

Submitted: [timestamp] PST
```

## Security Considerations

### Current Setup (Development)

- Files stored in R2 with private access
- Download URLs require authentication token (to be implemented)
- File validation on upload (type and size)

### Recommended Production Setup

1. **Add Authentication**: Require authentication for download endpoint
2. **Signed URLs**: Generate time-limited signed URLs for downloads
3. **Virus Scanning**: Integrate virus scanning before storing files
4. **Rate Limiting**: Add rate limits to upload endpoint
5. **Access Logs**: Enable R2 access logging for security audits

## Troubleshooting

### Resume Not Uploading

**Symptom**: Upload fails with error
**Check**:

- File size < 10MB
- File type is PDF, DOC, or DOCX
- R2 bucket exists and is bound correctly
- Network connection to Cloudflare

### Resume Not in Email

**Symptom**: Email sent but no attachment/link
**Check**:

- Upload succeeded (check browser network tab)
- Application submission includes `resumeUrl` and `resumeKey`
- Email logs show attachment attempt
- File size (if > 2MB, won't be attached)

### Download Link Not Working

**Symptom**: 404 when clicking download link
**Check**:

- R2 bucket has public access enabled (or)
- Download endpoint is working
- File key is correct
- File wasn't deleted

## File Cleanup

### Manual Cleanup

```bash
# Use Wrangler CLI to list and delete old files
wrangler r2 object list mh-construction-resumes --prefix resumes/

# Delete specific file
wrangler r2 object delete mh-construction-resumes resumes/path/to/file.pdf
```

### Automatic Cleanup (Future Enhancement)

Consider implementing:

- Delete resumes after 90 days
- Delete resumes for rejected applications
- Archive old resumes to cheaper storage

## Cost Considerations

### R2 Pricing (as of 2024)

- **Storage**: $0.015 per GB/month
- **Class A Operations** (write): $4.50 per million
- **Class B Operations** (read): $0.36 per million
- **Egress**: Free (no bandwidth charges)

### Estimated Costs

Assuming 100 applications/month with 1MB average resume:

- Storage: 100 MB \* $0.015 = **$0.0015/month**
- Uploads: 100 \* $4.50/1M = **$0.00045/month**
- Downloads: 200 \* $0.36/1M = **$0.000072/month**

**Total**: ~**$0.002/month** (essentially free)

## Testing

### Local Development

```bash
# Start local dev server with wrangler
npm run dev

# Upload test resume
curl -X POST http://localhost:3000/api/upload/resume \
  -F "file=@test-resume.pdf" \
  -F "email=test@example.com"
```

### Production Testing

1. Submit a job application through the website
2. Upload a test resume (< 2MB to test attachment)
3. Check email received at <office@mhc-gc.com> and <matt@mhc-gc.com>
4. Verify resume is attached (if < 2MB)
5. Click download link to verify R2 access
6. Check R2 dashboard to confirm file is stored

## Monitoring

### Key Metrics to Track

- Upload success rate
- Average file size
- Storage usage over time
- Download link click rate
- Email attachment vs. link-only ratio

### Logs to Monitor

- Upload failures
- R2 connection errors
- Email sending failures
- Download 404 errors

## Future Enhancements

- [ ] Virus scanning integration
- [ ] OCR for resume text extraction
- [ ] Resume parsing for auto-fill application fields
- [ ] Applicant resume history tracking
- [ ] Admin dashboard for resume management
- [ ] Automatic thumbnail generation
- [ ] Resume format conversion (DOC → PDF)
- [ ] Duplicate detection

## Support

For issues or questions:

- Check Cloudflare R2 documentation
- Review application logs
- Contact: development team

**Last Updated**: November 18, 2025 | MH Construction, Inc.
