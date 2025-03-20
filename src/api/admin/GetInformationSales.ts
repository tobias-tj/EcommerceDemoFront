import {
  Brand,
  Products,
  Sale,
  SalesInformation,
} from "@/types/SalesInformation";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllInformationSales = async (
  token: string
): Promise<SalesInformation | null> => {
  const objectives = [10, 30, 50, 70, 90, 110, 130, 150, 170, 190, 210, 230];
  try {
    const response = await axios.get(`${API_URL}/products/sale`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const saleInformation: SalesInformation = {
      totalIncoming: response.data.totalIncoming,
      saleTotal: response.data.saleTotal,
      countProducts: response.data.countProducts,
      countClients: response.data.countClients,
      saleList: response.data.saleList.map((sale: Sale, index: number) => ({
        name: sale.monthName.trim(),
        ventas: sale.quantitySales,
        objetivo: objectives[index],
      })),
      brandList: response.data.brandList.map((brand: Brand) => ({
        name: brand.brandName,
        value: brand.countSales,
      })),
      topProductsList: response.data.topProductsList.map((top: Products) => ({
        name: top.productName,
        ventas: top.countSales,
      })),
    };

    return saleInformation;
  } catch (error) {
    console.error("Error fetching Information Sales:", error);
    return null;
  }
};
