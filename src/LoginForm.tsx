import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAnimationCheck from "@/assets/animationCheck2.json";
import Lottie from "react-lottie";

const LoginForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Aquí irá tu lógica de login o signup
    navigate("/dashboard");
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: useAnimationCheck,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white shadow-2xl rounded-2xl flex max-w-4xl w-full">
        {/* Lado izquierdo: imagen o patrón */}
        <div className="hidden md:flex flex-col items-center justify-center bg-black text-white p-8 w-1/2 rounded-l-2xl">
          <h2 className="text-4xl font-bold mb-4">TechStore</h2>
          <p className="text-gray-400 text-center">
            Encuentra los mejores productos electrónicos aquí.
          </p>
          <Lottie options={defaultOptions} height={300} width={300} />
        </div>

        {/* Lado derecho: formulario */}
        <div className="flex flex-col p-10 w-full md:w-1/2">
          {/* Switch Login / Sign Up */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-6 py-2 rounded-l-full ${
                isLogin
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-6 py-2 rounded-r-full ${
                !isLogin
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              Registrarse
            </button>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            {isLogin ? "Bienvenido de nuevo" : "Crea tu cuenta"}
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="tuemail@correo.com"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Contraseña</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-gray-600 mb-1">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="mt-8 w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
          >
            {isLogin ? "Iniciar Sesión" : "Registrarse"}
          </button>

          {isLogin && (
            <p className="text-sm text-gray-500 mt-4 text-center">
              ¿Olvidaste tu contraseña?
              <span className="text-black hover:underline cursor-pointer ml-1">
                Recuperar
              </span>
            </p>
          )}
        </div>
      </div>

      <p className="text-gray-400 text-sm mt-8">Power By TJ</p>
    </div>
  );
};

export default LoginForm;
