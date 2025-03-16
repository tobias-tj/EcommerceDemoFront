import { Cart, CartItem } from "@/types/Cart";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllCartByUser = async (token: string): Promise<Cart | null> => {
  try {
    const response = await axios.get(`${API_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const carts: Cart = response.data;
    response.data.items.map((cartItem: CartItem) => ({
      id: cartItem.id,
      productId: cartItem.productId,
      productName: cartItem.productName,
      productImage: cartItem.productImage,
      productPrice: cartItem.productPrice,
      quantity: cartItem.quantity,
    }));

    return carts;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return null;
  }
};
