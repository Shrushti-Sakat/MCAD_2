import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { fullName, email, phone, organization, message, trackName, type } = await req.json();

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn("Email credentials not configured - skipping email send");
      return Response.json(
        { success: true, message: "Enrollment recorded (email service not configured)" },
        { status: 200 }
      );
    }

    // Create transporter - using Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Format the email title based on the type
    let titlePrefix = "Enrollment";
    let typeLabel = "Course Enrollment";
    let nameLabel = "Track/Product Name"; // Label used in the email body
    
    if (type === "course-enquiry") {
      titlePrefix = "Course Enquiry";
      typeLabel = "Course Enquiry";
      nameLabel = "Course Name";
    } else if (type === "product-enquiry") {
      titlePrefix = "Product Enquiry";
      typeLabel = "Product Enquiry";
      nameLabel = "Product Name";
    } else if (type === "enquiry") {
      titlePrefix = "Enquiry";
      typeLabel = "General Enquiry";
      nameLabel = "Regarding";
    }

    // Email content for admin
    const adminEmailContent = `
      <h2>New ${titlePrefix} Received!</h2>
      <p><strong>Type:</strong> ${typeLabel}</p>
      <p><strong>${nameLabel}:</strong> ${trackName}</p>
      <hr />
      <h3>User Details:</h3>
      <p><strong>Full Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Organization/College:</strong> ${organization}</p>
      ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
      <hr />
      <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
    `;

    // Email content for user
    const userEmailContent = `
      <h2>Thank you for your interest!</h2>
      <p>Dear ${fullName},</p>
      <p>We have received your ${titlePrefix.toLowerCase()} for <strong>${trackName}</strong>.</p>
      <p>Our team will review your information and get back to you shortly with the next steps.</p>
      <p>Your details:</p>
      <ul>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Organization:</strong> ${organization}</li>
      </ul>
      <p>Best regards,<br />M CAD Solutions Team</p>
    `;

    // Send email to admin (non-blocking)
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "shrushtisakat866@gmail.com",
      subject: `New ${titlePrefix}: ${trackName}`,
      html: adminEmailContent,
    }).catch((adminEmailErr) => {
      console.error("Failed to send admin email:", adminEmailErr);
    });

    // Send confirmation email to user (non-blocking)
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Confirmation: Your ${titlePrefix} Request`,
      html: userEmailContent,
    }).catch((userEmailErr) => {
      console.error("Failed to send user email:", userEmailErr);
    });

    // Always return success immediately so form submission isn't blocked
    return Response.json(
      { success: true, message: "Enrollment recorded successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in send-enrollment-email:", error);
    return Response.json(
      { success: false, message: "Error processing enrollment" },
      { status: 500 }
    );
  }
}
