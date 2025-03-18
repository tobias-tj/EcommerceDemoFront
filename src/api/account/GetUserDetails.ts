import { UserDetails } from "@/types/UserDetails";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getUserDetails = async (
  token: string
): Promise<UserDetails | null> => {
  try {
    const response = await axios.get(`${API_URL}/auth/userDetails`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Lo que traemos de la llamada api--->", response.data);
    const users = response.data;
    return users;
  } catch (error) {
    console.error("Error obteniendo datos del usuario", error);
    return null;
  }
};
