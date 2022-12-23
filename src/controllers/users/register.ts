import { Request, Response } from "express";

import knex from "#src/db";

import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

import { codegen } from "#src/functions";

// Types
import { IUser } from "#src/types";

export default async (req: Request, res: Response) => {
  const { first_name, last_name, email, password, confirm_password } = req.body;

  if (!last_name || !first_name || !email || !password || !confirm_password) {
    return res.status(400).json({ message: "Missing required params." });
  }

  if (password !== confirm_password)
    return res.status(400).json({ message: "Passwords do not match." });

  const user: IUser = await knex("users").where({ email }).first();

  if (user) {
    const message = user.verified
      ? "Account already exists."
      : "Please verify your account.";

    return res.status(409).json({ message });
  }

  const passHash = bcrypt.hashSync(password);

  const generatedCode = codegen(6);

  try {
    await knex("users").insert({
      username: null,
      first_name,
      last_name,
      email,
      password: passHash,
      verification_code: generatedCode,
      verified: false,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    const clientServerURL =
      process.env.NODE_ENV == "production"
        ? process.env.CLIENT_SERVER_URL
        : "http://localhost:3000";

    var message = {
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: "Next Online Shop confirmation email",
      text: `Please confirm your email. Link to verify: ${clientServerURL}/verify-user/${generatedCode}`,
      html: `<p>Please confirm your email. Link to verify: <a href="${clientServerURL}/verify-user/${generatedCode}">click here</a>.</p>`,
    };

    transporter.sendMail(message, (error, info) => {
      if (error) {
        return error;
      }
    });

    return res.status(200).json({
      message:
        "Your account has been registered, but needs confirmation in order to be used. Please proceed to your email address to confirm it.",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Account registration has failed." });
  }
};
