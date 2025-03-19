import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const CreateNewPassword = async (
  token: string,
  currentPassword: string,
  newPassword: string
) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/change-password`,
      { currentPassword, newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error cambiando password. Lo sentimos");
    throw error;
  }
};
