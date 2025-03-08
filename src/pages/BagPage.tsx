import { Plus, Minus } from "lucide-react";
import { products } from "@/types/Product";

export default function BagPage() {
  const total = products.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="p-6 space-y-6 min-w-5xl">
      <h1 className="mb-6 text-3xl font-bold">Check your Bag Items</h1>

      <div className="flex">
        <div className="flex-1 space-y-4">
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
                <p className="text-sm text-gray-400">{product.description}</p>

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
                    <button className="flex items-center justify-center w-6 h-6 text-white bg-red-500 rounded-full">
                      <Minus size={14} />
                    </button>
                    <span>{product.id}</span>
                    <button className="flex items-center justify-center w-6 h-6 text-white bg-green-500 rounded-full">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-1/4 ml-12">
          <div className="sticky top-6">
            <h2 className="mb-4 text-xl font-bold">Your Bag</h2>
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="flex items-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-cover w-12 h-12 rounded-lg"
                  />
                  <span className="ml-2 text-sm">{product.title}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 mt-6 border-t">
              <span className="text-lg font-bold">
                Total: Gs. {total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
