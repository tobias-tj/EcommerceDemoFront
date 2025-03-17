import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CreditCard, MapPinHouseIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Order } from "@/types/Order";
import { getAllOrderPreparedByUser } from "@/api/checkout/GetAllOrderPrepared";
import { delay } from "@/utils/delay";
import { ShippingAddressModal } from "@/components/ShippingAddressModal";
import { PaymentMethodModal } from "@/components/PaymentMethodModal";
import { StripeCheckout } from "@/components/StripeCheckout";

const API_URL_IMAGE = import.meta.env.VITE_API_IMAGE;

export default function CheckoutPage() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const [showStripeCheckout, setShowStripeCheckout] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    name: "Nombre Completo",
    street: "Calle",
    city: "Ciudad",
    country: "País",
  });

  const [paymentMethod, setPaymentMethod] = useState({
    cardNumber: "**** **** **** 123",
    cardType: "Tipo de Tarjeta",
  });

  const itemPrice = orders?.map((orderItem) =>
    orderItem.orderItems.reduce(
      (sum, order) => sum + order.price * order.quantity,
      0
    )
  );

  const totalPrice = itemPrice?.reduce((sum, price) => sum + price, 0) || 0;

  const formattedItemPrices =
    itemPrice?.map((price) => price.toLocaleString()) || [];

  const fetchOrdersPrepared = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token") || "NULL";
    try {
      const orders = await getAllOrderPreparedByUser(token);
      await delay(1000);
      setOrders(orders);
    } catch (error) {
      console.error("Failed to fetch carts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrdersPrepared();
  }, []);

  return (
    <div className="p-6 space-y-6 min-w-5xl ">
      <div className="flex">
        <div>
          <Card className="p-5 mx-8">
            <CardTitle className="text-[20px] font-medium p-2">
              SHIPPING ADDRESS
            </CardTitle>
            <CardContent>
              <div className="flex flex-row justify-between">
                <div className="flex flex-col justify-start">
                  <p className="text-[18px]">{shippingAddress.name}</p>
                  <p className="text-[18px]">{shippingAddress.street}</p>
                  <p className="text-[18px]">{shippingAddress.city}</p>
                  <p className="text-[18px]">{shippingAddress.country}</p>
                </div>
                <Button
                  variant={"outline"}
                  onClick={() => setIsShippingModalOpen(true)}
                >
                  Change
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="p-5 mx-8 mt-4">
            <CardTitle className="text-[20px] font-medium p-2">
              PAYMENT METHOD
            </CardTitle>
            <CardContent>
              <div className="flex flex-row justify-between">
                <div className="flex flex-col justify-start">
                  <div className="flex flex-row">
                    <CreditCard className="mr-2 text-gray-800" />
                    <p className="text-[18px] font-bold">
                      {paymentMethod.cardType}
                    </p>
                    <p className="text-[18px] ml-1 font-light">
                      ending in {paymentMethod.cardNumber.slice(-4)}
                    </p>
                  </div>
                  <div className="flex flex-row mt-4">
                    <MapPinHouseIcon className="mr-2 text-green-800" />
                    <p className="text-[18px] ml-1 font-light">
                      Billing address same as Shipping Address
                    </p>
                  </div>
                </div>
                <Button
                  variant={"outline"}
                  onClick={() => setIsPaymentModalOpen(true)}
                >
                  Change
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="p-5 mx-8 mt-4">
            <CardTitle className="text-[20px] font-medium p-2">
              REVIEW YOUR ORDER
            </CardTitle>
            <CardContent>
              {orders?.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center p-4 bg-white rounded-lg shadow-md"
                >
                  {order.orderItems.map((orderItem) => (
                    <div key={orderItem.id}>
                      <img
                        src={`${API_URL_IMAGE}${orderItem.productImage}`}
                        alt={orderItem.productName}
                        className="object-cover w-24 h-24 rounded-lg"
                      />

                      <div className="flex-1 ml-4">
                        <h2 className="text-xl font-semibold">
                          {orderItem.productName}
                        </h2>
                        <p className="text-sm text-gray-400">
                          {orderItem.productBrand}
                        </p>

                        <div className="flex items-center justify-between mt-2">
                          <span className="text-lg font-bold">
                            Gs. {orderItem.price.toLocaleString()}
                          </span>
                          <div className="flex items-center space-x-2">
                            <span>{orderItem.quantity}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="w-1/3 ml-12">
          <Card className="sticky p-8 top-6">
            <div className="">
              <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <div className="flex flex-row space-x-2">
                    <ul className="list-disc list-inside">
                      {formattedItemPrices.map((price, index) => (
                        <li key={index}>Gs. {price}</li>
                      ))}
                    </ul>
                    <span>+</span>
                  </div>

                  <span className="text-lg font-bold">
                    Order Total: Gs. {totalPrice?.toLocaleString()}
                  </span>
                  <Button
                    className="mt-2"
                    onClick={() => setShowStripeCheckout(true)}
                  >
                    Place your order
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      {/* Modales */}
      <ShippingAddressModal
        isOpen={isShippingModalOpen}
        onClose={() => setIsShippingModalOpen(false)}
        onSave={(address) => setShippingAddress(address)}
      />

      <PaymentMethodModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSave={(payment) => setPaymentMethod(payment)}
      />
      {/* Flujo de Stripe */}
      {showStripeCheckout && (
        <StripeCheckout
          onSuccess={() => {
            console.log("Pago exitoso");
            setShowStripeCheckout(false); // Ocultar el flujo de Stripe después de un pago exitoso
          }}
          shippingAddress={shippingAddress.street}
          phoneNumber={"0981123456"}
        />
      )}
    </div>
  );
}
