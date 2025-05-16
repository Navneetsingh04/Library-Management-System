import nodeMailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  try {
    console.log("⏳ Setting up email transporter...");
    const transporter = nodeMailer.createTransport({
      host: process.env.SMTP_HOST,
      service: process.env.SMTP_SERVICE,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: subject,
      html: message,
    };
    console.log("📩 Sending email to:", email);
    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully:", info.response);
  } catch (error) {
    console.log("❌ Error in sending email:", error);
  }
};
