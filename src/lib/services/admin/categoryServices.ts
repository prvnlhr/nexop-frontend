import { revalidateTagHandler } from "@/lib/revalidation";

const BASE_URL: string =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://nexop-backend.onrender.com/";

export interface CategoryData {
  name: string;
  parentId?: number | null;
}

export async function getCategoryById(categoryId: number) {
  try {
    console.log("categoryId", categoryId);
    const response = await fetch(
      `${BASE_URL}/api/admin/categories/${categoryId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Get Category Error:", result.error || result.message);
      throw new Error(
        result.error || result.message || "Failed to fetch category"
      );
    }

    // console.log(result.data);
    console.log("Get Category Success:", result.message);
    return result.data;
  } catch (error) {
    const err = error as Error;

    console.error("Get Category Error:", error);
    throw new Error(`Failed to fetch category: ${err.message}`);
  }
}

export async function updateCategory(
  categoryId: number,
  categoryData: CategoryData
) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/admin/categories/${categoryId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Update Category Error:", result.error || result.message);
      throw new Error(
        result.error || result.message || "Failed to update category"
      );
    }

    console.log("Update Category Success:", result.message);
    await revalidateTagHandler("categories");
    return result.data;
  } catch (error) {
    const err = error as Error;

    console.error("Update Category Error:", error);
    throw new Error(`Failed to update category: ${err.message}`);
  }
}

export async function createCategory(categoryData: CategoryData) {
  try {
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

    console.log("Get Categories Success:", result.message);
    return result.data;
  } catch (error) {
    const err = error as Error;

    console.error("Get Categories Error:", error);
    throw new Error(`Failed to fetch categories: ${err.message}`);
  }
}
