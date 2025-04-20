export interface ProductImage {
  id: number;
  url: string;
  isThumbnail: boolean;
  order: number;
  productId: number;
  createdAt: string;
}

export interface Category {
  id: number;
  name: string;
  parentId: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  brand: string;
  basePrice: number;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
  images: ProductImage[];
  existingVariantsCount: number;
}
