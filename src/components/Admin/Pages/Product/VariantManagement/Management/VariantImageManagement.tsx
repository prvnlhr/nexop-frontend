import { useVariantManagementContext } from "@/context/VariantManagementContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import React from "react";

const VariantImageManagement = () => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const {
    attributes,
    setActiveColorTab,
    activeColorTab,
    colorImages,
    addColorImages,
    removeColorImage,
  } = useVariantManagementContext();

  const selectedColorOptions =
    attributes
      .find((attr) => attr.name === "Color")
      ?.options.filter((option) => option.selected) || [];

  const activeTabImages = activeColorTab ? colorImages[activeColorTab] : null;

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!activeColorTab || !e.target.files?.length) return;

    const attribute = attributes.find((attr) => attr.name === "Color");
    if (!attribute) return;

    addColorImages(
      activeColorTab,
      attribute.id,
      activeColorTab,
      Array.from(e.target.files)
    );

    e.target.value = ""; // Reset input
  };

  return (
    <>
      {selectedColorOptions.length > 0 && (
        <>
          <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] px-[10px] border-b border-[#D0D5DD]">
            <p className="text-[0.8rem] font-medium ">IMAGES SELECTION</p>
          </div>
          <div className="w-full h-[auto] flex flex-col items-center p-[8px]">
            <div className="w-[100%] h-[30px] flex items-center">
              <p className="text-[0.75rem] font-medium">
                CHOOSE COLOR OPTION TO UPLOAD IMAGES
              </p>
            </div>
            <div className="w-full h-[auto] flex flex-wrap border-t border-[#D0D5DD] px-[0px]">
              {selectedColorOptions.map((colorOption) => (
                <button
                  type="button"
                  onClick={() => setActiveColorTab(colorOption.id)}
                  key={colorOption.id}
                  className={`w-auto h-[30px] flex items-center justify-center my-[10px] mr-[10px] px-[15px] rounded-full border border-[#D0D5DD] ${
                    activeColorTab === colorOption.id
                      ? "bg-[#e4f0ff] text-[#039855]"
                      : "bg-transparent text-[#A4ADBB]"
                  } text-[0.7rem] font-medium cursor-pointer`}
                >
                  {colorOption.value}
                </button>
              ))}
            </div>
            <div className="w-full h-[auto] max-h-[350px] flex flex-wrap border border-[#D0D5DD] rounded my-[5px] overflow-y-scroll hide-scrollbar p-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                multiple
                className="hidden"
              />
              <div
                onClick={triggerFileInput}
                className="w-[46%] md:w-[100px] aspect-square m-[5px] flex items-center justify-center border border-dashed rounded cursor-pointer hover:border-[#635DB0] transition-colors"
              >
                <Icon
                  icon="lucide:plus"
                  className="w-[20px] h-[20px] text-[#635DB0]"
                />
              </div>
              {activeTabImages?.previews.map((previewImg, index) => (
                <div
                  key={index}
                  className="relative w-[46%] md:w-[100px] aspect-square m-[5px] border border-[#D0D5DD] rounded overflow-hidden group"
                >
                  <Image
                    src={previewImg}
                    alt={`preview-${index}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100px, 100px"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeColorImage(activeColorTab as number, index);
                    }}
                    className="absolute w-5 h-5 flex items-center justify-center rounded-full right-1 top-1 bg-red-200 hover:bg-red-300 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Icon
                      icon="lucide:x"
                      className="w-3 h-3 text-[#D92D20] cursor-pointer"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default VariantImageManagement;
