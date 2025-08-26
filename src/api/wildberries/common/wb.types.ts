export interface WbResponseData {
  dtNextbox: Date;
  dtTillMax: Date;
  warehouseList: IWarehouseListItems[];
}

interface IWarehouseListItems {
  boxDeliveryAndStorageExpr: string;
  boxDeliveryBase: string;
  boxDeliveryLiter: string;
  boxStorageBase: string;
  boxStorageLiter: string;
  warehouseName: string;
}
