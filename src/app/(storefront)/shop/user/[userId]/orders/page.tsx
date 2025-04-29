import OrdersPage from "@/components/StoreFront/Pages/Order/OrdersPage";
import { fetchUserOrders } from "@/lib/services/storefront/orderServices";
import { OrderListResponse } from "@/types/storefront/orderTypes";
import React from "react";

type Params = Promise<{ userId: string }>;

const page = async ({ params }: { params: Params }) => {
  const { userId } = await params;
  const userOrders: OrderListResponse[] = await fetchUserOrders(userId);
  return <OrdersPage userOrders={userOrders} />;
};

export default page;
