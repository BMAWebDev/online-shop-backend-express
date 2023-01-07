import nodemailer from "nodemailer";

export const codegen = (length: number) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

interface IInvoice {
  id: number;
  buffer: Buffer;
}

interface ISendMailData {
  from?: string;
  subject: string;
  message_text: string;
  message_html: string;
}
export const sendMail = async (email_to: string, data: ISendMailData) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  await transporter.sendMail({
    from: data.from ? data.from : "bmihaiandrei@gmail.com",
    to: email_to,
    subject: data.subject,
    text: data.message_text,
    html: data.message_html,
  });
};

export const sendInvoiceMail = async (email: string, invoice: IInvoice) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  await transporter.sendMail({
    from: "bmihaiandrei@gmail.com",
    to: email,
    subject: "Invoice Next Online Shop",
    text: `Good day to you! Below you'll see attached the invoice for the order placed on our website. Thank you for ordering and we'll hope to see you soon!`,
    html: `<h1>Good day to you! Below you'll see attached the invoice for the order placed on our website. Thank you for ordering and we'll hope to see you soon!</h1>`,
    attachments: [
      {
        filename: `factura-next-online-shop-#${invoice.id}.pdf`,
        content: invoice.buffer,
      },
    ],
  });
};
