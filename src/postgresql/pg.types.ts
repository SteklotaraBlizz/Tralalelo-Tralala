import knex from "knex";

export interface PgClient extends knex.Knex<any, unknown[]> {}

export enum PgTableNames {
  Tariffs = "tariffs",
}
