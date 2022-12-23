// Types
import { Request, Response } from "express";
import { IUser } from "#src/types";

// Modules
import knex from "#src/db";

export default async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "Missing required params." });

  const user: IUser = await knex("users").first().where({ id });
  if (!user)
    return res.status(404).json({ message: "Account does not exist." });

  return res.status(200).json({
    user,
  });
};
