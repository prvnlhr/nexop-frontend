import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useVariantManagementContext } from "@/context/VariantManagementContext";

interface VariantImageManagementProps {
  pageType: "generate" | "manage";
}

const VariantImageManagement: React.FC<VariantImageManagementProps> = ({
  pageType,
}) => {
  const {
    attributes,
    colorImages,
    addColorImages,
    removeColorImage,
    product,
    activeColorTab,
    setActiveColorTab,
    variants,
  } = useVariantManagementContext();

  const [dragOver, setDragOver] = useState<boolean>(false);

  const colorAttribute = attributes.find(
    (attr) => attr.name.toLowerCase() === "color"
  );

  // Get color option IDs for existing variants
  const existingColorOptionIds = new Set(
    variants
      .map((variant) =>
        variant.attributes.find(
          (attr) => attr.attributeName.toLowerCase() === "color"
        )
      )
      .filter((attr): attr is NonNullable<typeof attr> => attr !== undefined)
      .map((attr) => attr.optionId)
  );

  // Get color options for new variants only in generate mode
  const colorOptions = colorAttribute
    ? pageType === "generate"
      ? colorAttribute.options.filter(
          (opt) => opt.selected && !existingColorOptionIds.has(opt.id)
        )
      : colorAttribute.options
    : [];

  // Set default activeColorTab to the first color option
  useEffect(() => {
    if (colorOptions.length > 0 && activeColorTab === null) {
      setActiveColorTab(colorOptions[0].id);
    }
  }, [colorOptions, activeColorTab, setActiveColorTab]);

  const handleFileChange = (optionId: number, files: FileList | null) => {
    if (files && product) {
      addColorImages(
        optionId,
        colorAttribute!.id,
        product.id,
        Array.from(files)
      );
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (optionId: number, e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files && product) {
      addColorImages(
        optionId,
        colorAttribute!.id,
        product.id,
        Array.from(files)
      );
    }
  };

  return (
    <div className="w-full h-[auto] flex flex-col rounded">
      <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] px-[10px] border-b border-[#D0D5DD]">
        <p className="text-[0.8rem] font-medium">VARIANT IMAGE MANAGEMENT</p>
      </div>
      <div className="w-full h-[calc(100%-40px)] p-[8px]">
        {colorOptions.length > 0 ? (
          <div className="w-full h-auto flex flex-col border border-[#D0D5DD] p-[10px] rounded">
            <div className="w-full h-[40px] flex items-center overflow-x-scroll hide-scrollbar gap-[10px]">
              {colorOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setActiveColorTab(option.id)}
                  className={`w-auto h-[30px] px-[10px] rounded-full border whitespace-nowrap ${
                    activeColorTab === option.id
                      ? "bg-[#635DB0] text-white"
                      : "bg-transparent text-[#1C3553]"
                  } text-[0.7rem] font-medium cursor-pointer`}
                >
                  {option.value}
                </button>
              ))}
            </div>
            {activeColorTab && (
              <div
                className={`w-full h-[200px] mt-[10px] border-2 border-dashed ${
                  dragOver
                    ? "border-[#635DB0] bg-[#e4f0ff]"
                    : "border-[#D0D5DD]"
                } rounded flex flex-col items-center justify-center`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(activeColorTab, e)}
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) =>
                    handleFileChange(activeColorTab, e.target.files)
                  }
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
                >
                  <Icon
                    icon="lucide:upload"
                    className="w-[20px] h-[20px] text-[#A4ADBB]"
                  />
                  <p className="text-[0.8rem] text-[#A4ADBB] mt-5">
                    Drag and drop images here or click to upload
                  </p>
                </label>
              </div>
            )}
            {activeColorTab &&
            colorImages[activeColorTab]?.images.length > 0 ? (
              <div className="w-full h-auto max-h-[300px] overflow-y-scroll hide-scrollbar grid grid-cols-5 gap-5 mt-[10px]">
                {colorImages[activeColorTab].images.map((image, index) => (
                  <div
                    key={`${image.url}-${index}`}
                    className="relative w-[100%] aspect-square border border-[#D0D5DD] rounded"
                  >
                    <Image
                      src={image.url}
                      alt={`Image ${index}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100px, 100px"
                    />
                    <button
                      onClick={() => removeColorImage(activeColorTab, index)}
                      className="absolute top-1 right-1 w-[20px] h-[20px] bg-red-400 rounded-full flex items-center justify-center"
                    >
                      <Icon
                        icon="lucide:x"
                        className="w-[50%] h-[50%] text-white"
                      />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[0.8rem] text-gray-500 mt-[10px]">
                No images available for this color
              </p>
            )}
          </div>
        ) : (
          <p className="text-[0.8rem] text-gray-500">
            No color options available
          </p>
        )}
      </div>
    </div>
  );
};

export default VariantImageManagement;
