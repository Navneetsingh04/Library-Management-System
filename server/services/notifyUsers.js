import cron from "node-cron"; // Use for scheduling tasks
import { Borrow } from "../models/borrowModel.js";
import { sendEmail } from "../utils/sendEmail.js";

export const notifyUsers = () => {
  cron.schedule("*/30 * * * *", async () => {

    try {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const borrowers = await Borrow.find({
        dueDate: { $lt: oneDayAgo }, // Overdue
        returnDate: null, // Not yet returned
        notifid: false, 
      })
      .populate("user", "name email") 
      .populate("book", "title"); 
      for (const element of borrowers) {
        if (element.user && element.user.email && element.book) {
          console.log(`📩 Sending email to: ${element.user.email}`);

          const emailMessage = `
          <p>Dear ${element.user.name},</p>
          <p>We hope this email finds you well. This is a gentle reminder that your borrowed book <strong>"${element.book.title}"</strong> is overdue.</p>
          <p>We kindly request you to return it at your earliest convenience to avoid any late fees.</p>
          <p>If you have already returned the book, please disregard this email.</p>
          <p>Thank you for using our library services!</p>
          <p>Best Regards,<br/>Navneet's Library Team</p>
        `;

          try {
            await sendEmail({
              email: element.user.email,
              subject: "📖 Overdue Book Return Reminder",
              message: emailMessage,
            });

            // Mark the book as notified to prevent duplicate emails
            element.notifid = true;
            await element.save();
            console.log(`✅ Notification sent to ${element.user.email} (marked as notified)`);
          } catch (emailError) {
            console.error(`❌ Failed to send email to ${element.user.email}:`, emailError);
          }
        } else {
          console.warn(`Skipping notification due to missing data: ${element._id}`);
        }
      }
    } catch (error) {
      console.error("❌ Error while sending notifications:", error);
    }
  });
};
