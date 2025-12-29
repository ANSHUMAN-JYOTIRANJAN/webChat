import { resendClient,sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "../emails/emailTemplates.js";
export const welComeEmail = async (email, name, clientURL) => {
  const { data, error } = await resendClient.emails.send({
   from: `${sender.name} <${sender.email}>`,
    to:[email],
    subject: "Welcome to WebChat!",
    html: createWelcomeEmailTemplate(name,
       clientURL ||"http://localhost:3000" ),
  });
  if (error) {
    console.log("Error sending welcominh email:", error);
    throw error;
  }

  console.log("Welcome Email sent succefully", data);
};
