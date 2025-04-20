import ManageVariantsForm from "@/components/Admin/Pages/Product/ManageVariantsForm";
import { getProductVariants } from "@/lib/services/admin/variantServices";
import React from "react";

type Params = Promise<{ productId: string }>;
const page = async ({ params }: { params: Params }) => {
  const { productId } = await params;
  const { attributes, product, variants } = await getProductVariants(productId);
  return (
    <ManageVariantsForm
      product={product}
      attributes={attributes}
      variants={variants}
    />
  );
};

export default page;
