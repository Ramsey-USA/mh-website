/**
 * Email Templates for Automated Responses
 * Following MH Construction brand messaging guidelines
 */

import { COMPANY_INFO } from "@/lib/constants/company";

export interface ApplicantEmailData {
  firstName: string;
  lastName: string;
  position: string;
  email: string;
}

export interface ConsultationEmailData {
  name: string;
  projectType: string;
  email: string;
  selectedDate?: string;
  selectedTime?: string;
}

export interface ContactEmailData {
  name: string;
  email: string;
  type?: string;
}

/**
 * Generate HTML email for job application acknowledgment
 * Messaging: Professional, encouraging, partnership-focused
 */
export function generateJobApplicationAcknowledgment(
  data: ApplicantEmailData,
): { subject: string; html: string; text: string } {
  const subject = `Application Received - ${data.position} Position | MH Construction, Inc.`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #212121; margin: 0; padding: 0; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #386851 0%, #2d5340 100%); padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">MH Construction, Inc.</h1>
        <p style="color: #d4af37; margin: 10px 0 0 0; font-size: 14px; font-weight: 600;">Veteran-Owned Excellence</p>
      </td>
    </tr>
    
    <!-- Content -->
    <tr>
      <td style="padding: 40px 30px;">
        <h2 style="color: #386851; margin: 0 0 20px 0; font-size: 20px;">🌟 Welcome to Your Future!</h2>
        
        <p style="margin: 0 0 15px 0; font-size: 16px; line-height: 1.6;">
          Dear ${data.firstName} ${data.lastName},
        </p>
        
        <p style="margin: 0 0 15px 0; font-size: 16px; line-height: 1.6;">
          We're <em>excited</em> to have received your application for the <strong style="color: #386851;">${data.position}</strong> position! Thank you for considering MH Construction as the place to build your career and future. We're thrilled you want to join our veteran-owned family.
        </p>
        
        <div style="background-color: #f0f7f4; border-left: 4px solid #386851; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; font-size: 15px; color: #2d5340; line-height: 1.6;">
            <strong>🚀 What happens next?</strong><br>
            Our team is looking forward to reviewing your application and learning more about YOUR unique talents and aspirations! We're committed to finding the perfect fit for both you and our growing company, so we take time to thoughtfully consider each candidate and the opportunities we can offer.
          </p>
        </div>
        
        <p style="margin: 0 0 15px 0; font-size: 16px; line-height: 1.6;">
          You can expect to hear from us within <strong>3-5 business days</strong>. If your qualifications align with our current needs, we'll reach out to schedule an interview.
        </p>
        
        <p style="margin: 0 0 15px 0; font-size: 16px; line-height: 1.6;">
          At MH Construction, we believe <em>"Your Growth Is Our Mission."</em> We're not just looking for employees—we're seeking future partners, leaders, and family members who will grow with us. We invest in your success because when you thrive, we all thrive together.
        </p>
        
        <div style="background-color: #fff9f0; border: 1px solid #d4af37; padding: 15px; margin: 20px 0; border-radius: 6px;">
          <p style="margin: 0; font-size: 14px; color: #666; line-height: 1.6;">
            <strong style="color: #BD9264;">🎖️ A Special Welcome to Our Veterans!</strong><br>
            As a veteran-owned company, we're honored by your service and genuinely excited about the unique strengths you bring. Military discipline, precision, and teamwork translate beautifully into construction careers—and we're here to help you transition and thrive. You have priority consideration, and we can't wait to learn about your journey!
          </p>
        </div>
        
        <p style="margin: 20px 0 0 0; font-size: 16px; line-height: 1.6;">
          Thank you for taking this exciting first step toward your future with MH Construction. We're genuinely looking forward to getting to know you, your talents, and your dreams. This could be the beginning of something great!
        </p>
        
        <p style="margin: 20px 0 0 0; font-size: 16px; line-height: 1.6;">
          With enthusiasm and anticipation,<br>
          <strong style="color: #386851;">Your Future Team at MH Construction</strong>
        </p>
      </td>
    </tr>
    
    <!-- Footer -->
    <tr>
      <td style="background-color: #f5f5f5; padding: 20px; text-align: center; border-top: 1px solid #e5e5e5;">
        <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
          <strong>MH Construction, Inc.</strong><br>
          ${COMPANY_INFO.address.full}<br>
          Phone: <a href="tel:${COMPANY_INFO.phone.tel}" style="color: #386851; text-decoration: none;">${COMPANY_INFO.phone.display}</a><br>
          Email: <a href="mailto:${COMPANY_INFO.email.main}" style="color: #386851; text-decoration: none;">${COMPANY_INFO.email.main}</a>
        </p>
        <p style="margin: 0; font-size: 12px; color: #999;">
          Licensed in WA, OR, ID | Veteran-Owned & Operated
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `
🌟 MH Construction, Inc. - Welcome to Your Future!

Dear ${data.firstName} ${data.lastName},

We're EXCITED to have received your application for the ${data.position} position! Thank you for considering MH Construction as the place to build your career and future. We're thrilled you want to join our veteran-owned family.

🚀 WHAT HAPPENS NEXT?
Our team is looking forward to reviewing your application and learning more about YOUR unique talents and aspirations! We're committed to finding the perfect fit for both you and our growing company, so we take time to thoughtfully consider each candidate and the opportunities we can offer.

You can expect to hear from us within 3-5 business days. If your qualifications align with our current needs, we'll reach out to schedule an interview.

At MH Construction, we believe "Your Growth Is Our Mission." We're not just looking for employees—we're seeking future partners, leaders, and family members who will grow with us. We invest in your success because when you thrive, we all thrive together.

🎖️ A SPECIAL WELCOME TO OUR VETERANS!
As a veteran-owned company, we're honored by your service and genuinely excited about the unique strengths you bring. Military discipline, precision, and teamwork translate beautifully into construction careers—and we're here to help you transition and thrive. You have priority consideration, and we can't wait to learn about your journey!

Thank you for taking this exciting first step toward your future with MH Construction. We're genuinely looking forward to getting to know you, your talents, and your dreams. This could be the beginning of something great!

With enthusiasm and anticipation,
Your Future Team at MH Construction

---

MH Construction, Inc.
${COMPANY_INFO.address.full}
Phone: ${COMPANY_INFO.phone.display}
Email: ${COMPANY_INFO.email.main}

Licensed in WA, OR, ID | Veteran-Owned & Operated
  `.trim();

  return { subject, html, text };
}

/**
 * Generate HTML email for consultation request acknowledgment
 * Messaging: Partnership-focused, professional, reassuring
 */
export function generateConsultationAcknowledgment(
  data: ConsultationEmailData,
): { subject: string; html: string; text: string } {
  const subject = `Consultation Request Received - ${data.projectType} | MH Construction, Inc.`;

  const appointmentInfo =
    data.selectedDate && data.selectedTime
      ? `
        <div style="background-color: #f0f7f4; border: 1px solid #386851; padding: 20px; margin: 20px 0; border-radius: 6px; text-align: center;">
          <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
            <strong style="color: #386851; font-size: 16px;">Your Consultation is Scheduled</strong>
          </p>
          <p style="margin: 0; font-size: 18px; color: #386851; font-weight: 600;">
            📅 ${new Date(data.selectedDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}<br>
            🕐 ${data.selectedTime}
          </p>
        </div>
    `
      : "";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #212121; margin: 0; padding: 0; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #386851 0%, #2d5340 100%); padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">MH Construction, Inc.</h1>
        <p style="color: #d4af37; margin: 10px 0 0 0; font-size: 14px; font-weight: 600; font-style: italic;">Building projects for the client, <em>NOT</em> the dollar</p>
      </td>
    </tr>
    
    <!-- Content -->
    <tr>
      <td style="padding: 40px 30px;">
        <h2 style="color: #386851; margin: 0 0 20px 0; font-size: 20px;">Let's Build Something Great Together</h2>
        
        <p style="margin: 0 0 15px 0; font-size: 16px; line-height: 1.6;">
          Dear ${data.name},
        </p>
        
        <p style="margin: 0 0 15px 0; font-size: 16px; line-height: 1.6;">
          Thank you for reaching out to MH Construction about your <strong style="color: #386851;">${data.projectType}</strong> project. We've received your consultation request and are excited about the possibility of partnering with you.
        </p>
        
        ${appointmentInfo}
        
        <div style="background-color: #f0f7f4; border-left: 4px solid #386851; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; font-size: 15px; color: #2d5340; line-height: 1.6;">
            <strong>What to Expect:</strong><br>
            We'll review your project details and reach out within <strong>24 hours</strong> to discuss your vision, timeline, and budget. Our partnership-driven approach means we work WITH you to bring your project to life.
          </p>
        </div>
        
        <p style="margin: 0 0 15px 0; font-size: 16px; line-height: 1.6;">
          At MH Construction, we believe <em>"THE ROI IS THE RELATIONSHIP."</em> We're not just building structures — we're building lasting partnerships based on trust, transparency, and military precision.
        </p>
        
        <div style="background-color: #fff; border: 2px solid #386851; padding: 20px; margin: 20px 0; border-radius: 6px;">
          <p style="margin: 0 0 10px 0; font-size: 15px; color: #386851; font-weight: 600;">
            🤝 Our Partnership Promise:
          </p>
          <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #666; line-height: 1.8;">
            <li>Open-book pricing with no surprises</li>
            <li>Regular progress updates and transparent communication</li>
            <li>Military precision meets partnership warmth</li>
            <li>Your vision guides every decision we make</li>
          </ul>
        </div>
        
        <p style="margin: 20px 0 0 0; font-size: 16px; line-height: 1.6;">
          If you have any immediate questions or need to reach us, feel free to call <strong style="color: #386851;">${COMPANY_INFO.phone.display}</strong> or reply to this email.
        </p>
        
        <p style="margin: 20px 0 0 0; font-size: 16px; line-height: 1.6;">
          Looking forward to building more than just structures with you,<br>
          <strong style="color: #386851;">The MH Construction Team</strong>
        </p>
      </td>
    </tr>
    
    <!-- Footer -->
    <tr>
      <td style="background-color: #f5f5f5; padding: 20px; text-align: center; border-top: 1px solid #e5e5e5;">
        <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
          <strong>MH Construction, Inc.</strong><br>
          ${COMPANY_INFO.address.full}<br>
          Phone: <a href="tel:${COMPANY_INFO.phone.tel}" style="color: #386851; text-decoration: none;">${COMPANY_INFO.phone.display}</a><br>
          Email: <a href="mailto:${COMPANY_INFO.email.main}" style="color: #386851; text-decoration: none;">${COMPANY_INFO.email.main}</a>
        </p>
        <p style="margin: 0; font-size: 12px; color: #999;">
          Licensed in WA, OR, ID | Veteran-Owned & Operated
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `
MH Construction, Inc. - Consultation Request Received

Dear ${data.name},

Thank you for reaching out to MH Construction about your ${data.projectType} project. We've received your consultation request and are excited about the possibility of partnering with you.

${
  data.selectedDate && data.selectedTime
    ? `
YOUR CONSULTATION IS SCHEDULED:
📅 ${new Date(data.selectedDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
🕐 ${data.selectedTime}
`
    : ""
}

WHAT TO EXPECT:
We'll review your project details and reach out within 24 hours to discuss your vision, timeline, and budget. Our partnership-driven approach means we work WITH you to bring your project to life.

At MH Construction, we believe "THE ROI IS THE RELATIONSHIP." We're not just building structures — we're building lasting partnerships based on trust, transparency, and military precision.

🤝 OUR PARTNERSHIP PROMISE:
- Open-book pricing with no surprises
- Regular progress updates and transparent communication
- Military precision meets partnership warmth
- Your vision guides every decision we make

If you have any immediate questions or need to reach us, feel free to call ${COMPANY_INFO.phone.display} or reply to this email.

Looking forward to building more than just structures with you,
The MH Construction Team

---

MH Construction, Inc.
${COMPANY_INFO.address.full}
Phone: ${COMPANY_INFO.phone.display}
Email: ${COMPANY_INFO.email.main}

Licensed in WA, OR, ID | Veteran-Owned & Operated
  `.trim();

  return { subject, html, text };
}

/**
 * Generate HTML email for general contact form acknowledgment
 * Messaging: Professional, responsive, partnership-focused
 */
export function generateContactAcknowledgment(data: ContactEmailData): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `Message Received - We'll Be in Touch Soon | MH Construction, Inc.`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #212121; margin: 0; padding: 0; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #386851 0%, #2d5340 100%); padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">MH Construction, Inc.</h1>
        <p style="color: #d4af37; margin: 10px 0 0 0; font-size: 14px; font-weight: 600;">Your Partner in Building Tomorrow</p>
      </td>
    </tr>
    
    <!-- Content -->
    <tr>
      <td style="padding: 40px 30px;">
        <h2 style="color: #386851; margin: 0 0 20px 0; font-size: 20px;">Thank You for Reaching Out</h2>
        
        <p style="margin: 0 0 15px 0; font-size: 16px; line-height: 1.6;">
          Dear ${data.name},
        </p>
        
        <p style="margin: 0 0 15px 0; font-size: 16px; line-height: 1.6;">
          We've received your message and appreciate you taking the time to contact MH Construction. Your inquiry is important to us.
        </p>
        
        <div style="background-color: #f0f7f4; border-left: 4px solid #386851; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; font-size: 15px; color: #2d5340; line-height: 1.6;">
            <strong>Next Steps:</strong><br>
            A member of our team will review your message and respond within <strong>24 hours</strong> during business hours. For urgent matters, please call us directly at <strong>(509) 308-6489</strong>.
          </p>
        </div>
        
        <p style="margin: 0 0 15px 0; font-size: 16px; line-height: 1.6;">
          At MH Construction, we're committed to clear communication and building lasting relationships with our clients and community. Whether you're planning a new project, have questions about our services, or need support, we're here to help.
        </p>
        
        <p style="margin: 20px 0 0 0; font-size: 16px; line-height: 1.6;">
          Thank you for considering MH Construction,<br>
          <strong style="color: #386851;">The MH Construction Team</strong>
        </p>
      </td>
    </tr>
    
    <!-- Footer -->
    <tr>
      <td style="background-color: #f5f5f5; padding: 20px; text-align: center; border-top: 1px solid #e5e5e5;">
        <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
          <strong>MH Construction, Inc.</strong><br>
          3111 N. Capitol Ave., Pasco, WA 99301<br>
          Phone: <a href="tel:+15093086489" style="color: #386851; text-decoration: none;">(509) 308-6489</a><br>
          Email: <a href="mailto:office@mhc-gc.com" style="color: #386851; text-decoration: none;">office@mhc-gc.com</a>
        </p>
        <p style="margin: 0; font-size: 12px; color: #999;">
          Licensed in WA, OR, ID | Veteran-Owned & Operated
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `
MH Construction, Inc. - Message Received

Dear ${data.name},

We've received your message and appreciate you taking the time to contact MH Construction. Your inquiry is important to us.

NEXT STEPS:
A member of our team will review your message and respond within 24 hours during business hours. For urgent matters, please call us directly at (509) 308-6489.

At MH Construction, we're committed to clear communication and building lasting relationships with our clients and community. Whether you're planning a new project, have questions about our services, or need support, we're here to help.

Thank you for considering MH Construction,
The MH Construction Team

---

MH Construction, Inc.
3111 N. Capitol Ave., Pasco, WA 99301
Phone: (509) 308-6489
Email: office@mhc-gc.com

Licensed in WA, OR, ID | Veteran-Owned & Operated
  `.trim();

  return { subject, html, text };
}

export interface NewsletterEmailData {
  email: string;
  name?: string;
}

/**
 * Generate HTML email for newsletter signup acknowledgment
 */
export function generateNewsletterAcknowledgment(data: NewsletterEmailData): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `Welcome to MH Construction Newsletter!`;
  const displayName = data.name || "Friend";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #212121; margin: 0; padding: 0; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <!-- Header with Logo -->
    <tr>
      <td style="background: linear-gradient(135deg, #386851 0%, #2d5340 100%); padding: 40px 30px; text-align: center;">
        <img src="https://mhc-gc.com/images/logo/mh-logo.png" alt="MH Construction Logo" style="max-width: 240px; height: auto; margin-bottom: 20px;" />
        <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 700;">Welcome to Our Community!</h1>
        <p style="color: #d4af37; margin: 10px 0 0 0; font-size: 14px; font-weight: 600;">Building Excellence Together</p>
      </td>
    </tr>
    
    <!-- Content -->
    <tr>
      <td style="padding: 40px 30px;">
        <h2 style="color: #386851; margin: 0 0 20px 0; font-size: 20px;">🎉 Thank You for Joining Us!</h2>
        
        <p style="margin: 0 0 15px 0; font-size: 16px; line-height: 1.6;">
          Dear ${displayName},
        </p>
        
        <p style="margin: 0 0 15px 0; font-size: 16px; line-height: 1.6;">
          Thank you for subscribing to the <strong style="color: #386851;">MH Construction Newsletter</strong>! We're excited to have you join our community of partners, clients, and friends.
        </p>
        
        <div style="background-color: #f0f7f4; border-left: 4px solid #386851; padding: 20px; margin: 25px 0; border-radius: 4px;">
          <h3 style="color: #386851; margin: 0 0 15px 0; font-size: 18px;">📬 What to Expect</h3>
          <ul style="margin: 0; padding-left: 20px; color: #2d5340;">
            <li style="margin-bottom: 10px;"><strong>Project Showcases:</strong> See our latest completed projects and construction updates</li>
            <li style="margin-bottom: 10px;"><strong>Industry Insights:</strong> Expert tips and construction best practices</li>
            <li style="margin-bottom: 10px;"><strong>Company News:</strong> Updates from our veteran-owned family business</li>
            <li style="margin-bottom: 10px;"><strong>Exclusive Content:</strong> Special offers and partnership opportunities</li>
          </ul>
        </div>
        
        <p style="margin: 0 0 15px 0; font-size: 16px; line-height: 1.6;">
          At MH Construction, we believe in <em>"Building projects for the client, NOT the dollar."</em> This philosophy extends to everything we do, including the content we share with you.
        </p>
        
        <div style="background-color: #fff9f0; border: 1px solid #d4af37; padding: 20px; margin: 25px 0; border-radius: 6px; text-align: center;">
          <p style="margin: 0 0 15px 0; font-size: 16px; color: #666;">
            <strong style="color: #BD9264;">🎖️ Veteran-Owned Excellence</strong>
          </p>
          <p style="margin: 0; font-size: 14px; color: #666; line-height: 1.6;">
            As a veteran-owned company, we bring military precision, discipline, and integrity to every project. We're proud to serve the Tri-Cities community and the Pacific Northwest with the same dedication we showed in service to our country.
          </p>
        </div>
        
        <div style="background-color: #386851; padding: 25px; margin: 25px 0; border-radius: 8px; text-align: center;">
          <h3 style="color: #ffffff; margin: 0 0 15px 0; font-size: 18px;">Ready to Start Your Project?</h3>
          <a href="https://mhc-gc.com/contact" style="display: inline-block; background-color: #d4af37; color: #212121; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; margin-top: 10px;">Get Your Free Consultation</a>
        </div>
        
        <p style="margin: 25px 0 0 0; font-size: 16px; line-height: 1.6;">
          Questions or need assistance? Our team is always here to help. Reply to this email or call us at <strong style="color: #386851;">(509) 308-6489</strong>.
        </p>
        
        <p style="margin: 25px 0 0 0; font-size: 16px; line-height: 1.6;">
          Thank you for trusting MH Construction!<br>
          <strong style="color: #386851;">The MH Construction Team</strong>
        </p>
      </td>
    </tr>
    
    <!-- Footer -->
    <tr>
      <td style="background-color: #212121; padding: 30px; text-align: center; color: #ffffff;">
        <div style="margin-bottom: 20px;">
          <a href="https://www.facebook.com/profile.php?id=61575511773974" style="display: inline-block; margin: 0 8px; color: #ffffff; text-decoration: none;">Facebook</a>
          <span style="color: #666;">•</span>
          <a href="https://www.instagram.com/mh_construction_inc/reels/" style="display: inline-block; margin: 0 8px; color: #ffffff; text-decoration: none;">Instagram</a>
          <span style="color: #666;">•</span>
          <a href="https://www.linkedin.com/company/mh-construction-general-contractor/posts/" style="display: inline-block; margin: 0 8px; color: #ffffff; text-decoration: none;">LinkedIn</a>
          <span style="color: #666;">•</span>
          <a href="https://youtube.com/@mhc-gc" style="display: inline-block; margin: 0 8px; color: #ffffff; text-decoration: none;">YouTube</a>
        </div>
        
        <p style="margin: 0 0 10px 0; font-size: 14px; color: #999;">
          <strong style="color: #d4af37;">MH Construction, Inc.</strong><br>
          3111 N. Capitol Ave., Pasco, WA 99301<br>
          Phone: (509) 308-6489 | Email: office@mhc-gc.com
        </p>
        
        <p style="margin: 15px 0 0 0; font-size: 12px; color: #666;">
          Licensed in WA, OR, ID | Veteran-Owned & Operated<br>
          <a href="https://mhc-gc.com" style="color: #d4af37; text-decoration: none;">www.mhc-gc.com</a>
        </p>
        
        <p style="margin: 15px 0 0 0; font-size: 11px; color: #666;">
          You're receiving this email because you subscribed to our newsletter at mhc-gc.com.<br>
          To unsubscribe, reply to this email with "Unsubscribe" in the subject line.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `
MH Construction Newsletter - Welcome!

Dear ${displayName},

Thank you for subscribing to the MH Construction Newsletter! We're excited to have you join our community of partners, clients, and friends.

WHAT TO EXPECT:
• Project Showcases: See our latest completed projects and construction updates
• Industry Insights: Expert tips and construction best practices
• Company News: Updates from our veteran-owned family business
• Exclusive Content: Special offers and partnership opportunities

At MH Construction, we believe in "Building projects for the client, NOT the dollar." This philosophy extends to everything we do, including the content we share with you.

VETERAN-OWNED EXCELLENCE
As a veteran-owned company, we bring military precision, discipline, and integrity to every project. We're proud to serve the Tri-Cities community and the Pacific Northwest with the same dedication we showed in service to our country.

READY TO START YOUR PROJECT?
Get your free consultation: https://mhc-gc.com/contact

Questions or need assistance? Our team is always here to help. Reply to this email or call us at (509) 308-6489.

Thank you for trusting MH Construction!
The MH Construction Team

---

MH Construction, Inc.
3111 N. Capitol Ave., Pasco, WA 99301
Phone: (509) 308-6489
Email: office@mhc-gc.com
Website: www.mhc-gc.com

Licensed in WA, OR, ID | Veteran-Owned & Operated

You're receiving this email because you subscribed to our newsletter at mhc-gc.com.
To unsubscribe, reply to this email with "Unsubscribe" in the subject line.
  `.trim();

  return { subject, html, text };
}
