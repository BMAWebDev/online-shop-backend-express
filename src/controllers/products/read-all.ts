// Types
import { Request, Response } from "express";
import { IProduct } from "#src/types";

// Modules
import knex from "#src/db";

export default async (req: Request, res: Response) => {
  const { authorization } = req.headers;
  try {
    let products: IProduct[] = [];
    if (authorization) products = await knex("products");
    else products = await knex("products").where({ publish_status: "live" });

    return res.status(200).json({
      products,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Could not retrieve products.",
    });
  }
};
