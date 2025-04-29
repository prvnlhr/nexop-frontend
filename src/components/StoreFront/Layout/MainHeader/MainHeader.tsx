"use client";
import AppLogo from "@/components/Common/AppLogo";
import React, { useState, useEffect, useRef, useCallback } from "react";
import UserBadge from "../../../Admin/Common/UserBadge/UserBadge";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { searchProducts } from "@/lib/services/storefront/searchService";
import { SearchResult } from "@/types/storefront/searchResultTypes";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Oval } from "react-loader-spinner";

const MainHeader = () => {
  // const { user } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeSearchBox, setActiveSearchBox] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { data: session, update } = useSession();
  const user = session?.user;

  const [searchResults, setSearchResults] = useState<SearchResult>({
    categories: [],
    products: [],
  });
  const [isSearching, setIsSearching] = useState(false);

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
      // Close search box if clicked outside
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setActiveSearchBox(false);
      }

      // Close user menu if clicked outside
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".user-badge-container") // Check if click was on user badge
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

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

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await signOut({ redirect: false });
      // Force session update
      await update();

      // Handle role-based redirects
      switch (user?.role) {
        case "admin":
          router.push("/admin/auth/sign-in");
          break;
        case "customer":
          router.push("/shop");
          break;
        default:
          router.push("/auth/sign-in");
      }
    } catch (error) {
      console.error("Sign-out error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="w-full h-[70px] flex justify-end border-b border-black/10 bg-white">
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
          <div className="flex-1 h-[60%] flex border border-black/10">
            <div className="h-[100%] flex-1 flex items-center justify-center">
              <input
                ref={searchInputRef}
                className="w-full h-full text-[0.8rem] px-5 focus:outline-none placeholder:text-[#A2A8B2]"
                value={searchQuery}
                placeholder="Search products, categories..."
                onFocus={() => setActiveSearchBox(true)}
                onChange={handleSearch}
              />
            </div>
            <button
              type="submit"
              className="h-[100%] aspect-square flex items-center justify-center hover:bg-gray-100"
              aria-label="Search"
            >
              {isSearching ? (
                <Oval
                  visible={true}
                  color="#336CF3"
                  secondaryColor="transparent"
                  strokeWidth="3"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass="w-[15px] h-[15px] flex items-center justify-center"
                />
              ) : hasResults ? (
                <Icon
                  className="w-[40%] h-[40%] text-[#336CF3] cursor-pointer"
                  onClick={clearResults}
                  icon="iconamoon:close-duotone"
                />
              ) : (
                <Icon
                  icon="iconoir:search"
                  className="w-[40%] h-[40%] text-[#336CF3]"
                />
              )}
            </button>
          </div>
          {hasResults && (
            <div className="top-[75px] left-0 absolute w-[90%] h-[400px] min-h-[400px] max-h-[400px] flex bg-[#fbfafe] z-[999] border border-gray-200 p-[10px] rounded-md shadow-lg animate-fade-in">
              <div className="w-full h-[100%] flex flex-col overflow-y-auto hide-scrollbar">
                {/* Products Section */}
                {searchResults.products.length > 0 && (
                  <section className="w-full h-auto flex flex-col p-[2px]">
                    <div className="w-full h-[40px] flex items-center">
                      <p className="text-[0.85rem] font-semibold text-gray-800 tracking-wide">
                        PRODUCTS
                      </p>
                    </div>
                    <div className="w-full h-[calc(100%-40px)] flex flex-col">
                      {searchResults.products.map((prod) => (
                        <Link
                          href={getURL(
                            prod.attributes,
                            prod.product.category.slug,
                            prod.product.slug
                          )}
                          onClick={clearResults}
                          key={prod.id}
                          className="w-full h-[80px] flex p-[5px] border rounded-md my-[10px] bg-white border-black/10 hover:scale-[1.01] transition-all duration-200"
                        >
                          <div className="w-full h-full flex">
                            {/* Product Image */}
                            <div className="relative h-full aspect-square flex items-center justify-center bg-gray-100 rounded-md">
                              <Image
                                src={prod.image || "/placeholder-image.png"}
                                alt={prod.name}
                                fill={true}
                                className="w-[60%] h-[60%] object-contain"
                              />
                            </div>
                            {/* Product Name */}
                            <div className="h-full flex-1 flex flex-col pl-[8px]">
                              <div className="w-full h-[50%] flex items-center">
                                <p className="text-[0.75rem] font-medium text-gray-800 line-clamp-2 tracking-tight">
                                  {prod.name}
                                </p>
                              </div>
                              <div className="w-full h-[50%]"></div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {/* Categories Section */}
                {searchResults.categories.length > 0 && (
                  <section className="w-full h-auto p-[2px]">
                    <div className="w-full h-full flex flex-col">
                      <div className="w-full h-[40px] flex items-center">
                        <p className="text-[0.85rem] font-semibold text-gray-800 tracking-wide">
                          CATEGORIES
                        </p>
                      </div>
                      <div className="w-full h-[auto] flex flex-wrap">
                        {searchResults.categories.map((cat) => (
                          <Link
                            onClick={clearResults}
                            href={`/shop/categories/${cat.slug}/products`}
                            key={cat.id}
                            className="w-auto h-auto flex items-center justify-center border border-gray-200 bg-[#F4F4F5] mr-[5px] my-[10px] px-[10px] py-[5px] rounded-md shadow-sm hover:bg-teal-50 hover:border-teal-300 hover:shadow-md transition-all duration-200"
                          >
                            <p className="text-[0.75rem] font-normal text-gray-700 tracking-tight">
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
            <div className="relative h-[100%] aspect-square flex items-center justify-center">
              <div
                className="w-auto h-[100%] flex items-center justify-center"
                onClick={toggleUserMenu}
              >
                <UserBadge isLoggingOut={isLoggingOut} />
              </div>
              {showUserMenu && (
                <div
                  ref={userMenuRef}
                  className="top-[72px] right-[5px] absolute w-[150px] h-auto bg-white z-[999] p-[10px] rounded box-shadow border border-black/10"
                >
                  <div className="w-full  h-full flex flex-col items-center">
                    <Link
                      href={`/shop/user/${user?.id}/orders`}
                      className="w-full h-[40px] flex items-center text-[0.8rem] font-medium hover:bg-[#EAECF5] px-[5px] rounded mb-[5px]"
                    >
                      <Icon
                        icon="material-symbols-light:orders-outline-rounded"
                        className="w-[20px] h-[20px] mr-[3px]"
                      />
                      Orders
                    </Link>
                    <div className="w-full h-[40px] flex items-center text-[0.75rem] border rounded border-black/10 overflow-hidden">
                      <button
                        onClick={handleLogout}
                        className="w-full h-full flex items-center px-[5px] text-[0.8rem]  font-medium hover:bg-[#FECDCA] cursor-pointer"
                      >
                        <>
                          <Icon
                            icon="si:sign-out-line"
                            className="w-[15px] h-[15px] mr-[5px]"
                          />
                          Sign Out
                        </>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default MainHeader;
