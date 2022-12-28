// Types
import { Request, Response } from "express";
import { ICategory } from "#src/types";

// Modules
import knex from "#src/db";

export default async (req: Request, res: Response) => {
  try {
    const categories: ICategory[] = await knex("categories");

    return res.status(200).json({
      categories,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Could not retrieve categories.",
    });
  }
};
