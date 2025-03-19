import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const RecoverAcccount = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/recoverAccount`, {
      email,
    });
    return response.data;
  } catch (error) {
    console.log("Error solicitando nueva contraseña. Lo sentimos");
    throw error;
  }
};
