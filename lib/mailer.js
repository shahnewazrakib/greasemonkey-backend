import { MailtrapClient } from "mailtrap";

const client = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
});


export async function sendEmail(recipient, templateId, templateData) {
  const sender = {
    email: "noreply@easyeditr.com",
    name: "Greasemonkey Inspectors",
  };
  const recipients = [
    {
      email: recipient,
    },
  ];

  await client.send({
    from: sender,
    to: recipients,
    template_uuid: templateId,
    template_variables: templateData,
  });
}
