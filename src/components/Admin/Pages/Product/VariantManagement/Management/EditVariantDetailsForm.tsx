import { useVariantManagementContext } from "@/context/VariantManagementContext";
import Image from "next/image";
import React from "react";

const EditVariantDetailsForm = () => {
  const { editingVariant, setEditingVariant, colorImages, updateVariant } =
    useVariantManagementContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingVariant) return;

    const { name, value, type } = e.target;
    setEditingVariant({
      ...editingVariant,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const variantColorOptionId = editingVariant?.attributes.find(
    (attr) => attr.attributeName === "Color"
  )?.optionId;

  // Get images for this variant's color
  const variantImages = variantColorOptionId
    ? colorImages[variantColorOptionId]?.previews || []
    : [];

  // const handleStatusChange = (
  //   status: "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK"
  // ) => {
  //   if (editingVariant) {
  //     setEditingVariant({
  //       ...editingVariant,
  //       status,
  //     });
  //   }
  // };
  const handleSaveVariant = () => {
    if (editingVariant) {
      updateVariant(editingVariant);
      // Optional: Close the form or show success message
      setEditingVariant(null);
    }
  };

  if (!editingVariant) return null;

  return (
    <>
      <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] px-[10px] rounded-t border border-[#D0D5DD]">
        <p className="text-[0.8rem] font-medium"># {editingVariant?.sku}</p>
      </div>
      <div className="w-full h-[calc(100%-40px)] border-x border-b border-[#D0D5DD] p-[10px] overflow-y-scroll hide-scrollbar">
        <section className="w-full h-[auto] flex flex-col border border-[#D0D5DD] p-[10px] rounded">
          <div className="w-[100%] h-[100px] flex flex-col border-blue-700">
            <div className="w-full h-[30px] flex items-center justify-start">
              <label htmlFor="name" className="text-[0.8rem] font-medium">
                VARIANT NAME
              </label>
            </div>
            <div className="w-full h-[40px] flex items-center justify-start">
              <input
                name="name"
                value={editingVariant.name}
                onChange={handleInputChange}
                className={`w-full h-full text-[0.8rem] placeholder:text-[0.75rem] border-b border-[#D0D5DD]`}
              />
            </div>
            <div className="w-full h-[30px] flex items-center justify-start"></div>
          </div>
          <div className="w-[100%] h-[100px] flex flex-col border-blue-700">
            <div className="w-full h-[30px] flex items-center justify-start">
              <label htmlFor="name" className="text-[0.8rem] font-medium">
                PRICE (₹)
              </label>
            </div>
            <div className="w-full h-[40px] flex items-center justify-start">
              <input
                type="number"
                step="0.10"
                name="price"
                value={editingVariant.price}
                onChange={handleInputChange}
                min={1}
                className={`w-full h-full text-[0.8rem] placeholder:text-[0.75rem] border-b border-[#D0D5DD]`}
              />
            </div>
            <div className="w-full h-[30px] flex items-center justify-start"></div>
          </div>
          <div className="w-[100%] h-[100px] flex flex-col border-blue-700">
            <div className="w-full h-[30px] flex items-center justify-start">
              <label htmlFor="name" className="text-[0.8rem] font-medium">
                STOCK
              </label>
            </div>
            <div className="w-full h-[40px] flex items-center justify-start">
              <input
                type="number"
                step="1"
                min={0}
                name="stock"
                value={editingVariant.stock}
                onChange={handleInputChange}
                className={`w-full h-full text-[0.8rem] placeholder:text-[0.75rem] border-b border-[#D0D5DD]`}
              />
            </div>
            <div className="w-full h-[30px] flex items-center justify-start"></div>
          </div>

          <div className="w-[100%] h-[auto] flex flex-col border-blue-700">
            <div className="w-full h-[30px] flex items-center justify-start">
              <label className="text-[0.8rem] font-medium">STATUS</label>
            </div>
            <div className="w-full h-[auto] grid grid-cols-[50%_50%] grid-rows-[40px_40px] gap-[5px] p-[2px]">
              <button
                className={`w-[80%] h-[95%] flex  rounded-full border border-[#039855]  ${
                  true ? "bg-[#e4f0ff]" : "bg-[transparent]"
                } text-[0.7rem] font-medium cursor-pointer`}
              >
                <div className="h-full aspect-square rounded-full flex items-center justify-center bg-white">
                  <div className="w-[5px] aspect-square rounded-full bg-[#039855]"></div>
                </div>
                <div
                  className={`h-full flex-1 flex items-center justify-center pl-[5px] pr-[10px]  ${
                    true ? "text-[#039855]" : "text-[#A4ADBB]"
                  }`}
                >
                  ACTIVE
                </div>
              </button>
              <button
                className={`w-[80%] h-[95%] flex  rounded-full border border-[#F04438]  ${
                  true ? "bg-[#e4f0ff]" : "bg-[transparent]"
                } text-[0.7rem] font-medium cursor-pointer`}
              >
                <div className="h-full aspect-square rounded-full flex items-center justify-center  bg-white">
                  <div className="w-[5px] aspect-square rounded-full bg-[#F04438]"></div>
                </div>
                <div
                  className={`h-full flex-1 flex items-center justify-center pl-[5px] pr-[10px]  ${
                    true ? "text-[#F04438]" : "text-[#A4ADBB]"
                  }`}
                >
                  INACTIVE
                </div>
              </button>
              <button
                className={`w-[80%] h-[95%] flex  rounded-full border border-[#F04438]  ${
                  true ? "bg-[#e4f0ff]" : "bg-[transparent]"
                } text-[0.7rem] font-medium cursor-pointer`}
              >
                <div className="h-full aspect-square rounded-full flex items-center justify-center  bg-white">
                  <div className="w-[5px] aspect-square rounded-full bg-[#F04438]"></div>
                </div>
                <div
                  className={`h-full flex-1 flex items-center justify-center pl-[5px] pr-[10px] text-[0.4rem]  ${
                    true ? "text-[#F04438]" : "text-[#A4ADBB]"
                  }`}
                >
                  OUT OF STOCK
                </div>
              </button>
            </div>
            <div className="w-full h-[30px] flex items-center justify-start"></div>
          </div>
        </section>
        <section className="w-full h-auto border border-[#D0D5DD] mt-[10px] p-[5px]">
          <div className="w-full h-[30px] flex items-center border-b border-[#D0D5DD]">
            <p className="text-[0.7rem] font-medium">
              VARIANT IMAGES - READ ONLY
            </p>
          </div>
          <div className="w-full h-auto max-h-[300px] overflow-y-scroll hide-scrollbar grid grid-cols-2 gap-5 mt-[10px]">
            {variantImages.map((imageUrl, index) => (
              <div
                key={index}
                className="relative w-[100%] aspect-square  border border-[#D0D5DD] rounded"
              >
                <Image
                  src={imageUrl}
                  alt={`$img-{index}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100px, 100px"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="w-full h-[50px] flex items-center justify-end px-[5px] border-x border-b border-[#D0D5DD]">
        <button
          onClick={handleSaveVariant}
          className="w-auto h-auto px-[10px] py-[8px] disabled:bg-gray-400 bg-[#635DB0] text-white text-[0.7rem] cursor-pointer"
        >
          Save variant
        </button>
      </div>
    </>
  );
};

export default EditVariantDetailsForm;
