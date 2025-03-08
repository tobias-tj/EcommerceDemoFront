import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import xiaomi14 from "@/assets/xiaomi14.jpg";
import iphone15 from "@/assets/iphone15pro.jpeg";
import macbookair from "@/assets/macbookair.jpg";
import nintendo from "@/assets/nintendo1.jpg";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col items-center ">
        <div className="flex flex-col justify-start w-100 ">
          <p className=" text-[#3b3b3b] font-bold mb-2">Search Items...</p>
          <Input
            placeholder="Apple Watch, Samsung S22, Asus VivoBook, ...."
            className="max-w-md bg-white inset-shadow-xs inset-shadow-gray-300"
          />
        </div>
      </div>

      {/* Cards de productos */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Card>
            <CardContent>
              <img src={xiaomi14} />
            </CardContent>
          </Card>
          <div className="p-2">
            <p className="text-[20px] font-bold">Xiaomi 14</p>
            <p>Ultra 5G Dual 512 GB</p>
            <div className="flex flex-row justify-between py-1">
              <p className="text-[20px] font-bold">Gs. 9.149.000 </p>
              <Button className="mx-2">
                <Plus />
              </Button>
            </div>
          </div>
        </div>
        <div>
          <Card>
            <CardContent>
              <img src={iphone15} />
            </CardContent>
          </Card>
          <div className="p-2">
            <p className="text-[20px] font-bold">iPhone 15</p>
            <p>Apple iPhone 15 Pro</p>
            <div className="flex flex-row justify-between py-1">
              <p className="text-[20px] font-bold">Gs. 9.291.000 </p>
              <Button className="mx-2">
                <Plus />
              </Button>
            </div>
          </div>
        </div>
        <div>
          <Card>
            <CardContent>
              <img src={macbookair} />
            </CardContent>
          </Card>
          <div className="p-2">
            <p className="text-[20px] font-bold">Macbook Air</p>
            <p>Apple Macbook Air (2024)</p>
            <div className="flex flex-row justify-between py-1">
              <p className="text-[20px] font-bold">Gs. 10.500.000</p>
              <Button className="mx-2">
                <Plus />
              </Button>
            </div>
          </div>
        </div>
        <div>
          <Card>
            <CardContent>
              <img src={nintendo} />
            </CardContent>
          </Card>
          <div className="p-2">
            <p className="text-[20px] font-bold">Nintendo Switch</p>
            <p>Nintendo Switch OLED 64 GB</p>
            <div className="flex flex-row justify-between py-1">
              <p className="text-[20px] font-bold">Gs. 2.679.000 </p>
              <Button className="mx-2">
                <Plus />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
