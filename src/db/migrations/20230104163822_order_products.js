export const up = async (knex) => {
  await knex.schema.createTable("order_products", (table) => {
    table.increments("id").primary();

    table.integer("order_id").references("id").inTable("orders").notNullable();

    table
      .integer("product_id")
      .references("id")
      .inTable("products")
      .notNullable();

    table.integer("quantity").notNullable();
    table.decimal("price_product").notNullable();
    table.decimal("price_total").notNullable();

    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable("order_products");
};
