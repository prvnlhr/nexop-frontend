// const BASE_URL: string = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const BASE_URL: string = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export interface CategoryNode {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  children: CategoryNode[];
}

export interface CategoriesResponse {
  success: boolean;
  data?: {
    categories: CategoryNode[];
  };
  message?: string;
  error?: unknown;
}

export async function fetchCategories(
  categoryId?: string | null
): Promise<CategoryNode[]> {
  try {
    const url = new URL(`${BASE_URL}/api/storefront/categories`);

    if (categoryId) {
      url.searchParams.append("categoryId", categoryId.toString());
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["shopCategories"],
      },
    });

    const result: CategoriesResponse = await response.json();

    if (!response.ok) {
      console.error("Fetch Categories Error:", result.error || result.message);
      throw new Error(
        result.error?.toString() ||
          result.message ||
          "Failed to fetch categories"
      );
    }

    if (!result.data?.categories) {
      throw new Error("No categories data received");
    }
    return result.data.categories;
  } catch (error) {
    const err = error as Error;
    console.error("Fetch Categories Error:", error);
    throw new Error(`Failed to fetch categories: ${err.message}`);
  }
}

// Helper function to get a single category by slug
export async function getCategoryBySlug(
  slug: string
): Promise<CategoryNode | null> {
  try {
    const allCategories = await fetchCategories();
    const findCategory = (categories: CategoryNode[]): CategoryNode | null => {
      for (const category of categories) {
        if (category.slug === slug) return category;
        if (category.children.length > 0) {
          const found = findCategory(category.children);
          if (found) return found;
        }
      }
      return null;
    };
    return findCategory(allCategories);
  } catch (error) {
    console.error("Error finding category by slug:", error);
    return null;
  }
}
