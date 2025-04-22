import ProductDetailsPage from "@/components/StoreFront/Pages/Product/ProductDetailsPage";
import { getProductById } from "@/lib/services/storefront/productServices";
import { ProductDetails } from "@/types/storefront/productTypes";
import React from "react";

interface ProductSearchParams {
  attributeId?: string;
  optionId?: string;
}

type SearchParams = Promise<ProductSearchParams>;

type Params = Promise<{ productId: string }>;

const page = async ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const { productId } = await params;

  const { attributeId, optionId } = await searchParams;
  const productDetails: ProductDetails = await getProductById(
    productId,
    attributeId,
    optionId
  );
  return <ProductDetailsPage productDetails={productDetails} />;
};

export default page;
