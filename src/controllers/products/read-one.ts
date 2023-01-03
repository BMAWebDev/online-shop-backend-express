// Types
import { Request, Response } from "express";
import { IProduct } from "#src/types";

// Modules
import knex from "#src/db";

export default async (req: Request, res: Response) => {
  const { id } = req.params;
  const { slug } = req.query;

  if (!id && !slug)
    return res.status(400).json({ message: "Missing required params" });

  try {
    const product: IProduct = await knex("products")
      .first()
      .where({ id })
      .orWhere({ slug });

    return res.status(200).json({
      product,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Could not retrieve product.",
    });
  }
};
