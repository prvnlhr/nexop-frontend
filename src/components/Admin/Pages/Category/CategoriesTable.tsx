import React from "react";
import { Icon } from "@iconify/react";
import { Category } from "@/types/categoryTypes";
import Link from "next/link";

interface CategoriesTableProps {
  categories: Category[];
}
const CategoriesTable: React.FC<CategoriesTableProps> = ({ categories }) => {
  const columns = ["Name", "Parent Category", "Action"];

  return (
    <div
      className="w-full h-full overflow-auto bg-white border-y border-[#D0D5DD]"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <table className="min-w-full border-collapse">
        <colgroup>
          <col className="w-[50%]" />
          <col className="w-[50%]" />
          <col className="w-auto" />
        </colgroup>
        {/* Table Head */}
        <thead className="bg-[#F7F7F7] sticky top-0 z-10 border-b-[1px] border-t-[#D0D5DD]">
          <tr className="text-left text-[#1C3553] text-[0.8rem]">
            {columns.map((col) => (
              <th
                key={col}
                className="px-4 py-2 capitalize whitespace-nowrap border-x border-[#D0D5DD]"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {categories.map((category, index) => (
            <tr key={index} className="hover:bg-[#F7FAFE] text-[0.8rem]">
              {/* Name */}
              <td className="px-4 py-2 h-[50px] border border-[#D0D5DD] text-[#1C3553] overflow-hidden">
                <div className="flex items-center max-w-[300px]">
                  <p className="font-medium truncate">{category.name}</p>
                </div>
              </td>

              {/* Parent Category */}
              <td className="px-4 py-2 whitespace-nowrap  border border-[#D0D5DD] text-[#1C3553] font-medium">
                {category.name || "-"}
              </td>

              {/* Action */}
              <td className="px-4 py-2 whitespace-nowrap border border-[#D0D5DD] text-[#1C3553]">
                <div className="w-full h-full flex items-center">
                  <Link
                    href={`categories/edit/${category.id}`}
                    className="w-auto h-[30px] border flex items-center mr-[10px] rounded cursor-pointer"
                  >
                    <div className="flex-1 h-full flex items-center justify-center pl-[10px] text-[0.7rem] text-[#12B76A]">
                      Edit
                    </div>
                    <div className="h-full aspect-[1/1] flex items-center justify-center">
                      <Icon
                        icon="fluent:edit-32-regular"
                        className="w-[50%] h-[50%]"
                      />
                    </div>
                  </Link>
                  <Link
                    href={`?modal=delete&categoryId=${category.id}`}
                    className="w-auto h-[30px] border flex items-center ml-[10px] rounded cursor-pointer"
                  >
                    <div className="flex-1 h-full flex items-center justify-center pl-[10px] text-[0.7rem] text-[#D92D20]">
                      Delete
                    </div>
                    <div className="h-full aspect-[1/1] flex items-center justify-center">
                      <Icon icon="lucide:trash" className="w-[45%] h-[45%]" />
                    </div>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
