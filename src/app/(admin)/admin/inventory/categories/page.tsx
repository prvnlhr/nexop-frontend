import CategoryPage from "@/components/Admin/Pages/Category/CategoryPage";
import { getCategories } from "@/lib/services/admin/categoryServices";
import { Category } from "@/types/categoryTypes";
import React from "react";

const page = async () => {
  const categories: Category[] = await getCategories();
  return <CategoryPage categories={categories} />;
};

export default page;
