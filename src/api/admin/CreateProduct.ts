import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface Product {
  name: string;
  description: string;
  price: number;
  quantity: number;
  brand: string;
  image: File | null;
}

export const CreateProduct = async (token: string, product: Product) => {
  try {
    const formData = new FormData();

    // Agregar el producto como JSON dentro del FormData
    formData.append(
      "product",
      new Blob(
        [
          JSON.stringify({
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            brand: product.brand,
          }),
        ],
        { type: "application/json" }
      ) // Especificamos que es JSON
    );

    // Agregar la imagen si existe
    if (product.image) {
      formData.append("image", product.image, product.image.name);
    }

    const response = await axios.post(`${API_URL}/products`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Axios maneja el boundary automáticamente
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error agregando nuevo producto:", error);
    throw error;
  }
};
