"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { KeyboardEvent, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Category } from "@/types/categoryTypes";
import {
  createAttribute,
  fetchAttributesByCategory,
  updateAttributeOptions,
} from "@/lib/services/admin/attributeServices";
import { AttributeWithOptions } from "@/types/attributeTypes";

const attributeSchema = z.object({
  name: z.string().min(1, "Attribute name is required"),
  categoryId: z.number().min(1, "Please select a category"),
  attributeId: z.number().optional(), // For existing attributes
});

type AttributeFormData = z.infer<typeof attributeSchema>;

interface AttributeAddFormProps {
  categories: Category[];
}

const AttributeAddForm: React.FC<AttributeAddFormProps> = ({ categories }) => {
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [attributeOptions, setAttributeOptions] = useState<string[]>([]);
  const [currentOption, setCurrentOption] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [showAttributeDropdown, setShowAttributeDropdown] = useState(false);
  const [categoryAttributes, setCategoryAttributes] = useState<
    AttributeWithOptions[]
  >([]);
  const [selectedAttribute, setSelectedAttribute] =
    useState<AttributeWithOptions | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AttributeFormData>({
    resolver: zodResolver(attributeSchema),
    defaultValues: {
      name: "",
      categoryId: undefined,
      attributeId: undefined,
    },
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "categoryId" && value.categoryId) {
        getCategoryAttributes(value.categoryId);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  const onSubmit = async (data: AttributeFormData) => {
    if (attributeOptions.length === 0) {
      setSubmitError("Please add at least one option");
      return;
    }

    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      if (data.attributeId) {
        // Update existing attribute options
        await updateAttributeOptions({
          attributeId: data.attributeId,
          options: attributeOptions,
        });
        setSubmitSuccess("Attribute options updated successfully!");
      } else {
        // Create new attribute with options
        const payload = {
          attributeData: {
            name: data.name,
            categoryId: data.categoryId,
            isFilterable: true,
            displayOrder: 0,
          },
          attributeOptions,
        };
        await createAttribute(payload);
        setSubmitSuccess("Attribute created successfully!");
      }

      // Reset form
      resetForm();
    } catch (error) {
      const err =
        error instanceof Error ? error.message : "Failed to process attribute";
      setSubmitError(err);
    }
  };

  const resetForm = () => {
    reset();
    setSelectedCategory(null);
    setSelectedAttribute(null);
    setCategoryAttributes([]);
    setAttributeOptions([]);
    setCurrentOption("");
  };

  const getCategoryAttributes = async (categoryId: number) => {
    try {
      const attributesData = await fetchAttributesByCategory(categoryId);
      setCategoryAttributes(attributesData);
    } catch (error) {
      console.error("Error fetching attributes:", error);
      setCategoryAttributes([]);
    }
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setValue("categoryId", category.id, { shouldValidate: true });
    setShowCategoryList(false);
    setValue("name", "");
    setValue("attributeId", undefined);
    setSelectedAttribute(null);
  };

  const handleAttributeSelect = (attribute: AttributeWithOptions) => {
    setSelectedAttribute(attribute);
    setValue("name", attribute.name, { shouldValidate: true });
    setValue("attributeId", attribute.id);
    setShowAttributeDropdown(false);
    // Pre-fill existing options if any
    setAttributeOptions(attribute.options.map((opt) => opt.value));
  };

  const handleOptionKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentOption.trim()) {
      e.preventDefault();
      setAttributeOptions([...attributeOptions, currentOption.trim()]);
      setCurrentOption("");
    }
  };

  const removeOption = (index: number) => {
    setAttributeOptions(attributeOptions.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full h-full flex justify-center items-start md:justify-start p-[0px] md:p-[20px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[100%] md:w-[50%] h-auto max-h-[95%] border-[#D0D5DD] p-[5px] border rounded"
      >
        <div className="w-full h-auto flex flex-col border border-[#D0D5DD] rounded mb-[20px]">
          <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] justify-start border-b border-[#D0D5DD] px-[10px] mb-[10px]">
            <label className="text-[0.8rem] font-medium">
              ATTRIBUTE NAME & CATEGORY
            </label>
          </div>

          {/* Category input group */}
          <div className="w-[100%] h-[90px] flex flex-col mb-[5px] px-[10px]">
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
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    {categories.map((pCategory: Category) => (
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

          {/* Attribute name input group */}
          <div className="w-[100%] h-[90px] flex flex-col mb-[5px] px-[10px]">
            <div className="w-full h-[30px] flex items-center justify-start">
              <label htmlFor="name" className="text-[0.8rem] font-medium">
                ATTRIBUTE NAME
              </label>
            </div>
            <div className="w-full flex-1 flex items-center justify-start">
              <div className="w-full h-full relative flex">
                <div className="flex-1 h-full">
                  <input
                    id="name"
                    placeholder={
                      categoryAttributes.length > 0
                        ? "Select or enter attribute name"
                        : "Enter attribute name"
                    }
                    {...register("name")}
                    className={`w-full h-full text-[0.8rem] placeholder:text-[0.75rem] border-b ${
                      errors.name ? "border-[#D92D20]" : "border-[#D0D5DD]"
                    }`}
                    // onFocus={() =>
                    //   categoryAttributes.length > 0 &&
                    //   setShowAttributeDropdown(true)
                    // }
                  />
                </div>
                {categoryAttributes.length > 0 && (
                  <div className="aspect-square h-full flex items-center justify-center">
                    <Icon
                      onClick={() => setShowAttributeDropdown((prev) => !prev)}
                      icon="lucide:chevron-down"
                      className="w-[50%] h-[50%] cursor-pointer"
                    />
                  </div>
                )}
                {showAttributeDropdown && categoryAttributes.length > 0 && (
                  <div
                    className="left-0 top-full absolute w-full h-[auto] max-h-[200px] mt-[2px] py-[5px] overflow-y-auto bg-white border border-[#D0D5DD] rounded z-10"
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    {categoryAttributes.map(
                      (attribute: AttributeWithOptions) => (
                        <div
                          key={attribute.id}
                          className="w-full h-[40px] flex items-center px-[5px] cursor-pointer"
                          onClick={() => handleAttributeSelect(attribute)}
                        >
                          <div className="w-full h-full flex items-center hover:bg-[#e4f0ff] px-[20px] rounded">
                            <p className="text-[0.8rem] font-medium">
                              {attribute.name}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="w-full h-[30px] flex items-center justify-start">
              {errors.name && (
                <p className="text-[0.7rem] text-[#D92D20] font-medium">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Attribute options input group */}
        <div className="w-[100%] h-auto flex flex-col mb-[20px] border border-[#D0D5DD] rounded">
          <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] justify-start border-b border-[#D0D5DD] p-[10px]">
            <label className="text-[0.8rem] font-medium">
              ATTRIBUTE OPTIONS
            </label>
          </div>
          <div
            className="w-full min-h-[40px] max-h-[100px] flex flex-wrap items-center border-[#D0D5DD] p-[10px] overflow-y-scroll"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {attributeOptions.map((option, index) => (
              <div
                key={index}
                className="w-auto h-[30px] bg-[#e4f0ff] border border-[#D0D5DD] flex items-center my-[5px] mr-[10px] rounded cursor-pointer"
              >
                <div className="flex-1 h-full flex items-center justify-center pl-[10px] text-[0.75rem]">
                  {option}
                </div>
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="h-full aspect-[1/1] flex items-center justify-center cursor-pointer"
                >
                  <Icon
                    icon="radix-icons:cross-2"
                    className="w-[40%] h-[40%]"
                  />
                </button>
              </div>
            ))}
            <input
              type="text"
              value={currentOption}
              onChange={(e) => setCurrentOption(e.target.value)}
              onKeyDown={handleOptionKeyDown}
              placeholder="Type option and press Enter..."
              className="h-[40px] min-w-[100px] text-[0.8rem] placeholder:text-[0.75rem] outline-none"
            />
          </div>
          {submitError && (
            <div className="w-full h-[30px] flex items-center justify-start px-[10px]">
              <p className="text-[0.7rem] text-[#D92D20] font-medium">
                {submitError}
              </p>
            </div>
          )}
          {submitSuccess && (
            <div className="w-full h-[30px] flex items-center justify-start px-[10px]">
              <p className="text-[0.7rem] text-green-600 font-medium">
                {submitSuccess}
              </p>
            </div>
          )}
        </div>

        {/* Submit button */}
        <div className="w-full h-[50px] flex items-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-[15px] py-[8px] bg-[#625DAF] text-[0.75rem] text-white rounded cursor-pointer ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {selectedAttribute ? "Update Options" : "Create Attribute"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AttributeAddForm;
