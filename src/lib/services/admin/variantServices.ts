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
  variantsData: CreateVariantPayload[]
) {
  try {
    const createPromises = variantsData.map(async (variant) => {
      // 1. Upload images to Cloudinary
      const uploadResults = await Promise.all(
        variant.newImages.map(async (image) => {
          const result = await uploadToCloudinary(image.file);
          return {
            url: result.secure_url,
            publicId: result.public_id,
            order: image.order,
          };
        })
      );
      // 2. Prepare the payload for the API
      const variantPayload = {
        productId: variant.productId,
        name: variant.name,
        slug: variant.slug || variant.name.toLowerCase().replace(/\s+/g, "-"), // Fallback slug if empty
        sku: variant.sku,
        price: variant.price,
        stock: variant.stock,
        status: variant.status || "ACTIVE",
        attributes: variant.attributes.map((attr) => ({
          attributeId: attr.attributeId,
          optionId: attr.optionId,
        })),
        images: uploadResults,
      };

      // 3. Call the API to create the variant
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
  } catch (error) {
    console.error("Create Variants Error:", error);
    throw new Error(
      `Failed to create product variants: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

interface UpdateVariantPayload {
  id: number;
  name: string;
  slug: string;
  sku: string;
  price: number;
  stock: number;
  status: "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";
  attributes: { attributeId: number; optionId: number }[];
  images: { url: string; publicId?: string; order: number; file?: File }[];
  deletedPublicIds: string[];
}

interface ControllerUpdateVariantPayload {
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

// updateProductVariants
export async function updateProductVariants(
  variantsData: UpdateVariantPayload[]
) {
  try {
    // 1. Process all variants: upload new images and delete removed images
    const variantPayloads: ControllerUpdateVariantPayload[] = await Promise.all(
      variantsData.map(async (variant) => {
        // Upload new images to Cloudinary and prepare final images array
        const finalImages = await Promise.all(
          variant.images.map(async (image) => {
            if (image.file) {
              // New image: upload to Cloudinary
              const result = await uploadToCloudinary(image.file);
              return {
                url: result.secure_url,
                publicId: result.public_id, // Use Cloudinary's public_id
                order: image.order,
              };
            }
            // Existing image: keep as is, but warn if publicId looks incorrect
            if (
              image.publicId &&
              !image.publicId.startsWith("nexop/products/")
            ) {
              console.warn(
                `Invalid publicId for existing image: ${image.publicId}`
              );
            }
            return {
              url: image.url,
              publicId: image.publicId!, // publicId should exist for db images
              order: image.order,
            };
          })
        );

        // Delete removed images from Cloudinary
        if (variant.deletedPublicIds.length > 0) {
          await Promise.all(
            variant.deletedPublicIds.map(async (publicId) => {
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

        // Prepare payload for the API
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
          images: finalImages,
        };
      })
    );

    // 2. Send a single PATCH request with all payloads
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
    return result; // Returns { message: "Variants updated successfully" }
  } catch (error) {
    console.error("Update Variants Error:", error);
    throw new Error(
      `Failed to update product variants: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
