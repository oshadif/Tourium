import nodemailer from "nodemailer";

export async function sendBookingEmail({ to, subject, text }) {
  if (!process.env.SMTP_HOST) {
    console.log("[EMAIL DEMO]", { to, subject, text });
    return { demo: true };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: process.env.SMTP_USER ? {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    } : undefined
  });

  return transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject,
    text
  });
}
