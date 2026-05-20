import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { userEmail, userName, itemTitle, itemType, itemPrice, orderId, currency } = await req.json();

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn("Email credentials not configured - skipping email send");
      return Response.json(
        { success: true, message: "Order recorded (email service not configured)" },
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

    // Email content for admin
    const adminEmailContent = `
      <h2>New ${itemType === "course" ? "Course Enrollment" : "Product Order"} Placed!</h2>
      <hr />
      <h3>Order Details:</h3>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Item Type:</strong> ${itemType}</p>
      <p><strong>Item Name:</strong> ${itemTitle}</p>
      <p><strong>Price:</strong> ${currency} ${itemPrice}</p>
      <hr />
      <h3>Customer Details:</h3>
      <p><strong>Name:</strong> ${userName}</p>
      <p><strong>Email:</strong> ${userEmail}</p>
      <hr />
      <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
    `;

    // Email content for customer
    const customerEmailContent = `
      <h2>Order Confirmation #${orderId}</h2>
      <p>Dear ${userName},</p>
      <p>Thank you for your ${itemType === "course" ? "enrollment" : "purchase"}! Your order has been confirmed.</p>
      <hr />
      <h3>Order Summary:</h3>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Item:</strong> ${itemTitle}</p>
      <p><strong>Type:</strong> ${itemType}</p>
      <p><strong>Price:</strong> ${currency} ${itemPrice}</p>
      <hr />
      <p>Our team will contact you shortly with the next steps.</p>
      <p>Best regards,<br />M CAD Solutions Team</p>
    `;

    // Send emails to admin and customer (blocking/awaited)
    await Promise.all([
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: "shrushtisakat866@gmail.com",
        subject: `New ${itemType === "course" ? "Course Enrollment" : "Product Order"}: ${itemTitle}`,
        html: adminEmailContent,
      }).catch((adminEmailErr) => {
        console.error("Failed to send admin email:", adminEmailErr);
      }),
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: `Order Confirmation #${orderId}`,
        html: customerEmailContent,
      }).catch((customerEmailErr) => {
        console.error("Failed to send customer email:", customerEmailErr);
      })
    ]);

    // Always return success immediately so order isn't blocked
    return Response.json(
      { success: true, message: "Order confirmed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in send-order-email:", error);
    return Response.json(
      { success: false, message: "Error processing order" },
      { status: 500 }
    );
  }
}
