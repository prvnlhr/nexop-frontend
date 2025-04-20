"use client";
import React, { useEffect } from "react";
import VariantManagement from "./VariantManagement/VariantManagement";
import VariantEditForm from "./VariantManagement/VariantEditForm";
import { Product } from "@/types/productType";
import { useVariantContext } from "@/context/VariantContext";
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
  const { setAttributes, setProductVariants } = useVariantContext();

  useEffect(() => {
    setAttributes(attributes);
    setProductVariants(variants);
  }, [attributes, variants, setAttributes, setProductVariants]);

  return (
    <div className="w-full h-full flex p-[20px]">
      <div
        className="w-[70%] overflow-y-scroll"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <VariantManagement
          selectedCategory={product.category}
          product={product}
        />
      </div>
      <div className="w-[30%] h-full boder">
        <VariantEditForm />
      </div>
    </div>
  );
};

export default ManageVariantsForm;
