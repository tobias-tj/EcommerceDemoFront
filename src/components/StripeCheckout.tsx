import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";

const STRIPE_KEY = import.meta.env.VITE_STRIPE_KEY_PUBLIC;
const stripePromise = loadStripe(STRIPE_KEY);

const CheckoutForm = ({
  onSuccess,
  shippingAddress,
  phoneNumber,
}: {
  onSuccess: () => void;
  shippingAddress: string;
  phoneNumber: string;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe no está listo.");
      return;
    }

    setLoading(true);
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setLoading(false);
      return;
    }

    // Crear método de pago
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error("Error al procesar el pago:", error.message);
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token") || "NULL";
      const response = await axios.post(
        "http://localhost:8080/api/orders",
        null,
        {
          params: {
            address: shippingAddress,
            phoneNumber: phoneNumber,
            paymentToken: paymentMethod.id,
          },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Orden confirmada:", response.data);
      if (response.status === 200) {
        onSuccess();
      } else {
        console.error("Error en la orden:", response.data);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="p-2 border rounded" />
      <Button type="submit" disabled={!stripe || loading} className="mt-4">
        {loading ? "Processing..." : "Pay"}
      </Button>
    </form>
  );
};

export const StripeCheckout = ({
  onSuccess,
  shippingAddress,
  phoneNumber,
}: {
  onSuccess: () => void;
  shippingAddress: string;
  phoneNumber: string;
}) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm
      onSuccess={onSuccess}
      shippingAddress={shippingAddress}
      phoneNumber={phoneNumber}
    />
  </Elements>
);
