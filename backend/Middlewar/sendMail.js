import axios from "axios";

const sendMail = async (email, subject, text) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "Cypers", email: "parwinparwin2500@gmail.com" },
        to: [{ email: email }],
        subject: subject,
        textContent: text,
      },
      {
        headers: {
          "api-key": process.env.GPASS, // Use your Brevo API Key here
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      }
    );

    console.log("Email sent successfully via API:", response.data);
  } catch (err) {
    // Log the specific error from Brevo's API
    console.error("Mail Error:", err.response ? err.response.data : err.message);
  }
};

export default sendMail;
