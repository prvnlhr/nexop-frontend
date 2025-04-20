export interface AttributeData {
  name: string;
  categoryId: number;
  isFilterable: boolean;
  displayOrder: number;
}

export interface AttributeOptionData {
  value: string;
}

export interface CreateAttributePayload {
  attributeData: AttributeData;
  attributeOptions: string[];
}

interface AttributeCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Attribute {
  id: number;
  name: string;
  categoryId: number;
  isFilterable: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  optionsCount?: number;
  category?: AttributeCategory;
}

export interface AttributeOption {
  id: number;
  value: string;
  attributeId: number;
  createdAt: string;
  selected?: boolean;
}

export interface AttributeWithOptions extends Attribute {
  options: AttributeOption[];
}

export interface UpdateAttributeOptionsPayload {
  attributeId: number;
  options: string[];
  name?: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface AttributeItem {
  id: number;
  name: string;
  displayOrder: number;
  isFilterable: boolean;
  optionsCount: number;
  category: Category;
}
