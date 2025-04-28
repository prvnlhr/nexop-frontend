import React from "react";

const ProductAddFormLoading = () => {
  return (
    <div className="w-[100%] h-[100%] flex justify-start items-start p-[5px]">
      <div
        className="w-[70%] h-full p-[5px] overflow-y-scroll"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="w-full h-[40px] flex items-center justify-end">
          <div className="w-[100px] h-[24px] bg-gray-200 animate-pulse rounded"></div>
        </div>
        <section className="w-full h-auto border border-[#D0D5DD] mb-[20px] rounded">
          <div className="w-full h-[40px] flex items-center mb-[20px] px-[10px] bg-[#e4f0ff] border-b border-[#D0D5DD]">
            <div className="w-[120px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div className="w-full h-auto px-[10px]">
            <div className="w-full h-auto flex justify-between">
              <div className="w-[48%] h-[100px] flex flex-col">
                <div className="w-full h-[30px] flex items-center justify-start">
                  <div className="w-[100px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                </div>
                <div className="w-full h-[40px] flex items-center justify-start">
                  <div className="w-full h-[2px] bg-gray-200 animate-pulse"></div>
                </div>
                <div className="w-full h-[30px] flex items-center justify-start">
                  <div className="w-[120px] h-[12px] bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>
              <div className="w-[48%] h-[100px] flex flex-col">
                <div className="w-full h-[30px] flex items-center justify-start">
                  <div className="w-[100px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                </div>
                <div className="w-full h-[40px] flex items-center justify-start">
                  <div className="w-full h-[2px] bg-gray-200 animate-pulse"></div>
                </div>
                <div className="w-full h-[30px] flex items-center justify-start">
                  <div className="w-[120px] h-[12px] bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>
            </div>
            <div className="w-[100%] h-auto flex flex-col">
              <div className="w-full h-[30px] flex items-center justify-start">
                <div className="w-[120px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
              </div>
              <div className="w-full h-[70px] flex items-center justify-start">
                <div className="w-full h-full border border-[#D0D5DD] bg-gray-200 animate-pulse rounded"></div>
              </div>
              <div className="w-full h-[30px] flex items-center justify-start">
                <div className="w-[120px] h-[12px] bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>
            <div className="w-full h-auto flex justify-between">
              <div className="w-[48%] h-[100px] flex flex-col">
                <div className="w-full h-[30px] flex items-center justify-start">
                  <div className="w-[100px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                </div>
                <div className="w-full h-[40px] flex items-center justify-start">
                  <div className="w-full h-[2px] bg-gray-200 animate-pulse"></div>
                </div>
                <div className="w-full h-[30px] flex items-center justify-start">
                  <div className="w-[120px] h-[12px] bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>
              <div className="w-[48%] h-[100px] flex flex-col">
                <div className="w-full h-[30px] flex items-center justify-start">
                  <div className="w-[100px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                </div>
                <div className="w-full h-[40px] flex items-center justify-start">
                  <div className="w-full h-[2px] bg-gray-200 animate-pulse"></div>
                </div>
                <div className="w-full h-[30px] flex items-center justify-start">
                  <div className="w-[120px] h-[12px] bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>
            </div>
            <div className="w-full h-auto flex flex-col border rounded border-[#D0D5DD] my-[15px]">
              <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] justify-start border-b border-[#D0D5DD] px-[10px]">
                <div className="w-[150px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
              </div>
              <div
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                className="w-full h-[300px] grid grid-cols-5 gap-2 overflow-y-scroll whitespace-nowrap p-[10px]"
              >
                <div className="w-[100%] aspect-[1/1] border border-dashed rounded bg-gray-200 animate-pulse"></div>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="relative w-[100%] aspect-[1/1] rounded bg-gray-200 animate-pulse"
                  >
                    <div className="absolute top-1 right-1 w-[20px] h-[20px] bg-red-400 rounded-full"></div>
                  </div>
                ))}
              </div>
              <div className="w-full h-[30px] flex items-center border-t border-[#D0D5DD] px-[10px]">
                <div className="w-[120px] h-[12px] bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>
          </div>
          <div className="w-full h-[40px] flex items-center justify-end px-[10px]">
            <div className="w-[100px] h-[24px] bg-gray-200 animate-pulse rounded"></div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductAddFormLoading;
