import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const CreateCommentByProduct = async (
  token: string,
  content: string,
  score: number,
  productId: number
) => {
  try {
    const response = await axios.post(
      `${API_URL}/comments/product/${productId}`,
      { content, score },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error agregando comentario. Lo sentimos");
    throw error;
  }
};
