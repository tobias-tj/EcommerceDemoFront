export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  brand: string;
  quantity: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Xiaomi 14",
    description: "Ultra 5G Dual 512 GB",
    price: 9149000,
    rating: 4.7,
    image: "src/assets/xiaomi14.jpg",
    brand: "",
    quantity: 1,
  },
  {
    id: 2,
    name: "iPhone 15",
    description: "Apple iPhone 15 Pro",
    price: 9291000,
    rating: 4.8,
    image: "src/assets/iphone15pro.jpeg",
    brand: "",
    quantity: 1,
  },
  {
    id: 3,
    name: "Macbook Air",
    description: "Apple Macbook Air (2024)",
    price: 10500000,
    rating: 4.9,
    image: "src/assets/macbookair.jpg",
    brand: "",
    quantity: 1,
  },
  {
    id: 4,
    name: "Nintendo Switch",
    description: "Nintendo Switch OLED 64 GB",
    price: 2679000,
    rating: 4.6,
    image: "src/assets/nintendo1.jpg",
    brand: "",
    quantity: 1,
  },
];
