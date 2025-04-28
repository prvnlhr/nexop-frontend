import React from "react";

const OptionSelectorLoading = () => {
  return (
    <div className="w-full h-[auto] flex flex-col my-[15px]">
      <div className="w-full h-[30px] flex items-center">
        <div className="w-[100px] h-[16px] bg-gray-200 animate-pulse rounded"></div>
      </div>
      <div className="w-full h-[auto] min-h-[40px] flex flex-wrap items-center">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-[80%] min-w-[50px] w-auto flex items-center justify-center py-[8px] px-[12px] mb-[10px] mr-[15px] border border-black/20 rounded-md"
          >
            <div className="w-[60px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductDetailsPageLoading = () => {
  return (
    <div className="w-[100%] h-[100%] p-[20px]">
      <div className="w-[100%] h-[100%] grid grid-rows-[50vh_100vh] grid-cols-1 md:grid-cols-2 md:grid-rows-1 overflow-y-scroll p-[5px] hide-scrollbar">
        {/* Image Section Skeleton */}
        <section className="w-[100%] h-[100%] flex flex-col md:flex-row border-black/10">
          <div className="w-[100%] md:w-[120px] h-[120px] md:h-[100%] border-black/10 flex flex-row items-center md:flex-col order-2 md:order-1 overflow-x-scroll md:overflow-y-scroll hide-scrollbar">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-[80%] md:w-[80%] md:h-auto aspect-square mx-[10px] md:my-[10px] bg-[#FAFAFA] flex items-center justify-center border-2 border-transparent rounded-md p-[10px]"
              >
                <div className="relative w-full h-full bg-gray-200 animate-pulse rounded"></div>
              </div>
            ))}
          </div>
          <div className="w-[100%] md:w-[calc(100%-120px)] h-[calc(100%-100px)] order-1 md:order-2 md:h-[100%] border-black/10 p-[10px]">
            <div className="relative w-[100%] h-[100%] flex items-center justify-center border-black/10">
              <div className="w-full h-full bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        </section>

        {/* Details Section Skeleton */}
        <section className="w-[100%] h-[100%] border-black/10 p-[10px] border md:px-[25px] overflow-y-scroll hide-scrollbar">
          <div className="w-[100%] h-auto flex flex-col border-black/10">
            <div className="w-full h-[30px] flex items-center">
              <div className="w-[80px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
            </div>

            <div className="w-full h-[auto] flex items-center">
              <div className="w-[200px] h-[24px] bg-gray-200 animate-pulse rounded"></div>
            </div>

            <div className="w-full h-[50px] flex items-center">
              <div className="w-[100px] h-[24px] bg-gray-200 animate-pulse rounded"></div>
            </div>

            <div className="w-full h-auto flex flex-col">
              {Array.from({ length: 2 }).map((_, index) => (
                <OptionSelectorLoading key={index} />
              ))}
            </div>

            <div className="w-full h-[auto] flex flex-col my-[15px]">
              <div className="w-full h-[30px] flex items-center">
                <div className="w-[80px] h-[16px] bg-gray-200 animate-pulse rounded"></div>
              </div>
              <div className="w-full h-[auto] min-h-[40px] flex items-center p-[2px]">
                <div className="w-auto h-[40px] flex p-[2px] border border-black/10 rounded-md">
                  <div className="h-full aspect-square flex items-center justify-center">
                    <div className="w-[16px] h-[16px] bg-gray-200 animate-pulse rounded"></div>
                  </div>
                  <div className="h-[100%] aspect-square flex items-center justify-center">
                    <div className="w-[20px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                  </div>
                  <div className="h-full aspect-square flex items-center justify-center">
                    <div className="w-[16px] h-[16px] bg-gray-200 animate-pulse rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-[auto] grid grid-cols-[auto_auto] my-[20px] gap-2">
              <div className="md:w-[80%] h-[50px] flex items-center justify-center border border-black/20 rounded-md p-[5px] bg-[#f0f0f0]">
                <div className="w-[100px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
              </div>
              <div className="md:w-[80%] h-[50px] flex items-center justify-center rounded-md bg-[#888888]">
                <div className="w-[80px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>

            <div className="w-full h-[auto] flex flex-col my-[15px]">
              <div className="w-full h-[50px] flex items-center">
                <div className="w-[100px] h-[16px] bg-gray-200 animate-pulse rounded"></div>
              </div>
              <div className="w-full h-[calc(100%-40px)] flex items-center">
                <div className="w-full h-[60px] bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetailsPageLoading;
