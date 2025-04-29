import OrderConfirmationPage from "@/components/StoreFront/Pages/Order/OrderConfirmationPage";
import React from "react";

interface OrderConfirmParams {
  userId: string;
}
type Params = Promise<OrderConfirmParams>;

interface OrderItem {
  productId?: string;
  variantId?: string;
  name?: string;
  price?: number;
  image?: string;
}

interface OrderDetails {
  orderId: string;
  amount: number;
  date: string;
  email: string;
  shippingAddress: {
    line1: string;
    city: string;
    state: string;
    country: string;
    postal_code?: string;
  };
  items: OrderItem[];
}

const page = async ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const { details } = await searchParams;
  const orderDetails: OrderDetails = JSON.parse(decodeURIComponent(details));
  const { userId } = await params;

  return <OrderConfirmationPage orderDetails={orderDetails} userId={userId} />;
};

export default page;
