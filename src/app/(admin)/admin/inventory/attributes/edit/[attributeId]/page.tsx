import AttributeAddForm from "@/components/Admin/Pages/Attribute/AttributeAddForm";
import { getAttributeById } from "@/lib/services/admin/attributeServices";
import { getCategories } from "@/lib/services/admin/categoryServices";
import { Category } from "@/types/categoryTypes";
import React from "react";

type Params = Promise<{ attributeId: string }>;

const page = async ({ params }: { params: Params }) => {
  const { attributeId } = await params;

  const attributeEditData = attributeId
    ? await getAttributeById(Number(attributeId))
    : null;

  //console.log(" attributeEditData:", attributeEditData);

  const categories: Category[] = await getCategories();
  // console.log(" categories:", categories);
  return (
    <AttributeAddForm
      categories={categories}
      attributeEditData={attributeEditData}
      isEditMode={attributeId ? true : false}
    />
  );
};

export default page;
