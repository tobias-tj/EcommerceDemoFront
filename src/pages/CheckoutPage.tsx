import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CreditCard, MapPinHouseIcon } from "lucide-react";
import { products } from "@/types/Product";

export default function CheckoutPage() {
  const total = products.reduce((sum, product) => sum + product.price, 0);

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
                  <p className="text-[18px]">Tobias Jara</p>
                  <p className="text-[18px]">123 Mcal Lopez</p>
                  <p className="text-[18px]">Asunción</p>
                  <p className="text-[18px]">Paraguay</p>
                </div>
                <Button variant={"outline"}>Change</Button>
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
                    <p className="text-[18px] font-bold">Mastercard </p>
                    <p className="text-[18px] ml-1 font-light">
                      {" "}
                      ending in 321
                    </p>
                  </div>
                  <div className="flex flex-row mt-4">
                    <MapPinHouseIcon className="mr-2 text-green-800" />
                    <p className="text-[18px] ml-1 font-light">
                      Billing address same as Shipping Address
                    </p>
                  </div>
                </div>
                <Button variant={"outline"}>Change</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="p-5 mx-8 mt-4">
            <CardTitle className="text-[20px] font-medium p-2">
              REVIEW YOUR BAG
            </CardTitle>
            <CardContent>
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center p-4 bg-white rounded-lg shadow-md"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-cover w-24 h-24 rounded-lg"
                  />

                  <div className="flex-1 ml-4">
                    <h2 className="text-xl font-semibold">{product.title}</h2>
                    <p className="text-gray-500">{product.color}</p>
                    <p className="text-sm text-gray-400">
                      {product.description}
                    </p>

                    <div className="flex items-center mt-2 space-x-2">
                      <span className="text-green-500">★★★★☆</span>
                      <span className="text-sm text-gray-500">
                        {product.rating} / 5
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-bold">
                        Gs. {product.price.toLocaleString()}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span>{product.id}</span>
                      </div>
                    </div>
                  </div>
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
                  <p>Items: </p>
                  <p>Shipping: </p>
                  <p>Payment discount: </p>
                  <span className="text-lg font-bold">
                    Order Total: Gs. {total.toLocaleString()}
                  </span>
                  <Button className="mt-2">Place your order</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
