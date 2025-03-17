import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { useState } from "react";

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payment: { cardNumber: string; cardType: string }) => void;
}

export function PaymentMethodModal({
  isOpen,
  onClose,
  onSave,
}: PaymentMethodModalProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("");

  const handleSave = () => {
    onSave({ cardNumber, cardType });
    onClose();
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="bg-[#fff]">
        <DrawerHeader>
          <DrawerTitle>Edit Payment Method</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <div>
            <Label>Card Number</Label>
            <Input
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
            />
          </div>
          <div>
            <Label>Card Type</Label>
            <Select onValueChange={setCardType}>
              <SelectTrigger>
                <SelectValue placeholder="Select card type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Visa">Visa</SelectItem>
                <SelectItem value="Mastercard">Mastercard</SelectItem>
                <SelectItem value="American Express">
                  American Express
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
