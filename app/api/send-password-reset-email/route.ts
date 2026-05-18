import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return Response.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Generate a mock reset token (in production, this would be a real JWT or database token)
    const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

    // Send email to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'MCAD Solutions - Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f9f5ed; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="color: #1a1a1a; margin: 0;">Password Reset Request</h2>
          </div>
          <p style="color: #6b7280; font-size: 16px; line-height: 1.6;">
            Hi there,
          </p>
          <p style="color: #6b7280; font-size: 16px; line-height: 1.6;">
            We received a request to reset your password. Click the link below to create a new password:
          </p>
          <div style="margin: 30px 0;">
            <a href="${resetLink}" style="display: inline-block; background-color: #d4a314; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
              Reset Password
            </a>
          </div>
          <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
            Or copy and paste this link in your browser:
          </p>
          <p style="color: #d4a314; font-size: 12px; word-break: break-all;">
            ${resetLink}
          </p>
          <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
            This link will expire in 1 hour.
          </p>
          <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
            If you didn't request this, you can ignore this email.
          </p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="color: #9ca3af; font-size: 12px;">
            MCAD Solutions | Robots, lab setup, and Digital Twin training for colleges
          </p>
        </div>
      `,
    }).catch(err => console.error('Error sending reset email to user:', err));

    // Send notification to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'MCAD Solutions - Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a;">Password Reset Request</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <p>A password reset request has been received for this email address.</p>
        </div>
      `,
    }).catch(err => console.error('Error sending reset notification to admin:', err));

    return Response.json(
      { message: 'Password reset link has been sent to your email' },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Password reset error:', error);
    return Response.json(
      { error: 'Failed to process password reset request' },
      { status: 500 }
    );
  }
}
