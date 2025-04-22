import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import {
  Attribute,
  GeneratedVariant,
  ProductDetails,
  // ProductVariantData,
  Variant,
  VariantAttribute,
} from "@/types/variantsNewTypes";

interface ImageData {
  url: string;
  publicId?: string;
  order: number;
  source: "client" | "db";
  file?: File;
}

interface ColorImageData {
  optionId: number;
  attributeId: number;
  productId: number;
  images: ImageData[];
  deletedPublicIds?: string[];
}

interface VariantManagementContextType {
  product: ProductDetails | null;
  attributes: Attribute[];
  variants: Variant[];
  generatedVariants: GeneratedVariant[];
  colorImages: { [optionId: number]: ColorImageData };
  activeColorTab: number | null;
  editingVariant: Variant | GeneratedVariant | null;
  hasDuplicates: boolean;
  setProduct: (product: ProductDetails | null) => void;
  setAttributes: (attributes: Attribute[]) => void;
  setVariants: (variants: Variant[]) => void;
  setGeneratedVariants: (variants: GeneratedVariant[]) => void;
  setActiveColorTab: (activeColorTab: number | null) => void;
  setEditingVariant: (
    editingVariant: Variant | GeneratedVariant | null
  ) => void;
  toggleAttributeOption: (attributeId: number, optionId: number) => void;
  addColorImages: (
    optionId: number,
    attributeId: number,
    productId: number,
    files: File[]
  ) => void;
  removeColorImage: (optionId: number, index: number) => void;
  initializeColorImages: (variants: Variant[]) => void;
  generateVariants: () => void;
  updateVariant: (updatedVariant: Variant | GeneratedVariant) => void;
  updateDbVariant: (variant: Variant, optionId: number) => Promise<void>;
  removeGeneratedVariant: (sku: string) => void;
  isDuplicate: (variant: GeneratedVariant | Variant) => boolean;
  // resetContext: (data?: ProductVariantData) => void;
}

const VariantManagementContext = createContext<
  VariantManagementContextType | undefined
>(undefined);

export const VariantManagementProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [generatedVariants, setGeneratedVariants] = useState<
    GeneratedVariant[]
  >([]);
  const [activeColorTab, setActiveColorTab] = useState<number | null>(null);
  const [colorImages, setColorImages] = useState<{
    [optionId: number]: ColorImageData;
  }>({});
  const [editingVariant, setEditingVariant] = useState<
    Variant | GeneratedVariant | null
  >(null);
  const [hasDuplicates, setHasDuplicates] = useState<boolean>(false);

  const isDuplicate = (variant: GeneratedVariant | Variant) => {
    const attrs = "attributes" in variant ? variant.attributes : [];
    const newAttrSet = new Set(
      attrs.map((attr) => `${attr.attributeId}:${attr.optionId}`)
    );
    return variants.some((existing) => {
      const existingAttrSet = new Set(
        existing.attributes.map(
          (attr) => `${attr.attributeId}:${attr.optionId}`
        )
      );
      return (
        newAttrSet.size === existingAttrSet.size &&
        [...newAttrSet].every((attr) => existingAttrSet.has(attr))
      );
    });
  };

  useEffect(() => {
    const checkDuplicates = () => {
      const hasAnyDuplicates = generatedVariants.some((variant) =>
        isDuplicate(variant)
      );
      setHasDuplicates(hasAnyDuplicates);
    };
    checkDuplicates();
  }, [generatedVariants, variants]);

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
        images: [],
        deletedPublicIds: [],
      };
      const newImages: ImageData[] = files.map((file, index) => ({
        url: URL.createObjectURL(file),
        order: existing.images.length + index,
        source: "client",
        file,
      }));
      return {
        ...prev,
        [optionId]: {
          ...existing,
          images: [...existing.images, ...newImages],
        },
      };
    });
  };

  const removeColorImage = (optionId: number, index: number) => {
    setColorImages((prev) => {
      const existing = prev[optionId];
      if (!existing) return prev;

      const imageToRemove = existing.images[index];
      if (imageToRemove.source === "client" && imageToRemove.file) {
        URL.revokeObjectURL(imageToRemove.url);
      }

      const newImages = existing.images.filter((_, i) => i !== index);
      const deletedPublicIds =
        imageToRemove.source === "db" && imageToRemove.publicId
          ? [...(existing.deletedPublicIds || []), imageToRemove.publicId]
          : existing.deletedPublicIds;

      return {
        ...prev,
        [optionId]: {
          ...existing,
          images: newImages,
          deletedPublicIds,
        },
      };
    });
  };

  const initializeColorImages = useCallback((variants: Variant[]) => {
    setColorImages((prev) => {
      const newColorImages: { [optionId: number]: ColorImageData } = {
        ...prev,
      };
      variants.forEach((variant) => {
        const colorAttr = variant.attributes.find(
          (attr) => attr.attributeName.toLowerCase() === "color"
        );
        if (colorAttr && variant.images.length > 0) {
          const optionId = colorAttr.optionId;
          // Only update if not already initialized for this optionId
          if (
            !newColorImages[optionId] ||
            newColorImages[optionId].images.every((img) => img.source !== "db")
          ) {
            newColorImages[optionId] = {
              optionId,
              attributeId: colorAttr.attributeId,
              productId: variant.id!,
              images: variant.images
                .map((img) => ({
                  url: img.url,
                  publicId: img.publicId,
                  order: img.order,
                  source: "db" as const,
                }))
                .sort((a, b) => a.order - b.order),
              deletedPublicIds: [],
            };
          }
        }
      });
      return newColorImages;
    });
  }, []);

  const generateVariants = () => {
    if (!product) return;

    const selectedAttributes = attributes.filter((attr) =>
      attr.options.some((opt) => opt.selected)
    );
    if (selectedAttributes.length === 0) return;

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

    const newVariants: GeneratedVariant[] = combinations.map((combo) => {
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

  const updateVariant = (updatedVariant: Variant | GeneratedVariant) => {
    if ("id" in updatedVariant) {
      setVariants((prevVariants) =>
        prevVariants.map((variant) =>
          variant.id === updatedVariant.id
            ? { ...variant, ...updatedVariant }
            : variant
        )
      );
    } else {
      setGeneratedVariants((prevVariants) =>
        prevVariants.map((variant) =>
          variant.sku === updatedVariant.sku ? updatedVariant : variant
        )
      );
    }
  };

  const updateDbVariant = async (variant: Variant, optionId: number) => {
    try {
      const colorImagesData = colorImages[optionId] || {
        images: [],
        deletedPublicIds: [],
      };
      const newImages = colorImagesData.images
        .filter((img) => img.source === "client" && img.file)
        .map((img, index) => ({ file: img.file!, order: index }));
      const existingImages = colorImagesData.images
        .filter((img) => img.source === "db")
        .map((img) => ({
          url: img.url,
          publicId: img.publicId!,
          order: img.order,
        }));

      setVariants((prevVariants) =>
        prevVariants.map((v) =>
          v.id === variant.id
            ? {
                ...v,
                images: [
                  ...existingImages,
                  ...newImages.map((img, index) => ({
                    url: img.file!.name, // Placeholder
                    publicId: `temp-${index}`,
                    order: existingImages.length + index,
                  })),
                ],
              }
            : v
        )
      );
    } catch (error) {
      throw new Error(
        `Failed to update variant: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const removeGeneratedVariant = (sku: string) => {
    setGeneratedVariants((prevVariants) =>
      prevVariants.filter((variant) => variant.sku !== sku)
    );
  };

  // const resetContext = useCallback(
  //   (data?: ProductVariantData) => {
  //     if (data) {
  //       setProduct(data.product);
  //       setAttributes(data.attributes);
  //       setVariants(data.variants);
  //       initializeColorImages(data.variants);
  //     } else {
  //       setProduct(null);
  //       setAttributes([]);
  //       setVariants([]);
  //       setColorImages({});
  //     }
  //   },
  //   [initializeColorImages]
  // );

  const value: VariantManagementContextType = {
    product,
    attributes,
    variants,
    generatedVariants,
    colorImages,
    activeColorTab,
    editingVariant,
    hasDuplicates,
    setProduct,
    setAttributes,
    setVariants,
    setGeneratedVariants,
    setActiveColorTab,
    setEditingVariant,
    toggleAttributeOption,
    addColorImages,
    removeColorImage,
    initializeColorImages,
    generateVariants,
    updateVariant,
    updateDbVariant,
    removeGeneratedVariant,
    isDuplicate,
    // resetContext,
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
