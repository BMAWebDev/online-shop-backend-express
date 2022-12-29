// Types
import { Request, Response } from "express";
import { ICategory } from "#src/types";

// Modules
import knex from "#src/db";

export default async (req: Request, res: Response) => {
  try {
    const categories: ICategory[] = await knex("categories")
      .select(
        "cat.id",
        "cat.name",
        "cat.slug",
        "cat.publish_status",
        "cat.created_at"
      )
      .from({ cat: "categories" })
      .leftJoin({ p: "products" }, "p.category_id", "cat.id")
      .count("p.category_id", { as: "total_products" })
      .groupBy("cat.id");

    return res.status(200).json({
      categories,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Could not retrieve categories.",
    });
  }
};
