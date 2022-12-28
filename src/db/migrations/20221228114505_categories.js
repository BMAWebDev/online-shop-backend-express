export const up = async (knex) => {
  await knex.schema.createTable("categories", (table) => {
    table.increments("id").primary();

    table.string("name").notNullable();
    table.string("slug").notNullable();
    table.string("publish_status").notNullable();

    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable("categories");
};
