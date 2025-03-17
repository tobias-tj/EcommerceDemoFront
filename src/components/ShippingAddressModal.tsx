import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { useShippingAddressStore } from "@/types/useShippingAddressStore";
import { toast } from "sonner";

interface ShippingAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: {
    name: string;
    street: string;
    city: string;
    country: string;
    phone: string;
  }) => void;
}

export function ShippingAddressModal({
  isOpen,
  onClose,
  onSave,
}: ShippingAddressModalProps) {
  const {
    name,
    street,
    city,
    country,
    phone,
    setName,
    setStreet,
    setCity,
    setCountry,
    setPhone,
    clearAddress,
  } = useShippingAddressStore();

  const handleSave = () => {
    // Validar los campos antes de guardar
    if (!name || !street || !city || !country || !phone) {
      toast.error("Por favor, complete todos los campos.");
      return;
    }

    if (phone.length !== 9) {
      toast.error("El número de teléfono debe tener 9 dígitos.");
      return;
    }
    onSave({ name, street, city, country, phone });
    clearAddress();
    onClose();
  };
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="bg-[#fff]">
        <DrawerHeader>
          <DrawerTitle>Edit Shipping Address</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <div>
            <Label>Full Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label>Street</Label>
            <Input value={street} onChange={(e) => setStreet(e.target.value)} />
          </div>
          <div>
            <Label>City</Label>
            <Input value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div>
            <Label>Country</Label>
            <Input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div>
            <Label>Numero de Telefono</Label>
            <Input
              value={phone}
              type="number"
              prefix="+595"
              maxLength={9}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
