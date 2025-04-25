import CheckoutPage from "@/components/StoreFront/Pages/Checkout/CheckoutPage";
import { getCheckOutDetails } from "@/lib/services/storefront/checkoutServices";
import { CheckoutData } from "@/types/storefront/checkoutTypes";
import React from "react";

interface CheckoutParams {
  userId: string;
}

type Params = Promise<CheckoutParams>;

const page = async ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const queryParams = await searchParams;
  const { userId } = await params;
  const checkoutData: CheckoutData = await getCheckOutDetails(
    userId,
    queryParams
  );
  console.log(" checkoutData:", checkoutData);
  return <CheckoutPage checkoutData={checkoutData} />;
};

export default page;
