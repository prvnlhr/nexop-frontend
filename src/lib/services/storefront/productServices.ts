import { ProductsResponse } from "@/types/storefront/productTypes";

const BASE_URL: string = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// Service Function
export async function fetchProductsByCategory(
  categoryId: string
): Promise<ProductsResponse> {
  try {
    const response = await fetch(
      `${BASE_URL}/api/storefront/products/${categoryId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || errorData.message || "Failed to fetch products"
      );
    }

    const result = await response.json();

    // Type guard for valid response
    if (!result.data || !result.data.type) {
      throw new Error("Invalid response format");
    }

    return result.data as ProductsResponse;
  } catch (error) {
    console.error("Fetch Products Error:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to fetch products");
  }
}
