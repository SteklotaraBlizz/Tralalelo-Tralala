import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });
let appConfig = process.env as Partial<IConfig>;
import type { Knex } from "knex";
import { IConfig } from "./types/config";

const knexConfig: Knex.Config = {
  client: "postgresql",
  connection: appConfig.PG_DATABASE_URL,
  pool: {
    max: 100,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./postgresql/migrations",
  },
  seeds: {
    directory: "./src/postgresql/seeds",
  },
};

export default knexConfig;
