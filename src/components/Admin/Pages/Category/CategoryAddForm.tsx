"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createCategory } from "@/lib/services/admin/categoryServices";
import { Category } from "@/types/categoryTypes";

// Zod schema for form validation
const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  parentId: z.union([z.number(), z.null(), z.undefined()]).optional(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryAddFormProps {
  categories: Category[];
}

const CategoryAddForm: React.FC<CategoryAddFormProps> = ({ categories }) => {
  const [showParentCategoryList, setShowParentCategoryList] = useState(false);
  const [selectedParent, setSelectedParent] = useState<Category | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      parentId: null,
    },
  });

  const onSubmit = async (data: CategoryFormData) => {
    try {
      const result = await createCategory({
        name: data.name,
        parentId: data.parentId ?? null,
        // Convert undefined to null for DB
      });

      console.log("Category created:", result);
      reset();
      setSelectedParent(null);
    } catch (error) {
      console.error("Error creating category:", error);
      // Optionally show error message to user
    }
  };

  const handleParentSelect = (category: Category) => {
    setSelectedParent(category);
    setValue("parentId", category.id);
    setShowParentCategoryList(false);
  };

  const clearParentSelection = () => {
    setSelectedParent(null);
    setValue("parentId", null, { shouldValidate: true });
    setShowParentCategoryList(false);
  };

  return (
    <div className="w-full h-full flex justify-center items-start md:justify-start p-[0px] md:p-[20px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[90%] md:w-[50%] h-auto border-[#D0D5DD] mt-[10%] md:mt-[5%]"
      >
        {/* Category name input group */}
        <div className="w-[100%]  h-[90px] flex flex-col mb-[10px]">
          <div className="w-full h-[30px] flex items-center justify-start">
            <label htmlFor="name" className="text-[0.8rem] font-medium">
              CATEGORY NAME
            </label>
          </div>
          <div className="w-full flex-1 flex items-center justify-start">
            <input
              id="name"
              placeholder="Enter category name"
              {...register("name")}
              className={`w-full h-full text-[0.8rem] placeholder:text-[0.75rem]  border-b ${
                errors.name ? "border-[#D92D20]" : "border-[#D0D5DD]"
              }`}
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

        {/* Parent Category input group */}
        <div className="w-[100%]  h-[90px] flex flex-col">
          <div className="w-full h-[30px] flex items-center justify-start">
            <label className="text-[0.8rem] font-medium">
              SELECT PARENT CATEGORY (OPTIONAL)
            </label>
          </div>
          <div className="w-full flex-1 flex items-center justify-start">
            <div className="w-full h-full flex relative border-b border-[#D0D5DD]">
              <input type="hidden" {...register("parentId")} />
              <input
                className="flex-1 h-full text-[0.8rem] relative placeholder:text-[0.75rem]"
                value={selectedParent?.name || ""}
                readOnly
                placeholder="Select parent category"
                onClick={() => setShowParentCategoryList((prev) => !prev)}
              />
              <div className="h-full aspect-square flex items-center justify-center">
                {selectedParent ? (
                  <Icon
                    onClick={clearParentSelection}
                    icon="lucide:x"
                    className="w-[50%] h-[50%] cursor-pointer text-gray-500 hover:text-gray-700"
                  />
                ) : (
                  <Icon
                    onClick={() => setShowParentCategoryList((prev) => !prev)}
                    icon="lucide:chevron-down"
                    className="w-[50%] h-[50%] cursor-pointer"
                  />
                )}
              </div>
              {showParentCategoryList && (
                <div
                  className="absolute w-full h-[auto] max-h-[250px] mt-[45px] py-[5px] overflow-y-scroll bg-white border border-[#D0D5DD] rounded z-10"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  <div
                    className="w-full h-[40px] flex items-center px-[5px] cursor-pointer"
                    onClick={() => {
                      clearParentSelection();
                      setShowParentCategoryList(false);
                    }}
                  >
                    <div className="w-full h-full flex items-center hover:bg-[#e4f0ff] px-[20px] rounded">
                      <p className="text-[0.8rem] font-medium text-gray-500">
                        No parent category
                      </p>
                    </div>
                  </div>
                  {categories.map((pCategory: Category) => (
                    <div
                      key={pCategory.id}
                      className="w-full h-[40px] flex items-center px-[5px] cursor-pointer"
                      onClick={() => handleParentSelect(pCategory)}
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
          {/* Optional: Display error if parent category is required */}
          <div className="w-full h-[30px] flex items-center justify-start">
            {errors.parentId && (
              <p className="text-[0.7rem] text-[#D92D20] font-medium">
                {errors.parentId.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit button */}
        <div className="w-full h-auto">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-[20px] py-[10px] bg-[#625DAF] text-[0.75rem] text-white rounded cursor-pointer"
          >
            {isSubmitting ? "Creating..." : "Create Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryAddForm;
