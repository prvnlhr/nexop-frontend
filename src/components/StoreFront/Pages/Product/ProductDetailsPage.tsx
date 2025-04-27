"use client";
import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import {
  Attribute,
  ProductDetailsData,
} from "@/types/storefront/productPageListType";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useSession } from "@/lib/auth/useSession";
import { addToCart } from "@/lib/services/storefront/cartServices";
import LoadingSpinner from "@/components/Common/LoadingSpinner";

interface ProductDetailsPageProps {
  productDetails: ProductDetailsData;
}

const OptionSelector = ({
  attribute,
  productSlug,
  categorySlug,
  onOptionSelect,
}: {
  attribute: Attribute;
  productSlug: string;
  categorySlug: string;
  onOptionSelect?: () => void;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleOptionClick = (attributeId: number, optionId: number) => {
    const params = new URLSearchParams(searchParams);
    params.set(`attr_${attributeId}`, optionId.toString());
    router.push(
      `/shop/categories/${categorySlug}/products/${productSlug}?${params.toString()}`
    );
    if (onOptionSelect) onOptionSelect();
  };

  return (
    <div className="w-full h-[auto] flex flex-col my-[15px]">
      <div className="w-full h-[30px] flex items-center">
        <p className="text-[0.8rem] font-medium whitespace-nowrap">
          {attribute.name}
        </p>
      </div>
      <div className="w-full h-[auto] min-h-[40px] flex flex-wrap items-center">
        {attribute.options.map((option) => {
          const isSelected =
            searchParams.get(`attr_${attribute.id}`) === option.id.toString();
          return (
            <button
              onClick={() => handleOptionClick(attribute.id, option.id)}
              key={option.id}
              className={`h-[80%] min-w-[50px] w-auto flex items-center justify-center py-[8px] px-[12px] mb-[10px] mr-[15px] border rounded-md cursor-pointer ${
                isSelected
                  ? "bg-[#D1E9FF] border-[#2E90FA]"
                  : "border-black/20 hover:border-black/40"
              } ${!option.active ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={!option.active}
            >
              <p
                className={`text-[0.8rem] ${
                  isSelected ? "text-[#2E90FA]" : "text-[#A2A8B2]"
                } whitespace-nowrap`}
              >
                {option.value}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  productDetails,
}) => {
  const { user } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { product, attributes } = productDetails;

  const [currentSelectedImage, setCurrentSelectedImage] = useState<
    string | undefined
  >(undefined);
  const [quantity, setQuantity] = useState(1);
  const [isUpdatingCart, setIsUpdatingCart] = useState(false);

  useEffect(() => {
    setCurrentSelectedImage(product.images[0].url);
  }, [product]);

  // Check if all attributes have a selected option
  const allAttributesSelected = useMemo(() => {
    if (attributes.length === 0) return true; // If no attributes, consider as selected
    return attributes.every(
      (attr) => searchParams.get(`attr_${attr.id}`) !== null
    );
  }, [attributes, searchParams]);

  const handleQuantityChange = (newQuantity: number) => {
    const validatedQuantity = Math.max(1, newQuantity);
    setQuantity(validatedQuantity);
  };

  const incrementQuantity = () => handleQuantityChange(quantity + 1);
  const decrementQuantity = () => handleQuantityChange(quantity - 1);

  const handleAddToCart = async () => {
    if (!user) {
      router.push("/shop/auth/sign-in");
      return;
    }

    setIsUpdatingCart(true);
    try {
      const payload = {
        userId: user.id,
        productId: product.id,
        variantId: product.variantId,
        quantity: quantity,
      };
      const res = await addToCart(payload);
      console.log("Added to cart:", res);
    } catch (error) {
      console.error("Add to cart error:", error);
    } finally {
      setIsUpdatingCart(false);
    }
  };

  return (
    <div className="w-[100%] h-[100%]  p-[20px]">
      <div className="w-[100%] h-[100%] grid grid-rows-[50vh_100vh] grid-cols-1 md:grid-cols-2 md:grid-rows-1 overflow-y-scroll p-[5px] hide-scrollbar">
        <section className="w-[100%] h-[100%] flex flex-col md:flex-row border-black/10">
          <div className="w-[100%] md:w-[120px] h-[120px] md:h-[100%] border-black/10 flex flex-row items-center md:flex-col order-2 md:order-1 overflow-x-scroll md:overflow-y-scroll hide-scrollbar">
            {product.images.map((img) => (
              <div
                onClick={() => setCurrentSelectedImage(img.url)}
                key={img.url}
                className={`cursor-pointer h-[80%] md:w-[80%] md:h-auto aspect-square mx-[10px] md:my-[10px] bg-[#FAFAFA] flex items-center justify-center ${
                  currentSelectedImage === img.url
                    ? "border-black/10"
                    : "border-transparent"
                } border-2 rounded-md p-[10px]`}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={img.url}
                    alt="product-image"
                    priority={true}
                    quality={10}
                    className="w-[90%] aspect-square rounded object-contain"
                    fill={true}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="w-[100%] md:w-[calc(100%-120px)] h-[calc(100%-100px)] order-1 md:order-2 md:h-[100%] border-black/10 p-[10px]">
            <div className="relative w-[100%] h-[100%] flex items-center justify-center border-black/10">
              {currentSelectedImage && (
                <Image
                  src={currentSelectedImage}
                  alt="main-product-image"
                  priority={true}
                  quality={100}
                  fill={true}
                  className="w-full h-full rounded object-contain"
                />
              )}
            </div>
          </div>
        </section>

        <section className="w-[100%] h-[100%] border-black/10 p-[10px] border md:px-[25px] overflow-y-scroll hide-scrollbar">
          <div className="w-[100%] h-auto flex flex-col border-black/10">
            <div className="w-full h-[30px] flex items-center">
              <p className="text-[0.75rem] font-medium">
                {product.brand.toUpperCase()}
              </p>
            </div>

            <div className="w-full h-[auto] flex items-center">
              <p className="text-[1.5rem] font-normal">{product.name}</p>
            </div>

            <div className="w-full h-[50px] flex items-center">
              <Icon icon="bx:rupee" width="15" height="15" />
              <p className="text-[1.5rem] font-medium">{product.price}</p>
            </div>

            <div className="w-full h-auto flex flex-col">
              {attributes.map((attr) => (
                <OptionSelector
                  key={attr.id}
                  productSlug={product.slug}
                  categorySlug={product.category.slug}
                  attribute={attr}
                  onOptionSelect={() => {}}
                />
              ))}
            </div>

            <div className="w-full h-[auto] flex flex-col my-[15px]">
              <div className="w-full h-[30px] flex items-center">
                <p className="text-[0.8rem] font-medium whitespace-nowrap">
                  Quantity
                </p>
              </div>
              <div className="w-full h-[auto] min-h-[40px] flex items-center p-[2px]">
                <div className="w-auto h-[40px] flex p-[2px] border border-black/10 rounded-md">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1 || isUpdatingCart}
                    className={`h-full aspect-square flex items-center justify-center cursor-pointer disabled:text-[#A2A8B2] disabled:cursor-not-allowed`}
                  >
                    <Icon
                      icon="stash:minus-solid"
                      className={`w-[40%] h-[40%]`}
                    />
                  </button>
                  <div className="h-[100%] aspect-square flex items-center justify-center text-[0.7rem]">
                    {isUpdatingCart ? (
                      <div className="relative h-[15px] w-[15px] flex items-center justify-center">
                        <LoadingSpinner />
                      </div>
                    ) : (
                      quantity.toString().padStart(2, "0")
                    )}
                  </div>
                  <button
                    onClick={incrementQuantity}
                    disabled={isUpdatingCart}
                    className={`h-full aspect-square flex items-center justify-center cursor-pointer disabled:text-[#A2A8B2] disabled:cursor-not-allowed`}
                  >
                    <Icon
                      icon="majesticons:plus-line"
                      className={`w-[40%] h-[40%]`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full h-[auto] grid grid-cols-[auto_auto] my-[20px] gap-2">
              <button
                onClick={handleAddToCart}
                disabled={!allAttributesSelected || isUpdatingCart}
                className={`md:w-[80%] h-[50px] flex items-center justify-center border border-black/20 rounded-md hover:border-black/10 p-[5px] ${
                  allAttributesSelected
                    ? "cursor-pointer bg-[#f0f0f0] hover:bg-[#e0e0e0]"
                    : "cursor-not-allowed opacity-50"
                }`}
              >
                {isUpdatingCart ? (
                  <div className="w-[15px] h-[15px] flex items-center justify-center">
                    <LoadingSpinner />
                  </div>
                ) : (
                  <div className="w-[100%] h-[100%] flex items-center justify-center">
                    <Icon
                      icon="famicons:cart-outline"
                      className="w-[15px] h-[15px] mb-[5px] mr-[5px]"
                    />
                    <p className="text-[0.8rem] ml-[5px]">Add to cart</p>
                  </div>
                )}
              </button>
              <Link
                href={
                  allAttributesSelected
                    ? `/shop/user/${user?.id}/checkout?type=single&product_id=${product.id}&variant_id=${product.variantId}`
                    : "#"
                }
                className={`md:w-[80%] h-[50px] flex items-center justify-center rounded-md ${
                  allAttributesSelected
                    ? "bg-[#444444] cursor-pointer hover:bg-[#333333]"
                    : "bg-[#888888] cursor-not-allowed opacity-70"
                }`}
              >
                <p className="text-[0.8rem] text-white">Buy Now</p>
              </Link>
            </div>

            <div className="w-full h-[auto] flex flex-col my-[15px]">
              <div className="w-full h-[50px] flex items-center">
                <p className="text-[0.8rem] font-medium">Description</p>
              </div>
              <div className="w-full h-[calc(100%-40px)] flex items-center">
                <p className="text-[0.8rem] font-normal leading-relaxed">
                  {product.description}
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
