import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const ClearCartByUser = async (token: string) => {
  try {
    const response = await axios.delete(`${API_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
};
