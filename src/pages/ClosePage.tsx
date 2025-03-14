import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const ClosePage = () => {
  useEffect(() => {
    // Simular el cierre de sesión
    setTimeout(() => {
      localStorage.clear();
      window.location.href = "/";
    }, 3000);
  }, []);
  return (
    <div className="flex items-center justify-center h-screen shadow-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 lg:w-[900px] sm:w-[400px]">
      <Card className="w-full max-w-sm text-center shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            Cerrando Sesión
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            {/* Icono de carga animada */}
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            <p className="text-gray-600">
              Estamos procesando tu solicitud. Por favor, espera un momento...
            </p>
            <Button variant="outline" disabled>
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClosePage;
