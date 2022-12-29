// Types
import { Request, Response } from "express";
import { ICategory } from "#src/types";

// Modules
import knex from "#src/db";

export default async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const category: ICategory = await knex("categories").first().where({ id });

    return res.status(200).json({
      category,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Could not retrieve category.",
    });
  }
};
