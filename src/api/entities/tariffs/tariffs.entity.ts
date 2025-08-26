import { UUIDTypes } from "uuid";

export interface TariffsEntity {
  id?: UUIDTypes;
  createdAt?: Date;
  dtNextBox: Date;
  dtTillMax: Date;
  name: string;
  boxDeliveryAndStorageExpr: string;
  boxDeliveryBase: string;
  boxDeliveryLiter: string;
  boxStorageBase: string;
  boxStorageLiter: string;
}
