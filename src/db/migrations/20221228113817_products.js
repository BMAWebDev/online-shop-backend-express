export const up = async (knex) => {
  await knex.schema.createTable("products", (table) => {
    table.increments("id").primary();

    table.string("name").notNullable();
    table.string("slug").notNullable();
    table.string("sku").notNullable();
    table.decimal("price").notNullable();
    table.integer("stock_qty").notNullable().defaultTo(0);
    table.integer("category_id").references("id").inTable("categories");
    table.string("publish_status").notNullable();

    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable("products");
};
