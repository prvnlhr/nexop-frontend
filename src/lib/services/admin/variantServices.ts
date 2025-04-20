import {
  Variant,
  VariantAttribute,
  VariantImage,
} from "@/app/generated/prisma";
import { uploadToCloudinary } from "@/utils/cloudinaryConfig";

const BASE_URL: string = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// FETCH  ALL VARIANTS ---------------------------------------------------------------------------------------
export async function getProductVariants(productId: number | string) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/admin/variants?productId=${productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();

    if (!response.ok) {
      console.error("Get Variants Error:", result.error || result.message);
      throw new Error(
        result.error || result.message || "Failed to fetch product variants"
      );
    }

    console.log("Get Variants Success:", result.message);
    return result.data;
  } catch (error) {
    const err = error as Error;
    console.error("Get product's Variants Error:", error);
    throw new Error(`Failed to get product's variants: ${err.message}`);
  }
}

// CREATE NEW VARIANTS ---------------------------------------------------------------------------------------
interface VariantImageData {
  id?: number;
  url: string;
  order: number;
}

interface NewVariantPayload {
  sku: string;
  price: number;
  stock: number;
  status?: "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";
  attributes: {
    optionId: number;
    attributeId: number;
    attributeName?: string;
    optionValue?: string;
  }[];
  images: VariantImageData[];
  newImages: File[];
  productId: number;
}

export interface CreateVariantsResponse {
  variants: Variant[];
  variantAttributes: VariantAttribute[];
  variantImages: VariantImage[];
}

export async function createProductVariants(
  variantsData: NewVariantPayload[]
): Promise<CreateVariantsResponse> {
  try {
    // Process each variant in parallel
    const createPromises = variantsData.map(async (variant) => {
      // 1. Upload all new images to Cloudinary
      const uploadResults = await Promise.all(
        variant.newImages.map((file) => uploadToCloudinary(file))
      );

      // 2. Map uploaded images to the correct structure
      const uploadedImages = uploadResults.map((result, index) => ({
        url: result.secure_url,
        publicId: result.public_id,
        order: index, // Use the same order as the files array
      }));

      // 3. Prepare the final payload for this variant
      const variantPayload = {
        productId: variant.productId,
        sku: variant.sku,
        price: variant.price,
        stock: variant.stock,
        status: variant.status || "ACTIVE",
        attributes: variant.attributes.map((attr) => ({
          attributeId: attr.attributeId,
          optionId: attr.optionId,
        })),
        images: uploadedImages,
      };

      // 4. Call the API to create the variant
      const response = await fetch(`${BASE_URL}/api/admin/variants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(variantPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to create variant ${variant.sku}: ${
            errorData.error || errorData.message
          }`
        );
      }

      return await response.json();
    });

    // Wait for all variants to be processed
    const results = await Promise.all(createPromises);

    // Combine all results
    return {
      variants: results.flatMap((r) => r.data.variants),
      variantAttributes: results.flatMap((r) => r.data.variantAttributes),
      variantImages: results.flatMap((r) => r.data.variantImages),
    };
  } catch (error) {
    console.error("Create Variants Error:", error);
    throw new Error(
      `Failed to create product variants: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

// EDIT VARIANTS ---------------------------------------------------------------------------------------
interface EditVariantPayload {
  id?: number;
  sku: string;
  price: number;
  stock: number;
  status: "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";
  images: {
    id?: number;
    url: string;
    order: number;
  }[];
  newImages: File[];
  productId: number;
}

interface ProcessedVariantPayload {
  id?: number;
  sku: string;
  price: number;
  stock: number;
  status: "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";
  images: {
    url: string;
    publicId: string;
    order: number;
  }[];
  productId: number;
}

export async function editProductVariants(
  variants: EditVariantPayload[]
): Promise<{
  results: {
    variant: Variant;
    variantImages: VariantImage[];
  }[];
}> {
  try {
    // Validate newImages count
    variants.forEach((variant) => {
      const blobCount = variant.images.filter((img) =>
        img.url.startsWith("blob:")
      ).length;
      if (variant.newImages.length !== blobCount) {
        throw new Error(
          `Mismatch between blob URLs (${blobCount}) and newImages (${variant.newImages.length}) for SKU ${variant.sku}`
        );
      }
    });

    // 1. Upload all new images to Cloudinary in parallel
    const imageUploadPromises = variants.flatMap((variant) =>
      variant.newImages.map((file) => uploadToCloudinary(file))
    );
    const uploadedImages = await Promise.all(imageUploadPromises);

    // 2. Process variants to create API payload
    let uploadIndex = 0;
    const processedVariants: ProcessedVariantPayload[] = variants.map(
      (variant) => {
        const images = variant.images.map((image, index) => {
          if (image.url.startsWith("blob:")) {
            // Use uploaded image metadata
            const uploadedImage = uploadedImages[uploadIndex++];
            if (!uploadedImage) {
              throw new Error(`No uploaded image for blob URL: ${image.url}`);
            }
            return {
              url: uploadedImage.secure_url,
              publicId: uploadedImage.public_id,
              order: image.order,
            };
          }
          // Existing Cloudinary image
          return {
            url: image.url,
            publicId:
              image.url.split("/").pop()?.split(".")[0] || `image-${index}`,
            order: image.order,
          };
        });

        return {
          id: variant.id,
          sku: variant.sku,
          price: variant.price,
          stock: variant.stock,
          status: variant.status,
          images,
          productId: variant.productId,
        };
      }
    );

    // 3. Update variants in parallel by calling API for each variant
    const updatePromises = processedVariants.map(async (variant) => {
      const response = await fetch(
        `${BASE_URL}/api/admin/variants/${variant.sku}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(variant),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error(
          `Update Variant Error for SKU ${variant.sku}:`,
          result.error || result.message
        );
        throw new Error(
          result.error ||
            result.message ||
            `Failed to update variant ${variant.sku}`
        );
      }

      return result.data;
    });

    const results = await Promise.all(updatePromises);

    return { results };
  } catch (error) {
    const err = error as Error;
    console.error("Edit Variants Error:", error);
    throw new Error(`Failed to edit product variants: ${err.message}`);
  }
}
