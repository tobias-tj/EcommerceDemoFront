import { Product } from "@/types/Product";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getProductsByFilter = async (
  searchParam: string
): Promise<Product[]> => {
  try {
    const response = await axios.get(
      `${API_URL}/products/search?q=${searchParam}`
    );
    const products: Product[] = response.data.map((item: Product) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      rating: item.rating,
      image: item.image,
    }));
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
