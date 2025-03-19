import React from "react";
import { useNavigate } from "react-router-dom";
import animationCheck from "@/assets/animationCheck2.json";
import Lottie from "react-lottie";
import { loginAccount, registerAccount } from "./api/account/Auth";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  LoginFormData,
  RegisterFormData,
  loginSchema,
  registerSchema,
} from "./types/AccountSchema";
import { zodResolver } from "@hookform/resolvers/zod";

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData | RegisterFormData>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData | RegisterFormData> = async (
    data
  ) => {
    if (isLogin) {
      const response = await loginAccount(data as LoginFormData);

      if (response.success) {
        onLogin();
        navigate("/home");
      } else {
        setError(response.message!);
      }
    } else {
      const response = await registerAccount(data as RegisterFormData);

      if (response?.success) {
        navigate("/confirmEmail", {
          state: { email: (data as RegisterFormData).email },
        });
      } else {
        setError(response?.message || "Error al registrar la cuenta");
      }
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationCheck,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="flex w-full max-w-4xl bg-white shadow-2xl rounded-2xl">
        <div className="flex-col items-center justify-center hidden w-1/2 p-8 text-white bg-black md:flex rounded-l-2xl">
          <h2 className="mb-4 text-4xl font-bold">TechStore</h2>
          <p className="text-center text-gray-400">
            Encuentra los mejores productos electrónicos aquí.
          </p>
          <Lottie options={defaultOptions} height={300} width={300} />
        </div>

        <div className="flex flex-col w-full p-10 md:w-1/2">
          <div className="flex justify-center mb-8">
            <button
              onClick={() => {
                setIsLogin(true);
                reset();
              }}
              className={`px-6 py-2 rounded-l-full ${
                isLogin
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                reset();
              }}
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-1 text-gray-600">
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="tuemail@correo.com"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {!isLogin && (
              <div>
                <label className="block mb-1 text-gray-600">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  placeholder="Ingresar Nombre Completo"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  {...register("fullName")}
                />
                {!isLogin && errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.fullName?.message}
                  </p>
                )}
              </div>
            )}

            <div>
              <label className="block mb-1 text-gray-600">Contraseña</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
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
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 mt-8 font-medium text-white transition bg-black rounded-lg hover:bg-gray-800"
            >
              {isLogin ? "Iniciar Sesión" : "Registrarse"}
            </button>

            {error && (
              <p className="mt-4 text-sm text-center text-red-500">{error}</p>
            )}

            {isLogin && (
              <p className="mt-4 text-sm text-center text-gray-500">
                ¿Olvidaste tu contraseña?
                <span
                  className="ml-1 text-black cursor-pointer hover:underline"
                  onClick={() => navigate("/recoverAccount")}
                >
                  Recuperar
                </span>
              </p>
            )}
          </form>
        </div>
      </div>

      <p className="mt-8 text-sm text-gray-400">Power By TJ</p>
    </div>
  );
};

export default LoginForm;
