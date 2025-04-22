import { FormattedProduct } from "@/types/storefront/productPageListType";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductListProps {
  products: FormattedProduct[];
}
const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="w-full h-full flex items-center justify-center p-[20px]">
      <div
        className="w-[100%] h-[100%] grid grid-cols-2 md:grid-cols-5 gap-[30px] overflow-y-scroll"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((prod, pId) => (
          <Link
            href={`${prod.category?.slug}/${prod.slug}`}
            key={pId}
            className="w-auto h-auto mb-[20px] flex flex-col self-start bg-white 
            shadow-[0px_3px_5px_rgba(0,0,0,0.04)]
            hover:shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]
            border border-black/10
            rounded"
          >
            <div className="w-full aspect-[1/1.1] p-[8px]">
              <div className="relative w-full h-full bg-[#EFF1F3] overflow-hidden rounded">
                {prod.thumbnail && (
                  <Image
                    fill={true}
                    priority={true}
                    src={prod.thumbnail}
                    alt={prod.name}
                    sizes="100%"
                    className="object-contain"
                  />
                )}
              </div>
            </div>
            <div className="w-full h-[auto] grid grid-rows-[auto_auto_auto] p-[10px]">
              <div className="w-full h-auto flex items-center">
                <p className="text-[0.8rem] font-medium  line-clamp-2">
                  {prod.name}
                </p>
              </div>

              <div className="w-full h-auto flex items-center my-[10px]">
                <p className="text-[0.7rem] font-medium">
                  ₹ {prod.minPrice}
                  <span className="text-[0.65rem] text-[#667085] line-through ml-[5px]">
                    MRP : ₹9096.45
                  </span>
                  <span className=" text-[0.65rem] ml-[5px]">11% Off</span>
                </p>
              </div>

              <div className="w-full h-auto flex items-center">
                <div className="w-auto h-[20px] flex items-center justify-center bg-[#EFF1F3] rounded">
                  <div className="h-full aspect-square flex items-center justify-center">
                    <Icon
                      icon="solar:star-bold"
                      className="w-[50%] h-[50%] text-[#FDB022]"
                    />
                  </div>
                  <div className="h-full flex-1 flex items-center justify-center text-[0.65rem] px-[5px]">
                    4.5
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
