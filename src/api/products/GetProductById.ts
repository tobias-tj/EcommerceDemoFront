import { Product } from "@/types/Product";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getProductById = async (
  productId: string
): Promise<Product | null> => {
  try {
    const response = await axios.get(`${API_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
