// import { getProductVariants } from "@/lib/services/admin/variantServices";
import ManageVariantsPage from "@/components/Admin/Pages/Product/VariantManagement/Pages/ManageVariantsPage";
import { fetchProductVariantsData } from "@/lib/services/admin/variantServices";
import { ProductVariantData } from "@/types/variantsNewTypes";
import React from "react";

type Params = Promise<{ productId: string }>;
const page = async ({ params }: { params: Params }) => {
  const { productId } = await params;
  const productVariantsData: ProductVariantData =
    await fetchProductVariantsData(productId);
  console.log(" productVariantsData:", productVariantsData);
  return <ManageVariantsPage productVariantsData={productVariantsData} />;
};

export default page;
