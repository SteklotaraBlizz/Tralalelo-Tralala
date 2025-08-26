import { AppContract } from "../../../contracts/app.contract";
import { appConfig } from "../../../main";
import { HttpService, SimpleHttpOptions } from "../../base-http";

export namespace Wildberries {
  export type Response = IWbResponse;
  export interface IWbResponse {
    data: {
      dtNextbox: Date;
      dtTillMax: Date;
      warehouseList: {
        boxDeliveryAndStorageExpr: string;
        boxDeliveryBase: string;
        boxDeliveryLiter: string;
        boxStorageBase: string;
        boxStorageLiter: string;
        warehouseName: string;
      }[];
    };
  }
  export class WilberriesApi extends HttpService {
    private apiUrl = AppContract.WILDBERRIES_BASE_URL;

    async getTariffsFromWildberries(): Promise<IWbResponse> {
      return this.requestMethod({
        path: "/api/v1/tariffs/box",
      });
    }

    async requestMethod<
      ApiRequest extends Request,
      ApiResponse extends Response
    >({ path }: SimpleHttpOptions<ApiRequest>): Promise<ApiResponse> {
      const response = await this.sendRequest<ApiRequest, ApiResponse>({
        method: "GET",
        baseUrl: this.apiUrl,
        path,
        headers: {
          charset: "utf-8",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${appConfig.WB_API_TOKEN}`,
        },
      });

      if (response?.status != 200 && response?.status != 201) {
        const msg = JSON.stringify(response?.data);
        console.error(msg);
      }

      console.info(`Got response: ${JSON.stringify(response?.data)}`);

      return response?.data as ApiResponse;
    }
  }
}
