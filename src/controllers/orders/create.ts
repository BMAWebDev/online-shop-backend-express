// Types
import { Request, Response } from "express";
import { ICartProduct } from "#src/types";

interface IOrderConfig {
  last_name: string;
  first_name: string;
  email: string;
  address: string;
  price_products: number;
  price_taxes: number;
  price_total: number;
  status: string;
  shipping_method: string;
  payment_method: string;
  customer_id?: number;
}

interface IRequestBody {
  last_name: string;
  first_name: string;
  email: string;
  address: string;
  status: string;
  shipping_method: string;
  payment_method: string;
  products: ICartProduct[];
  user_id?: number;
}

interface IInvoiceConfig {
  customer_id?: number;
  order_id: number;
  customer_name: string;
  shipping_address: string;
  billing_address: string;
  price_total: number;
}

// Modules
import knex from "#src/db";
import ejs from "ejs";
import fs from "fs";
import html2pdf from "html-pdf-node";

// Functions
import { sendInvoiceMail } from "#src/functions";

export default async (req: Request, res: Response) => {
  const {
    last_name,
    first_name,
    email,
    address,
    shipping_method,
    payment_method,
    products,
    user_id,
  } = req.body as IRequestBody;

  if (
    !last_name ||
    !first_name ||
    !email ||
    !address ||
    !shipping_method ||
    !payment_method ||
    !products?.length
  ) {
    return res.status(400).json({
      message: "Order placement has failed. Missing required params.",
    });
  }

  let price_products = 0,
    price_taxes = 0,
    price_total = 0;

  products.forEach((product) => {
    price_products += product.full_product.price * product.quantity;
  });
  price_products = parseFloat(price_products.toFixed(2));

  price_total = price_products + price_taxes;

  const order_config: IOrderConfig = {
    last_name,
    first_name,
    email,
    address,
    price_products,
    price_taxes,
    price_total,
    status: "waiting", // waiting, in-progress, completed
    shipping_method,
    payment_method,
  };

  if (user_id) order_config.customer_id = user_id;

  try {
    const added_order_ids: number[] = await knex("orders").insert(order_config);
    const order_id = added_order_ids[0];

    // create order products
    let order_products = products.map((product) => {
      const quantity = product.quantity;
      const price_product = product.full_product.price;
      const price_total = parseFloat((price_product * quantity).toFixed(2));

      return {
        order_id,
        name: product.full_product.name,
        product_id: product.full_product.id,
        quantity,
        price_product,
        price_total,
      };
    });

    const order_products_db = order_products.map((product) => {
      // exclude password from the sent data to frontend
      let { name: productName, ...productDBFields } = product;

      return productDBFields;
    });

    // add products to order products collection
    await knex("order_products").insert(order_products_db);

    // remove items from product quantity
    for (let product of order_products) {
      await knex("products")
        .first()
        .where({ id: product.product_id })
        .update({
          stock_qty: knex.raw(`stock_qty - ${product.quantity}`),
        });
    }

    // invoice start
    fs.readFile(
      global.rootProjectLocation + "/src/views/pages/invoice.ejs",
      "utf8",
      async (err, data) => {
        if (err) {
          return res.status(500).json({ message: "Could not create invoice." });
        } else {
          // add a new invoice to db
          const invoice_config: IInvoiceConfig = {
            order_id,
            customer_name: `${last_name} ${first_name}`,
            shipping_address: address,
            billing_address: address,
            price_total,
          };
          if (user_id) invoice_config.customer_id = user_id;

          const insertedInvoicesIDs: number[] = await knex("invoices").insert(
            invoice_config
          );
          const invoice_id = insertedInvoicesIDs[0];

          // render invoice html
          const invoiceHTML = ejs.render(data, {
            invoice_id,
            purchase_date: new Date()
              .toISOString()
              .split("T")[0]
              .split("-")
              .reverse()
              .join("."),
            customer_name: invoice_config.customer_name,
            shipping_address: invoice_config.shipping_address,
            price_total: invoice_config.price_total,
            products: order_products,
          });

          // transform the html to pdf as buffer so it doesnt get saved on the system
          html2pdf.generatePdf(
            { content: invoiceHTML },
            { format: "A4" },
            (err, buffer) => {
              if (err) {
                console.log(err);

                return res
                  .status(500)
                  .json({ message: "Could not create invoice PDF." });
              }

              const invoice = { id: invoice_id, buffer };
              sendInvoiceMail(email, invoice);

              return res.status(200).json({
                message:
                  "Order has been placed. Please check your email for your invoice.",
              });
            }
          );
        }
      }
    );
    // invoice end
  } catch (err) {
    return res.status(500).json({ message: "Could not create order." });
  }
};
