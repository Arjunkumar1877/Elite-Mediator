
import nodeMailer from 'nodemailer';

export const SendEmailOtp = async (email: string, otp: string): Promise<{ success: boolean }> => {
  try {

    const sendVerifyMail = async (email: string, otp: string): Promise<boolean> => {
      try {
        const https = require('https');

        const agent = new https.Agent({
          rejectUnauthorized: false,
        });

        const transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          requireTLS: true,
          auth: {
            user: 'arjun.tech177@gmail.com',
            pass: 'nctv beiz wucl vlnh',
          },
          tls: {
            rejectUnauthorized: false,
          },
          // Custom agent might not be needed if you're not working around a specific certificate issue
          // agent,
        });

        const mailOptions = {
          from: 'arjun.tech177@gmail.com',
          to: email,
          subject: 'Verification Mail',
          html: `<p>Hi, your OTP for signing up is: ${otp}</p>`,
        };

        // Send email using the transporter
        await transporter.sendMail(mailOptions);
        console.log('Email has been sent');
        return true;
      } catch (error: any) {
        console.error('Error sending email:', error.message);
        return false;
      }
    };

    const sendMailResult = await sendVerifyMail(email, otp);

    if (sendMailResult) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error: any) {
    console.error('Error generating or sending OTP:', error.message);
    return { success: false };
  }
};
