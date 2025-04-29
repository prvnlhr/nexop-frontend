import React from "react";

const ProductPageLoading = () => {
  return (
    <div className="w-full h-full overflow-hidden relative">
      <div className="flex h-full transition-all duration-300 ease-in-out w-[200%] lg:w-full lg:translate-x-0 -translate-x-[50%]">
        {/* Sidebar Skeleton */}
        <div className="w-1/2 lg:w-[20%] h-full relative flex bg-[#F3F7FA] border-r border-black/10">
          <div className="w-[100%] h-full p-[20px]">
            <div className="w-[100%] h-[100%] flex flex-col">
              <div className="w-full h-[30px] flex items-center">
                <div className="w-[100px] h-[16px] bg-gray-200 animate-pulse rounded"></div>
              </div>
              <div
                className="w-full h-[calc(100%-30px)] flex flex-col p-[10px] overflow-y-scroll"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-full h-auto flex flex-col mb-[20px]"
                  >
                    <div className="w-full h-[40px] flex items-center">
                      <div className="w-[80px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                    </div>
                    {Array.from({ length: 2 }).map((_, optIndex) => (
                      <div key={optIndex} className="w-full h-[30px] flex">
                        <div className="h-full aspect-square p-[6px]">
                          <div className="w-full h-full bg-gray-200 animate-pulse rounded border border-black/10"></div>
                        </div>
                        <div className="h-full flex-1 flex items-center">
                          <div className="w-[120px] h-[14px] bg-gray-200 animate-pulse rounded ml-[5px]"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ProductList Skeleton */}
        <div className="w-1/2 lg:w-[80%] h-[100%]">
          <div className="w-full h-full flex flex-col items-center justify-center">
            {/* Header Bar */}
            <div className="w-full h-[30px] flex items-center border-b md:border-transparent border-black/5">
              <button className="h-[100%] w-auto flex md:hidden items-center justify-center"></button>
            </div>

            {/* Product Grid */}
            <div
              className="w-[100%] h-[calc(100%-30px)] grid grid-cols-2 md:grid-cols-5 gap-[30px] overflow-y-scroll p-[20px]"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {Array.from({ length: 5 }).map((_, pId) => (
                <div
                  key={pId}
                  className="w-auto h-auto mb-[20px] flex flex-col self-start
                    shadow-[0px_3px_5px_rgba(0,0,0,0.04)]
                    hover:shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]
                    border border-black/10
                    rounded"
                >
                  {/* Image Placeholder */}
                  <div className="w-full aspect-[1/1.1] p-[8px]">
                    <div className="relative w-full h-full bg-[#F6F6F6] overflow-hidden rounded p-[20px] border border-black/10">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className="w-full h-full bg-gray-200 animate-pulse rounded"></div>
                      </div>
                    </div>
                  </div>

                  {/* Text Placeholders */}
                  <div className="w-full h-[auto] grid grid-rows-[auto_auto_auto] p-[10px]">
                    {/* Product Name Placeholder */}
                    <div className="w-full h-auto flex items-center">
                      <div className="w-[80%] h-[16px] bg-gray-200 animate-pulse rounded"></div>
                    </div>

                    {/* Price Placeholder */}
                    <div className="w-full h-auto flex items-center my-[10px]">
                      <div className="w-[50%] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageLoading;
