// Types
import { Request, Response } from "express";
import { IProduct } from "#src/types";

// Modules
import knex from "#src/db";

export default async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Missing required params." });
  }

  const existingProduct: IProduct = await knex("products")
    .first()
    .where({ id });

  if (!existingProduct)
    return res.status(400).json({ message: "Product does not exist." });

  try {
    await knex("products").where({ id }).del();

    return res.status(200).json({
      message: "Product successfully deleted.",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Could not delete product.",
    });
  }
};
