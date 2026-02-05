import { createTransport } from "nodemailer";
const sendMail = async (email, subject, text) => {
  try {
    const transport = createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: "apikey",
        pass: process.env.GPASS,
      },
      connectionTimeout: 5000, // 5 seconds max - don't let it hang the app
    greetingTimeout: 5000,
    });
    await transport.sendMail({
      from: "Cypers <parwinparwin2500@gmail.com>",
      to: email,
      subject,
      text,
    });
  } catch (err) {
    console.log(err);
  }
};

export default sendMail;







