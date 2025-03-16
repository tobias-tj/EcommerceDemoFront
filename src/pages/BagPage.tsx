import { Plus, Minus, BadgeCheck, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Cart } from "@/types/Cart";
import { delay } from "@/utils/delay";
import { getAllCartByUser } from "@/api/cart/GetAllCartByUser";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyCartAnimation } from "@/components/EmptyCartAnimation";
import { ClearCartByUser } from "@/api/cart/ClearCartByUser";
import { AddCartByProductId } from "@/api/cart/AddCartByProductId";

const API_URL_IMAGE = import.meta.env.VITE_API_IMAGE;

export default function BagPage() {
  const [carts, setCarts] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const total = carts?.items.reduce((sum, cart) => sum + cart.productPrice, 0);

  const clearCart = async () => {
    const token = localStorage.getItem("token") || "NULL";
    try {
      await ClearCartByUser(token);
      await fetchCarts();
    } catch (error) {
      console.error("Failed to clear Cart:", error);
    }
  };

  const addProductCart = async (productId: number) => {
    const token = localStorage.getItem("token") || "NULL";
    try {
      await AddCartByProductId(productId, token, 1);
      await fetchCarts();
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const decreaseProductCart = async (productId: number) => {
    const token = localStorage.getItem("token") || "NULL";
    try {
      await AddCartByProductId(productId, token, -1);
      await fetchCarts();
    } catch (error) {
      console.error("Error decreasing product in cart:", error);
    }
  };

  const fetchCarts = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token") || "NULL";
    try {
      const carts = await getAllCartByUser(token);
      await delay(1000);
      setCarts(carts);
    } catch (error) {
      console.error("Failed to fetch carts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 space-y-6 min-w-5xl">
        <div className="flex">
          <div className="flex-1 space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center p-4 bg-white rounded-lg shadow-md"
              >
                <Skeleton className="w-24 h-24 rounded-lg" />
                <div className="flex-1 ml-4">
                  <Skeleton className="w-3/4 h-6" />
                  <div className="flex items-center justify-between mt-2">
                    <Skeleton className="w-1/4 h-6" />
                    <div className="flex items-center space-x-2">
                      <Skeleton className="w-6 h-6 rounded-full" />
                      <Skeleton className="w-6 h-6" />
                      <Skeleton className="w-6 h-6 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-1/4 ml-12">
            <div className="sticky top-6">
              <Skeleton className="w-3/4 h-6 mb-4" />
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center">
                    <Skeleton className="w-12 h-12 rounded-lg" />
                    <Skeleton className="w-3/4 h-4 ml-2" />
                  </div>
                ))}
              </div>
              <div className="pt-4 mt-6 border-t">
                <Skeleton className="w-1/2 h-6" />
                <Skeleton className="w-full h-10 mt-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!carts || carts.items.length === 0) {
    return <EmptyCartAnimation />;
  }

  return (
    <div className="p-6 space-y-6 min-w-5xl">
      <div className="flex">
        <div className="flex-1 space-y-4">
          {carts.items.map((cart) => (
            <div
              key={cart.id}
              className="flex items-center p-4 bg-white rounded-lg shadow-md"
            >
              <img
                src={`${API_URL_IMAGE}${cart.productImage}`}
                alt={cart.productName}
                className="object-cover w-24 h-24 rounded-lg"
              />

              <div className="flex-1 ml-4">
                <h2 className="text-xl font-semibold">{cart.productName}</h2>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold">
                    Gs. {cart.productPrice.toLocaleString()}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      className="flex items-center justify-center w-6 h-6 text-white bg-red-500 rounded-full"
                      onClick={() => decreaseProductCart(cart.productId)}
                    >
                      <Minus size={14} />
                    </button>
                    <span>{cart.quantity}</span>
                    <button
                      className="flex items-center justify-center w-6 h-6 text-white bg-green-500 rounded-full"
                      onClick={() => addProductCart(cart.productId)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-1/4 ml-12">
          <div className="sticky flex-col top-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">En el Carrito</h2>
              <Button
                variant="destructive"
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => {
                  clearCart();
                }}
              >
                <Trash2Icon size={16} />
              </Button>
            </div>

            <div className="space-y-4">
              {carts.items.map((cart) => (
                <div key={cart.id} className="flex items-center">
                  <img
                    src={`${API_URL_IMAGE}${cart.productImage}`}
                    alt={cart.productName}
                    className="object-cover w-12 h-12 rounded-lg"
                  />
                  <span className="ml-2 text-sm">{cart.productName}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 mt-6 border-t">
              <div className="flex flex-col">
                <span className="text-lg font-bold">
                  Total: Gs. {total?.toLocaleString()}
                </span>
                <Button className="mt-2">
                  <BadgeCheck /> Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
