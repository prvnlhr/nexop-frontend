import React from "react";
import testImage from "../../../../../public/assets/apple-iphone-16-pro-128-gb-natural-titanium-digital-o494423046-p609946235-3-202409111652.webp";
import Image from "next/image";
import {
  ProductAttribute,
  ProductDetails,
} from "@/types/storefront/productTypes";
import Link from "next/link";

interface ProductDetailsPageProps {
  productDetails: ProductDetails;
}

const ColorAttributeSelector = ({
  attribute,
  productId,
}: {
  attribute: ProductAttribute;
  productId: number;
}) => {
  console.log(" productId:", productId);
  return (
    <div className="w-full h-[70px] flex flex-col my-[15px]">
      <div className="w-full h-[30px] flex items-center">
        <p className="text-[0.8rem] font-medium">{attribute.name}</p>
      </div>
      <div className="w-full h-[40px] flex items-center overflow-x-scroll hide-scrollbar">
        <div className="h-[80%] aspect-square flex items-center justify-center p-[3px] mr-[10px] rounded-full border border-black/40">
          <div className="w-[100%] h-[100%] bg-[#BDA895] rounded-full"></div>
        </div>
        <div className="h-[80%] aspect-square flex items-center justify-center p-[3px] mr-[10px] rounded-full border border-black/40">
          <div className="w-[100%] h-[100%] bg-[#C8C4BC] rounded-full"></div>
        </div>
        <div className="h-[80%] aspect-square flex items-center justify-center p-[3px] mr-[10px] rounded-full border border-black/40">
          <div className="w-[100%] h-[100%] bg-[#F2F1EE] rounded-full"></div>
        </div>
        <div className="h-[80%] aspect-square flex items-center justify-center p-[3px] mr-[10px] rounded-full border border-black/40">
          <div className="w-[100%] h-[100%] bg-[#454545] rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

const OptionSelector = ({
  attribute,
  productId,
}: {
  attribute: ProductAttribute;
  productId: number;
}) => {
  return (
    <div className="w-full h-[auto]  flex flex-col my-[15px]">
      <div className="w-full h-[30px] flex items-center">
        <p className="text-[0.8rem] font-medium">{attribute.name}</p>
      </div>
      <div className="w-full h-[auto]  min-h-[40px] flex items-center overflow-x-scroll hide-scrollbar">
        {attribute.options.map((option) => (
          <Link
            href={`${productId}?attributeId=${attribute.id}&optionId=${option.id}`}
            key={option.id}
            className="h-[80%] min-w-[50px] w-auto flex items-center justify-center py-[5px] px-[10px] mr-[15px] border border-black/20"
          >
            <p className="text-[0.8rem]">{option.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  productDetails,
}) => {
  console.log(" productDetails:", productDetails);
  return (
    <div className="w-[100%] h-[100%] p-[20px]">
      <div className="w-[100%] h-[100%] grid grid-rows-[50vh_100vh] grid-cols-1 md:grid-cols-2 md:grid-rows-1 overflow-y-scroll p-[5px] hide-scrollbar">
        <section className="w-[100%] h-[100%] flex flex-col md:flex-row border-black/10">
          <div className="w-[100%] md:w-[150px] h-[150px] md:h-[100%] border-t border-b border-l border-black/10 flex flex-row items-center md:flex-col order-2 md:order-1 overflow-x-scroll md:overflow-y-scroll hide-scrollbar">
            {productDetails.images.map((img) => (
              <div
                key={img.id}
                className="relative h-[80%] md:w-[80%] md:h-auto aspect-square mx-[10px] md:my-[10px] flex items-center justify-center bg-[#EFF1F3] border-black/10 rounded"
              >
                <Image
                  src={img.url}
                  alt="test-image"
                  priority={true}
                  quality={10}
                  className="w-[90%] aspect-square rounded object-contain"
                  fill={true}
                />
              </div>
            ))}
          </div>
          <div className="w-[100%] md:w-[calc(100%-150px)] h-[calc(100%-100px)] order-1 md:order-2 md:h-[100%] border border-black/10 p-[10px]">
            <div className="w-[100%] h-[100%] flex items-center justify-center  border-black/10">
              <Image
                src={testImage}
                alt="test-image"
                priority={true}
                quality={100}
                className="w-full h-full rounded object-cover"
              />
            </div>
          </div>
        </section>
        <section className="w-[100%] h-[100%] border-black/10 p-[10px] border md:px-[25px] overflow-y-scroll hide-scrollbar">
          <div className="w-[100%] h-auto flex flex-col  border-black/10">
            {/* PRODUCT NAME */}
            <div className="w-full h-[auto] flex items-center">
              <p className="text-[1.5rem] font-normal">{productDetails.name}</p>
            </div>
            <div className="w-full h-[30px] flex items-start">
              <p className="text-[0.75rem] font-medium">
                {productDetails.brand}
              </p>
            </div>
            {/* PRODUCT ATTRIBUTES */}
            <div className="w-full h-auto flex flex-col">
              {productDetails.attributes.map((attr) =>
                attr.name === "Colorx" ? (
                  <ColorAttributeSelector
                    key={attr.id}
                    productId={productDetails.id}
                    attribute={attr}
                  />
                ) : (
                  <OptionSelector
                    key={attr.id}
                    productId={productDetails.id}
                    attribute={attr}
                  />
                )
              )}
            </div>
            {/* PRODUCT ATTRIBUTES */}
            <div className="w-full h-[auto] flex flex-col my-[15px] border-red-500">
              <div className="w-full h-[40px] flex items-center">
                <p className="text-[0.8rem] font-medium">Description</p>
              </div>
              <div className="w-full h-[calc(100%-40px)] flex items-center">
                <p className="text-[0.8rem] font-normal leading-relaxed">
                  {productDetails.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
