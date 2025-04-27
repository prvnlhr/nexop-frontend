export interface AttributeOption {
  id: number;
  value: string;
  selected: boolean;
}

export interface Attribute {
  id: number;
  name: string;
  isFilterable: boolean;
  displayOrder: number;
  options: AttributeOption[];
}

// --------------------------------------------------------------

export interface Product {
  id: number;
  name: string;
  categoryId: number;
  categoryName?: string;
  basePrice: number;
}

// --------------------------------------------------------------

export interface VariantImage {
  id: number;
  url: string;
  order: number;
  publicId?: string;
}

export interface VariantAttribute {
  attributeId: number;
  attributeName: string;
  optionId: number;
  optionValue: string;
}

export interface ProductVariant {
  id?: number;
  sku: string;
  price: number;
  stock: number;
  status: "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";
  images: VariantImage[];
  attributes: VariantAttribute[];
}

// File: frontend/types/variantTypes.ts

// Interface for the full variant object
export interface CreateVariantPayload {
  attributes: VariantAttribute[];
  images: VariantImage[];
  newImages: File[];
  price: number;
  productId: number;
  sku: string;
  status: "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";

  stock: number;
}

export interface EditVariantPayload {
  id?: number;
  sku: string;
  price: number;
  stock: number;
  status: "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";
  images: {
    id?: number;
    url: string;
    order: number;
  }[];
  newImages: File[];
  productId: number;
}

export interface ProcessedVariantPayload {
  id?: number;
  sku: string;
  price: number;
  stock: number;
  status: "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";
  images: {
    url: string;
    publicId: string;
    order: number;
  }[];
  productId: number;
}
