/**
 * Email Templates for Mzansi Prolife Development Institute NPC
 * These templates can be used with email services like SendGrid, Mailgun, etc.
 */

export interface EmailData {
  name: string;
  email: string;
  [key: string]: any;
}

export const emailTemplates = {
  /**
   * Welcome email after signup
   */
  welcome: (data: EmailData) => ({
    subject: 'Welcome to Mzansi Prolife Development Institute NPC',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; padding: 12px 30px; background: #16a34a; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Mzansi Prolife!</h1>
          </div>
          <div class="content">
            <p>Dear ${data.name},</p>
            <p>Thank you for joining Mzansi Prolife Development Institute NPC. We're excited to have you as part of our community!</p>
            <p>Your account has been successfully created. You can now:</p>
            <ul>
              <li>Submit questionnaires and applications</li>
              <li>Track your submissions</li>
              <li>Make donations</li>
              <li>Stay updated on our projects</li>
            </ul>
            <a href="https://mzansiprolife.org/profile" class="button">View Your Profile</a>
            <p>If you have any questions, feel free to contact us at:</p>
            <p>📞 079 822 2269<br>✉️ mzansiprolifedevelopment@gmail.com</p>
            <p>Best regards,<br>The Mzansi Prolife Team</p>
          </div>
          <div class="footer">
            <p>Mzansi Prolife Development Institute NPC | Reg: 2025/205554/08</p>
            <p>32 Bell Street, Caltex Building, Office No. 106, Nelspruit, 1200, South Africa</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `Welcome to Mzansi Prolife Development Institute NPC!\n\nDear ${data.name},\n\nThank you for joining us. Your account has been successfully created.\n\nVisit your profile: https://mzansiprolife.org/profile\n\nContact us: 079 822 2269 or mzansiprolifedevelopment@gmail.com\n\nBest regards,\nThe Mzansi Prolife Team`,
  }),

  /**
   * Submission confirmation email
   */
  submissionConfirmation: (data: EmailData & { referenceNumber: string; submissionType: string }) => ({
    subject: `Submission Confirmed - ${data.referenceNumber}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-box { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #16a34a; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Submission Received!</h1>
          </div>
          <div class="content">
            <p>Dear ${data.name},</p>
            <p>Thank you for your submission. We have successfully received your ${data.submissionType} application.</p>
            <div class="info-box">
              <p><strong>Reference Number:</strong> ${data.referenceNumber}</p>
              <p><strong>Submission Type:</strong> ${data.submissionType}</p>
              <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-ZA')}</p>
            </div>
            <p>We will review your submission and get back to you soon. You can track the status of your submission in your profile.</p>
            <p>If you have any questions, please contact us:</p>
            <p>📞 079 822 2269<br>✉️ mzansiprolifedevelopment@gmail.com</p>
            <p>Best regards,<br>The Mzansi Prolife Team</p>
          </div>
          <div class="footer">
            <p>Mzansi Prolife Development Institute NPC | Reg: 2025/205554/08</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `Submission Confirmed\n\nDear ${data.name},\n\nYour ${data.submissionType} submission has been received.\n\nReference: ${data.referenceNumber}\nDate: ${new Date().toLocaleDateString('en-ZA')}\n\nWe will review and contact you soon.\n\nContact: 079 822 2269`,
  }),

  /**
   * Password reset email
   */
  passwordReset: (data: EmailData & { resetLink: string }) => ({
    subject: 'Reset Your Password - Mzansi Prolife',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; padding: 12px 30px; background: #16a34a; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .warning { background: #fef3c7; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #f59e0b; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset Request</h1>
          </div>
          <div class="content">
            <p>Dear ${data.name || 'User'},</p>
            <p>We received a request to reset your password. Click the button below to create a new password:</p>
            <a href="${data.resetLink}" class="button">Reset Password</a>
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #16a34a;">${data.resetLink}</p>
            <div class="warning">
              <p><strong>⚠️ Security Notice:</strong></p>
              <p>This link will expire in 1 hour. If you didn't request this, please ignore this email.</p>
            </div>
            <p>Best regards,<br>The Mzansi Prolife Team</p>
          </div>
          <div class="footer">
            <p>Mzansi Prolife Development Institute NPC | Reg: 2025/205554/08</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `Password Reset Request\n\nDear ${data.name || 'User'},\n\nClick this link to reset your password:\n${data.resetLink}\n\nThis link expires in 1 hour.\n\nIf you didn't request this, please ignore this email.`,
  }),

  /**
   * Donation receipt email
   */
  donationReceipt: (data: EmailData & { amount: number; referenceNumber: string; project?: string }) => ({
    subject: `Donation Receipt - ${data.referenceNumber}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .receipt-box { background: white; padding: 25px; border-radius: 5px; margin: 20px 0; border: 2px solid #16a34a; }
          .amount { font-size: 24px; font-weight: bold; color: #16a34a; margin: 10px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Your Donation!</h1>
          </div>
          <div class="content">
            <p>Dear ${data.name},</p>
            <p>Thank you for your generous donation to Mzansi Prolife Development Institute NPC.</p>
            <div class="receipt-box">
              <p><strong>Receipt Number:</strong> ${data.referenceNumber}</p>
              <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-ZA')}</p>
              <p><strong>Amount:</strong> <span class="amount">R ${data.amount.toFixed(2)}</span></p>
              ${data.project ? `<p><strong>Project:</strong> ${data.project}</p>` : ''}
            </div>
            <p>Your contribution helps us empower communities across South Africa. We truly appreciate your support!</p>
            <p>This email serves as your donation receipt for tax purposes.</p>
            <p>Best regards,<br>The Mzansi Prolife Team</p>
          </div>
          <div class="footer">
            <p>Mzansi Prolife Development Institute NPC | Reg: 2025/205554/08</p>
            <p>Tax Number: 9201973287</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `Donation Receipt\n\nDear ${data.name},\n\nThank you for your donation of R ${data.amount.toFixed(2)}.\n\nReceipt: ${data.referenceNumber}\nDate: ${new Date().toLocaleDateString('en-ZA')}\n\nThank you for your support!`,
  }),
};

/**
 * Send email using your email service
 * Replace this with your actual email service integration
 */
export async function sendEmail(
  to: string,
  template: keyof typeof emailTemplates,
  data: EmailData
): Promise<void> {
  // TODO: Integrate with your email service (SendGrid, Mailgun, AWS SES, etc.)
  const emailContent = emailTemplates[template](data);
  
  console.log('Email would be sent:', {
    to,
    subject: emailContent.subject,
    // In production, send via your email service API
  });
  
  // Example with fetch (replace with your email service):
  // await fetch('https://api.sendgrid.com/v3/mail/send', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${process.env.VITE_SENDGRID_API_KEY}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     personalizations: [{ to: [{ email: to }] }],
  //     from: { email: 'noreply@mzansiprolife.org' },
  //     subject: emailContent.subject,
  //     content: [{ type: 'text/html', value: emailContent.html }],
  //   }),
  // });
}

