import ProductAddForm from "@/components/Admin/Pages/Product/ProductAddForm";
import { fetchAttributesByCategory } from "@/lib/services/admin/attributeServices";
import { getCategories } from "@/lib/services/admin/categoryServices";
import { getProductById } from "@/lib/services/admin/productServices";
import { AttributeWithOptions } from "@/types/attributeTypes";
import { Category } from "@/types/categoryTypes";
import { Product } from "@/types/productType";
import React from "react";
type Params = Promise<{ productId: string }>;

const page = async ({ params }: { params: Params }) => {
  const { productId } = await params;
  const product: Product = await getProductById(productId);
  const categories: Category[] = await getCategories();
  const attributes: AttributeWithOptions[] = await fetchAttributesByCategory(
    product.categoryId
  );
  return (
    <ProductAddForm
      categories={categories}
      attributes={attributes}
      product={product}
    />
  );
};

export default page;
