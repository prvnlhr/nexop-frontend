import React from "react";
import CategoriesTable from "./CategoriesTable";
import Link from "next/link";

const CategoryPage = () => {
  return (
    <div className="w-full h-[100%] flex flex-col items-center justify-center p-[20px]">
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
        <CategoriesTable />
      </div>
    </div>
  );
};

export default CategoryPage;
