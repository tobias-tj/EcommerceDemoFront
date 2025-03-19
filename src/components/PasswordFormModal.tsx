import { useState } from "react";
import { Drawer, DrawerContent } from "./ui/drawer";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { CreateNewPassword } from "@/api/account/CreateNewPassword";

interface PasswordFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PasswordFormModal({ isOpen, onClose }: PasswordFormModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!currentPassword || !newPassword) {
      toast.error("Por favor, completa ambos campos.");
      return;
    }

    setIsLoading(true);
    const token = localStorage.getItem("token") || "NULL";

    try {
      await CreateNewPassword(token, currentPassword, newPassword);
      toast.success("Contraseña actualizada correctamente.");
      onClose();
    } catch (error) {
      toast.error("Error al cambiar la contraseña. Verifica tus datos.");
      console.error("Error cambiando contraseña:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="bg-[#fff] p-4">
        <div className="space-y-4">
          <div>
            <Label>Contraseña Anterior</Label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div>
            <Label>Contraseña Nueva</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Cambiando..." : "Actualizar Contraseña"}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
