import { revalidateTagHandler } from "@/lib/revalidation";

// types/storefront/cartTypes.ts
export interface CartItem {
  id: string;
  productId: number;
  variantId?: number;
  quantity: number;
  price: number;
  productName: string;
  variantName?: string;
  image?: string;
}

export interface CartResponse {
  id: string;
  items: CartItem[];
}

export interface CartOperationRequest {
  userId: string;
  productId: number;
  variantId?: number;
  quantity?: number;
}

const BASE_URL: string = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// Service Functions
export async function addToCart(
  request: CartOperationRequest
): Promise<CartItem> {
  try {
    const response = await fetch(`${BASE_URL}/api/storefront/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: request.userId,
        productId: request.productId,
        variantId: request.variantId,
        quantity: request.quantity || 1,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || errorData.message || "Failed to add item to cart"
      );
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Add to Cart Error:", error);
    throw error instanceof Error ? error : new Error("Failed to add to cart");
  }
}

export async function updateCartItem(
  request: CartOperationRequest
): Promise<CartItem> {
  try {
    if (!request.quantity) {
      throw new Error("Quantity is required for update");
    }

    const response = await fetch(`${BASE_URL}/api/storefront/cart/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: request.userId,
        productId: request.productId,
        variantId: request.variantId,
        newQuantity: request.quantity,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || errorData.message || "Failed to update cart item"
      );
    }

    const result = await response.json();
    await revalidateTagHandler("cart");
    return result.data;
  } catch (error) {
    console.error("Update Cart Error:", error);
    throw error instanceof Error ? error : new Error("Failed to update cart");
  }
}

export async function removeFromCart(
  request: Omit<CartOperationRequest, "quantity">
): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/api/storefront/cart/remove`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: request.userId,
        productId: request.productId,
        variantId: request.variantId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || errorData.message || "Failed to remove from cart"
      );
    }
  } catch (error) {
    console.error("Remove from Cart Error:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to remove from cart");
  }
}

export async function getCart(userId: string): Promise<CartResponse> {
  try {
    const response = await fetch(`${BASE_URL}/api/storefront/cart/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["cart"],
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || errorData.message || "Failed to fetch cart"
      );
    }

    const result = await response.json();

    // Return empty cart if no data
    if (!result.data) {
      return { id: "", items: [] };
    }

    return result.data;
  } catch (error) {
    console.error("Get Cart Error:", error);
    throw error instanceof Error ? error : new Error("Failed to fetch cart");
  }
}

// Utility function for cart operations
export async function modifyCartItem(
  action: "add" | "update" | "remove",
  request: CartOperationRequest
): Promise<CartItem | void> {
  switch (action) {
    case "add":
      return addToCart(request);
    case "update":
      return updateCartItem(request);
    case "remove":
      return removeFromCart(request);
    default:
      throw new Error("Invalid cart operation");
  }
}
