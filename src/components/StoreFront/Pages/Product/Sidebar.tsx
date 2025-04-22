import {
  AttributeResponse,
  CategoryResponse,
} from "@/types/storefront/productPageListType";
import Link from "next/link";
import React from "react";

interface SidebarProps {
  attributes?: AttributeResponse[];
  categories?: CategoryResponse[];
}

const Sidebar: React.FC<SidebarProps> = ({ attributes, categories }) => {
  return (
    <div className="w-[100%] h-full p-[20px] ">
      <div className="w-[100%] h-[100%] flex flex-col ">
        <div className="w-full h-[30px] flex items-center ">
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
              <div key={attr.id} className="w-full h-auto flex flex-col ">
                <div className="w-full h-[40px] flex items-center  border-red-400">
                  <p className="text-[0.7rem] font-medium">
                    {attr.name.toUpperCase()}
                  </p>
                </div>
                {attr.options.map((option) => (
                  <div
                    key={option.id}
                    className="w-full h-[30px] flex  border-green-400"
                  >
                    <div className="h-full aspect-square p-[6px]">
                      <div className="w-full h-full bg-[#EFF1F3] border border-black/10 rounded"></div>
                    </div>
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
