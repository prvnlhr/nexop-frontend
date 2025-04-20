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
