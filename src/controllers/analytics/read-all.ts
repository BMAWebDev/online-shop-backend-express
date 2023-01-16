// Types
import { Request, Response } from "express";

interface IAnalytics {
  analytics: {
    registered_accounts: number;
    total_orders: number;
    finished_orders: number;
  };
}

// Modules
import knex from "#src/db";

export default async (req: Request, res: Response) => {
  try {
    const analyticsRes: any = await Promise.all([
      await knex("users")
        .count("*", {
          as: "users_number",
        })
        .first(),

      await knex("orders")
        .count("*", {
          as: "total_orders_number",
        })
        .first(),

      await knex("orders")
        .count("*", {
          as: "finished_orders_number",
        })
        .where({ status: "completed" })
        .first(),
    ]);

    const analytics: IAnalytics = {
      analytics: {
        registered_accounts: analyticsRes[0].users_number,
        total_orders: analyticsRes[1].total_orders_number,
        finished_orders: analyticsRes[2].finished_orders_number,
      },
    };

    return res.status(200).json({
      analytics: analytics.analytics,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Could not retrieve analytics.",
    });
  }
};
