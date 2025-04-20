import AttributePage from "@/components/Admin/Pages/Attribute/AttributePage";
import { getAllAttributes } from "@/lib/services/admin/attributeServices";
import { AttributeItem } from "@/types/attributeTypes";
import React from "react";

const page = async () => {
  const attributes: AttributeItem[] = await getAllAttributes();
  return <AttributePage attributes={attributes} />;
};

export default page;
