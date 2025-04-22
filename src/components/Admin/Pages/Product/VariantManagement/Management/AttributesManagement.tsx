import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import { Attribute } from "@/types/variantsNewTypes";
import { useVariantManagementContext } from "@/context/VariantManagementContext";

interface AttributesManagementProps {
  attributes: Attribute[];
  pageType: "generate" | "manage";
}

const AttributesManagement: React.FC<AttributesManagementProps> = ({
  attributes,
  pageType,
}) => {
  const {
    setAttributes,
    attributes: attributesData,
    toggleAttributeOption,
    variants,
  } = useVariantManagementContext();

  useEffect(() => {
    setAttributes(attributes);
  }, [attributes, setAttributes]);

  // Identify option IDs associated with existing variants
  const existingOptionIds = new Set(
    variants
      .flatMap((variant) => variant.attributes)
      .map((attr) => attr.optionId)
  );

  return (
    <>
      <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] px-[10px] border-b border-[#D0D5DD]">
        <p className="text-[0.8rem] font-medium">SELECT ATTRIBUTE & OPTIONS</p>
      </div>
      <div className="w-full h-[calc(100%-40px)] p-[8px]">
        <div className="w-full h-[40px] flex items-center justify-start mb-[10px]">
          <p className="text-[0.8rem] font-normal text-[#A4ADBB]">
            An attribute is considered selected when at least one of its options
            is chosen.
          </p>
        </div>

        {attributesData && (
          <div className="w-[100%] h-auto flex flex-col border border-[#D0D5DD] p-[10px] rounded">
            {attributesData.map((attr) => (
              <div className="w-full h-auto flex flex-col" key={attr.id}>
                <div className="w-full h-[30px] flex items-center">
                  <div className="w-auto h-[80%] flex items-center justify-center text-[0.75rem] font-medium">
                    {attr.name.toUpperCase()}
                  </div>
                </div>
                <div className="w-full h-auto min-h-[40px] flex flex-wrap">
                  {Object.values(attr.options).map((attrOption) => {
                    const isExisting = existingOptionIds.has(attrOption.id);
                    const isDisabled = pageType === "manage";

                    return (
                      <div
                        onClick={
                          isDisabled
                            ? undefined
                            : () =>
                                toggleAttributeOption(attr.id, attrOption.id)
                        }
                        key={attrOption.id}
                        className={`w-auto h-[30px] flex my-[10px] mr-[10px] rounded-full border border-[#D0D5DD] ${
                          attrOption.selected
                            ? "bg-[#e4f0ff]"
                            : "bg-[transparent]"
                        } text-[0.7rem] font-medium ${
                          isDisabled
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer"
                        } ${
                          isExisting && pageType === "generate"
                            ? "border-dashed border-gray-500"
                            : ""
                        }`}
                      >
                        <div className="h-full aspect-square rounded-full flex items-center justify-center bg-white">
                          <Icon
                            icon="flowbite:check-outline"
                            className={`w-[50%] h-[50%] ${
                              attrOption.selected
                                ? "text-[#039855]"
                                : "text-[#A4ADBB]"
                            }`}
                          />
                        </div>
                        <div
                          className={`h-full flex-1 flex items-center justify-center pl-[5px] pr-[10px] ${
                            attrOption.selected
                              ? "text-[#039855]"
                              : "text-[#A4ADBB]"
                          }`}
                        >
                          {attrOption.value}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AttributesManagement;
