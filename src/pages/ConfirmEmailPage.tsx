import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmEmail } from "@/api/account/Auth";
import ConfirmRequest from "@/types/ConfirmRequest";

export default function ConfirmEmailPage() {
  const [confirmUser, setConfirmUser] = useState<ConfirmRequest>({
    email: "",
    confirmationCode: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [, setError] = useState("");

  const handleSubmit = async () => {
    if (confirmUser.confirmationCode.length === 6) {
      confirmUser.email = email;
      const response = await confirmEmail(confirmUser);
      if (response.success) {
        navigate("/");
      } else {
        setError(response.message!);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl"
      >
        <h1 className="mb-6 text-2xl font-semibold text-center text-black">
          Confirmar Email
        </h1>
        <p className="mb-4 text-sm text-center text-gray-600">
          Ingrese el código de 6 dígitos enviado a su correo electrónico.
        </p>

        <motion.input
          type="text"
          maxLength={6}
          value={confirmUser.confirmationCode}
          onChange={(e) =>
            setConfirmUser({ ...confirmUser, confirmationCode: e.target.value })
          }
          className="w-full px-4 py-3 text-center text-xl font-medium tracking-widest border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="------"
          whileFocus={{ scale: 1.05 }}
        />

        <motion.button
          onClick={handleSubmit}
          disabled={confirmUser.confirmationCode.length !== 6}
          className="w-full py-3 mt-6 text-white bg-black rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Verificar Código
        </motion.button>
      </motion.div>
    </div>
  );
}
