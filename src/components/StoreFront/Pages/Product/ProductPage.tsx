"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ProductList from "./ProductList";
import { ProductsResponse } from "@/types/storefront/productPageListType";

interface ProductPageProps {
  data: ProductsResponse;
}
const ProductPage: React.FC<ProductPageProps> = ({ data }) => {
  const [showSidebar, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!showSidebar);
  };
  const sidebarProps = {
    attributes:
      data.type === "PRODUCTS_WITH_ATTRIBUTES" ? data.attributes : undefined,
    categories:
      data.type === "PRODUCTS_WITH_SUBCATEGORIES" ? data.categories : undefined,
  };

  const products =
    data.type === "PRODUCTS_WITH_ATTRIBUTES" ||
    data.type === "PRODUCTS_WITH_SUBCATEGORIES"
      ? data.products
      : [];

  return (
    <div className="w-full h-full overflow-hidden relative">
      <div
        className={`flex h-full transition-all duration-300 ease-in-out ${
          showSidebar ? "translate-x-0" : "-translate-x-[50%]"
        } w-[200%] lg:w-full lg:translate-x-0`}
      >
        <div
          className="w-1/2 lg:w-[20%] h-full relative flex bg-[#F3F7FA] border-r border-black/10"
          onClick={toggleSidebar}
        >
          <Sidebar {...sidebarProps} />
        </div>

        <div className="w-1/2 lg:w-[80%] h-[100%]" onClick={toggleSidebar}>
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
