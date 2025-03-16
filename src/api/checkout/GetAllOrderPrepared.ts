import { Order, OrderItem } from "@/types/Order";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllOrderPreparedByUser = async (
  token: string
): Promise<Order[] | null> => {
  try {
    const response = await axios.get(
      `${API_URL}/orders/user?status=PREPARING`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const orders: Order[] = response.data;
    response.data.map((order: Order) => ({
      id: order.id,
      userId: order.userId,
      address: order.address,
      phoneNumber: order.phoneNumber,
      status: order.status,
      createdAt: order.createdAt,
      orderItems: order.orderItems.map((orderItem: OrderItem) => ({
        id: orderItem.id,
        price: orderItem.price,
        productBrand: orderItem.productBrand,
        productId: orderItem.productId,
        productImage: orderItem.productImage,
        productName: orderItem.productName,
        quantity: orderItem.quantity,
      })),
    }));

    return orders;
  } catch (error) {
    console.error("Error fetching cart: ", error);
    return null;
  }
};
