export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  color: string;
  rating: number;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Xiaomi 14",
    description: "Ultra 5G Dual 512 GB",
    price: 9149000,
    color: "Negro",
    rating: 4.7,
    image: "src/assets/xiaomi14.jpg",
  },
  {
    id: 2,
    name: "iPhone 15",
    description: "Apple iPhone 15 Pro",
    price: 9291000,
    color: "Titanium Azul",
    rating: 4.8,
    image: "src/assets/iphone15pro.jpeg",
  },
  {
    id: 3,
    name: "Macbook Air",
    description: "Apple Macbook Air (2024)",
    price: 10500000,
    color: "Plata",
    rating: 4.9,
    image: "src/assets/macbookair.jpg",
  },
  {
    id: 4,
    name: "Nintendo Switch",
    description: "Nintendo Switch OLED 64 GB",
    price: 2679000,
    color: "Rojo / Azul",
    rating: 4.6,
    image: "src/assets/nintendo1.jpg",
  },
];
