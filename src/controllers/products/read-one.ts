// Types
import { Request, Response } from "express";
import { IProduct } from "#src/types";

// Modules
import knex from "#src/db";

export default async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product: IProduct = await knex("products").first().where({ id });

    return res.status(200).json({
      product,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Could not retrieve product.",
    });
  }
};
