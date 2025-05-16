import { genearteVerficationOtpEmailTemplate } from "./emailTemplates.js";
import { sendEmail } from "./sendEmail.js";

export async function sendVerificationCode(verificationCode, email, res) {
  try {
    const message = genearteVerficationOtpEmailTemplate(verificationCode);

    sendEmail({
      email: email,
      subject: "Verification Code for Library Mangement System",
      message,
    });
    res.status(200).json({
      success: true,
      message: "Verification code sent Successfully to email.",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send verification code. Try again",
    });
  }
}