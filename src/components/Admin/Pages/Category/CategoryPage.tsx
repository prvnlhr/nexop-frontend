import React from "react";
import CategoriesTable from "./CategoriesTable";
import Link from "next/link";
import { Category } from "@/types/categoryTypes";
import DeleteModal from "@/components/Modals/DeleteModal";

interface CategoryPageProps {
  categories: Category[];
  modal: string;
  categoryId: string;
}
const CategoryPage: React.FC<CategoryPageProps> = ({
  categories,
  modal,
  categoryId,
}) => {
  console.log(" categoryId:", categoryId);

  return (
    <div className="relative w-full h-[100%] flex flex-col items-center justify-center p-[20px]">
      {modal === "delete" && <DeleteModal />}

      <div className="w-full h-[50px] flex items-center justify-between">
        <p className="text-[0.8rem] font-medium">ALL CATEGORIES</p>
        <Link
          href={"categories/add"}
          className="w-auto h-auto px-[10px] py-[5px] bg-[#625DAF] text-[0.75rem] text-white"
        >
          Add Category
        </Link>
      </div>
      <div className="w-full h-[calc(100%-50px)] flex items-start">
        <CategoriesTable categories={categories} />
      </div>
    </div>
  );
};

export default CategoryPage;
