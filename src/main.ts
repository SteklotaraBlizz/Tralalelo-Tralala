import "dotenv/config";
import { IConfig } from "./types/config";
let appConfig = process.env as Partial<IConfig>;

export { appConfig };
