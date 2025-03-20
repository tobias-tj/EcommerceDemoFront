import { ImageIcon, Upload, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import { CreateProduct } from "@/api/admin/CreateProduct";
import { toast } from "sonner";
import { convertImageToBase64 } from "@/utils/convertImageToBase64";

const FormCreateProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    image: null as File | null,
    imagePreview: "",
    brand: "",
    description: "",
    quantity: 0,
    price: 0,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const clearImage = () => {
    setProduct({
      ...product,
      image: null,
      imagePreview: "",
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetForm = () => {
    setProduct({
      name: "",
      image: null,
      imagePreview: "",
      brand: "",
      description: "",
      quantity: 0,
      price: 0,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Limpiar el input de archivo
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Producto agregado:", product);
    const token = localStorage.getItem("token") || "NULL";
    try {
      await CreateProduct(token, {
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        brand: product.brand,
        image: product.image,
      });
      toast("Producto Agregado con Exito!");
      resetForm();
    } catch (error) {
      toast.error(
        "Lo sentimos no se ha logrado agregar su producto. Intente de nuevo más tarde."
      );
      console.error("Error al agregar el producto", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      try {
        const base64Image = await convertImageToBase64(file);
        setProduct({
          ...product,
          image: file,
          imagePreview: base64Image,
        });
      } catch (error) {
        console.error("Error al cargar la imagen:", error);
      }
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Agregar Nuevo Producto</CardTitle>
          <CardDescription>
            Complete el formulario para agregar un nuevo producto al inventario
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="brand">Marca</Label>
              <Input
                id="brand"
                name="brand"
                value={product.brand}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="image">Imagen del Producto</Label>
              <div className="flex flex-col items-center mt-1">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />

                {product.imagePreview ? (
                  <div className="relative w-full h-32 mb-2">
                    <img
                      src={product.imagePreview || "/placeholder.svg"}
                      alt="Vista previa"
                      className="object-contain w-full h-full border rounded"
                    />
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute p-1 text-white bg-red-500 rounded-full top-1 right-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={handleImageClick}
                    className="flex flex-col items-center justify-center w-full h-32 transition-colors border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-blue-500"
                  >
                    <ImageIcon className="w-10 h-10 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Haga clic para seleccionar una imagen
                    </p>
                  </div>
                )}

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleImageClick}
                  className="w-full mt-2"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {product.image ? "Cambiar imagen" : "Subir imagen"}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="quantity">Cantidad</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                value={product.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="price">Precio</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={product.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" className="w-full">
                Agregar Producto
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormCreateProduct;
