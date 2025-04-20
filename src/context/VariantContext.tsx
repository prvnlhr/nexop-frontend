"use client";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { Attribute, Product, ProductVariant } from "@/types/variantType";

type VariantImageState = Record<
  string, // variant id
  {
    imagePreviewUrls: string[];
    files: File[];
  }
>;

type VariantContextType = {
  fileInputRef: React.RefObject<HTMLInputElement | null>;

  productVariants: ProductVariant[];
  setProductVariants: (variants: ProductVariant[]) => void;

  setAttributes: (attributes: Attribute[]) => void;
  attributes: Attribute[];

  currentEditingVariant: ProductVariant | null;
  setCurrentEditingVariant: (variant: ProductVariant | null) => void;

  variantImages: VariantImageState;

  handleVariantEditing: (currentVariant: ProductVariant) => void;
  saveEditedVariant: () => void;
  handleVariantImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveVariantImage: (index: number) => void;
  handleVariantGenerate: (product: Product) => void;
  toggleAttributeOption: (attributeId: number, optionId: number) => void;
};
const VariantContext = createContext<VariantContextType | undefined>(undefined);

export const VariantProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // CONTEXT STATES ----------------------------------------------------------------------------------------------------------------
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [productVariants, setProductVariants] = useState<ProductVariant[]>([]);
  const [attributes, setAttributes] = useState<Attribute[]>([]);

  const [currentEditingVariant, setCurrentEditingVariant] =
    useState<ProductVariant | null>(null);

  const [variantImages, setVariantImages] = useState<VariantImageState>({});

  // CONTEXT HANDLERS -----------------------------------------------------------------------------------------------------------------------------

  const handleVariantEditing = (currentVariant: ProductVariant) => {
    setCurrentEditingVariant(currentVariant);

    const images = currentVariant.images || [];
    setVariantImages((prev) => ({
      ...prev,
      [currentVariant.sku]: {
        imagePreviewUrls: images.map((img) => img.url),
        files: [],
      },
    }));
  };

  const handleVariantImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      if (!currentEditingVariant) {
        return;
      }
      setVariantImages((prev) => ({
        ...prev,
        [currentEditingVariant.sku]: {
          imagePreviewUrls: [
            ...(prev[currentEditingVariant.sku]?.imagePreviewUrls || []),
            ...newPreviews,
          ],
          files: [
            ...(prev[currentEditingVariant.sku]?.files || []),
            ...newFiles,
          ],
        },
      }));
    }
  };

  const handleRemoveVariantImage = (index: number) => {
    if (!currentEditingVariant) {
      return;
    }
    setVariantImages((prev) => {
      const currentImages = prev[currentEditingVariant.sku];
      if (!currentImages) return prev;

      const updatedPreviews = currentImages.imagePreviewUrls.filter(
        (_, i) => i !== index
      );
      const updatedFiles = currentImages.files.filter((_, i) => i !== index);

      return {
        ...prev,
        [currentEditingVariant.sku]: {
          imagePreviewUrls: updatedPreviews,
          files: updatedFiles,
        },
      };
    });
  };

  // CONTEXT VARIANT GENERATION LOGIC -----------------------------------------------------------------------------------------------------------

  // CONTEXT VARIANT GENERATION LOGIC
  interface AttributeCombination {
    optionId: number;
    attributeId: number;
    attributeName: string;
    optionValue: string;
  }

  const generateSKU = (
    product: Product,
    combination: AttributeCombination[]
  ) => {
    const productCode = product.name.substring(0, 3).toUpperCase();
    const optionCodes = combination
      .map((opt) => opt.optionValue.replace(/[^a-zA-Z0-9]/g, "").toUpperCase())
      .join("-");
    const sku = `${productCode}-${product.id}-${optionCodes}`;
    return sku;
  };

  const handleVariantGenerate = (product: Product) => {
    const selectedAttributes = attributes
      .map((attr) => ({
        ...attr,
        options: attr.options.filter((opt) => opt.selected),
      }))
      .filter((attr) => attr.options.length > 0);

    if (selectedAttributes.length === 0) return;

    // Generate all combinations
    const result: AttributeCombination[][] = [];

    function backtrack(index: number, current: AttributeCombination[]) {
      if (index === selectedAttributes.length) {
        result.push([...current]);
        return;
      }

      const attribute = selectedAttributes[index];
      for (const option of attribute.options) {
        current.push({
          optionId: option.id,
          attributeId: attribute.id,
          attributeName: attribute.name,
          optionValue: option.value,
        });
        backtrack(index + 1, current);
        current.pop();
      }
    }

    backtrack(0, []);

    console.log(result);
    // Create variants
    const variants = result.map((combination) => ({
      sku: generateSKU(product, combination),
      price: product.basePrice,
      stock: 0,
      status: "ACTIVE" as const,
      attributes: combination,
      images: [],
    }));
    setProductVariants(variants);
  };

  const toggleAttributeOption = useCallback(
    (attributeId: number, optionId: number) => {
      setAttributes((prev) =>
        prev.map((attr) => {
          if (attr.id === attributeId) {
            return {
              ...attr,
              options: attr.options.map((opt) =>
                opt.id === optionId ? { ...opt, selected: !opt.selected } : opt
              ),
            };
          }
          return attr;
        })
      );
    },
    []
  );

  // VARIANT SAVE EDITING HANDLDER -----------------------------------------------------------------------------------------------------------
  const saveEditedVariant = () => {
    if (!currentEditingVariant) return;

    setProductVariants((prevVariants) =>
      prevVariants.map((variant) =>
        variant.sku === currentEditingVariant.sku
          ? {
              ...variant,
              price: currentEditingVariant.price,
              stock: currentEditingVariant.stock,
              images:
                variantImages[currentEditingVariant.sku]?.imagePreviewUrls.map(
                  (url, index) => ({
                    id: variant.images[index]?.id || index + 1,
                    url,
                    order: index,
                  })
                ) || variant.images,
            }
          : variant
      )
    );
    setCurrentEditingVariant(null);
  };

  // CONTEXT VALUE OBJ --------------------------------------------------------------------------------------------------------
  const contextValue = {
    productVariants,
    setProductVariants,
    attributes,
    setAttributes,
    currentEditingVariant,
    setCurrentEditingVariant,
    handleVariantEditing,
    saveEditedVariant,
    fileInputRef,
    variantImages,
    handleVariantImageUpload,
    handleRemoveVariantImage,
    handleVariantGenerate,
    toggleAttributeOption,
  };

  return (
    <VariantContext.Provider value={contextValue}>
      {children}
    </VariantContext.Provider>
  );
};

export const useVariantContext = () => {
  const context = useContext(VariantContext);
  if (!context) {
    throw new Error("useVariantContext must be used within a VariantProvider");
  }
  return context;
};
