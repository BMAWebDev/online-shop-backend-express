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

// Functions

const getDateToCompare = (ISOString: string): string => {
  const dateSplitted = ISOString.split("T")[0].split("-");

  const year = dateSplitted[0],
    month = dateSplitted[1],
    day = "01";

  const date = `${year}-${month}-${day}`;
  const hour = "00:00:00.000Z";

  return `${date}T${hour}`;
};

export default async (req: Request, res: Response) => {
  try {
    const currentDate = new Date(
      new Date().setHours(new Date().getHours() + 2)
    );

    const orders = await knex("orders").where(
      "created_at",
      ">=",
      getDateToCompare(currentDate.toISOString())
    );

    console.log(orders.length);

    return res.status(200).json({
      message: "all good",
      orders,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Could not retrieve analytics.",
    });
  }
};
