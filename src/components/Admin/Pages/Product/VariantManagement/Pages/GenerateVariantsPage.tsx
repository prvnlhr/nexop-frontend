"use client";
import React, { useEffect, useState } from "react";
import { ProductVariantData } from "@/types/variantsNewTypes";
import VariantsTable from "../../NotInUse/VariantsTable";
import AttributesManagement from "../Management/AttributesManagement";
import EditVariantDetailsForm from "../Management/EditVariantDetailsForm";
import ProductDetailsCard from "../Management/ProductDetailsCard";
import VariantImageManagement from "../Management/VariantImageManagement";
import { useVariantManagementContext } from "@/context/VariantManagementContext";
import { createProductVariants } from "@/lib/services/admin/variantServices";

interface GenerateVariantsPageProps {
  productVariantsData: ProductVariantData;
}

const GenerateVariantsPage: React.FC<GenerateVariantsPageProps> = ({
  productVariantsData,
}) => {
  const {
    attributes,
    setProduct,
    generatedVariants,
    generateVariants,
    setVariants,
    setAttributes,
    hasDuplicates,
    colorImages,
    initializeColorImages,
  } = useVariantManagementContext();

  const {
    product: productData,
    attributes: attributesData,
    variants,
  } = productVariantsData;
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Initialize product, attributes, and variants
  useEffect(() => {
    setProduct(productData);
    setAttributes(attributesData);
    setVariants(variants);
  }, [
    productData,
    attributesData,
    variants,
    setProduct,
    setAttributes,
    setVariants,
  ]);

  // Initialize colorImages separately
  useEffect(() => {
    initializeColorImages(variants);
  }, [variants, initializeColorImages]);

  
  const handleSaveVariants = async () => {
    if (hasDuplicates) {
      setError("Please remove all duplicate variants before saving.");
      return;
    }

    const payload = generatedVariants.map((variant) => {
      const colorAttr = variant.attributes.find(
        (attr) => attr.attributeName.toLowerCase() === "color"
      );
      const images =
        colorAttr && colorImages[colorAttr.optionId]
          ? colorImages[colorAttr.optionId].images
              .filter((img) => img.source === "client" && img.file)
              .map((img, index) => ({ file: img.file!, order: index }))
          : [];

      return {
        productId: productData.id,
        name: variant.name,
        slug: variant.slug,
        sku: variant.sku,
        price: variant.price,
        stock: variant.stock,
        status: variant.status,
        attributes: variant.attributes.map((attr) => ({
          attributeId: attr.attributeId,
          optionId: attr.optionId,
        })),
        newImages: images,
      };
    });

    try {
      setError(null);
      setIsLoading(true);
      const res = await createProductVariants(payload);
      console.log("res:", res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex">
      <div className="w-[70%] h-full flex flex-col p-[10px] overflow-y-scroll hide-scrollbar">
        <section className="w-full h-[auto] flex flex-col my-[20px] border rounded border-[#D0D5DD]">
          <ProductDetailsCard product={productData} />
        </section>
        <section className="w-full h-auto border border-[#D0D5DD] rounded">
          <AttributesManagement
            attributes={attributesData}
            pageType="generate"
          />
        </section>
        <section className="w-full h-auto border border-[#D0D5DD] my-[20px] rounded">
          <VariantImageManagement pageType="generate" />
        </section>
        <div className="w-full h-[auto] flex items-center justify-end px-[0px] py-[0px] mb-[20px] border-[#D0D5DD]">
          <button
            onClick={generateVariants}
            disabled={
              !productData ||
              !attributes.some((attr) =>
                attr.options.some((opt) => opt.selected)
              )
            }
            className="w-auto h-auto px-[10px] py-[8px] disabled:bg-gray-400 bg-[#635DB0] text-white text-[0.7rem] cursor-pointer"
          >
            Generate variants
          </button>
        </div>
        {generatedVariants.length > 0 && (
          <section className="w-full h-auto border border-[#D0D5DD] mb-[10px] rounded">
            <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] px-[10px] border-b border-[#D0D5DD]">
              <p className="text-[0.8rem] font-medium">GENERATED VARIANTS</p>
            </div>
            <div className="w-full h-[calc(100%-40px)] p-[8px]">
              <div className="w-full h-[auto] flex items-center justify-end">
                <VariantsTable
                  variants={generatedVariants}
                  product={productData}
                />
              </div>
              <div className="w-full h-[50px] flex items-center justify-end px-[0px] mt-[20px]">
                <button
                  onClick={handleSaveVariants}
                  disabled={generatedVariants.length === 0 || hasDuplicates}
                  className="w-auto h-auto px-[10px] py-[8px] disabled:bg-gray-400 bg-[#635DB0] text-white text-[0.7rem] cursor-pointer"
                >
                  {isLoading ? "Creating..." : "Create Variants"}
                </button>
              </div>
              {error && (
                <div className="w-full h-[40px] flex items-center">
                  <p className="text-red-500 text-[0.7rem] mt-2">{error}</p>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
      <div className="w-[30%] h-[100%] flex flex-col border-[#D0D5DD] p-[10px] my-[20px]">
        <EditVariantDetailsForm />
      </div>
    </div>
  );
};

export default GenerateVariantsPage;
