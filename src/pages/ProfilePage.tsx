import { getAllOrdersByAccount } from "@/api/account/GetAllOrdersByAccount";
import { getUserDetails } from "@/api/account/GetUserDetails";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { Order } from "@/types/Order";
import { UserDetails } from "@/types/UserDetails";
import { delay } from "@/utils/delay";
import { User2Icon } from "lucide-react";
import { useEffect, useState } from "react";

const API_URL_IMAGE = import.meta.env.VITE_API_IMAGE;

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingOrder, setIsLoadingOrder] = useState<boolean>(true);

  const [ordersTotal, setOrdersTotal] = useState<Order[] | null>(null);

  const fetchUserDetails = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token") || "NULL";
    try {
      const userDetails = await getUserDetails(token);
      await delay(1000);
      setProfile(userDetails);
    } catch (error) {
      console.log("No se ha logrado encontrar informacion del usuario", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrdersPrepared = async () => {
    setIsLoadingOrder(true);
    const token = localStorage.getItem("token") || "NULL";
    try {
      const ordersTotal = await getAllOrdersByAccount(token, "CONFIRM");
      await delay(1000);
      setOrdersTotal(ordersTotal);
    } catch (error) {
      console.error("Failed to fetch carts:", error);
    } finally {
      setIsLoadingOrder(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchOrdersPrepared();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Tarjeta de información del usuario */}
      <Card className="p-5">
        <div>
          <div className="flex flex-row items-center justify-around space-x-6">
            <User2Icon className="text-zinc-800 w-14 h-14" />
            <div className="flex flex-col">
              <CardTitle className="text-xl">Información de Cuenta</CardTitle>
              <Badge className="mt-2">Nombre Completo</Badge>
              {isLoading ? (
                <Skeleton className="h-4 w-[200px] mt-2" />
              ) : (
                <p className="text-gray-700">{profile?.fullName}</p>
              )}
              <Badge className="mt-4">Email</Badge>
              {isLoading ? (
                <Skeleton className="h-4 w-[200px] mt-2" />
              ) : (
                <p className="text-gray-700">{profile?.email}</p>
              )}
            </div>
            <div className="flex items-end justify-end">
              <Button>Cambiar Contraseña</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Productos Pedidos */}
      <Card className="p-5">
        <CardTitle className="mb-4 text-xl">Productos Pedidos</CardTitle>
        <Carousel>
          <CarouselContent>
            {isLoadingOrder ? (
              <div className="flex flex-row space-x-2">
                <Skeleton className="w-[150px] h-[150px]" />
                <Skeleton className="w-[150px] h-[150px]" />
                <Skeleton className="w-[150px] h-[150px]" />
              </div>
            ) : (
              <div className="flex flex-row">
                {ordersTotal?.map((product) =>
                  product.orderItems.map((productItem) => (
                    <CarouselItem key={product.id} className="basis-1/3">
                      <Card className="p-4">
                        <CardContent className="flex flex-col items-center">
                          <div className="w-[100px] h-[100px] bg-gray-200 rounded-md">
                            <img
                              src={`${API_URL_IMAGE}${productItem.productImage}`}
                              alt={productItem.productImage}
                            />
                          </div>

                          <Badge className="mt-2">
                            {productItem.productName}
                          </Badge>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))
                )}
              </div>
            )}
          </CarouselContent>
        </Carousel>
      </Card>
    </div>
  );
}
