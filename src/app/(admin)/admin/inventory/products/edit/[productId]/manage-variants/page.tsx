// import { getProductVariants } from "@/lib/services/admin/variantServices";
import ManageVariantsPage from "@/components/Admin/Pages/Product/VariantManagement/Pages/ManageVariantsPage";
import React from "react";

type Params = Promise<{ productId: string }>;
const page = async ({ params }: { params: Params }) => {
  const { productId } = await params;
  console.log(" productIdxxxx:", productId);
  // const { attributes, product, variants } = await getProductVariants(productId);
  return <ManageVariantsPage />;
};

export default page;
