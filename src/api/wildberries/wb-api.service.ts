import { Wildberries } from "./common/wb.contract";

export class WildberriesApiService {
  wilberriesApi: Wildberries.WilberriesApi;

  constructor() {
    this.wilberriesApi = new Wildberries.WilberriesApi();
  }

  async getTariffsFromWildberries(): Promise<Wildberries.IWbResponse> {
    return this.wilberriesApi.getTariffsFromWildberries();
  }
}
