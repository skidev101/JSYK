// src/services/emailService.js
import * as brevo from "@getbrevo/brevo";
import { getWelcomeTemplate } from "../emailTemplates/welcome.js";

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

// 👇 sender email is your free Gmail/Yahoo for now (must be verified in Brevo)
const DEFAULT_SENDER = {
  name: "JSYK Team",
  email: "skidev101@gmail.com", // replace with your verified sender
};

export const sendWelcomeEmail = async (toEmail, toName) => {
  try {
    const { html, text } = getWelcomeTemplate(toName);
    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.subject = "🎉 Welcome to JSYK!";
    sendSmtpEmail.sender = DEFAULT_SENDER;
    sendSmtpEmail.to = [{ email: toEmail, name: toName }];
    sendSmtpEmail.htmlContent = html;
    sendSmtpEmail.textContent = text;

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Welcome email sent:", toEmail);
  } catch (err) {
    console.error(
      "Failed to send welcome email:",
      err.response?.body || err
    );
  }
};
