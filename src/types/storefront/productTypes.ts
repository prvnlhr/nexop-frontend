// Base Types
export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string | null;
  description: string | null;
  brand: string;
  basePrice: number;
  thumbnail?: string;
  minPrice: number;
  status?: "DRAFT" | "PUBLISHED"; // Optional since it might not be needed in frontend
}

export interface AttributeOption {
  id: number;
  value: string;
}

export interface ProductAttribute {
  id: number;
  name: string;
  isFilterable: boolean;
  options: AttributeOption[];
}

export interface Subcategory extends Category {
  hasProducts: boolean;
  children?: Array<Category & { hasProducts: boolean }>;
}

export interface ProductsWithAttributesResponse {
  type: "PRODUCTS_WITH_ATTRIBUTES";
  products: Product[];
  attributes: ProductAttribute[];
  category: Category;
}

export interface ProductsWithSubcategoriesResponse {
  type: "PRODUCTS_WITH_SUBCATEGORIES";
  products: (Product & { category: Category })[];
  categories: Subcategory[];
  parentCategory: Category;
}

export interface NoProductsResponse {
  type: "NO_PRODUCTS";
  message: string;
}

// Response Types
export type ProductsResponse =
  | ProductsWithAttributesResponse
  | ProductsWithSubcategoriesResponse
  | NoProductsResponse;
