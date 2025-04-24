"use client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useToast } from "@/context/ToastContext";
import LoadingSpinner from "@/components/Common/LoadingSpinner";
import { createCheckoutSession } from "@/actions/payment/stripePaymentAction";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

interface ToastStyle {
  background?: string;
  color?: string;
  borderColor?: string;
  iconColor?: string;
}

interface ToastOptions {
  type: "error" | "loading";
  title: string;
  description: string;
  persistent?: boolean;
  duration?: number;
  showCloseButton?: boolean;
  style?: ToastStyle;
}

interface ToastContext {
  showToast: (options: ToastOptions) => string | number;
  dismissToast: (id: string | number) => void;
}

interface PaymentControllerProps {
  amount: number;
  email: string;
  onPaymentSuccess: () => void;
}

export const PaymentController = ({
  amount,
  email,
  onPaymentSuccess,
}: PaymentControllerProps) => {
  const router = useRouter();
  const { showToast, dismissToast } = useToast() as ToastContext;
  const [initiatingForm, setInitiatingForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const toastIdRef = useRef<string | number>("");

  const handlePaymentInitiated = async () => {
    setInitiatingForm(true);
    try {
      const stripe: Stripe | null = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe failed to load");
      }

      const session = await createCheckoutSession({
        amount: amount * 100,
        email,
      });
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        showToast({
          type: "error",
          title: "Error",
          description: error.message || "Failed to redirect to checkout",
        });
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to initiate payment";
      showToast({
        type: "error",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setInitiatingForm(false);
    }
  };

  // const handlePaymentSuccess = async () => {

  //   setIsProcessing(true);

  //   const toastId = showToast({
  //     type: "loading",
  //     title: "Payment Successful",
  //     description: "Redirecting to your order...",
  //     persistent: false,
  //     duration: 3000,
  //     showCloseButton: true,
  //     style: {
  //       background: "#ECFDF5",
  //       color: "#065F46",
  //       borderColor: "#A7F3D0",
  //       iconColor: "#A7F3D0",
  //     },
  //   });

  //   toastIdRef.current = toastId;

  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 3000));
  //     dismissToast(toastIdRef.current);
  //     onPaymentSuccess();
  //   } catch (error: unknown) {
  //     const errorMessage =
  //       error instanceof Error ? error.message : "Could not complete order";
  //     console.error("Error:", errorMessage);
  //     showToast({
  //       type: "error",
  //       title: "Error",
  //       description: "Could not complete order",
  //     });
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

  return (
    <div className="w-[100%] h-auto flex border-red-500 md:p-[5px]">
      <button
        onClick={handlePaymentInitiated}
        disabled={isProcessing || initiatingForm}
        className={`
          w-full h-[40px] flex items-center justify-center bg-[#B5E4FC] cursor-pointer
          border border-[#3C3C3C] rounded hover:bg-[#E0F2FE] hover:ring-1
          transition-colors duration-200
          ${
            isProcessing || initiatingForm
              ? "opacity-50 cursor-not-allowed"
              : ""
          }
        `}
      >
        {initiatingForm || isProcessing ? (
          <LoadingSpinner />
        ) : (
          <p className="font-medium text-[0.9rem] text-black">Pay ${amount}</p>
        )}
      </button>
    </div>
  );
};
