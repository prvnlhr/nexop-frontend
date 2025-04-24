"use client";

import { fetchCategories } from "@/lib/services/storefront/categoryServices";
import { CategoryNode } from "@/types/storefront/categories";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const NavigationBar = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [categories, setCategories] = useState<CategoryNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  useEffect(() => {
    async function loadCategories() {
      try {
        setLoading(true);
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load categories"
        );
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, [categoryId]);

  const handleOptionClicked = (
    categorySlug: string,
    subcategory: string,
    optionSlug: string,
    optionId: number
  ) => {
    console.log(categorySlug, subcategory, optionSlug, optionId);
  };

  if (loading)
    return (
      <div className="relative w-full h-[40px] flex items-center justify-center border-b border-black/10 z-50">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="w-[auto] px-[10px] h-[100%] mx-[2px] flex items-center justify-center"
          >
            <div className="w-[auto] h-[80%] flex items-center border-b-2 border-transparent hover:border-b-2 hover:border-black">
              <div className="h-[15px] w-[80px] bg-[#dddddd] rounded px-[20px] animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    );
  if (error)
    return (
      <div className="w-full h-[40px] flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );

  return (
    <div className="relative w-full h-[40px] flex items-center justify-center border-b border-black/10 z-50">
      {/* <div className="w-auto h-full flex items-center justify-center">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className="w-[auto] px-[10px] h-[100%] mx-[2px] flex items-center justify-center"
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div
              className="
              w-[auto] h-[100%] flex items-center 
              border-b-[2px] border-t-[2px] border-transparent hover:border-t-transparent hover:border-b-[2px] hover:border-[#1c3553]"
            >
              <p className="text-[0.8rem] font-medium cursor-pointer">
                {category.name}
              </p>
            </div>
            {activeIndex === index && (
              <div
                className="
                absolute w-[90%] h-[auto] 
                rounded border border-black/10 
                top-[calc(100%)] left-0 right-0 ml-auto mr-auto 
                flex justify-center
               bg-white pt-[20px] pb-[20px]"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {category.children.map((subcategory) => (
                  <div
                    className="w-[auto] h-[auto] py-[2px] px-[30px] mx-[1px]"
                    key={subcategory.id}
                  >
                    <div className="w-full h-[40px] flex items-center">
                      <Link
                        // href={`/shop/products/?category=${encodeURIComponent(
                        //   subcategory.slug
                        // )}&categoryId=${subcategory.id}`}
                        href={`/shop/products/${subcategory.slug}`}
                        className="w-auto h-[auto] py-[5px] flex items-center"
                      >
                        <div className="w-auto h-auto flex items-center justify-center">
                          <div className="h-full flex-1 flex items-center">
                            <p className="text-[0.75rem] tracking-[2px] font-semibold cursor-pointer">
                              {subcategory.name.toUpperCase()}
                            </p>
                          </div>
                          <div className="h-[30px] aspect-square flex items-center justify-center"></div>
                        </div>
                      </Link>
                    </div>
                    <div className="w-full h-[auto] mt-[2px]">
                      {subcategory.children.map((item) => (
                        <Link
                          // href={`/shop/products/?category=${encodeURIComponent(
                          //   item.slug
                          // )}&categoryId=${item.id}`}
                          href={`/shop/products/${item.slug}`}
                          onClick={() =>
                            handleOptionClicked(
                              category.slug,
                              subcategory.slug,
                              item.slug,
                              item.id
                            )
                          }
                          key={item.id}
                          className="w-full h-[30px] text-[0.7rem] flex items-center"
                        >
                          <p className="text-[0.75rem] text-gray-500 font-medium cursor-pointer hover:text-[#635DB0]">
                            {item.name}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default NavigationBar;
