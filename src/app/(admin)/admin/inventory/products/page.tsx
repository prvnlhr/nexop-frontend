import ProductPage from "@/components/Admin/Pages/Product/ProductPage";
import { getProducts } from "@/lib/services/admin/productServices";
import { Product } from "@/types/productType";
import React from "react";

const page = async () => {
  const products: Product[] = await getProducts();
  return <ProductPage products={products} />;
};

export default page;
