import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { products } from "@/types/Product";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col items-center">
        <div className="flex flex-col justify-start p-2 w-100">
          <p className="text-[#3b3b3b] font-bold mb-2">Search Items...</p>
          <Input
            placeholder="Apple Watch, Samsung S22, Asus VivoBook, ...."
            className="max-w-md bg-white inset-shadow-xs inset-shadow-gray-300"
          />
        </div>
      </div>

      {/* Cards de productos */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product.id}>
            <Card>
              <CardContent>
                <img src={product.image} alt={product.image} />
              </CardContent>
            </Card>
            <div className="p-2">
              <p className="text-[20px] font-bold">{product.title}</p>
              <p>{product.description}</p>
              <div className="flex flex-row justify-between py-1">
                <p className="text-[20px] font-bold">
                  Gs. {product.price.toLocaleString()}
                </p>
                <Button className="mx-2">
                  <Plus />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
