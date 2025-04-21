import { ProductDetails } from "@/types/variantsNewTypes";
import React from "react";
interface ProductDetailsCardProps {
  product: ProductDetails;
}
const ProductDetailsCard: React.FC<ProductDetailsCardProps> = ({ product }) => {
  return (
    <>
      <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] px-[10px] border-b border-[#D0D5DD]">
        <p className="text-[0.8rem] font-medium ">
          PRODUCT DETAILS - READ ONLY
        </p>
      </div>
      <div className="w-full h-auto  grid grid-cols-2 grid-rows-[80px_80px] gap-2 p-[10px]">
        <div className="w-full h-full ">
          <div className="w-full h-[40px] flex items-center">
            <p className="text-[0.9rem] font-medium">NAME</p>
          </div>
          <div className="w-full h-[40px] flex items-center border-b border-[#D0D5DD]">
            <p className="text-[0.8rem] font-medium">{product.name}</p>
          </div>
        </div>
        <div className="w-full h-full">
          <div className="w-full h-[40px] flex items-center ">
            <p className="text-[0.9rem] font-medium">BRAND</p>
          </div>
          <div className="w-full h-[40px] flex items-center border-b border-[#D0D5DD]">
            <p className="text-[0.8rem] font-medium">{product.brand}</p>
          </div>
        </div>
        <div className="w-full h-full">
          <div className="w-full h-[40px] flex items-center">
            <p className="text-[0.9rem] font-medium">CATEGORY</p>
          </div>
          <div className="w-full h-[40px] flex items-center border-b border-[#D0D5DD]">
            <p className="text-[0.8rem] font-medium">{product.categoryName}</p>
          </div>
        </div>
        <div className="w-full h-full">
          <div className="w-full h-[40px] flex items-center">
            <p className="text-[0.9rem] font-medium">BASE PRICE (₹)</p>
          </div>
          <div className="w-full h-[40px] flex items-center border-b border-[#D0D5DD]">
            <p className="text-[0.8rem] font-medium">{product.basePrice}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsCard;
