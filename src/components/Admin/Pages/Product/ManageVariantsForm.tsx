"use client";
import React from "react";
// import VariantManagement from "./VariantManagement/VariantManagement";
// import VariantEditForm from "./VariantManagement/VariantEditForm";
import { Product } from "@/types/productType";
// import { useVariantContext } from "@/context/VariantContext";
import { Attribute, ProductVariant } from "@/types/variantType";

interface ManageVariantsFormProps {
  product: Product;
  attributes: Attribute[];
  variants: ProductVariant[];
}
const ManageVariantsForm: React.FC<ManageVariantsFormProps> = ({
  product,
  attributes,
  variants,
}) => {
  console.log(" variants:", variants);
  console.log(" attributes:", attributes);
  console.log(" product:", product);

  return (
    <div className="w-full h-full flex p-[20px]">
      <div className="w-full h-full border border-black/10 rounded">
        <div className="w-full h-[40px] border">
          
        </div>
        <div className="w-full h-auto border"></div>
      </div>
    </div>
  );
};

export default ManageVariantsForm;
