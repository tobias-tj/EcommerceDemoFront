import emptyCartAnimation from "@/assets/emptyCart.json";
import Lottie from "react-lottie";

export const EmptyCartAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: emptyCartAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Lottie options={defaultOptions} height={300} width={300} />
      <p className="mt-4 text-xl text-gray-600">Tu carrito está vacío</p>
    </div>
  );
};
