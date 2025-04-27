import { FormattedProduct } from "@/types/storefront/productPageListType";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

interface ProductListProps {
  products: FormattedProduct[];
}
const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { categorySlug } = useParams();

  const getProductUrl = (prod: FormattedProduct): string => {
    // Validate categorySlug and slug
    if (!categorySlug || !prod.slug || !prod.category?.slug) {
      return "/shop";
    }

    // Base URL: /shop/categories/{categorySlug}/products/{prod.slug}
    const baseUrl = `/shop/categories/${categorySlug}/products/${prod.slug}`;

    // If no variantAttributes, return base URL
    if (!prod.variantAttributes || prod.variantAttributes.length === 0) {
      return baseUrl;
    }

    // Construct query string for variant attributes (e.g., attr_1=11&attr_2=22)
    const queryParams = prod.variantAttributes
      .map((attr) => `attr_${attr.attributeId}=${attr.optionId}`)
      .join("&");

    return `${baseUrl}?${queryParams}`;
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-[20px]">
      <div
        className="w-[100%] h-[100%] grid grid-cols-2 md:grid-cols-5 gap-[30px] overflow-y-scroll"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((prod, pId) => (
          <Link
            // href={`/shop/categories/${prod.category?.slug}/products/${prod.slug}`}
            href={getProductUrl(prod)}
            key={pId}
            className="w-auto h-auto mb-[20px] flex flex-col self-start
            shadow-[0px_3px_5px_rgba(0,0,0,0.04)]
            hover:shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]
            border border-black/10
            rounded"
          >
            <div className="w-full aspect-[1/1.1] p-[8px]">
              <div className="relative w-full h-full bg-[#F6F6F6] overflow-hidden rounded p-[20px] border border-black/10">
                <div className="relative w-full h-full flex items-center justify-center">
                  {prod.image && (
                    <Image
                      fill={true}
                      priority={true}
                      src={prod.image}
                      alt={prod.name}
                      className="object-contain"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="w-full h-[auto] grid grid-rows-[auto_auto_auto] p-[10px]">
              <div className="w-full h-auto flex items-center">
                <p className="text-[0.8rem] font-medium  line-clamp-2">
                  {prod.name}
                </p>
              </div>

              <div className="w-full h-auto flex items-center my-[10px]">
                <p className="text-[0.7rem] font-medium">
                  ₹ {prod.price}
                  <span className="text-[0.65rem] text-[#667085] line-through ml-[5px]">
                    MRP : ₹9096.45
                  </span>
                  <span className=" text-[0.65rem] ml-[5px]">11% Off</span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
