import { getProductById } from "@/api/products/GetProductById";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/Product";
import {
  ArrowLeft,
  InstagramIcon,
  PhoneCallIcon,
  StarIcon,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL_IMAGE = import.meta.env.VITE_API_IMAGE;

const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const product = await getProductById(productId!);
        setProduct(product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId, setIsLoading, setProduct]);

  if (isLoading) {
    return <p>Cargando detalles del producto...</p>;
  }

  if (!product) {
    return <p>Producto no encontrado.</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <Button
        variant="outline"
        className="mb-4"
        onClick={() => navigate("/home")}
      >
        <ArrowLeft />
      </Button>
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col items-center">
            <img
              src={`${API_URL_IMAGE}${product.image}`}
              alt={product.name}
              className="w-[300px] h-[300px]"
            />
            <Badge className="w-[300px] h-[30px] bg-black">
              <StarIcon className="text-yellow-400" />
              <StarIcon className="text-yellow-400" />
              <StarIcon className="text-yellow-400" />
              <StarIcon />
              <StarIcon />
              <span className="text-[18px] ml-1">
                {product.rating.toFixed(1)}
              </span>
            </Badge>
            <div className="flex flex-row items-center justify-center mt-4">
              {product.quantity == 0 ? (
                <Badge className="bg-red-600 w-[80px] h-[45px] text-[18px]">
                  Unavailable
                </Badge>
              ) : (
                <Badge className="bg-green-600 w-[80px] h-[45px] text-[18px]">
                  Stock
                </Badge>
              )}

              <Badge className="ml-2 bg-black w-[80px] h-[45px] text-[18px]">
                {product.brand}
              </Badge>
            </div>
          </div>

          <Card>
            <CardContent>
              <h1 className="mb-2 text-[24px] font-bold">{product.name}</h1>

              <div className="flex flex-col items-center">
                <p className="text-[18px]">{product.description}</p>
                <Badge
                  variant={"outline"}
                  className="text-[22px] mt-5 bg-gray-100 text-black"
                >
                  Gs. {product.price.toLocaleString()}
                </Badge>
              </div>

              <div className="flex flex-row justify-around mt-18">
                <Button variant={"outline"}>
                  <InstagramIcon />
                </Button>
                <Button variant={"outline"}>
                  <X />
                </Button>
                <Button variant={"outline"}>
                  <PhoneCallIcon />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2">
        <p>Hola amigfo</p>
        <p>Hola amigfo</p>
        <p>Hola amigfo</p>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
