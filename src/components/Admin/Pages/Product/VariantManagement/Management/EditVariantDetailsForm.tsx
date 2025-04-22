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

  const handleStatusChange = (
    status: "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK"
  ) => {
    if (editingVariant) {
      setEditingVariant({
        ...editingVariant,
        status,
      });
    }
  };

  const handleSaveVariant = () => {
    if (editingVariant) {
      updateVariant(editingVariant);
      setEditingVariant(null);
    }
  };

  if (!editingVariant) return null;

  const variantColorOptionId = editingVariant.attributes.find(
    (attr) => attr.attributeName.toLowerCase() === "color"
  )?.optionId;
  const variantImages = variantColorOptionId
    ? colorImages[variantColorOptionId]?.images || []
    : [];

  return (
    <>
      <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] px-[10px] rounded-t border border-[#D0D5DD]">
        <p className="text-[0.8rem] font-medium"># {editingVariant.sku}</p>
      </div>
      <div className="w-full h-[calc(100%-40px)] border-x border-b border-[#D0D5DD] p-[10px] overflow-y-scroll hide-scrollbar">
        <section className="w-full h-[auto] flex flex-col border border-[#D0D5DD] p-[10px] rounded">
          <div className="w-[100%] h-[100px] flex flex-col">
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
                className="w-full h-full text-[0.8rem] placeholder:text-[0.75rem] border-b border-[#D0D5DD]"
              />
            </div>
            <div className="w-full h-[30px] flex items-center justify-start"></div>
          </div>
          <div className="w-[100%] h-[100px] flex flex-col">
            <div className="w-full h-[30px] flex items-center justify-start">
              <label htmlFor="price" className="text-[0.8rem] font-medium">
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
                className="w-full h-full text-[0.8rem] placeholder:text-[0.75rem] border-b border-[#D0D5DD]"
              />
            </div>
            <div className="w-full h-[30px] flex items-center justify-start"></div>
          </div>
          <div className="w-[100%] h-[100px] flex flex-col">
            <div className="w-full h-[30px] flex items-center justify-start">
              <label htmlFor="stock" className="text-[0.8rem] font-medium">
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
                className="w-full h-full text-[0.8rem] placeholder:text-[0.75rem] border-b border-[#D0D5DD]"
              />
            </div>
            <div className="w-full h-[30px] flex items-center justify-start"></div>
          </div>
          <div className="w-[100%] h-[auto] flex flex-col">
            <div className="w-full h-[30px] flex items-center justify-start">
              <label className="text-[0.8rem] font-medium">STATUS</label>
            </div>
            <div className="w-full h-[auto] grid grid-cols-[50%_50%] grid-rows-[40px_40px] gap-[5px] p-[2px]">
              {(["ACTIVE", "INACTIVE", "OUT_OF_STOCK"] as const).map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    className={`w-[80%] h-[95%] flex rounded-full border ${
                      status === "ACTIVE"
                        ? "border-[#039855]"
                        : "border-[#F04438]"
                    } ${
                      editingVariant.status === status
                        ? "bg-[#e4f0ff]"
                        : "bg-transparent"
                    } text-[0.7rem] font-medium cursor-pointer`}
                  >
                    <div className="h-full aspect-square rounded-full flex items-center justify-center bg-white">
                      <div
                        className={`w-[5px] aspect-square rounded-full ${
                          status === "ACTIVE" ? "bg-[#039855]" : "bg-[#F04438]"
                        }`}
                      ></div>
                    </div>
                    <div
                      className={`h-full flex-1 flex items-center justify-center pl-[5px] pr-[10px] ${
                        editingVariant.status === status
                          ? status === "ACTIVE"
                            ? "text-[#039855]"
                            : "text-[#F04438]"
                          : "text-[#A4ADBB]"
                      } ${status === "OUT_OF_STOCK" ? "text-[0.65rem]" : ""}`}
                    >
                      {status.replace("_", " ")}
                    </div>
                  </button>
                )
              )}
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
            {variantImages.length > 0 ? (
              variantImages.map((image, index) => (
                <div
                  key={index}
                  className="relative w-[100%] aspect-square border border-[#D0D5DD] rounded"
                >
                  <Image
                    src={image.url}
                    alt={`Image ${index}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100px, 100px"
                  />
                </div>
              ))
            ) : (
              <p className="text-[0.7rem] text-gray-500">No images available</p>
            )}
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
