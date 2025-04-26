"use client";
import AppLogo from "@/components/Common/AppLogo";
import React, { useState, useEffect, useRef, useCallback } from "react";
import UserBadge from "../../../Admin/Common/UserBadge/UserBadge";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSession } from "@/lib/auth/useSession";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { searchProducts } from "@/lib/services/storefront/searchService";
import { SearchResult } from "@/types/storefront/searchResultTypes";
import Image from "next/image";

const MainHeader = () => {
  const { user } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeSearchBox, setActiveSearchBox] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const [searchResults, setSearchResults] = useState<SearchResult>({
    categories: [],
    products: [],
  });
  const [isSearching, setIsSearching] = useState(false);
  console.log(" isSearching:", isSearching);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setActiveSearchBox(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTakeToCart = () => {
    if (user?.id) {
      router.push(`/shop/user/${user.id}/cart`);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.set("redirect", `/shop/user/${user?.id}/cart`);
      router.push(`/shop/auth/sign-in/?${params.toString()}`);
    }
  };

  const debouncedSearch = useDebounce(async (key: string) => {
    const trimmedKey = key.trim();

    if (trimmedKey) {
      setIsSearching(true);
      try {
        const results = (await searchProducts(key)) as SearchResult;
        setSearchResults(results);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchResults({ categories: [], products: [] });
    }
  }, 500);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      debouncedSearch(e.target.value);
    },
    [debouncedSearch]
  );
  const hideOthers = isMobile && activeSearchBox && searchQuery.length > 0;

  const clearResults = () => {
    setSearchResults({ categories: [], products: [] });
    setSearchQuery("");
    setActiveSearchBox(false);
  };

  const hasResults =
    searchResults.categories.length > 0 || searchResults.products.length > 0;

  interface Attribute {
    attribute: {
      id: number;
      name: string;
    };
    option: {
      id: number;
      value: string;
    };
  }

  const getURL = (
    attributes: Attribute[],
    categorySlug: string,
    productSlug: string
  ) => {
    const basePath = `/shop/categories/${categorySlug}/products/${productSlug}`;
    const queryParams = new URLSearchParams();
    attributes.forEach((attr) => {
      queryParams.append(
        `attr_${attr.attribute.id}`,
        attr.option.id.toString()
      );
    });
    return `${basePath}?${queryParams.toString()}`;
  };

  return (
    <div className="w-full h-[70px] flex justify-end border-b border-black/10">
      <section
        className={`w-auto h-full flex items-center pl-[15px] ${
          hideOthers ? "hidden md:flex" : "flex"
        }`}
      >
        <Link href={"/shop"} className="w-auto h-[60%] flex items-center">
          <AppLogo />
        </Link>
      </section>

      <section
        ref={searchContainerRef}
        className="flex-1 h-full flex items-center justify-end pr-[20px] relative"
      >
        <div className="relative h-[100%] md:w-[500px] w-[90%] flex items-center justify-end">
          <div className="flex-1 h-[70%] flex border-b border-black/10">
            <div className="h-[100%] flex-1 flex items-center justify-center">
              <input
                ref={searchInputRef}
                className="w-full h-full text-[0.8rem] px-5 focus:outline-none"
                value={searchQuery}
                placeholder="Search products..."
                onFocus={() => setActiveSearchBox(true)}
                onChange={handleSearch}
              />
            </div>
            <button
              type="submit"
              className="h-[100%] aspect-square flex items-center justify-center hover:bg-gray-100"
              aria-label="Search"
            >
              {searchResults ? (
                <Icon
                  onClick={clearResults}
                  icon={
                    hasResults ? "iconamoon:close-duotone" : "mynaui:search"
                  }
                  className="w-[40%] h-[40%] text-[#336CF3] cursor-pointer"
                />
              ) : (
                <Icon icon="iconoir:search" className="w-[18px] h-[18px]" />
              )}
            </button>
          </div>
          {hasResults && (
            <div className="top-[75px] left-0 absolute w-[90%] h-[400px] min-h-[400px] max-h-[400px] flex bg-white z-[999] border border-black/10 p-[10px]">
              <div className="w-full h-[100%] flex flex-col  overflow-y-scroll hide-scrollbar">
                {searchResults.products.length > 0 && (
                  <section className="w-full h-auto flex flex-col  p-[2px]">
                    <div className="w-full h-[40px] flex items-center ">
                      <p className="text-[0.8rem] font-medium">PRODUCTS</p>
                    </div>
                    <div className="w-full h-[calc(100%-40px)] flex flex-col ">
                      {searchResults.products.map((prod) => (
                        <Link
                          href={getURL(
                            prod.attributes,
                            prod.product.category.slug,
                            prod.product.slug
                          )}
                          onClick={clearResults}
                          key={prod.id}
                          className="w-full h-[80px] flex p-[5px] border border-black/10 rounded my-[10px]"
                        >
                          <div className="w-full h-full flex ">
                            <div className="relative h-full aspect-square flex items-center justify-center ">
                              <Image
                                src={prod.image as string}
                                alt={prod.name}
                                fill={true}
                                className="w-[50%] h-[50%] object-contain"
                              />
                            </div>
                            <div className="h-full flex-1 flex flex-col ">
                              <div className="w-full h-[50%]  flex items-center">
                                <p className="text-[0.7rem] font-medium">
                                  {prod.name}
                                </p>
                              </div>
                              <div className="w-full h-[50%] "></div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
                {searchResults.categories.length > 0 && (
                  <section className="w-full h-auto  p-[2px]">
                    <div className="w-full h-full flex flex-col ">
                      <div className="w-full h-[40px] flex items-center ">
                        <p className="text-[0.8rem] font-medium">CATEGORIES</p>
                      </div>
                      <div className="w-full h-[auto] flex flex-wrap">
                        {searchResults.categories.map((cat) => (
                          <Link
                            onClick={clearResults}
                            href={`/shop/categories/${cat.slug}/products`}
                            key={cat.id}
                            className="w-auto h-auto flex items-center justify-center border border-black/10 bg-[#EEEEEE] mr-[5px] my-[10px] px-[10px] py-[5px] rounded"
                          >
                            <p className="text-[0.7rem] font-normal">
                              {cat.name}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </section>
                )}
              </div>
            </div>
          )}
        </div>

        {!hideOthers && (
          <>
            <div className="h-[100%] md:aspect-square aspect-[1/2] flex items-center justify-center">
              <button
                onClick={handleTakeToCart}
                className="h-[50%] aspect-square flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full"
                aria-label="Cart"
              >
                <Icon
                  icon="famicons:cart-outline"
                  className="w-[20px] h-[20px]"
                />
              </button>
            </div>
            <div className="h-[100%] aspect-square flex items-center justify-center">
              <UserBadge />
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default MainHeader;
