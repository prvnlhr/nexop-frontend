const BASE_URL: string = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export async function searchProducts(query: string) {
  const url = new URL(`${BASE_URL}/api/storefront/search`);
  url.searchParams.append("q", query);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || errorData.message || "Failed to fetch search results"
      );
    }

    const result = await response.json();
    console.log("  result.data:", result.data);
    return result.data;
  } catch (error) {
    console.error("Fetch Search Results:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to Fetch Search Results");
  }
}
