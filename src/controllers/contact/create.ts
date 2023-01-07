// Types
import { Request, Response } from "express";

// Modules
import knex from "#src/db";

// Functions
import { sendMail } from "#src/functions";

export default async (req: Request, res: Response) => {
  const { first_name, last_name, email, message } = req.body;

  if (!first_name || !last_name || !email || !message) {
    return res.status(400).json({ message: "Missing required params." });
  }

  try {
    // create + send double message

    const contactMessageIDs = await knex("contact_messages").insert({
      first_name,
      last_name,
      email,
      message,
    });

    const ticketID = contactMessageIDs[0];

    // mail for user sending the message
    sendMail(email, {
      subject: `Ticket #${ticketID}`,
      message_text: `Hello from Next Online Shop Your contact message with no. ${ticketID} has been received and we'll get back to you as soon as possible. Thank you for trusting us and see you soon!`,
      message_html: `<h1>Hello from Next Online Shop</h1> <p>Your contact message with no. ${ticketID} has been received and we'll get back to you as soon as possible. Thank you for trusting us and see you soon!</p>`,
    });

    // mail for admin notifying about the user's message
    sendMail("bmihaiandrei@gmail.com", {
      from: email,
      subject: `Ticket #${ticketID} - Contact form`,
      message_text: `Notification from Next Online Shop ${first_name} ${last_name} has sent the contact message with no. ${ticketID} and is looking forward for your response. Don't let the customer wait for too long! Message: ${message}`,
      message_html: `<h1>Hello from Next Online Shop</h1> <p>${first_name} ${last_name} has sent the contact message with no. ${ticketID} and is looking forward for your response. Don't let the customer wait for too long!</p> <div style="background-color: #f3f3f3; padding: 15px"><p>Message: </p> <p>${message}</p></div>`,
    });

    return res.status(200).json({
      message:
        "Message successfully sent. We've sent you a confirmation email, please wait for our response.",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Could not send contact message. Please try again later.",
    });
  }
};
