import { useVariantContext } from "@/context/VariantContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import React from "react";

const VariantEditForm = () => {
  const {
    currentEditingVariant,
    setCurrentEditingVariant,
    saveEditedVariant,
    fileInputRef,
    variantImages,
    handleVariantImageUpload,
    handleRemoveVariantImage,
  } = useVariantContext();

  if (!currentEditingVariant) return null;

  return (
    <>
      {currentEditingVariant ? (
        <div className="w-[100%] h-full p-[5px] flex flex-col justify-between">
          <section className="w-full h-[240px] border border-[#D0D5DD] rounded">
            {/* PRODUCT SKU NUMBER */}
            <div className="w-full h-[40px] flex items-center font-medium text-[0.8rem] bg-[#e4f0ff] px-[10px]">
              #{currentEditingVariant?.sku}
            </div>

            <div className="w-full h-[200px] px-[10px]">
              {/* Variant price group */}
              <div className="w-[100%] h-[100px] flex flex-col  border-blue-700">
                <div className="w-full h-[30px] flex items-center justify-start">
                  <label htmlFor="name" className="text-[0.8rem] font-medium">
                    PRICE (₹)
                  </label>
                </div>
                <div className="w-full h-[40px] flex items-center justify-start">
                  <input
                    type="number"
                    step="0.01"
                    min={1}
                    value={currentEditingVariant?.price}
                    onChange={(e) =>
                      setCurrentEditingVariant({
                        ...currentEditingVariant,
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                    className={`w-full h-full text-[0.8rem] placeholder:text-[0.75rem] border-b border-[#D0D5DD]`}
                  />
                </div>
                <div className="w-full h-[30px] flex items-center justify-start"></div>
              </div>

              {/* Variant stock group */}
              <div className="w-[100%] h-[100px] flex flex-col border-blue-700">
                <div className="w-full h-[30px] flex items-center justify-start">
                  <label htmlFor="name" className="text-[0.8rem] font-medium">
                    STOCK
                  </label>
                </div>
                <div className="w-full h-[40px] flex items-center justify-start">
                  <input
                    type="number"
                    min={0}
                    value={currentEditingVariant?.stock}
                    onChange={(e) =>
                      setCurrentEditingVariant({
                        ...currentEditingVariant,
                        stock: parseInt(e.target.value) || 0,
                      })
                    }
                    className={`w-full h-full text-[0.8rem] placeholder:text-[0.75rem] border-b border-[#D0D5DD]`}
                  />
                </div>
                <div className="w-full h-[30px] flex items-center justify-start"></div>
              </div>
            </div>
          </section>

          {/* SKU VARIANT IMAGES ----------  */}
          <section className="w-full  h-[calc(95%-280px)] flex flex-col border border-[#D0D5DD] rounded">
            <div className="w-full h-[40px] flex items-center font-medium text-[0.8rem] bg-[#e4f0ff] px-[10px]">
              UPLOAD VARIANT IMAGES
            </div>
            <div className="w-full h-[calc(100%-40px)] flex flex-col  border-[#D0D5DD]">
              <input
                type="file"
                ref={fileInputRef}
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleVariantImageUpload}
              />

              <div
                className="w-full h-full grid grid-cols-3 gap-2 overflow-y-scroll whitespace-nowrap p-[5px]"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-[100%] aspect-[1/1] border border-dashed rounded flex items-center justify-center cursor-pointer"
                >
                  <Icon
                    icon="lucide:plus"
                    className="w-[20px] h-[20px] text-[#635DB0]"
                  />
                </div>

                {variantImages[
                  currentEditingVariant.sku
                ]?.imagePreviewUrls?.map((imgUrl, index) => (
                  <div
                    key={index}
                    className="relative w-[100%] aspect-[1/1] rounded"
                  >
                    <Image
                      src={imgUrl}
                      alt={`Variant ${index}`}
                      fill={true}
                      className="w-full h-full object-cover rounded border border-[#D0D5DD]"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveVariantImage(index)}
                      className="absolute w-[20px] h-[20px] flex items-center justify-center top-1 right-1 bg-white/80 rounded-full border border-[#D0D5DD] cursor-pointer"
                    >
                      <Icon
                        icon="lucide:x"
                        className="w-3 h-3 text-[#D92D20]"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="w-full h-[40px] flex items-end justify-end">
            <button
              onClick={() => saveEditedVariant()}
              disabled={!currentEditingVariant}
              className="w-auto h-auto px-[20px] py-[8px] disabled:bg-gray-400 bg-[#635DB0] text-white text-[0.7rem] cursor-pointer"
            >
              Save Variant
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default VariantEditForm;
