import { CheckoutData } from "@/types/storefront/checkoutTypes";

const BASE_URL: string = process.env.NEXT_PUBLIC_API_BASE_URL!;

interface CreateOrderPayload {
  userId: string;
  email: string;
  address: {
    houseBuilding: string;
    roadArea: string;
    city: string;
    state: string;
    postalCode?: string;
  };
  paymentId: string;
  checkoutData: CheckoutData;
  queryParams: {
    type: string;
    product_id?: string;
    variant_id?: string;
  };
}

interface OrderResponse {
  id: string;
  userId: string;
  addressId: string;
  totalAmount: number;
  status: string;
  paymentId: string;
  items: {
    id: string;
    productId: number;
    variantId?: number;
    quantity: number;
    price: number;
  }[];
  createdAt: string;
}

export async function createOrder(
  payload: CreateOrderPayload
): Promise<OrderResponse> {
  try {
    const response = await fetch(`${BASE_URL}/api/storefront/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Create Order Error:", result.error || result.message);
      throw new Error(
        result.error || result.message || "Failed to create order"
      );
    }

    console.log("Create Order Success:", result.message);
    return result.data;
  } catch (error) {
    const err = error as Error;
    console.error("Create Order Error:", err);
    throw new Error(`Failed to create order: ${err.message}`);
  }
}
