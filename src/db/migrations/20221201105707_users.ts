import { Knex } from "knex";

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();

    table.string("username").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.string("last_name").notNullable();
    table.string("first_name").notNullable();
    table.string("verification_code").notNullable();
    table.boolean("verified").notNullable().defaultTo(false);

    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("verified_at");
  });
};

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTable("users");
};
