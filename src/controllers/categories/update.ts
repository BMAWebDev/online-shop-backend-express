// Types
import { Request, Response } from "express";
import { ICategory } from "#src/types";

// Modules
import knex from "#src/db";

export default async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, slug, publish_status } = req.body;

  const category: ICategory = await knex("categories").first().where({ id });
  if (!category)
    return res.status(404).json({ message: "Category not found." });

  try {
    await knex("categories")
      .first()
      .where({ id })
      .update({
        name: name ?? category.name,
        slug: slug ?? category.slug,
        publish_status: publish_status ?? category.publish_status,
      });

    return res.status(200).json({
      message: "Category updated successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Could not update category.",
    });
  }
};
