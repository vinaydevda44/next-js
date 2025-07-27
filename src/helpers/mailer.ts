import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: 'VERIFY' | 'RESET';
  userId: string;
}) => {
  try {
    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcryptjs.hash(rawToken, 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "a5c283681abee6",
        pass: "cf78e324d20ab2",
      },
    });

    const link =
      emailType === "VERIFY"
        ? `${process.env.DOMAIN}/verifyemail?token=${rawToken}`
        : `${process.env.DOMAIN}/forgotpassword?token=${rawToken}`;

    const subject = emailType === "VERIFY" ? "Verify your email" : "Reset your password";

    const html = `<p>Click <a href="${link}">here</a> to ${
      emailType === "VERIFY" ? "verify your email" : "reset your password"
    }. This link will expire in 1 hour.</p>`;

    const mailResponse = await transport.sendMail({
      from: 'harshgando6@gmail.com',
      to: email,
      subject,
      html,
    });

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message || "Failed to send email");
  }
};
