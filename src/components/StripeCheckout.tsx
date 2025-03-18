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
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { toast } from "sonner";

const STRIPE_KEY = import.meta.env.VITE_STRIPE_KEY_PUBLIC;
const stripePromise = loadStripe(STRIPE_KEY);

const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#32325d",
      fontFamily: "Inter, sans-serif",
      "::placeholder": { color: "#aab7c4" },
      padding: "12px",
    },
    invalid: { color: "#fa755a" },
  },
};

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
      toast.error(
        "Ha ocurrido un error al intentar procesar pago. Intente de nuevo😓"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 border rounded-lg shadow-lg">
      <CardContent>
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Detalles de Pago
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="card-element">Información de la Tarjeta</Label>
            <div className="p-3 border rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
              <CardElement id="card-element" options={cardElementOptions} />
            </div>
          </div>

          <Button
            type="submit"
            disabled={!stripe || loading}
            className="w-full text-white bg-blue-600 hover:bg-blue-700"
          >
            {loading ? "Procesando..." : "Pagar"}
          </Button>
        </form>
      </CardContent>
    </Card>
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
