"use server";
import { stripe } from "../../lib/stripe";
import Stripe from "stripe";

interface CheckoutSessionParams {
  amount: number;
  email: string;
  shippingAddress: {
    line1: string;
    city: string;
    state: string;
    country: string;
    postal_code?: string;
  };
  userId: string;
  queryParams: {
    type: string;
    product_id?: string;
    variant_id?: string;
  };
}
interface CheckoutSessionResponse {
  id: string;
}

export async function createCheckoutSession({
  amount,
  email,
  userId,
  queryParams,
}: CheckoutSessionParams): Promise<CheckoutSessionResponse> {
  try {
    const query = new URLSearchParams();
    query.append("type", queryParams.type);
    if (queryParams.product_id)
      query.append("product_id", queryParams.product_id);
    if (queryParams.variant_id)
      query.append("variant_id", queryParams.variant_id);
    const cancelUrl = `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/shop/user/${userId}/checkout?${query.toString()}`;

    // Validate inputs
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("Stripe secret key is not configured");
    }
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      throw new Error("Base URL is not configured");
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Invalid email address");
    }
    if (!amount || amount <= 0 || !Number.isInteger(amount)) {
      throw new Error("Invalid amount: must be a positive integer in cents");
    }

    console.log("Creating session with amount:", amount, "email:", email);

    const session: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: email,

        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: { amount: 0, currency: "inr" },
              display_name: "Free Shipping",
              delivery_estimate: {
                minimum: { unit: "business_day", value: 5 },
                maximum: { unit: "business_day", value: 7 },
              },
            },
          },
        ],
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: "Nexop",
              },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        ui_mode: "hosted",
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/confirm-order`,
        cancel_url: cancelUrl,
      });

    console.log("Session created with ID:", session.id);

    return { id: session.id };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error(
      "Stripe error:",
      errorMessage,
      error instanceof Error ? error.stack : undefined
    );
    throw new Error(`Failed to create checkout session: ${errorMessage}`);
  }
}
