import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confirmAnimation from "@/assets/confirmCheckout.json";
import { Card, CardContent } from "@/components/ui/card";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";

const ConfirmCheckoutPage = () => {
  const [countdown, setCountdown] = useState(4);
  const navigator = useNavigate();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      navigator("/home");
    }
  }, [countdown, navigator]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: confirmAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-md p-6 mx-auto mt-4 space-y-4 rounded-lg shadow-lg">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="w-full max-w-xs">
          <CardContent>
            <Lottie options={defaultOptions} height={250} width={250} />
          </CardContent>
        </Card>
      </motion.div>

      <motion.p
        className="text-2xl font-semibold text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        ¡Felicitaciones por tu compra!
      </motion.p>

      <motion.p
        className="text-sm text-center text-gray-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        En breve recibirás un correo electrónico con los detalles de tu
        solicitud.
      </motion.p>

      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <p className="mt-2 text-xl text-gray-700">
          Redirigiendo en {countdown}...
        </p>
      </motion.div>
    </div>
  );
};

export default ConfirmCheckoutPage;
