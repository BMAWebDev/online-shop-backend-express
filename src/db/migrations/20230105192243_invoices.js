export const up = async (knex) => {
  await knex.schema.createTable("invoices", (table) => {
    table.increments("id").primary();

    table.integer("order_id").references("id").inTable("orders").notNullable();

    table
      .integer("customer_id")
      .references("id")
      .inTable("users")
      .notNullable();

    table.string("customer_name").notNullable();
    table.string("shipping_address").notNullable();
    table.string("billing_address").notNullable();
    table.decimal("price_total").notNullable();

    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable("invoices");
};
