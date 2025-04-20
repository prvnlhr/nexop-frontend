"use client";
import { ProductsResponse } from "@/types/storefront/productTypes";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ProductList from "./ProductList";

interface ProductPageProps {
  data: ProductsResponse;
}
const ProductPage: React.FC<ProductPageProps> = ({ data }) => {
  const [showSidebar, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!showSidebar);
  };

  let products: React.ComponentProps<typeof ProductList>["products"] = [];
  let sidebarContent: React.ComponentProps<typeof Sidebar> = {
    type: "empty",
    content: null,
  };

  if (data.type === "PRODUCTS_WITH_ATTRIBUTES") {
    products = data.products;
    sidebarContent = {
      type: "attributes",
      content: data.attributes,
      currentCategory: data.category,
    };
  } else if (data.type === "PRODUCTS_WITH_SUBCATEGORIES") {
    products = data.products;
    sidebarContent = {
      type: "categories",
      content: data.categories,
      currentCategory: data.parentCategory,
    };
  }

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
          <Sidebar {...sidebarContent} />
        </div>

        <div className="w-1/2 lg:w-[80%] h-[100%]" onClick={toggleSidebar}>
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
