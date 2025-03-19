import { RecoverAcccount } from "@/api/account/RecoverAccount";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { delay } from "@/utils/delay";
import { useNavigate } from "react-router-dom";

// Form schema
const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Por favor ingrese un correo electrónico válido" }),
});

const RecoverAccountPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigator = useNavigate();

  // Form definition
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      await RecoverAcccount(values.email);
      setIsSuccess(true);
      toast(
        "Revise su correo electrónico para obtener instrucciones sobre cómo recuperar su cuenta."
      );
      await delay(1000);
      navigator("/");
    } catch (error) {
      toast("No pudimos procesar su solicitud. Por favor intente nuevamente.");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-200 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white border-gray-200 shadow-lg">
          <CardHeader>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <CardTitle className="text-2xl font-bold text-center text-gray-900">
                Recuperar Cuenta
              </CardTitle>
              <CardDescription className="mt-2 text-center text-gray-600">
                Ingrese su correo electrónico para recibir una nueva contraseña
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            {!isSuccess ? (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">
                            Correo Electrónico
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="ejemplo@correo.com"
                              className="h-12 mt-1 border-gray-300 bg-gray-50 focus:border-gray-500 focus:ring-gray-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-sm" />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <Button
                      type="submit"
                      className="w-full py-6 text-white bg-gray-900 hover:bg-gray-800"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        "Enviar Solicitud"
                      )}
                    </Button>
                    <Button
                      variant={"outline"}
                      className="w-full py-6 mt-2"
                      type="reset"
                      onClick={() => navigator("/")}
                    >
                      Cancelar
                    </Button>
                  </motion.div>
                </form>
              </Form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-gray-100 rounded-full">
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Solicitud Enviada
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Revise su correo electrónico para obtener instrucciones sobre
                  cómo recuperar su cuenta.
                </p>
              </motion.div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center px-6 py-4 border-t border-gray-100 bg-gray-50">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-xs text-center text-gray-500"
            >
              Si no recibe un correo electrónico, verifique su carpeta de spam o
              contacte a soporte.
            </motion.p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default RecoverAccountPage;
