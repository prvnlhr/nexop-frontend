// import ManageVariantsForm from "@/components/Admin/Pages/Product/ManageVariantsForm";
import ManageVariantsPage from "@/components/Admin/Pages/Product/VariantManagement/ManageVariantsPage";
// import { getProductVariants } from "@/lib/services/admin/variantServices";
import React from "react";

type Params = Promise<{ productId: string }>;
const page = async ({ params }: { params: Params }) => {
  // const { productId } = await params;
  // const { attributes, product, variants } = await getProductVariants(productId);
  console.log(" params:", params);
  return <ManageVariantsPage />;
};

export default page;
