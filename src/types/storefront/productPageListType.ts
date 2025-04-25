// Products List ------------------------------------------------

interface CategoryInfo {
  id: number;
  name: string;
  slug: string;
}

interface AttributeOption {
  id: number;
  value: string;
}

export interface AttributeResponse {
  id: number;
  name: string;
  isFilterable: boolean;
  options: AttributeOption[];
}

export interface FormattedProduct {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  brand: string;
  price: number;
  image?: string;
  variantAttributes?: { attributeId: number; optionId: number }[] | null;
  category: CategoryInfo;
}

interface ProductsWithAttributesResponse {
  type: "PRODUCTS_WITH_ATTRIBUTES";
  products: FormattedProduct[];
  attributes: AttributeResponse[];
  category: CategoryInfo;
}

interface ProductsWithSubcategoriesResponse {
  type: "PRODUCTS_WITH_SUBCATEGORIES";
  products: FormattedProduct[];
  categories: CategoryResponse[];
  parentCategory: CategoryInfo;
}

interface NoProductsResponse {
  type: "NO_PRODUCTS";
  message: string;
}

export type ProductsResponse =
  | ProductsWithAttributesResponse
  | ProductsWithSubcategoriesResponse
  | NoProductsResponse;

//  Category -----------------------------------------------------

export interface CategoryResponse {
  id: number;
  name: string;
  slug: string;
  hasProducts: boolean;
  children?: CategoryResponse[];
}

// Product Details ------------------------------------------------

interface Option {
  id: number;
  value: string;
  active: boolean;
}

export interface Attribute {
  id: number;
  name: string;
  options: Option[];
}

interface ProductImage {
  url: string;
  isThumbnail: boolean;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  brand: string;
  description: string;
  category: CategoryInfo;
  images: ProductImage[];
  variantId?: number;
}

interface VariantAttribute {
  attributeId: number;
  attributeName: string;
  optionId: number;
  optionValue: string;
}

interface VariantImage {
  url: string;
  publicId?: string;
  order: number;
}

interface Variant {
  id: number;
  name: string;
  slug: string;
  sku: string;
  price: number;
  stock: number;
  status: "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";
  attributes: VariantAttribute[];
  images: VariantImage[];
}

export interface ProductDetailsData {
  product: Product;
  attributes: Attribute[];
  variants: Variant[];
}
