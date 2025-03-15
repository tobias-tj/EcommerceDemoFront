import { getProductById } from "@/api/products/GetProductById";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Comments, Product } from "@/types/Product";
import {
  ArrowLeft,
  InstagramIcon,
  PhoneCallIcon,
  ShoppingBagIcon,
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
  }, [productId]);

  if (isLoading) {
    return (
      <p className="text-center text-gray-500">
        Cargando detalles del producto...
      </p>
    );
  }

  if (!product) {
    return <p className="text-center text-gray-500">Producto no encontrado.</p>;
  }

  return (
    <div className="max-w-4xl p-6 mx-auto space-y-6">
      <Button
        variant="ghost"
        className="mb-4 cursor-pointer"
        onClick={() => navigate("/home")}
      >
        <ArrowLeft className="w-4 h-4 mr-2 " /> Volver
      </Button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col items-center mt-4 space-y-4">
          <img
            src={`${API_URL_IMAGE}${product.image}`}
            alt={product.name}
            className="w-[300px] h-[300px] rounded-lg shadow-lg "
          />
          <div className="flex space-x-2">
            <Badge variant="secondary" className="flex items-center space-x-1">
              <StarIcon className="w-4 h-4 text-yellow-400" />
              <span className="text-[17px]">{product.rating.toFixed(1)}</span>
            </Badge>
            {product.quantity === 0 ? (
              <Badge variant="destructive" className="text-[17px]">
                Agotado
              </Badge>
            ) : (
              <Badge variant="default" className="text-[17px]">
                Disponible
              </Badge>
            )}
            <Badge variant="outline" className="text-[17px]">
              {product.brand}
            </Badge>
          </div>
        </div>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-semibold">
                Gs. {product.price.toLocaleString()}
              </span>
              <Button>
                <ShoppingBagIcon className="w-4 h-4 mr-2" /> Agregar
              </Button>
            </div>
            <div className="flex justify-around space-x-4 mt-9">
              <Button variant="outline" size="icon">
                <InstagramIcon className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <X className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <PhoneCallIcon className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      {product.comments.map((comment: Comments) => (
        <div key={comment.id}>
          <Card>
            <CardHeader>Comentarios de usuarios</CardHeader>
            <CardContent>
              <div>
                <Badge className="text-[16px]">{comment.userMail}</Badge>
                <div className="flex flex-row space-x-4">
                  <p className="text-[18px]">{comment.content}</p>
                  <Badge
                    variant="secondary"
                    className="flex items-center space-x-1"
                  >
                    <StarIcon className="w-4 h-4 text-yellow-400" />
                    <span className="text-[17px]">
                      {product.rating.toFixed(1)}
                    </span>
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ProductDetailsPage;
