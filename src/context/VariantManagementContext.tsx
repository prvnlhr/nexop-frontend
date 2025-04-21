import {
  Attribute,
  GeneratedVariant,
  ProductDetails,
  Variant,
  VariantAttribute,
} from "@/types/variantsNewTypes";
import { createContext, useContext, useState, ReactNode } from "react";

interface ColorImageData {
  optionId: number;
  attributeId: number;
  productId: number;
  files: File[];
  previews: string[];
}

interface VariantManagementContextType {
  product: ProductDetails | null;
  attributes: Attribute[];
  variants: Variant[];
  setProduct: (product: ProductDetails | null) => void;
  setAttributes: (attributes: Attribute[]) => void;
  setVariants: (variants: Variant[]) => void;
  setActiveColorTab: (activeColorTab: number | null) => void;
  setEditingVariant: (editingVariant: GeneratedVariant | null) => void;
  editingVariant: GeneratedVariant | null;
  generatedVariants: GeneratedVariant[];
  activeColorTab: number | null;
  colorImages: { [optionId: number]: ColorImageData };
  updateVariant: (updatedVariant: GeneratedVariant) => void;

  toggleAttributeOption: (attributeId: number, optionId: number) => void;
  addColorImages: (
    optionId: number,
    attributeId: number,
    productId: number,
    files: File[]
  ) => void;

  removeColorImage: (optionId: number, index: number) => void;
  generateVariants: () => void;
}

const VariantManagementContext = createContext<
  VariantManagementContextType | undefined
>(undefined);

export const VariantManagementProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  //-- USE STATES ------------------------------------------------------------------------------------------------------------------------------
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [activeColorTab, setActiveColorTab] = useState<number | null>(null);
  const [colorImages, setColorImages] = useState<{
    [optionId: number]: ColorImageData;
  }>({});
  const [generatedVariants, setGeneratedVariants] = useState<
    GeneratedVariant[]
  >([]);

  const [editingVariant, setEditingVariant] = useState<GeneratedVariant | null>(
    null
  );

  //-- HANDLER FUNCTION ------------------------------------------------------------------------------------------------------------------------
  const toggleAttributeOption = (attributeId: number, optionId: number) => {
    setAttributes((prevAttributes) =>
      prevAttributes.map((attribute) => {
        if (attribute.id === attributeId) {
          return {
            ...attribute,
            options: attribute.options.map((option) =>
              option.id === optionId
                ? { ...option, selected: !option.selected }
                : option
            ),
          };
        }
        return attribute;
      })
    );
  };

  const addColorImages = (
    optionId: number,
    attributeId: number,
    productId: number,
    files: File[]
  ) => {
    setColorImages((prev) => {
      const existing = prev[optionId] || {
        optionId,
        attributeId,
        productId,
        files: [],
        previews: [],
      };
      const newFiles = [...existing.files, ...files];
      const newPreviews = [
        ...existing.previews,
        ...files.map((file) => URL.createObjectURL(file)),
      ];
      return {
        ...prev,
        [optionId]: {
          ...existing,
          files: newFiles,
          previews: newPreviews,
        },
      };
    });
  };

  const removeColorImage = (optionId: number, index: number) => {
    setColorImages((prev) => {
      const existing = prev[optionId];
      if (!existing) return prev;

      URL.revokeObjectURL(existing.previews[index]);

      const newFiles = existing.files.filter((_, i) => i !== index);
      const newPreviews = existing.previews.filter((_, i) => i !== index);
      return {
        ...prev,
        [optionId]: {
          ...existing,
          files: newFiles,
          previews: newPreviews,
        },
      };
    });
  };

  const generateVariants = () => {
    if (!product) return;

    // Filter attributes with selected options
    const selectedAttributes = attributes.filter((attr) =>
      attr.options.some((opt) => opt.selected)
    );
    if (selectedAttributes.length === 0) return;

    // Generate all combinations
    const combinations = selectedAttributes.reduce((acc, attr) => {
      const selectedOptions = attr.options.filter((opt) => opt.selected);
      const newCombinations: VariantAttribute[][] = [];
      selectedOptions.forEach((opt) => {
        const attrCombo = {
          attributeId: attr.id,
          attributeName: attr.name,
          optionId: opt.id,
          optionValue: opt.value,
        };
        if (acc.length === 0) {
          newCombinations.push([attrCombo]);
        } else {
          acc.forEach((combo) => {
            newCombinations.push([...combo, attrCombo]);
          });
        }
      });
      return newCombinations;
    }, [] as VariantAttribute[][]);

    // Create descriptive SKUs and variants
    const newVariants: GeneratedVariant[] = combinations.map((combo) => {
      // Generate SKU: ProductName-OptionValue1-OptionValue2-...
      const skuParts = [
        product.name.replace(/\s+/g, "-"),
        ...combo.map((attr) => attr.optionValue.replace(/\s+/g, "-")),
      ];
      const sku = skuParts.join("-").toLowerCase();

      return {
        sku,
        name: product.name,
        slug: "",
        price: product.basePrice,
        stock: 0,
        status: "ACTIVE",
        attributes: combo,
      };
    });

    setGeneratedVariants(newVariants);
  };

  const updateVariant = (updatedVariant: GeneratedVariant) => {
    setGeneratedVariants((prevVariants) =>
      prevVariants.map((variant) =>
        variant.sku === updatedVariant.sku ? updatedVariant : variant
      )
    );
  };

  const value: VariantManagementContextType = {
    product,
    attributes,
    variants,
    setProduct,
    setAttributes,
    setVariants,
    toggleAttributeOption,
    colorImages,
    addColorImages,
    removeColorImage,
    setActiveColorTab,
    activeColorTab,
    generatedVariants,
    generateVariants,
    editingVariant,
    setEditingVariant,
    updateVariant,
  };

  return (
    <VariantManagementContext.Provider value={value}>
      {children}
    </VariantManagementContext.Provider>
  );
};

export const useVariantManagementContext = () => {
  const context = useContext(VariantManagementContext);
  if (!context) {
    throw new Error(
      "useVariantManagementContext must be used within a VariantManagementProvider"
    );
  }
  return context;
};
