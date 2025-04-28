import React from "react";
import CategoryPage from "@/components/Admin/Pages/Category/CategoryPage";
import { getCategories } from "@/lib/services/admin/categoryServices";
import { Category } from "@/types/categoryTypes";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const { modal, categoryId } = await searchParams;
  const categories: Category[] = await getCategories();
  return (
    <CategoryPage
      categories={categories}
      modal={modal}
      categoryId={categoryId}
    />
  );
};

export default page;
