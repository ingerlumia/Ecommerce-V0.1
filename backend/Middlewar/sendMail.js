import { createTransport } from "nodemailer";
const sendMail = async (email, subject, text) => {
  try {
    const transport = createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GUSER,
        pass: process.env.GPASS,
      },
      connectionTimeout: 5000, // 5 seconds max - don't let it hang the app
    greetingTimeout: 5000,
    });
    await transport.sendMail({
      from: process.env.GUSER,
      to: email,
      subject,
      text,
    });
  } catch (err) {
    console.log(err);
  }
};

export default sendMail;



