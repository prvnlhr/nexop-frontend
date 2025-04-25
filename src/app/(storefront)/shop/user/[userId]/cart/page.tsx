import CartPage from "@/components/StoreFront/Pages/Cart/CartPage";
import { getCart } from "@/lib/services/storefront/cartServices";
import { Cart } from "@/types/storefront/cartTypes";
import React from "react";

type Params = Promise<{ userId: string }>;

const page = async ({ params }: { params: Params }) => {
  const { userId } = await params;
  const cartItems: Cart = await getCart(userId);

  return <CartPage initialCart={cartItems} />;
};

export default page;
