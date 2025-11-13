import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn('⚠️ RESEND_API_KEY not configured. Logging to console instead.');
      console.log('📧 Contact Form Submission:', {
        name,
        email,
        phone,
        subject,
        message,
        timestamp: new Date().toISOString()
      });

      // Still return success for better UX during development
      return NextResponse.json({
        success: true,
        message: 'Your message has been received. We\'ll get back to you within 24-48 hours.'
      });
    }

    // Send email using Resend
    const emailData = await resend.emails.send({
      from: 'TireShopPro <onboarding@resend.dev>', // Use verified domain in production
      to: process.env.CONTACT_EMAIL || 'info@tireshoppro.ca',
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #1f2937; margin-bottom: 5px; }
              .value { color: #4b5563; background: white; padding: 10px; border-radius: 4px; border: 1px solid #e5e7eb; }
              .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #e5e7eb; font-size: 12px; color: #6b7280; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">🛞 New Contact Form Submission</h2>
                <p style="margin: 5px 0 0 0; opacity: 0.9;">TireShopPro.ca</p>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">👤 Name:</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">📧 Email:</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                ${phone ? `
                <div class="field">
                  <div class="label">📞 Phone:</div>
                  <div class="value"><a href="tel:${phone}">${phone}</a></div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="label">📋 Subject:</div>
                  <div class="value">${subject}</div>
                </div>
                <div class="field">
                  <div class="label">💬 Message:</div>
                  <div class="value">${message.replace(/\n/g, '<br>')}</div>
                </div>
                <div class="footer">
                  <p>Submitted: ${new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })} EST</p>
                  <p>Reply to this email to respond directly to the sender.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `
    });

    console.log('✅ Email sent successfully:', emailData);

    // Return success
    return NextResponse.json({
      success: true,
      message: 'Your message has been received. We\'ll get back to you within 24-48 hours.'
    });

  } catch (error: any) {
    console.error('❌ Error sending email:', error);

    // Return a more user-friendly error
    return NextResponse.json(
      {
        error: 'Failed to send message. Please try again later or email us directly.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
