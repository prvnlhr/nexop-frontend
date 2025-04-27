import { ProductFormData } from "@/hooks/useProductForm";
import { uploadToCloudinary } from "@/utils/cloudinaryConfig";

const BASE_URL: string = process.env.NEXT_PUBLIC_API_BASE_URL!;

interface CreateProductPayload {
  name: string;
  description: string;
  brand: string;
  basePrice: number;
  categoryId: number;
  images: File[];
}

export async function createProduct(payload: CreateProductPayload) {
  try {
    const imageUploads = payload.images.map((file) => uploadToCloudinary(file));
    const uploadedImages = await Promise.all(imageUploads);

    // Prepare the product data with image URLs
    const productData = {
      name: payload.name,
      description: payload.description,
      brand: payload.brand,
      basePrice: payload.basePrice,
      categoryId: payload.categoryId,
      images: uploadedImages.map((img, index) => ({
        url: img.secure_url,
        isThumbnail: index === 0,
        order: index,
      })),
    };

    // Create the product via API
    const response = await fetch(`${BASE_URL}/api/admin/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Create Product Error:", result.error || result.message);
      throw new Error(
        result.error || result.message || "Failed to create product"
      );
    }

    console.log("Create Product Success:", result.message);
    return result.data;
  } catch (error) {
    const err = error as Error;
    console.error("Create Product Error:", error);
    throw new Error(`Failed to create product: ${err.message}`);
  }
}

export async function getProducts() {
  try {
    const response = await fetch(`${BASE_URL}/api/admin/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["products"],
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Get Products Error:", result.error || result.message);
      throw new Error(
        result.error || result.message || "Failed to fetch products"
      );
    }

    return result.data;
  } catch (error) {
    const err = error as Error;
    console.error("Get Products Error:", error);
    throw new Error(`Failed to fetch products: ${err.message}`);
  }
}

export async function getProductById(productId: string | number) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/admin/products/${productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: [`product-${productId}`],
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Get Product Error:", result.error || result.message);
      throw new Error(
        result.error || result.message || "Failed to fetch product"
      );
    }

    return result.data;
  } catch (error) {
    const err = error as Error;
    console.error("Get Product Error:", error);
    throw new Error(`Failed to fetch product: ${err.message}`);
  }
}

interface ProductImageData {
  url: string;
  publicId: string;
  isThumbnail?: boolean;
}

interface EditProductPayload {
  name: string;
  description: string;
  brand: string;
  basePrice: number;
  categoryId: number;
  newImages?: ProductImageData[];
  removedImageIds?: number[];
}

export async function editProductById(
  productId: string | number | undefined,
  payload: EditProductPayload
) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/admin/products/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Update Product Error:", result.error || result.message);
      throw new Error(
        result.error || result.message || "Failed to update product"
      );
    }

    console.log("Update Product Success:", result.message);
    return result.data;
  } catch (error) {
    console.error("Update Product Error:", error);
    throw error; // Re-throw the error for the calling component to handle
  }
}

// Helper function to use in your component
export async function prepareProductUpdate(
  formData: ProductFormData,
  removedImageIds: number[]
): Promise<EditProductPayload> {
  try {
    // Filter and upload new images
    const newImages = formData.images.filter(
      (img) => img instanceof File
    ) as File[];
    let uploadedImages: ProductImageData[] = [];

    if (newImages.length > 0) {
      const uploadResults = await Promise.all(
        newImages.map((file) => uploadToCloudinary(file))
      );

      uploadedImages = uploadResults.map((img, index) => ({
        url: img.secure_url,
        publicId: img.public_id,
        isThumbnail: index === 0,
      }));
    }

    return {
      name: formData.name,
      description: formData.description,
      brand: formData.brand,
      basePrice: formData.basePrice,
      categoryId: formData.categoryId,
      newImages: uploadedImages,
      removedImageIds,
    };
  } catch (error) {
    console.error("Image upload failed:", error);
    throw new Error("Failed to upload product images");
  }
}
