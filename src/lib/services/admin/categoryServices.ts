import { revalidateTagHandler } from "@/lib/revalidation";

const BASE_URL: string = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export interface CategoryData {
  name: string;
  parentId?: number | null;
}

export async function createCategory(categoryData: CategoryData) {
  try {
    console.log(categoryData);
    const response = await fetch(`${BASE_URL}/api/admin/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Create Category Error:", result.error || result.message);
      throw new Error(
        result.error || result.message || "Failed to create category"
      );
    }

    console.log("Create Category Success:", result.message);
    await revalidateTagHandler("categories");
    return result.data;
  } catch (error) {
    const err = error as Error;
    console.error("Create Category Error:", error);
    throw new Error(`Failed to create category: ${err.message}`);
  }
}

export async function getCategories() {
  try {
    const response = await fetch(`${BASE_URL}/api/admin/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["categories"],
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Get Categories Error:", result.error || result.message);
      throw new Error(
        result.error || result.message || "Failed to fetch categories"
      );
    }

    return result.data;
  } catch (error) {
    const err = error as Error;
    console.error("Get Categories Error:", error);
    throw new Error(`Failed to fetch categories: ${err.message}`);
  }
}
