// Types
import { Request, Response } from "express";
import { IUser } from "#src/types";

// Modules
import knex from "#src/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Missing required params." });

  const user: IUser = await knex("users").first().where({ email });
  if (!user)
    return res.status(404).json({ message: "Account does not exist." });

  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (!passwordsMatch)
    return res.status(400).json({ message: "Password is incorrect." });

  if (!user.verified)
    return res
      .status(400)
      .json({ message: "Account has not been verified yet." });

  // JWT public data sent to user
  const payload = { email, id: user.id };

  // access token
  const accessToken = jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET as string,
    {
      expiresIn: "2 days",
    }
  );

  // exclude password from the sent data to frontend
  let { password: userPass, ...publicUserData } = user;

  return res.status(200).json({
    accessToken,
    user: publicUserData,
    message: "Successfully logged in.",
  });
};
