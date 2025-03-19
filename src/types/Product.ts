export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  brand: string;
  quantity: number;
  comments: Array<Comments>;
}

export interface Comments {
  id: number;
  content: string;
  score: number;
  userId: number;
  userMail: string;
}
