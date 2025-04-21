export interface ProductDetails {
  id: number;
  name: string;
  categoryId: number;
  categoryName: string;
  basePrice: number;
  brand: string;
  description: string | null;
  existingVariantsCount: number;
}

export interface AttributeOption {
  id: number;
  value: string;
  selected: boolean;
}

export interface Attribute {
  id: number;
  name: string;
  options: AttributeOption[];
}

export interface VariantAttribute {
  attributeId: number;
  attributeName: string;
  optionId: number;
  optionValue: string;
}

export interface Variant {
  id?: number;
  sku: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  status: "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";
  attributes: VariantAttribute[];
}

export interface ProductVariantData {
  product: ProductDetails;
  attributes: Attribute[];
  variants: Variant[];
}

export interface GeneratedVariant {
  sku: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  status: "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";
  attributes: VariantAttribute[];
}
