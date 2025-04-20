import ProductPage from "@/components/StoreFront/Pages/Product/ProductPage";
import { fetchProductsByCategory } from "@/lib/services/storefront/productServices";
import { ProductsResponse } from "@/types/storefront/productTypes";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const { categoryId } = await searchParams;

  const productData: ProductsResponse = await fetchProductsByCategory(
    categoryId
  );

  return <ProductPage data={productData} />;
};

export default page;
