// Types
import { Request, Response } from "express";

// Modules
import knex from "#src/db";

export default async (req: Request, res: Response) => {
  const { code } = req.body;

  if (!code)
    return res.status(400).json({ message: "Verification code is required." });

  const user = await knex("users").where({ verification_code: code }).first();

  if (!user) return res.status(400).json({ message: "The code is not valid." });

  if (user.verified)
    return res
      .status(400)
      .json({ message: "The code has already been redeemed." });

  try {
    await knex("users")
      .update({
        verified: true,
      })
      .where({ verification_code: code });

    return res.status(200).json({
      message: "The account has been verified. Thank you for your time!",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Code verification could not be completed, please try again.",
    });
  }
};
