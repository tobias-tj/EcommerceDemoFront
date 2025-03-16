import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Product } from "@/types/Product";
import { useEffect, useState } from "react";
import { getProductsByFilter } from "@/api/products/GetProductsByFilter";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllProducts } from "@/api/products/GetAllProducts";
import { delay } from "@/utils/delay";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AddCartByProductId } from "@/api/cart/AddCartByProductId";
import { toast } from "sonner";

const API_URL_IMAGE = import.meta.env.VITE_API_IMAGE;

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [inStock, setInStock] = useState<boolean | undefined>(undefined);
  const [brand, setBrand] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const products = await getAllProducts();
      await delay(1000);
      setProducts(products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const filteredProducts = await getProductsByFilter(
        searchTerm.trim() === "" ? "" : searchTerm,
        minPrice,
        maxPrice,
        inStock,
        brand
      );
      await delay(1000);
      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error searching product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setInStock(undefined);
    setBrand(undefined);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col items-center">
        <div className="flex flex-col justify-start p-2 w-100">
          <p className="text-[#3b3b3b] font-bold mb-2">Search Items...</p>
          <Input
            placeholder="Apple Watch, Samsung S22, Asus VivoBook, ...."
            className="max-w-md bg-white inset-shadow-xs inset-shadow-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleSearch();
              }
            }}
          />
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          <Input
            type="number"
            placeholder="Precio mínimo"
            value={minPrice || ""}
            onChange={(e) => setMinPrice(parseFloat(e.target.value))}
            className="w-40"
          />
          <Input
            type="number"
            placeholder="Precio máximo"
            value={maxPrice || ""}
            onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
            className="w-40"
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              id="inStock"
              checked={inStock || false}
              onCheckedChange={(checked) => setInStock(!!checked)}
            />
            <Label htmlFor="inStock">En stock</Label>
          </div>
          <Select
            value={brand || ""}
            onValueChange={(value) => setBrand(value)}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Marca" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Nike">Nike</SelectItem>
              <SelectItem value="Adidas">Adidas</SelectItem>
              <SelectItem value="Xiaomi">Xiaomi</SelectItem>
              <SelectItem value="Apple">Apple</SelectItem>
              <SelectItem value="Nintendo">Nintendo</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleSearch}>Buscar</Button>
          <Button variant="outline" onClick={resetFilters}>
            Limpiar filtros
          </Button>
        </div>
      </div>

      {/* Cards de productos */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <Card>
                <CardContent>
                  <Skeleton className="h-[200px] w-[200px] rounded-lg p-3" />
                </CardContent>
              </Card>
              <div className="p-2">
                <Skeleton className="w-3/4 h-6 mb-2" />
                <Skeleton className="w-full h-4 mb-2" />
                <div className="flex flex-row justify-between py-1">
                  <Skeleton className="w-1/4 h-6" />
                  <Skeleton className="w-10 h-10 rounded-full" />
                </div>
              </div>
            </div>
          ))
        ) : products.length === 0 ? (
          <div>
            <div className="flex flex-col items-center justify-center">
              <Card>
                <CardContent>
                  <p className="text-xl text-center text-gray-500">
                    No se ha encontrado ese producto disponible.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          products.map((product: Product) => (
            <div key={product.id}>
              <Card
                onClick={() => navigate(`/productDetails/${product.id}`)}
                className="cursor-pointer"
              >
                <CardContent>
                  <img
                    src={`${API_URL_IMAGE}${product.image}`}
                    alt={product.image}
                  />
                </CardContent>
              </Card>
              <div className="p-2">
                <p className="text-[20px] font-bold">{product.name}</p>
                <p>
                  {product.description.length > 65
                    ? `${product.description.slice(0, 65)}...`
                    : product.description}
                </p>
                <div className="flex flex-row justify-between py-1">
                  <p className="text-[20px] font-bold">
                    Gs. {product.price.toLocaleString()}
                  </p>
                  <Button
                    className="mx-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      addProductCart(product.id);
                    }}
                    disabled={isAddingToCart}
                  >
                    <Plus />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
