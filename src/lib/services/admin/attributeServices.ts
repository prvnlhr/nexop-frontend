const BASE_URL: string = process.env.NEXT_PUBLIC_API_BASE_URL || "";

import {
  CreateAttributePayload,
  AttributeWithOptions,
  UpdateAttributeOptionsPayload,
} from "@/types/attributeTypes";

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

export async function createAttribute(payload: CreateAttributePayload) {
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

export async function updateAttributeOptions(
  payload: UpdateAttributeOptionsPayload
): Promise<AttributeWithOptions> {
  try {
    const attributeId = payload.attributeId;
    const response = await fetch(
      `${BASE_URL}/api/admin/attributes/options/${attributeId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ options: payload.options }),
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
    return result.data;
  } catch (error) {
    const err = error as Error;
    console.error("Update Options Error:", error);
    throw new Error(`Failed to update attribute options: ${err.message}`);
  }
}
