import {
  revalidatePathHandler,
  revalidateTagHandler,
} from "@/lib/revalidation";
import { CreateVariantPayload } from "@/types/variantsNewTypes";
import {
  EditVariantPayload,
  ProcessedVariantPayload,
} from "@/types/variantType";

import { deleteImage, uploadToCloudinary } from "@/utils/cloudinaryConfig";

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
        next: {
          tags: ["productVariantsData"],
        },
      }
    );
    const result = await response.json();
    console.log(" result:", result.data);

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

// EDIT VARIANTS ---------------------------------------------------------------------------------------
export async function editProductVariants(variants: EditVariantPayload[]) {
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
      const variantSKU = variant.sku;
      const response = await fetch(
        `${BASE_URL}/api/admin/variants/${variantSKU}`,
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

    await revalidatePathHandler(
      "/admin/inventory/products/edit/[productId]/manage-variants",
      "page"
    );

    return { results };
  } catch (error) {
    const err = error as Error;
    console.error("Edit Variants Error:", error);
    throw new Error(`Failed to edit product variants: ${err.message}`);
  }
}

// NEW service functions ----------------------------------------------------

// fetchProductVariantsData
export async function fetchProductVariantsData(productId: number | string) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/admin/products/${productId}/variants`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    console.log(" result:", result);

    if (!response.ok) {
      console.error(
        "Fetch Product Variants Data Error:",
        result.error || result.message
      );
      throw new Error(
        result.error || result.message || "Failed to fetch product variant data"
      );
    }

    console.log("Fetch Product Variants Data Success:", result.message);
    return result.data;
  } catch (error) {
    const err = error as Error;
    console.error("Fetch Product Variants Data Error:", error);
    throw new Error(`Failed to fetch product variant data: ${err.message}`);
  }
}

// createProductVariants
export async function createProductVariants(
  variantsData: CreateVariantPayload
) {
  try {
    // 1. Upload unique images from colorImages
    const uploadedImagesByOptionId: {
      [optionId: number]: { url: string; publicId: string; order: number }[];
    } = {};
    for (const optionId in variantsData.colorImages) {
      const images = variantsData.colorImages[optionId];
      // Deduplicate by file.name
      const uniqueImages = Array.from(
        new Map(images.map((img) => [img.file.name, img])).values()
      );
      const uploadResults = await Promise.all(
        uniqueImages.map(async (image) => {
          const result = await uploadToCloudinary(image.file);
          return {
            url: result.secure_url,
            publicId: result.public_id,
            order: image.order,
          };
        })
      );
      uploadedImagesByOptionId[optionId] = uploadResults;
    }

    // 2. Create variants with pre-uploaded image metadata
    const createPromises = variantsData.variants.map(async (variant) => {
      // Find the color optionId
      const colorAttr = variant.attributes.find((attr) =>
        variantsData.variants.some((v) =>
          v.attributes.some(
            (a) =>
              a.attributeId === attr.attributeId &&
              Number(a.optionId) in variantsData.colorImages
          )
        )
      );
      const images = colorAttr
        ? uploadedImagesByOptionId[colorAttr.optionId] || []
        : [];

      // Prepare the payload for the API
      const variantPayload = {
        productId: variant.productId,
        name: variant.name,
        slug: variant.slug || variant.name.toLowerCase().replace(/\s+/g, "-"),
        sku: variant.sku,
        price: variant.price,
        stock: variant.stock,
        status: variant.status || "ACTIVE",
        attributes: variant.attributes.map((attr) => ({
          attributeId: attr.attributeId,
          optionId: attr.optionId,
        })),
        images,
      };

      // Call the API to create the variant
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
            errorData.error || errorData.message || "Unknown error"
          }`
        );
      }

      return await response.json();
    });

    const results = await Promise.all(createPromises);
    await revalidateTagHandler("productVariantsData");
    console.log("variant generation results:", results);
    return results;
  } catch (error) {
    console.error("Create Variants Error:", error);
    throw new Error(
      `Failed to create product variants: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export interface UpdateVariantPayload {
  variants: {
    id: number;
    name: string;
    slug: string;
    sku: string;
    price: number;
    stock: number;
    status: "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";
    attributes: {
      attributeId: number;
      optionId: number;
    }[];
  }[];
  colorImages: {
    [optionId: number]: {
      newImages: { file: File; order: number }[];
      existingImages: { url: string; publicId: string; order: number }[];
      deletedPublicIds: string[];
    };
  };
}

export interface ControllerUpdateVariantPayload {
  id: number;
  name: string;
  slug: string;
  sku: string;
  price: number;
  stock: number;
  status: "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";
  attributes: { attributeId: number; optionId: number }[];
  images: { url: string; publicId: string; order: number }[];
}

export async function updateProductVariants(
  variantsData: UpdateVariantPayload
) {
  try {
    // 1. Process colorImages: upload new images and delete removed images
    const uploadedImagesByOptionId: {
      [optionId: number]: { url: string; publicId: string; order: number }[];
    } = {};
    const deletedPublicIds = new Set<string>();

    for (const optionId in variantsData.colorImages) {
      const {
        newImages,
        existingImages,
        deletedPublicIds: deletedIds,
      } = variantsData.colorImages[optionId];

      // Deduplicate new images by file.name
      const uniqueNewImages = Array.from(
        new Map(newImages.map((img) => [img.file.name, img])).values()
      );

      // Upload new images
      const uploadResults = await Promise.all(
        uniqueNewImages.map(async (image) => {
          const result = await uploadToCloudinary(image.file);
          return {
            url: result.secure_url,
            publicId: result.public_id,
            order: image.order,
          };
        })
      );

      // Combine existing and new images
      uploadedImagesByOptionId[optionId] = [
        ...existingImages,
        ...uploadResults,
      ].sort((a, b) => a.order - b.order);

      // Collect unique deletedPublicIds
      deletedIds.forEach((publicId) => deletedPublicIds.add(publicId));
    }

    // Delete removed images from Cloudinary
    if (deletedPublicIds.size > 0) {
      await Promise.all(
        Array.from(deletedPublicIds).map(async (publicId) => {
          try {
            await deleteImage(publicId);
          } catch (err) {
            console.error(
              `Failed to delete Cloudinary image ${publicId}:`,
              err
            );
          }
        })
      );
    }

    // 2. Create variant payloads with pre-uploaded image metadata
    const variantPayloads: ControllerUpdateVariantPayload[] =
      variantsData.variants.map((variant) => {
        // Find the color optionId
        const colorAttr = variant.attributes.find(
          (attr) => Number(attr.optionId) in variantsData.colorImages
        );
        const images = colorAttr
          ? uploadedImagesByOptionId[colorAttr.optionId] || []
          : [];

        return {
          id: variant.id,
          name: variant.name,
          slug: variant.slug || variant.name.toLowerCase().replace(/\s+/g, "-"),
          sku: variant.sku,
          price: variant.price,
          stock: variant.stock,
          status: variant.status || "ACTIVE",
          attributes: variant.attributes.map((attr) => ({
            attributeId: attr.attributeId,
            optionId: attr.optionId,
          })),
          images,
        };
      });

    // 3. Send a single PATCH request with all payloads
    const response = await fetch(`${BASE_URL}/api/admin/variants`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(variantPayloads),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.error || result.message || "Failed to update variants"
      );
    }

    await revalidateTagHandler("productVariantsData");
    console.log("Variant update results:", result);
    return result;
  } catch (error) {
    console.error("Update Variants Error:", error);
    throw new Error(
      `Failed to update product variants: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
