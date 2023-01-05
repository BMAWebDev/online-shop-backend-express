export const up = async (knex) => {
  await knex.schema.createTable("orders", (table) => {
    table.increments("id").primary();

    table.integer("customer_id").references("id").inTable("users");

    table.string("last_name").notNullable();
    table.string("first_name").notNullable();
    table.string("email").notNullable();
    table.string("address").notNullable();
    table.decimal("price_products").notNullable();
    table.decimal("price_taxes").notNullable();
    table.decimal("price_total").notNullable();
    table.string("status").notNullable().defaultTo("waiting"); // waiting, in-progress, completed
    table.string("shipping_method").notNullable();
    table.string("payment_method").notNullable();

    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable("orders");
};
