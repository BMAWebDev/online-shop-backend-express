// Types
import { Request, Response } from "express";
import { IProduct } from "#src/types";

// Modules
import knex from "#src/db";

export default async (req: Request, res: Response) => {
  try {
    const products: IProduct[] = await knex("products");

    return res.status(200).json({
      products,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Could not retrieve products.",
    });
  }
};
