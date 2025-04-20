import ProductAddForm from "@/components/Admin/Pages/Product/ProductAddForm";
import { fetchAttributesByCategory } from "@/lib/services/admin/attributeServices";
import { getCategories } from "@/lib/services/admin/categoryServices";
import { Category } from "@/types/categoryTypes";
import React from "react";
import { AttributeWithOptions } from "@/types/attributeTypes";
type SearchParams = Promise<{ [key: string]: string | undefined }>;

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { categoryId } = await searchParams;
  let attributes: AttributeWithOptions[] | undefined;
  if (categoryId) {
    attributes = await fetchAttributesByCategory(+categoryId);
  }
  const categories: Category[] = await getCategories();
  return (
    <ProductAddForm
      attributes={attributes}
      categories={categories}
      product={undefined}
    />
  );
};

export default page;
