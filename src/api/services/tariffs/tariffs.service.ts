import { TariffsEntity } from "../../entities";
import { TariffsRepository } from "../../repositories/tariffs/tariffs.repository";

export class TariffsService {
  constructor(private readonly tariffsRepository: TariffsRepository) {}

  async addTariffsData(data: TariffsEntity | TariffsEntity[]): Promise<void> {
    return this.tariffsRepository.upsertTariffs(data);
  }

  async getDataForLastHour(): Promise<TariffsEntity[]> {
    return this.tariffsRepository.findTariffsForLastHour();
  }
}
