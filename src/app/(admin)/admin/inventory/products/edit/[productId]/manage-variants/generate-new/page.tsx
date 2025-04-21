import GenerateVariantsPage from "@/components/Admin/Pages/Product/VariantManagement/Pages/GenerateVariantsPage";
import { fetchProductVariantsData } from "@/lib/services/admin/variantServices";
import { ProductVariantData } from "@/types/variantsNewTypes";
import React from "react";

type Params = Promise<{ productId: string }>;
const page = async ({ params }: { params: Params }) => {
  const { productId } = await params;
  const productVariantsData: ProductVariantData =
    await fetchProductVariantsData(productId);
  return <GenerateVariantsPage productVariantsData={productVariantsData} />;
};

export default page;
