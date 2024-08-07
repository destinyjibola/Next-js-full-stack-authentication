import nodemailer from "nodemailer";
const domain = process.env.NEXT_PUBLIC_APP_URL

export const sendTwoFactorTokenMail  = async (email: string, token: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "jibola619@gmail.com",
        pass: process.env.MAIL,
      },
    });

    const resetLink = `${domain    }/auth/new-password?token=${token}`


    const mailOptions = {
      from: "jibola619@gmail.com",
    //   to: `jibola619@gmail.com,${mail}`,
      to: email,
      subject: "Auth System: 2FA Code",
      html: `<p> Your 2FA code: ${token}</p>`,
    };

    await transporter.sendMail(mailOptions);
    return { success: "Mail sent" };

  } catch (error) {
    console.error(error);
    // res.status(500).json({ message: error });
    return { error: "Error sending mail"};

  }
}