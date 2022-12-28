// Types
import { Request, Response } from "express";
import { ICategory } from "#src/types";

// Modules
import knex from "#src/db";

export default async (req: Request, res: Response) => {
  const { name, slug, publish_status } = req.body;

  if (!name || !slug || !publish_status) {
    return res.status(400).json({ message: "Missing required params." });
  }

  const existingCategory: ICategory = await knex("categories")
    .first()
    .where({ slug });
  if (existingCategory)
    return res.status(400).json({ message: "Category already exists." });

  try {
    await knex("categories").insert({
      name,
      slug,
      publish_status,
    });

    return res.status(200).json({
      message: "Category successfully created.",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Could not create category.",
    });
  }
};
