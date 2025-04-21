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
  active?: string;
}

export interface ProductAttribute {
  id: number;
  name: string;
  isFilterable: boolean;
  options: AttributeOption[];
  displayOrder?: number;
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

// Interface for a variant attribute
export interface VariantAttribute {
  attributeId: number;
  attributeName: string;
  optionId: number;
  optionValue: string;
}

export interface ProductImage {
  id: number;
  url: string;
  altText: string | null;
  isThumbnail: boolean;
  order: number;
}

export interface ProductVariant {
  id: number;
  sku: string;
  price: number;
  stock: number;
  attributes: VariantAttribute[];
  images: ProductImage[];
}

export interface ProductDetails {
  id: number;
  name: string;
  slug: string | null;
  description: string;
  brand: string;
  basePrice: number;
  images: ProductImage[];
  attributes: ProductAttribute[];
  variants: ProductVariant[];
  category: Category;
  selectedVariant: {
    id: number;
    price: number;
    sku: string;
    stock: number;
    attributes: VariantAttribute[];
  } | null;
}
