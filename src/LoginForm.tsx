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
    navigate("/home");
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="flex w-full max-w-4xl bg-white shadow-2xl rounded-2xl">
        {/* Lado izquierdo: imagen o patrón */}
        <div className="flex-col items-center justify-center hidden w-1/2 p-8 text-white bg-black md:flex rounded-l-2xl">
          <h2 className="mb-4 text-4xl font-bold">TechStore</h2>
          <p className="text-center text-gray-400">
            Encuentra los mejores productos electrónicos aquí.
          </p>
          <Lottie options={defaultOptions} height={300} width={300} />
        </div>

        {/* Lado derecho: formulario */}
        <div className="flex flex-col w-full p-10 md:w-1/2">
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

          <h3 className="mb-6 text-2xl font-semibold text-center text-gray-800">
            {isLogin ? "Bienvenido de nuevo" : "Crea tu cuenta"}
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-gray-600">
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
              <label className="block mb-1 text-gray-600">Contraseña</label>
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
                <label className="block mb-1 text-gray-600">
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
            className="w-full py-3 mt-8 font-medium text-white transition bg-black rounded-lg hover:bg-gray-800"
          >
            {isLogin ? "Iniciar Sesión" : "Registrarse"}
          </button>

          {isLogin && (
            <p className="mt-4 text-sm text-center text-gray-500">
              ¿Olvidaste tu contraseña?
              <span className="ml-1 text-black cursor-pointer hover:underline">
                Recuperar
              </span>
            </p>
          )}
        </div>
      </div>

      <p className="mt-8 text-sm text-gray-400">Power By TJ</p>
    </div>
  );
};

export default LoginForm;
