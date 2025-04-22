import ProductPage from "@/components/StoreFront/Pages/Product/ProductPage";
import { fetchProductsByCategory } from "@/lib/services/storefront/productServices";
import { ProductsResponse } from "@/types/storefront/productPageListType";
import React from "react";

type Params = Promise<{ categorySlug: string }>;

const page = async ({
  params,
}: //   searchParams,
{
  params: Params;
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const { categorySlug } = await params;

  const productData: ProductsResponse = await fetchProductsByCategory(
    categorySlug
  );

  return <ProductPage data={productData} />;
};

export default page;
