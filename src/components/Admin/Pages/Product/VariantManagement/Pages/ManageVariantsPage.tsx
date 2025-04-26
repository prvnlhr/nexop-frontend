"use client";
import React, { useEffect, useMemo, useState } from "react";
import ProductDetailsCard from "../Management/ProductDetailsCard";
import VariantsTable from "../Management/VariantsTable";
import EditVariantDetailsForm from "../Management/EditVariantDetailsForm";
import VariantImageManagement from "../Management/VariantImageManagement";
import AttributesManagement from "../Management/AttributesManagement";
import {
  ProductVariantData,
  // UpdateVariantPayload,
} from "@/types/variantsNewTypes";
import { useVariantManagementContext } from "@/context/VariantManagementContext";
import { updateProductVariants } from "@/lib/services/admin/variantServices";

interface ManageVariantsPageProps {
  productVariantsData: ProductVariantData;
}

interface UpdateVariantPayload {
  variants: {
    id: number;
    name: string;
    slug: string;
    sku: string;
    price: number;
    stock: number;
    status: "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";
    attributes: {
      attributeId: number;
      optionId: number;
    }[];
  }[];
  colorImages: {
    [optionId: number]: {
      newImages: { file: File; order: number }[];
      existingImages: { url: string; publicId: string; order: number }[];
      deletedPublicIds: string[];
    };
  };
}
const ManageVariantsPage: React.FC<ManageVariantsPageProps> = ({
  productVariantsData,
}) => {
  const {
    product: productData,
    attributes: allAttributes,
    variants: existingVariants,
  } = productVariantsData;
  const {
    setProduct,
    setAttributes,
    setVariants,
    variants,
    initializeColorImages,
    colorImages,
  } = useVariantManagementContext();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const associatedAttributes = useMemo(() => {
    return allAttributes
      .map((attr) => {
        const associatedOptions = attr.options.filter((opt) =>
          existingVariants.some((variant) =>
            variant.attributes.some(
              (va) => va.attributeId === attr.id && va.optionId === opt.id
            )
          )
        );
        return associatedOptions.length > 0
          ? { ...attr, options: associatedOptions }
          : null;
      })
      .filter((attr): attr is NonNullable<typeof attr> => attr !== null);
  }, [allAttributes, existingVariants]);

  useEffect(() => {
    setProduct(productData);
    setAttributes(associatedAttributes);
    setVariants(existingVariants);
  }, [
    productData,
    associatedAttributes,
    existingVariants,
    setProduct,
    setAttributes,
    setVariants,
  ]);

  useEffect(() => {
    initializeColorImages(existingVariants);
  }, [existingVariants, initializeColorImages]);

  const handleUpdateVariants = async () => {
    setError(null);
    setIsLoading(true);
    try {
      // Construct colorImages payload
      const colorImagesPayload: UpdateVariantPayload["colorImages"] = {};
      Object.entries(colorImages).forEach(([optionId, data]) => {
        const newImages = data.images
          .filter((img) => img.source === "client" && img.file)
          .map((img, index) => ({
            file: img.file!,
            order: data.images.filter((i) => i.source === "db").length + index,
          }));
        const existingImages = data.images
          .filter(
            (img) =>
              img.source === "db" &&
              !data.deletedPublicIds?.includes(img.publicId || "")
          )
          .map((img, index) => ({
            url: img.url,
            publicId: img.publicId!,
            order: index,
          }));
        colorImagesPayload[Number(optionId)] = {
          newImages,
          existingImages,
          deletedPublicIds: data.deletedPublicIds || [],
        };
      });

      // Construct payload
      const payload: UpdateVariantPayload = {
        variants: variants.map((variant) => ({
          id: variant.id!,
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
        })),
        colorImages: colorImagesPayload,
      };

      console.log("payload:", JSON.stringify(payload, null, 2));
      const res = await updateProductVariants(payload);
      console.log("res:", res);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update variants"
      );
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
            pageType="manage"
            attributes={associatedAttributes}
          />
        </section>
        <section className="w-full h-auto border border-[#D0D5DD] my-[20px] rounded">
          <VariantImageManagement pageType="manage" />
        </section>
        <section className="w-full h-auto border border-[#D0D5DD] mb-[10px] rounded">
          <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] px-[10px] border-b border-[#D0D5DD]">
            <p className="text-[0.8rem] font-medium">PRODUCT VARIANTS</p>
          </div>
          <div className="w-full h-[calc(100%-40px)] p-[8px]">
            <div className="w-full h-[auto] flex items-center justify-end">
              <VariantsTable variants={variants} product={productData} />
            </div>
            <div className="w-full h-[50px] flex items-center justify-end px-[0px] mt-[20px]">
              <button
                onClick={handleUpdateVariants}
                disabled={isLoading}
                className="w-auto h-auto px-[10px] py-[8px] disabled:bg-gray-400 bg-[#635DB0] text-white text-[0.7rem] cursor-pointer"
              >
                {isLoading ? "Updating..." : "Update Variants"}
              </button>
            </div>
            {error && (
              <div className="w-full h-[40px] flex items-center">
                <p className="text-red-500 text-[0.7rem] mt-2">{error}</p>
              </div>
            )}
          </div>
        </section>
      </div>
      <div className="w-[30%] h-[100%] flex flex-col border-[#D0D5DD] p-[10px] my-[20px]">
        <EditVariantDetailsForm />
      </div>
    </div>
  );
};

export default ManageVariantsPage;
