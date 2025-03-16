export interface Cart {
  id: number;
  userId: number;
  items: Array<CartItem>;
}

export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  productPrice: number;
  quantity: number;
}
