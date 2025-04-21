"use client";

import { ProductVariantData } from "@/types/variantsNewTypes";
import VariantsTable from "../../NotInUse/VariantsTable";
import AttributesManagement from "../Management/AttributesManagement";
import EditVariantDetailsForm from "../Management/EditVariantDetailsForm";
import ProductDetailsCard from "../Management/ProductDetailsCard";
import VariantImageManagement from "../Management/VariantImageManagement";
import { useVariantManagementContext } from "@/context/VariantManagementContext";
import { useEffect } from "react";
interface GenerateVariantsPageProps {
  productVariantsData: ProductVariantData;
}
const GenerateVariantsPage: React.FC<GenerateVariantsPageProps> = ({
  productVariantsData,
}) => {
  const { attributes, setProduct, generatedVariants, generateVariants } =
    useVariantManagementContext();
  const { product, attributes: attributesData } = productVariantsData;

  useEffect(() => {
    setProduct(product);
  }, [product, setProduct]);
  return (
    <div className="w-full h-full flex">
      <div className="w-[70%] h-full flex flex-col p-[10px] overflow-y-scroll hide-scrollbar">
        <section className="w-full h-[auto] flex flex-col my-[20px]  border rounded border-[#D0D5DD]">
          <ProductDetailsCard product={product} />
        </section>

        <section className="w-full h-auto border border-[#D0D5DD] rounded">
          <AttributesManagement attributes={attributesData} />
        </section>

        <section className="w-full h-auto border border-[#D0D5DD] my-[20px] rounded">
          <VariantImageManagement />
        </section>

        <div className="w-full h-[auto] flex items-center justify-end px-[0px] py-[0px] mb-[20px] border-[#D0D5DD]">
          <button
            onClick={generateVariants}
            disabled={
              !product ||
              !attributes.some((attr) =>
                attr.options.some((opt) => opt.selected)
              )
            }
            className="w-auto h-auto px-[10px] py-[8px] disabled:bg-gray-400 bg-[#635DB0] text-white text-[0.7rem] cursor-pointer"
          >
            Generate variants
          </button>
        </div>

        <section className="w-full h-auto  border border-[#D0D5DD] mb-[10px] rounded">
          <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] px-[10px] border-b border-[#D0D5DD]">
            <p className="text-[0.8rem] font-medium ">GENERATED VARIANTS</p>
          </div>
          <div className="w-full h-[calc(100%-40px)] border-red-500 p-[8px]">
            <div className="w-full h-[400px] flex items-center justify-end">
              <VariantsTable variants={generatedVariants} product={product} />
            </div>
            <div className="w-full h-[50px] flex items-center justify-end px-[10px]">
              <button className="w-auto h-auto px-[10px] py-[8px] disabled:bg-gray-400 bg-[#635DB0] text-white text-[0.7rem] cursor-pointer">
                Save variants
              </button>
            </div>
          </div>
        </section>
      </div>
      <div className="w-[30%] h-[100%] flex flex-col border-[#D0D5DD] p-[10px] my-[20px]">
        <EditVariantDetailsForm />
      </div>
    </div>
  );
};

export default GenerateVariantsPage;
