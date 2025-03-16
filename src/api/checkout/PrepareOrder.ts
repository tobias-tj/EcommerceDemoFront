import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const PreparedOrderByUser = async (token: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/orders/preparing`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error preparando Orden de tu carrito. Lo sentimos");
    throw error;
  }
};
