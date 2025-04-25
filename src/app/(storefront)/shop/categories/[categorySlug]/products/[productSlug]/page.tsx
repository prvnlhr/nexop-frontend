import React from "react";
import ProductDetailsPage from "@/components/StoreFront/Pages/Product/ProductDetailsPage";
import { getProductDetails } from "@/lib/services/storefront/productServices";
import { ProductDetailsData } from "@/types/storefront/productPageListType";

type Params = Promise<{ productSlug: string; categorySlug: string }>;

const page = async ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const { productSlug, categorySlug } = await params;
  const productFiltersParams = await searchParams;
  const productDetails: ProductDetailsData = await getProductDetails(
    categorySlug,
    productSlug,
    productFiltersParams
  );

  return <ProductDetailsPage productDetails={productDetails} />;
};

export default page;
