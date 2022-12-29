// Types
import { Request, Response } from "express";
import { ICategory } from "#src/types";

// Modules
import knex from "#src/db";

export default async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Missing required params." });
  }

  const existingCategory: ICategory = await knex("categories")
    .first()
    .where({ id });

  if (!existingCategory)
    return res.status(400).json({ message: "Category does not exist." });

  try {
    await knex("categories").where({ id }).del();

    await knex("products")
      .where({ category_id: id })
      .update({ category_id: null });

    return res.status(200).json({
      message: "Category successfully deleted.",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Could not delete category.",
    });
  }
};
