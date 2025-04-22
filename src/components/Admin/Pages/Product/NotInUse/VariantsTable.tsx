import React from "react";
import { Icon } from "@iconify/react";
// import { useVariantContext } from "@/context/VariantContext";
// import { variants as productVariants } from "@/utils/sampleData";
import {
  GeneratedVariant,
  ProductDetails,
  Variant,
} from "@/types/variantsNewTypes";
import { useVariantManagementContext } from "@/context/VariantManagementContext";

interface VariantsTableProps {
  variants: Variant[] | GeneratedVariant[];
  product: ProductDetails;
}
const VariantsTable: React.FC<VariantsTableProps> = ({ variants }) => {
  const columns = ["SKU", "Name", "Price", "Stock", "Action"];

  const { setEditingVariant, isDuplicate, removeGeneratedVariant } =
    useVariantManagementContext();

  const isVariant = (
    variant: Variant | GeneratedVariant
  ): variant is Variant => {
    return "id" in variant || "images" in variant;
  };

  return (
    <div
      className="w-full h-full overflow-auto bg-white border-y border-[#D0D5DD]"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <table className="min-w-full border-collapse">
        <colgroup>
          <col className="w-[40%]" />
          <col className="w-[20%]" />
          <col className="w-[auto]" />
          <col className="w-auto" />
        </colgroup>
        {/* Table Head */}
        <thead className="bg-[#F7F7F7] sticky top-0 z-10 border-b-[1px] border-t-[#D0D5DD]">
          <tr className="text-left text-[#1C3553] text-[0.8rem]">
            {columns.map((col) => (
              <th
                key={col}
                className="px-4 py-2 capitalize whitespace-nowrap border-x border-[#D0D5DD]"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {variants.map((variant) => {
            const isDup =
              !isVariant(variant) && isDuplicate(variant as GeneratedVariant);
            return (
              <tr
                key={variant.sku}
                className={` ${
                  isDup ? "hover:bg-red-300" : "hover:bg-[#F7FAFE]"
                }  text-[0.8rem] ${isDup && "bg-red-500/10"}`}
              >
                {/* SKU */}
                <td className="px-4 py-2 h-[50px] border border-[#D0D5DD] text-[#1C3553] overflow-hidden">
                  <div className="flex items-center max-w-[300px]">
                    <p className="font-medium truncate">{variant.sku}</p>
                  </div>
                </td>

                <td className="px-4 py-2 h-[50px] border border-[#D0D5DD] text-[#1C3553] overflow-hidden">
                  <div className="flex items-center max-w-[300px]">
                    <p className="font-medium truncate">
                      {variant.name || "- - -"}
                    </p>
                  </div>
                </td>

                {/* Variant price */}
                <td className="px-4 py-2 whitespace-nowrap  border border-[#D0D5DD] text-[#1C3553] font-medium">
                  ₹{variant.price}
                </td>

                <td className="px-4 py-2 whitespace-nowrap border border-[#D0D5DD] text-[#1C3553] font-medium">
                  {variant.stock}
                </td>
                {/* Action */}
                <td className="px-4 py-2 whitespace-nowrap border border-[#D0D5DD] text-[#1C3553]">
                  <div className="w-full h-full flex items-center">
                    {isDup && (
                      <button
                        onClick={() => removeGeneratedVariant(variant.sku)}
                        className="w-auto h-[30px] border flex items-center mr-[10px] rounded cursor-pointer"
                      >
                        <div className="flex-1 h-full flex items-center justify-center pl-[10px] text-[0.7rem] text-[#D92D20]">
                          Duplicate
                        </div>
                        <div className="h-[60%] mx-[5px] aspect-[1/1] flex items-center justify-center rounded-full bg-red-200">
                          <Icon
                            icon="lucide:x"
                            className="w-[50%] h-[50%] text-[#D92D20] cursor-pointer"
                          />
                        </div>
                      </button>
                    )}
                    <button
                      onClick={() => setEditingVariant(variant)}
                      className="w-auto h-[30px] border flex items-center mr-[10px] rounded cursor-pointer"
                    >
                      <div className="flex-1 h-full flex items-center justify-center pl-[10px] text-[0.7rem] text-[#12B76A]">
                        Edit
                      </div>
                      <div className="h-full aspect-[1/1] flex items-center justify-center">
                        <Icon
                          icon="fluent:edit-32-regular"
                          className="w-[50%] h-[50%]"
                        />
                      </div>
                    </button>
                    <button className="w-auto h-[30px] border flex items-center ml-[10px] rounded cursor-pointer">
                      <div className="flex-1 h-full flex items-center justify-center pl-[10px] text-[0.7rem] text-[#D92D20]">
                        Delete
                      </div>
                      <div className="h-full aspect-[1/1] flex items-center justify-center">
                        <Icon icon="lucide:trash" className="w-[45%] h-[45%]" />
                      </div>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default VariantsTable;
