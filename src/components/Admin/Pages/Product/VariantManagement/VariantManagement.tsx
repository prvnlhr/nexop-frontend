import React from "react";
import VariantsTable from "../VariantsTable";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useVariantContext } from "@/context/VariantContext";
import { Category } from "@/types/categoryTypes";
import { Product } from "@/types/productType";
import {
  createProductVariants,
  editProductVariants,
} from "@/lib/services/admin/variantServices";

interface VariantManagementProps {
  selectedCategory: Category | null;
  product: Product;
}

const VariantManagement: React.FC<VariantManagementProps> = ({ product }) => {
  const {
    productVariants,
    variantImages,
    toggleAttributeOption,
    handleVariantGenerate,
    attributes,
  } = useVariantContext();

  const handleSaveVariants = async () => {
    const payload = productVariants.map((variant) => {
      return {
        ...variant,
        newImages: variantImages[variant.sku]?.files || [],
        productId: product.id,
      };
    });

    try {
      if (product.existingVariantsCount > 0) {
        await editProductVariants(payload);
        console.log(`Successfully updated  variant(s):`);
      } else {
        await createProductVariants(payload);
        console.log(`Successfully created  variant(s):`);
      }
    } catch (error) {
      console.error(
        `Error ${
          product.existingVariantsCount > 0 ? "updating" : "creating"
        } variants:`,
        error instanceof Error ? error.message : "Unknown error",
        { payload }
      );
    }
  };

  return (
    <>
      {/* VARIANT MANAGEMENT : SELECTING ATTRUBUTE OPTIONS AND VARIANT GENERATION --------------------------------- */}
      <section className="w-full h-auto  border border-[#D0D5DD] mb-[20px] rounded">
        <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] px-[10px] border-b border-[#D0D5DD]">
          <p className="text-[0.8rem] font-medium ">VARIANTS MANAGEMENT</p>
        </div>
        <div className="w-full h-[calc(100%-40px)] border-red-500 p-[10px]">
          <div className="w-full h-[50px] flex items-center justify-start mb-[10px]">
            <p className="text-[0.75rem] font-normal">
              SELECT ATTRIBUTES & OPTIONS
              <br />
              <span className="text-[#A4ADBB] text-[0.75rem]">
                An attribute is considered selected when at least one of its
                options is chosen.
              </span>
            </p>
          </div>

          {attributes && (
            <div className="w-[100%] h-auto flex flex-col border border-[#D0D5DD] p-[10px] rounded">
              {attributes.map((attr) => (
                <div className="w-full h-auto flex flex-col" key={attr.id}>
                  <div className="w-full h-[30px] flex items-center">
                    <div className="w-auto h-[80%] flex items-center justify-center text-[0.75rem] font-medium">
                      {attr.name.toUpperCase()}
                    </div>
                  </div>
                  <div className="w-full h-auto min-h-[40px] flex flex-wrap">
                    {Object.values(attr.options).map((attrOption) => (
                      // checkbox
                      <div
                        key={attrOption.id}
                        onClick={() =>
                          toggleAttributeOption(attr.id, attrOption.id)
                        }
                        className={`w-auto h-[30px] flex my-[10px] mr-[10px] rounded-full border border-[#D0D5DD]  ${
                          attrOption.selected
                            ? "bg-[#e4f0ff]"
                            : "bg-[transparent]"
                        } text-[0.7rem] font-medium cursor-pointer`}
                      >
                        <div className="h-full aspect-square rounded-full flex items-center justify-center  bg-white">
                          <Icon
                            icon="flowbite:check-outline"
                            className={`w-[50%] h-[50%]  ${
                              attrOption.selected
                                ? "text-[#039855]"
                                : "text-[#A4ADBB]"
                            }`}
                          />
                        </div>
                        <div
                          className={`h-full flex-1 flex items-center justify-center pl-[5px] pr-[10px]  ${
                            attrOption.selected
                              ? "text-[#039855]"
                              : "text-[#A4ADBB]"
                          }`}
                        >
                          {attrOption.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full h-[50px] flex items-center justify-end px-[10px]">
          <button
            onClick={() => handleVariantGenerate(product)}
            disabled={attributes.length === 0}
            className="w-auto h-auto px-[10px] py-[8px] disabled:bg-gray-400 bg-[#635DB0] text-white text-[0.7rem] cursor-pointer"
          >
            Generate variants
          </button>
        </div>
      </section>

      {/* Generated variants table */}
      <section className="w-full h-auto flex flex-col border border-[#D0D5DD] rounded">
        {productVariants.length > 0 && (
          <div className="w-full h-auto flex flex-col">
            <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] px-[10px] border-b border-[#D0D5DD]">
              <p className="text-[0.8rem] font-medium ">GENERATED VARIANTS</p>
            </div>
            <div className="w-full h-[400px] flex flex-col mt-[10px] px-[10px]">
              <VariantsTable />
            </div>
            <div className="w-full h-[70px] flex items-center justify-end px-[10px]">
              <button
                onClick={handleSaveVariants}
                className="w-auto h-auto px-[10px] py-[8px] disabled:bg-gray-400 bg-[#635DB0] text-white text-[0.7rem] cursor-pointer"
              >
                Save variants
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default VariantManagement;
