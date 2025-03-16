import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const AddCartByProductId = async (
  productId: number,
  token: string,
  quantity: number
) => {
  try {
    const response = await axios.post(
      `${API_URL}/cart/add?productId=${productId}&quantity=${quantity}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
};
