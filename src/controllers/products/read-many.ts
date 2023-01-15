// Types
import { Request, Response } from "express";
import { IProduct } from "#src/types";

// Modules
import knex from "#src/db";

// Functions
const getOffsetFromPage = (page: number, limit: number): number => {
  if (
    typeof page !== "number" ||
    typeof limit !== "number" ||
    page <= 0 ||
    limit <= 0
  )
    return 0;

  return (page - 1) * limit;
};

export default async (req: Request, res: Response) => {
  const { authorization } = req.headers;
  const { limit, page } = req.body;

  try {
    let products: IProduct[] = [];

    // if admin request
    if (authorization) {
      // if limit is present on request, limit to the number
      if (typeof limit === "number")
        products = await knex("products")
          .limit(limit >= 0 ? limit : 0)
          .offset(getOffsetFromPage(page, limit));
      // else just get the products
      else products = await knex("products");
    }
    // else if client request
    else {
      // if pagination, limit to the number
      if (typeof limit === "number")
        products = await knex("products")
          .where({ publish_status: "live" })
          .limit(limit >= 0 ? limit : 0)
          .offset(getOffsetFromPage(page, limit));
      // else just get the published products
      else products = await knex("products").where({ publish_status: "live" });
    }

    return res.status(200).json({
      products,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Could not retrieve products.",
    });
  }
};
