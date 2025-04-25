// import { ProductsResponse } from "@/types/storefront/productTypes";

const BASE_URL: string = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// Service Function
export async function fetchProductsByCategory(
  categorySlug: string,
  queryParams: { [key: string]: string } = {}
) {
  try {
    const url = new URL(`${BASE_URL}/api/storefront/products/${categorySlug}`);

    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

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

    return result.data;
  } catch (error) {
    console.error("Fetch Products Error:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to fetch products");
  }
}

// ------------------------------------------------------------------------------------------

export async function getProductDetails(
  categorySlug: string,
  productSlug: string,
  queryParams: { [key: string]: string } = {}
) {
  try {
    const url = new URL(
      `${BASE_URL}/api/storefront/products/details/${categorySlug}/${productSlug}`
    );

    // Add query parameters
    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

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
    return result.data;
  } catch (error) {
    console.error("Fetch Product Details Error:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to fetch product details");
  }
}
