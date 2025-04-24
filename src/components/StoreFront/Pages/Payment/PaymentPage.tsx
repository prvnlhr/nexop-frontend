"use client";
import { useSearchParams } from "next/navigation";
import { PaymentController } from "../../Payment/PaymentController";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const amount = parseFloat(searchParams.get("amount") || "20");
  const email = searchParams.get("email") || "";

  const handlePaymentSuccess = async () => {
    // Redirect to confirm order page
    window.location.href = "/confirm-order";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-6">Complete Your Payment</h1>
        <PaymentController
          amount={amount}
          email={email}
          onPaymentSuccess={handlePaymentSuccess}
        />
      </div>
    </div>
  );
}
