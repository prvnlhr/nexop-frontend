const BASE_URL: string = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export async function getCheckOutDetails(
  userId: string,
  queryParams: { [key: string]: string } = {}
) {
  try {
    const url = new URL(`${BASE_URL}/api/storefront/checkout/${userId}`);

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
        errorData.error || errorData.message || "Failed to get checkout details"
      );
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Add to Cart Error:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to get checkout details");
  }
}
