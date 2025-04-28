import {
  AttributeResponse,
  CategoryResponse,
} from "@/types/storefront/productPageListType";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface SidebarProps {
  attributes?: AttributeResponse[];
  categories?: CategoryResponse[];
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  attributes,
  categories,
  toggleSidebar,
}) => {
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
    <div className="w-[100%] h-full">
      <div className="w-[100%] h-[100%] flex flex-col">
        <div className="w-full h-[30px] flex items-center justify-end border-b md:border-transparent border-black/5">
          <button
            onClick={toggleSidebar}
            className="h-[100%] w-auto flex md:hidden items-center justify-center"
          >
            <Icon icon="ic:sharp-menu" className="h-[80%]" />
          </button>
        </div>
        <div className="w-full h-[30px] flex items-center justify-between border-b border-black/10 p-[20px]">
          <p className="text-[0.8rem] font-semibold">
            {(attributes?.length as number) > 0 ? "FILTERS" : "CATEGORIES"}
          </p>
        </div>
        <div
          className="w-full h-[calc(100%-30px)] flex flex-col overflow-y-scroll px-[20px] py-[10px]"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {attributes && attributes.length > 0 ? (
            attributes.map((attr) => (
              <div key={attr.id} className="w-full h-auto flex flex-col">
                <div className="w-full h-[40px] flex items-center border-b border-black/10 mb-[5px]">
                  <p className="text-[0.78rem] font-semibold">
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
                      className="h-full aspect-square p-[6px] flex items-center justify-center cursor-pointer"
                    >
                      <div
                        className={`w-full h-full  rounded transition-colors flex items-center justify-center p-[2px] border border-black/40`}
                      >
                        <div
                          className={`w-[100%] h-[100%] rounded-[2px]   ${
                            isOptionSelected(attr.id, option.id)
                              ? "bg-[#635DB0]"
                              : "bg-[#EFF1F3]"
                          } `}
                        ></div>
                      </div>
                    </button>
                    <div className="h-full flex-1 flex items-center">
                      <p className="text-[0.72rem] font-medium ml-[5px]">
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
                  href={`/shop/categories/${category.slug}/products`}
                  className="w-full h-[40px] flex items-center border-red-400"
                >
                  <p className="text-[0.78rem] font-medium">
                    {category.name.toUpperCase()}
                  </p>
                  <Icon
                    icon="line-md:chevron-right"
                    className="w-[10px] h-[10px] ml-[5px]"
                  />
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
