import knex from "knex";
import knexConfig from "./knexfile";
import { di } from "./configs/awilix-manager";
import { asClass, asValue } from "awilix";
import { TariffsService } from "./api/services";
import { TariffsRepository } from "./api/repositories";
import { WildberriesApiService } from "./api/wildberries";

export const enableServiceInjection = async () => {
  const pgClient = knex(knexConfig);

  di.container.register({
    pgClient: asValue(pgClient),
    tariffsService: asClass(TariffsService).singleton(),
    tariffsRepository: asClass(TariffsRepository).singleton(),
    wildberriesApiService: asClass(WildberriesApiService).singleton(),
  });
};
