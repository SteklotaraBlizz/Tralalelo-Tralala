import { PgClient, PgTableNames } from "../../../postgresql/pg.types";
import { TariffsEntity } from "../../entities";

export class TariffsRepository {
  constructor(private readonly pgClient: PgClient) {}

  async upsertTariffs(tariffs: TariffsEntity | TariffsEntity[]): Promise<void> {
    const records = Array.isArray(tariffs) ? tariffs : [tariffs];
    await this.pgClient<TariffsEntity>(PgTableNames.Tariffs)
      .insert(records)
      .onConflict("dtNextBox")
      .merge();
  }

  async findTariffsForLastHour(): Promise<TariffsEntity[]> {
    const anHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    return this.pgClient<TariffsEntity>(PgTableNames.Tariffs)
      .select("*")
      .where("createdAt", ">=", anHourAgo)
      .orderBy("createdAt", "desc");
  }
}
