export interface Order {
  id: number;
  userId: number;
  address: string;
  phoneNumber: string;
  status: string;
  createAt: string;
  orderItems: Array<OrderItem>;
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  productBrand: string;
  quantity: number;
  price: number;
}
