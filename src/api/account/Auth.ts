import AccountRequest from "@/types/AccountRequest";
import ConfirmRequest from "@/types/ConfirmRequest";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const loginAccount = async (loginData: AccountRequest) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, loginData);
    const token = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("isLoggedIn", "true");

    return { success: true, token };
  } catch (error) {
    console.error("Error en el login:", error);
    return { success: false, message: "Credenciales inválidas" };
  }
};

export const registerAccount = async (registerData: AccountRequest) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, registerData);
    return { success: true, response: response.data };
  } catch (error: any) {
    console.error(
      "Error en el registro:",
      error.response?.data?.message || error.message
    );

    return {
      success: false,
      message: error.response?.data?.message || "Error al registrar la cuenta",
    };
  }
};

export const confirmEmail = async (confirmationData: ConfirmRequest) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/confirm-email`,
      confirmationData
    );
    return { success: true, response: response.data };
  } catch (error: any) {
    console.error(
      "Error en el registro:",
      error.response?.data?.message || error.message
    );

    return {
      success: false,
      message: error.response?.data?.message || "Error al registrar la cuenta",
    };
  }
};
