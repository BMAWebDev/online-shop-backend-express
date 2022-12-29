// Types
import { Request, Response } from "express";
import { IProduct } from "#src/types";

// Modules
import knex from "#src/db";

export default async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, sku, price, stock_qty, slug, category_id, publish_status } =
    req.body;

  const product: IProduct = await knex("products").first().where({ id });
  if (!product) return res.status(404).json({ message: "Product not found." });

  try {
    await knex("products")
      .first()
      .where({ id })
      .update({
        name: name ?? product.name,
        sku: sku ?? product.sku,
        price: price ?? product.price,
        stock_qty: stock_qty ?? product.stock_qty,
        slug: slug ?? product.slug,
        category_id: category_id ?? product.category_id,
        publish_status: publish_status ?? product.publish_status,
      });

    return res.status(200).json({
      message: "Product updated successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Could not update product.",
    });
  }
};
