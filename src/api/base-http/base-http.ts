import { HTTPMethods } from "fastify";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export type HttpOptions<ApiRequest> = {
  path: string;
  baseUrl: string;
  body?: ApiRequest | string;
  query?: ApiRequest | string;
  headers?: Record<string, string>;
  method?: HTTPMethods;
};

export type SimpleHttpOptions<ApiRequest> = Pick<
  HttpOptions<ApiRequest>,
  "method" | "path"
> & {
  body?: ApiRequest;
  query?: ApiRequest;
};

export abstract class HttpService {
  protected async sendRequest<ApiRequest, ApiResponse>({
    method,
    baseUrl,
    path,
    body,
    query,
    headers,
  }: HttpOptions<ApiRequest>): Promise<AxiosResponse<ApiResponse>> {
    const fullUrl = `${baseUrl}${path}`;
    const http = axios.create();

    const baseSettings: Pick<AxiosRequestConfig, "timeout"> = {
      timeout: 10000,
    };
    try {
      let response: AxiosResponse<ApiResponse>;

      switch (method) {
        case "POST":
          response = await http.post(fullUrl, body, {
            headers,
            ...baseSettings,
          });
          break;

        case "GET":
          const config: AxiosRequestConfig = {
            headers,
            ...baseSettings,
          };

          if (query !== undefined) {
            config.params = query;
          }

          if (body !== undefined) {
            config.data = body;
          }

          response = await http.get(fullUrl, config);
          break;

        default:
          throw new Error(`Unsupported HTTP method: ${method}`);
      }

      return response;
    } catch (e: any) {
      if (e instanceof AxiosError && e?.code == "ECONNABORTED") {
        throw Error;
      }

      return e?.response;
    }
  }
}
