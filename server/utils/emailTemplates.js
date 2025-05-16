export function  genearteVerficationOtpEmailTemplate(otp) {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #007bff; text-align: center;">Welcome to Library Management System! 📚</h2>
        <p style="font-size: 16px; color: #555;">Hello,</p>
        <p style="font-size: 16px; color: #555;">
            We're excited to have you on board! To complete your registration, please use the OTP below.
            This code is valid for <strong>15 minutes</strong>.
        </p>
        <div style="text-align: center; font-size: 22px; font-weight: bold; background-color: #fff; padding: 10px 20px; display: inline-block; border: 1px dashed #007bff; color: #007bff; margin: 10px auto;">
            ${otp}
        </div>
        <p style="font-size: 14px; color: #777;">If you didn't request this, please ignore this email.</p>
        <p style="font-size: 16px; color: #555;">Thank you for choosing us! We look forward to serving you. 📖</p>
        <p style="font-size: 14px; color: #777;">Best regards, <br><strong>Library Management System Team</strong></p>
    </div>
    `;
}


export function generateForgotPasswordEmailTemplate(resetPasswordUrl) {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9; text-align: center; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333; font-size: 24px;">🔒 Password Reset Request</h2>
        <p style="font-size: 16px; color: #555;">Hello,</p>
        <p style="font-size: 16px; color: #555;">
            We received a request to reset your password. Click the button below to proceed.
            This link is valid for <strong>15 minutes</strong>.
        </p>
        <a href="${resetPasswordUrl}" 
           style="display: inline-block; background-color: #007bff; color: white; padding: 14px 28px; font-size: 16px; font-weight: bold; text-decoration: none; border-radius: 8px; margin: 20px 0;">
            🔄 Reset Password
        </a>
        <p style="font-size: 14px; color: #777;">If the button doesn't work, you can also reset your password using the link below:</p>
        <p style="font-size: 14px; word-break: break-word; color: #007bff;">
            <a href="${resetPasswordUrl}" style="color: #007bff; text-decoration: none;">${resetPasswordUrl}</a>
        </p>
        <p style="font-size: 14px; color: #777;">If you did not request this, please ignore this email.</p>
        <p style="font-size: 14px; color: #777;">Best regards, <br><strong>📚 Library Management System Team</strong></p>
    </div>
    `;
}

