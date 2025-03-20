export interface SalesInformation {
  totalIncoming: number;
  saleTotal: number;
  countProducts: number;
  countClients: number;
  saleList: Array<Sale>;
  brandList: Array<Brand>;
  topProductsList: Array<Products>;
}

export interface Sale {
  monthName: string;
  quantitySales: number;
  quantityObjective: number;
}

export interface Brand {
  brandName: string;
  countSales: number;
}

export interface Products {
  productName: string;
  countSales: number;
}
