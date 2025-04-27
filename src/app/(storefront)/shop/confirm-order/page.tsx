import { Suspense } from "react";
import Link from "next/link";

function ConfirmOrderContent() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100">
      <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
      <p>Thank you for your purchase.</p>
      <Link href="/" className="mt-4 text-blue-500 underline">
        Back to Home
      </Link>
    </div>
  );
}

export default function ConfirmOrder() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmOrderContent />
    </Suspense>
  );
}
