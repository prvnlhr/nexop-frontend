import Link from "next/link";
import React from "react";
import ProductsTable from "./ProductsTable";
import { Product } from "@/types/productType";

interface ProductPageProps {
  products: Product[];
}
const ProductPage: React.FC<ProductPageProps> = ({ products }) => {
  return (
    <div className="w-full h-[100%] flex flex-col items-center justify-center p-[20px]">
      <div className="w-full h-[50px] flex items-center justify-between">
        <p className="text-[0.8rem] font-medium">ALL Products</p>
        <Link
          href={"products/add"}
          className="w-auto h-auto px-[10px] py-[5px] bg-[#625DAF] text-[0.75rem] text-white"
        >
          Add Product
        </Link>
      </div>
      <div className="w-full h-[calc(100%-50px)] flex items-start">
        <ProductsTable products={products} />
      </div>
    </div>
  );
};

export default ProductPage;
