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
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AddCartByProductId } from "@/api/cart/AddCartByProductId";
import { toast } from "sonner";
import { CreateCommentByProduct } from "@/api/products/CreateCommentByProduct";

const API_URL_IMAGE = import.meta.env.VITE_API_IMAGE;

// Animaciones
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const slideIn = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6 } },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [score, setScore] = useState<number>(0);

  const navigate = useNavigate();

  const addProductCart = async (productId: number) => {
    const token = localStorage.getItem("token") || "NULL";
    setIsAddingToCart(true);

    toast.promise(AddCartByProductId(productId, token, 1), {
      loading: "Agregando producto al carrito...",
      success: () => {
        setIsAddingToCart(false);
        return "Producto agregado al carrito";
      },
      error: (error) => {
        setIsAddingToCart(false);
        console.log(error);
        return "Error al agregar el producto";
      },
    });
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token") || "NULL";

    try {
      const createdComment = await CreateCommentByProduct(
        token,
        content,
        score,
        parseInt(productId!)
      );

      // Actualiza la lista de comentarios en el estado
      setProduct((prevProduct) => {
        if (!prevProduct) return prevProduct;
        return {
          ...prevProduct,
          comments: [...prevProduct.comments, createdComment],
        };
      });

      // Limpia el formulario
      setContent("");
      setScore(0);

      toast.success("Comentario agregado exitosamente");
    } catch (error) {
      toast.error("Error al agregar el comentario");
      console.error("Error adding comment:", error);
    }
  };

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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="p-6 mx-auto space-y-6 max-w-7xl"
    >
      <motion.div variants={slideIn}>
        <Button
          variant="ghost"
          className="mb-4 cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Imagen del producto */}
        <motion.div
          variants={fadeIn}
          className="flex flex-col items-center mt-4 space-y-4"
        >
          <img
            src={`${API_URL_IMAGE}${product.image}`}
            alt={product.name}
            className="w-[300px] h-[300px] rounded-lg shadow-lg object-cover"
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
        </motion.div>

        {/* Detalles del producto */}
        <motion.div variants={fadeIn}>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {product.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold">
                  Gs. {product.price.toLocaleString()}
                </span>

                {product.quantity === 0 ? (
                  <Button disabled>
                    <ShoppingBagIcon className="w-4 h-4 mr-2" /> Agregar
                  </Button>
                ) : (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      addProductCart(product.id);
                    }}
                    disabled={isAddingToCart}
                  >
                    <ShoppingBagIcon className="w-4 h-4 mr-2" /> Agregar
                  </Button>
                )}
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
        </motion.div>
      </div>

      {/* Comentarios */}
      <motion.div variants={stagger} className="space-y-4">
        {product.comments.map((comment: Comments) => (
          <motion.div key={comment.id} variants={fadeIn}>
            <Card className="transition-shadow shadow-sm hover:shadow-md">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={`https://i.pravatar.cc/150?u=${comment.email}`}
                      />
                      <AvatarFallback>{comment.email[0]}</AvatarFallback>
                    </Avatar>
                    <Badge className="text-[16px] bg-gray-100 text-gray-900">
                      {comment.email}
                    </Badge>
                  </div>

                  <p className="text-[18px] text-gray-700">{comment.content}</p>

                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="secondary"
                      className="flex items-center space-x-1"
                    >
                      <StarIcon className="w-4 h-4 text-yellow-400" />
                      <span className="text-[17px]">
                        {comment.score.toFixed(1)}
                      </span>
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Formulario para agregar nuevos comentarios */}
      <motion.div variants={fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Agregar Comentario
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddComment} className="space-y-4">
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  Comentario
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-2 mt-1 border rounded-md"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="score"
                  className="block text-sm font-medium text-gray-700"
                >
                  Puntuación (0-5)
                </label>
                <input
                  type="number"
                  id="score"
                  value={score}
                  onChange={(e) => setScore(parseFloat(e.target.value))}
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full p-2 mt-1 border rounded-md"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Enviar Comentario
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ProductDetailsPage;
