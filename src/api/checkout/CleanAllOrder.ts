import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const CleanAllOrderByUser = async (token: string) => {
  try {
    const response = await axios.delete(`${API_URL}/orders/clean`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error clean orders", error);
    throw error;
  }
};
