import CategoryAddForm from "@/components/Admin/Pages/Category/CategoryAddForm";
import { getCategories } from "@/lib/services/admin/categoryServices";
import { Category } from "@/types/categoryTypes";
import React from "react";

const page = async () => {
  const categories: Category[] = await getCategories();
  return <CategoryAddForm categories={categories} />;
};

export default page;
