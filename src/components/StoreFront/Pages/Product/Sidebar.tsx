import {
  AttributeResponse,
  CategoryResponse,
} from "@/types/storefront/productPageListType";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface SidebarProps {
  attributes?: AttributeResponse[];
  categories?: CategoryResponse[];
}

const Sidebar: React.FC<SidebarProps> = ({ attributes, categories }) => {
  const searchParams = useSearchParams();
  const { categorySlug } = useParams();
  const router = useRouter();

  const handleOptionClick = (attributeId: number, optionId: number) => {
    const params = new URLSearchParams(searchParams);
    const paramKey = `attr_${attributeId}`;
    const currentValues = params.getAll(paramKey);

    // Toggle the option - add if not present, remove if present
    if (currentValues.includes(optionId.toString())) {
      // Remove this option
      const newValues = currentValues.filter((v) => v !== optionId.toString());
      params.delete(paramKey); // Remove all existing values
      newValues.forEach((v) => params.append(paramKey, v)); // Add back remaining values
    } else {
      // Add this option
      params.append(paramKey, optionId.toString());
    }

    router.push(
      `/shop/categories/${categorySlug}/products?${params.toString()}`
    );
  };

  const isOptionSelected = (attributeId: number, optionId: number) => {
    return searchParams
      .getAll(`attr_${attributeId}`)
      .includes(optionId.toString());
  };

  return (
    <div className="w-[100%] h-full p-[20px]">
      <div className="w-[100%] h-[100%] flex flex-col">
        <div className="w-full h-[30px] flex items-center">
          <p className="text-[0.8rem] font-semibold">
            {/* {attributes === "attributes" ? "FILTERS" : "CATEGORIES"} */}
          </p>
        </div>
        <div
          className="w-full h-[calc(100%-30px)] flex flex-col p-[10px] overflow-y-scroll"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {attributes && attributes.length > 0 ? (
            attributes.map((attr) => (
              <div key={attr.id} className="w-full h-auto flex flex-col">
                <div className="w-full h-[40px] flex items-center border-red-400">
                  <p className="text-[0.7rem] font-medium">
                    {attr.name.toUpperCase()}
                  </p>
                </div>
                {attr.options.map((option) => (
                  <div
                    key={option.id}
                    className="w-full h-[30px] flex border-green-400"
                  >
                    <button
                      onClick={() => handleOptionClick(attr.id, option.id)}
                      className="h-full aspect-square p-[6px] cursor-pointer"
                    >
                      <div
                        className={`w-full h-full border rounded transition-colors ${
                          isOptionSelected(attr.id, option.id)
                            ? "bg-[#444444] border-transparent"
                            : "bg-[#EFF1F3] border-black/10"
                        }`}
                      ></div>
                    </button>
                    <div className="h-full flex-1 flex items-center">
                      <p className="text-[0.7rem] font-medium ml-[5px]">
                        {option.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : categories && categories.length > 0 ? (
            categories.map((category) => (
              <div key={category.id} className="w-full h-auto flex flex-col">
                <Link
                  href={`products?category=${category.slug}&categoryId=${category.id}`}
                  className="w-full h-[40px] flex items-center border-red-400"
                >
                  <p className="text-[0.7rem] font-medium">
                    {category.name.toUpperCase()}
                  </p>
                </Link>
              </div>
            ))
          ) : (
            <p>No content</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
