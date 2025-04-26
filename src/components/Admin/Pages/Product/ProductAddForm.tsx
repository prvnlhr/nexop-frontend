"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useRef, useState } from "react";
// import VariantManagement from "./VariantManagement/VariantManagement";
// import VariantEditForm from "./VariantManagement/VariantEditForm";
import { ProductFormData, useProductForm } from "@/hooks/useProductForm";
// import { useVariantContext } from "@/context/VariantContext";
import Image from "next/image";
import { Category } from "@/types/categoryTypes";
import { useRouter, useSearchParams } from "next/navigation";
import { AttributeWithOptions } from "@/types/attributeTypes";
import { createProduct } from "@/lib/services/admin/productServices";
import { Product, ProductImage } from "@/types/productType";
import {
  editProductById,
  prepareProductUpdate,
} from "@/lib/services/admin/productServices";
import Link from "next/link";

interface ProductAddFormProps {
  categories: Category[];
  attributes: AttributeWithOptions[] | undefined;
  product?: Product;
}

const ProductAddForm: React.FC<ProductAddFormProps> = ({
  categories,
  product,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    watch,
    reset,
    errors,
    register,
    handleSubmit,
    setValue,
    isSubmitting,
  } = useProductForm();

  const [imagePreviews, setImagePreviews] = useState<(string | ProductImage)[]>(
    []
  );
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [removedImageIds, setRemovedImageIds] = useState<number[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);

      // Store the actual files
      setImageFiles((prev) => [...prev, ...files]);

      // Create preview URLs
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newPreviews]);

      // Update form value with both existing images and new files
      const currentImages = watch("images") || [];
      setValue("images", [...currentImages, ...files], {
        shouldValidate: true,
      });
    }
  };

  const removeImage = (index: number) => {
    const itemToRemove = imagePreviews[index];
    const currentImages = watch("images") || [];

    if (typeof itemToRemove === "string") {
      // New image - revoke object URL and remove from files
      URL.revokeObjectURL(itemToRemove);
      const newFiles = [...imageFiles];
      newFiles.splice(index - (imagePreviews.length - imageFiles.length), 1);
      setImageFiles(newFiles);

      // Remove from form values (Files only)
      const updatedImages = currentImages.filter((img) => img instanceof File);
      setValue("images", updatedImages, { shouldValidate: true });
    } else {
      // Existing image - add to removed images list
      setRemovedImageIds((prev) => [...prev, itemToRemove.id]);

      // Remove from form values (keep Files, filter out this ProductImage)
      const updatedImages = currentImages.filter(
        (img) =>
          !(
            typeof img === "object" &&
            "id" in img &&
            img.id === itemToRemove.id
          )
      );
      setValue("images", updatedImages, { shouldValidate: true });
    }

    // Update previews
    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  const handleCategorySelect = (category: Category) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("categoryId", category.id.toString());
    router.push(`?${newSearchParams.toString()}`, { scroll: false });

    setSelectedCategory(category);
    setValue("categoryId", category.id);
    setShowCategoryList(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (product) {
      // Reset form with product data
      reset({
        name: product.name,
        description: product.description || "",
        brand: product.brand,
        basePrice: product.basePrice,
        categoryId: product.categoryId,
        images: product.images || [],
      });

      // Set category from product data
      if (product.category) {
        setSelectedCategory(product.category);
      }

      // Set existing images
      if (product.images && product.images.length > 0) {
        setImagePreviews(product.images);
      }
    } else {
      // Reset to empty form for new product
      reset({
        name: "",
        description: "",
        brand: "",
        basePrice: 0,
        categoryId: undefined,
        images: [],
      });
      setSelectedCategory(null);
      setImagePreviews([]);
      setImageFiles([]);
      setRemovedImageIds([]);
    }
  }, [product, reset]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (product) {
        // Edit existing product
        const updatePayload = await prepareProductUpdate(data, removedImageIds);
        const updatedProduct = await editProductById(product.id, updatePayload);
        console.log("Product updated successfully:", updatedProduct);
      } else {
        // Create new product
        const createPayload = {
          name: data.name,
          description: data.description,
          brand: data.brand,
          basePrice: data.basePrice,
          categoryId: data.categoryId,
          images: data.images.filter((img) => img instanceof File) as File[],
        };
        const newProduct = await createProduct(createPayload);
        console.log("Product created successfully:", newProduct);
        // Optionally reset form after successful creation
        reset();
        setImagePreviews([]);
        setImageFiles([]);
        setSelectedCategory(null);
      }
    } catch (error) {
      console.error("Product operation failed:", error);
      // Show error to user
    }
  };

  return (
    <div className="w-[100%] h-[100%] flex justify-start items-start p-[5px]">
      <div
        className="w-[70%] h-full  p-[5px] overflow-y-scroll"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {product && (
          <div className="w-full h-[40px] flex items-center justify-end">
            <Link
              href={`${product.id}/manage-variants`}
              className="w-auto h-auto px-[10px] py-[8px] disabled:bg-gray-400 bg-[#635DB0] text-white text-[0.7rem] cursor-pointer"
            >
              Manage Variants
            </Link>
          </div>
        )}
        {/* PRODUCT FORM  ------------------------------------------------------------------------------------------- */}
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <section className="w-full h-auto border border-[#D0D5DD] mb-[20px] rounded">
            <div className="w-full h-[40px] flex items-center mb-[20px] px-[10px] bg-[#e4f0ff] border-b border-[#D0D5DD]">
              <p className="text-[0.8rem] font-medium">PRODUCT DETAILS</p>
            </div>
            <div className="w-full h-[calc(100%-40px)] border-green-500 px-[10px]">
              <div className="w-full h-auto flex justify-between">
                {/* Product name group ------------- */}
                <div className="w-[48%] h-[100px] flex flex-col  border-blue-700">
                  <div className="w-full h-[30px] flex items-center justify-start">
                    <label htmlFor="name" className="text-[0.8rem] font-medium">
                      PRODUCT NAME
                    </label>
                  </div>
                  <div className="w-full h-[40px] flex items-center justify-start">
                    <input
                      id="name"
                      {...register("name")}
                      placeholder="Enter product name"
                      className={`w-full h-full text-[0.8rem] placeholder:text-[0.75rem] border-b border-[#D0D5DD]`}
                    />
                  </div>
                  <div className="w-full h-[30px] flex items-center justify-start">
                    {errors.name && (
                      <p className="text-[0.7rem] text-[#D92D20] font-medium">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Product category group ------------- */}
                <div className="w-[48%] h-[100px] flex flex-col">
                  <div className="w-full h-[30px] flex items-center justify-start">
                    <label className="text-[0.8rem] font-medium">
                      SELECT CATEGORY
                    </label>
                  </div>
                  <div className="w-full flex-1 flex items-center justify-start">
                    <div className="w-full h-full flex relative border-b border-[#D0D5DD]">
                      <input type="hidden" {...register("categoryId")} />
                      <input
                        className="flex-1 h-full text-[0.8rem] relative placeholder:text-[0.75rem]"
                        value={selectedCategory?.name || ""}
                        readOnly
                        placeholder="Select category"
                        onClick={() => setShowCategoryList((prev) => !prev)}
                      />
                      <div className="h-full aspect-square flex items-center justify-center">
                        <Icon
                          onClick={() => setShowCategoryList((prev) => !prev)}
                          icon="lucide:chevron-down"
                          className="w-[50%] h-[50%] cursor-pointer"
                        />
                      </div>
                      {showCategoryList && (
                        <div
                          className="absolute w-full h-[auto] max-h-[350px] mt-[45px] py-[5px] overflow-y-scroll bg-white border border-[#D0D5DD] rounded z-10"
                          style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                          }}
                        >
                          {categories.map((pCategory) => (
                            <div
                              key={pCategory.id}
                              className="w-full h-[40px] flex items-center px-[5px] cursor-pointer"
                              onClick={() => handleCategorySelect(pCategory)}
                            >
                              <div className="w-full h-full flex items-center hover:bg-[#e4f0ff] px-[20px] rounded">
                                <p className="text-[0.8rem] font-medium">
                                  {pCategory.name}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full h-[30px] flex items-center justify-start">
                    {errors.categoryId && (
                      <p className="text-[0.7rem] text-[#D92D20] font-medium">
                        {errors.categoryId.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* Product desc group ------------- */}
              <div className="w-[100%] h-auto flex flex-col  border-blue-700">
                <div className="w-full h-[30px] flex items-center justify-start">
                  <label htmlFor="name" className="text-[0.8rem] font-medium">
                    PRODUCT DESCRIPTION
                  </label>
                </div>
                <div className="w-full h-auto flex items-center justify-start">
                  <textarea
                    id="description"
                    {...register("description")}
                    className={`w-full min-h-[70px] text-[0.8rem] placeholder:text-[0.75rem] border border-[#D0D5DD] p-[5px]`}
                  />
                </div>
                <div className="w-full h-[30px] flex items-center justify-start">
                  {errors.description && (
                    <p className="text-[0.7rem] text-[#D92D20] font-medium">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full h-auto flex justify-between">
                {/* Product brand group ------------- */}
                <div className="w-[48%] h-[100px] flex flex-col  border-blue-700">
                  <div className="w-full h-[30px] flex items-center justify-start">
                    <label htmlFor="name" className="text-[0.8rem] font-medium">
                      PRODUCT BRAND
                    </label>
                  </div>
                  <div className="w-full h-[40px] flex items-center justify-start">
                    <input
                      id="brand"
                      {...register("brand")}
                      placeholder="Enter brand name"
                      className={`w-full h-full text-[0.8rem] placeholder:text-[0.75rem] border-b border-[#D0D5DD]`}
                    />
                  </div>
                  <div className="w-full h-[30px] flex items-center justify-start">
                    {errors.brand && (
                      <p className="text-[0.7rem] text-[#D92D20] font-medium">
                        {errors.brand.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Product base group ------------- */}
                <div className="w-[48%] h-[100px] flex flex-col  border-blue-700">
                  <div className="w-full h-[30px] flex items-center justify-start">
                    <label htmlFor="name" className="text-[0.8rem] font-medium">
                      BASE PRICE (₹)
                    </label>
                  </div>
                  <div className="w-full h-[40px] flex items-center justify-start">
                    <input
                      id="basePrice"
                      type="number"
                      step="0.01"
                      {...register("basePrice", { valueAsNumber: true })}
                      placeholder="0.00"
                      className={`w-full h-full text-[0.8rem] placeholder:text-[0.75rem] border-b border-[#D0D5DD]`}
                    />
                  </div>
                  <div className="w-full h-[30px] flex items-center justify-start">
                    {errors.basePrice && (
                      <p className="text-[0.7rem] text-[#D92D20] font-medium">
                        {errors.basePrice.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Product images group */}
              <div className="w-full h-auto flex flex-col border rounded border-[#D0D5DD] my-[15px]">
                <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] justify-start border-b border-[#D0D5DD] px-[10px]">
                  <div className="text-[0.8rem] font-medium">
                    UPLOAD PRODUCT IMAGES
                  </div>
                </div>
                <div
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                  className="w-full h-[300px] grid grid-cols-5 gap-2 overflow-y-scroll whitespace-nowrap p-[10px]"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    multiple
                    accept="image/*"
                    className="hidden"
                  />
                  <div
                    onClick={triggerFileInput}
                    className="w-[100%] aspect-[1/1] border border-dashed rounded flex items-center justify-center cursor-pointer"
                  >
                    <Icon
                      icon="lucide:plus"
                      className="w-[20px] h-[20px] text-[#635DB0]"
                    />
                  </div>
                  {imagePreviews.map((img, index) => (
                    <div
                      key={index}
                      className="relative w-[100%] aspect-[1/1] rounded"
                    >
                      <Image
                        src={typeof img === "string" ? img : img.url}
                        alt={`Variant ${index}`}
                        fill={true}
                        className="w-full h-full object-contain rounded border border-[#D0D5DD]"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 w-[20px] h-[20px] bg-red-400 rounded-full flex items-center justify-center cursor-pointer"
                      >
                        <Icon
                          icon="lucide:x"
                          className="w-[50%] h-[50%] text-white"
                        />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="w-full h-[30px] flex items-center border-t border-[#D0D5DD] px-[10px]">
                  {errors.images && (
                    <p className="text-[0.7rem] text-[#D92D20] font-medium">
                      {errors.images.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full h-[40px] flex items-center justify-end px-[10px]">
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-auto h-auto px-[10px] py-[8px] disabled:bg-gray-400 bg-[#635DB0] text-white text-[0.7rem] cursor-pointer"
              >
                {isSubmitting ? "..." : "Save Product"}
              </button>
            </div>
          </section>
        </form>

        {/* VARIANT MANAGEMENT : SELECTING ATTRUBUTE OPTIONS AND VARIANT GENERATION --------------------------------- */}
        {/* <VariantManagement selectedCategory={selectedCategory} /> */}
      </div>

      {/* VARIANT EDIT AND IMAGE UPLOAD ------------------------------------------------------------------------------ */}
      {/* <VariantEditForm /> */}
    </div>
  );
};

export default ProductAddForm;
