const BASE_URL: string = process.env.NEXT_PUBLIC_API_BASE_URL!;

import {
  CreateAttributePayload,
  AttributeWithOptions,
  UpdateAttributeOptionsPayload,
  Attribute,
  AttributeItem,
} from "@/types/attributeTypes";

export async function getAllAttributes(): Promise<AttributeItem[]> {
  try {
    const response = await fetch(`${BASE_URL}/api/admin/attributes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.error(
        "Get All Attributes Error:",
        result.error || result.message
      );
      throw new Error(
        result.error || result.message || "Failed to fetch all attributes"
      );
    }

    console.log(result.data);
    console.log("Get All Attributes Success:", result.message);
    return result.data;
  } catch (error) {
    const err = error as Error;
    console.error("Get All Attributes Error:", error);
    throw new Error(`Failed to fetch all attributes: ${err.message}`);
  }
}

export async function fetchAttributesByCategory(
  categoryId: number
): Promise<AttributeWithOptions[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/api/admin/attributes/${categoryId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Fetch Attributes Error:", result.error || result.message);
      throw new Error(
        result.error || result.message || "Failed to fetch attributes"
      );
    }

    console.log("Fetch Attributes Success:", result.message);
    return result.data;
  } catch (error) {
    const err = error as Error;
    console.error("Fetch Attributes Error:", error);
    throw new Error(`Failed to fetch attributes: ${err.message}`);
  }
}

export async function createAttribute(
  payload: CreateAttributePayload
): Promise<Attribute> {
  try {
    const response = await fetch(`${BASE_URL}/api/admin/attributes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Create Attribute Error:", result.error || result.message);
      throw new Error(
        result.error || result.message || "Failed to create attribute"
      );
    }

    console.log("Create Attribute Success:", result.message);
    return result.data;
  } catch (error) {
    const err = error as Error;
    console.error("Create Attribute Error:", error);
    throw new Error(`Failed to create attribute: ${err.message}`);
  }
}

export async function updateAttribute(
  payload: UpdateAttributeOptionsPayload
): Promise<AttributeWithOptions> {
  try {
    const { attributeId, name, options } = payload;
    const response = await fetch(
      `${BASE_URL}/api/admin/attributes/${attributeId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, options }), // Include name (undefined in Add Mode)
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Update Options Error:", result.error || result.message);
      throw new Error(
        result.error || result.message || "Failed to update attribute options"
      );
    }

    console.log("Update Options Success:", result.message);
    return result.data as AttributeWithOptions;
  } catch (error) {
    const err = error as Error;
    console.error("Update Options Error:", err);
    throw new Error(`Failed to update attribute options: ${err.message}`);
  }
}
export async function deleteAttribute(attributeId: number): Promise<void> {
  try {
    const response = await fetch(
      `${BASE_URL}/api/admin/attributes/${attributeId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Delete Attribute Error:", result.error || result.message);
      throw new Error(
        result.error || result.message || "Failed to delete attribute"
      );
    }

    console.log("Delete Attribute Success:", result.message);
  } catch (error) {
    const err = error as Error;
    console.error("Delete Attribute Error:", error);
    throw new Error(`Failed to delete attribute: ${err.message}`);
  }
}

export async function getAttributeById(
  attributeId: number
): Promise<AttributeWithOptions> {
  try {
    const response = await fetch(
      `${BASE_URL}/api/admin/attributes/details/${attributeId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Get Attribute Error:", result.error || result.message);
      throw new Error(
        result.error || result.message || "Failed to fetch attribute"
      );
    }

    console.log("Get Attribute Success:", result.message);
    return result.data;
  } catch (error) {
    const err = error as Error;
    console.error("Get Attribute Error:", error);
    throw new Error(`Failed to fetch attribute: ${err.message}`);
  }
}
