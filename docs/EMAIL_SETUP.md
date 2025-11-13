# Email Integration Setup Guide

The application has API routes configured for email notifications. Choose one of the following services to enable email sending:

## Option 1: Resend (Recommended) ⭐

Resend is a modern email API designed for developers. It's the easiest to set up with Next.js.

### Setup Steps:

1. **Create a Resend account**: https://resend.com/signup
2. **Get your API key** from the dashboard
3. **Install the package**:
   ```bash
   npm install resend
   ```
4. **Add to `.env.local`**:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```
5. **Uncomment the Resend code** in:
   - `app/api/contact/route.ts`
   - `app/api/add-shop/route.ts`

6. **Update the email addresses**:
   - Replace `noreply@tireshoppro.ca` with your verified domain
   - Replace `info@tireshoppro.ca` with your receiving email

### Example Code (already in the files, just uncomment):
```typescript
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'TireShopPro <noreply@yourdomain.com>',
  to: 'info@yourdomain.com',
  subject: `Contact Form: ${subject}`,
  html: emailContent
});
```

**Pricing**: 100 emails/day free, then $20/month for 50k emails

---

## Option 2: SendGrid

SendGrid is a popular email delivery service with good deliverability.

### Setup Steps:

1. **Create account**: https://sendgrid.com/
2. **Get API key** from Settings → API Keys
3. **Install package**:
   ```bash
   npm install @sendgrid/mail
   ```
4. **Add to `.env.local`**:
   ```
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
   ```
5. **Uncomment SendGrid code** in the API routes

### Example Code:
```typescript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

await sgMail.send({
  to: 'info@yourdomain.com',
  from: 'noreply@yourdomain.com', // Must be verified
  subject: `Contact Form: ${subject}`,
  html: emailContent
});
```

**Pricing**: 100 emails/day free, then $15/month for 40k emails

---

## Option 3: Nodemailer (SMTP)

Use your existing email provider (Gmail, Outlook, etc.) or SMTP server.

### Setup Steps:

1. **Install package**:
   ```bash
   npm install nodemailer
   npm install --save-dev @types/nodemailer
   ```

2. **Add to `.env.local`**:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```

3. **Create email utility** (`lib/email.ts`):
   ```typescript
   import nodemailer from 'nodemailer';

   export async function sendEmail({ to, subject, html }: {
     to: string;
     subject: string;
     html: string;
   }) {
     const transporter = nodemailer.createTransport({
       host: process.env.SMTP_HOST,
       port: Number(process.env.SMTP_PORT),
       secure: false,
       auth: {
         user: process.env.SMTP_USER,
         pass: process.env.SMTP_PASS,
       },
     });

     await transporter.sendMail({
       from: process.env.SMTP_USER,
       to,
       subject,
       html,
     });
   }
   ```

4. **Import and use** in API routes:
   ```typescript
   import { sendEmail } from '@/lib/email';

   await sendEmail({
     to: 'info@yourdomain.com',
     subject: `Contact Form: ${subject}`,
     html: emailContent
   });
   ```

### Gmail Setup:
1. Enable 2-factor authentication
2. Create an "App Password": https://myaccount.google.com/apppasswords
3. Use the app password in `SMTP_PASS`

**Pricing**: Free (uses your existing email account)

---

## Current Status

✅ **API routes created**:
- `/api/contact` - Handles contact form submissions
- `/api/add-shop` - Handles shop submission requests

✅ **Validation implemented**:
- Required fields
- Email format validation
- Error handling

⏳ **Email sending**:
- Currently logs to console (development mode)
- Uncomment your preferred service in the API routes to enable

---

## Testing

1. **Development**: Submissions are logged to the terminal/console
2. **Check logs**: Look for 📧 (contact form) or 🏪 (shop submission) emojis
3. **Production**: Uncomment email service code before deploying

---

## Recommendations

| Use Case | Best Option |
|----------|-------------|
| Quick setup, modern | **Resend** ⭐ |
| Enterprise, high volume | SendGrid |
| Existing email, no budget | Nodemailer (SMTP) |

---

## Need Help?

- Resend Docs: https://resend.com/docs
- SendGrid Docs: https://docs.sendgrid.com/
- Nodemailer Docs: https://nodemailer.com/

---

## Security Notes

- ⚠️ Never commit API keys to git
- ✅ Always use `.env.local` for secrets
- ✅ Add `.env.local` to `.gitignore` (already done)
- ✅ Use environment variables in production (Vercel, Netlify, etc.)
