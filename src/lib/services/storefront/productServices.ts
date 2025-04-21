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

export async function getProductById(
  productId: string,
  attributeId?: string,
  optionId?: string
) {
  try {
    const url = new URL(
      `${BASE_URL}/api/storefront/products/details/${productId}`
    );
    if (attributeId && optionId) {
      url.searchParams.append("attributeId", attributeId);
      url.searchParams.append("optionId", optionId);
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error ||
          errorData.message ||
          "Failed to fetch product details"
      );
    }

    const result = await response.json();

    // Type guard for valid response
    if (!result.data || !result.data.id) {
      throw new Error("Invalid product details response format");
    }

    return result.data;
  } catch (error) {
    console.error("Fetch Product By ID Error:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to fetch product details");
  }
}
