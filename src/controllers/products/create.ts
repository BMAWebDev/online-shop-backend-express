// Types
import { Request, Response } from "express";
import { IProduct } from "#src/types";

// Modules
import knex from "#src/db";

export default async (req: Request, res: Response) => {
  const { name, sku, price, stock_qty, category_id, slug, publish_status } =
    req.body;

  if (
    !name ||
    !sku ||
    !price ||
    !stock_qty ||
    !category_id ||
    !slug ||
    !publish_status
  ) {
    return res.status(400).json({ message: "Missing required params." });
  }

  const existingProduct: IProduct = await knex("products")
    .first()
    .where({ slug })
    .orWhere({ sku });

  if (existingProduct)
    return res.status(400).json({ message: "Product already exists." });

  try {
    await knex("products").insert({
      name,
      sku,
      price: parseFloat(price),
      stock_qty: parseInt(stock_qty),
      category_id: parseInt(category_id),
      slug,
      publish_status,
    });

    return res.status(200).json({
      message: "Product successfully created.",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Could not create product.",
    });
  }
};
