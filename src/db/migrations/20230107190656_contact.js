export const up = async (knex) => {
  await knex.schema.createTable("contact_messages", (table) => {
    table.increments("id").primary();

    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("email").notNullable();
    table.string("message").notNullable();

    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable("contact_messages");
};
