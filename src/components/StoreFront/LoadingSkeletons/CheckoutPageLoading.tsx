import React from "react";

const CheckoutPageLoading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[95%] md:w-[80%] h-[90%] grid grid-cols-1 grid-rows-[auto_70vh] md:grid-cols-[70%_30%] md:grid-rows-[100%] p-[2px] overflow-y-scroll hide-scrollbar">
        {/* Form Section Skeleton */}
        <section className="w-[100%] h-auto md:h-[100%] md:overflow-y-scroll hide-scrollbar border-green-500">
          <div className="w-full h-full">
            {/* Contact Section */}
            <div className="w-[100%] h-[auto] border border-[#D0D5DD] rounded">
              <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] px-[10px] border-b border-[#D0D5DD]">
                <div className="w-[100px] h-[16px] bg-gray-200 animate-pulse rounded"></div>
              </div>
              <div className="w-full h-auto flex flex-col p-[10px]">
                <div className="w-[48%] h-[100px] flex flex-col">
                  <div className="w-full h-[30px] flex items-center justify-start">
                    <div className="w-[80px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                  </div>
                  <div className="w-full h-[40px] flex items-center justify-start">
                    <div className="w-full h-[2px] bg-gray-200 animate-pulse"></div>
                  </div>
                  <div className="w-full h-[30px] flex items-center justify-start">
                    <div className="w-[120px] h-[12px] bg-gray-200 animate-pulse rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Section */}
            <div className="w-[100%] h-[auto] border border-[#D0D5DD] rounded mt-[10px]">
              <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] px-[10px] border-b border-[#D0D5DD]">
                <div className="w-[100px] h-[16px] bg-gray-200 animate-pulse rounded"></div>
              </div>
              <div className="w-full h-auto flex flex-col p-[10px]">
                <div className="w-full h-auto flex justify-between">
                  <div className="w-[48%] h-[100px] flex flex-col">
                    <div className="w-full h-[30px] flex items-center justify-start">
                      <div className="w-[80px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
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
                      <div className="w-[80px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                    </div>
                    <div className="w-full h-[40px] flex items-center justify-start">
                      <div className="w-full h-[2px] bg-gray-200 animate-pulse"></div>
                    </div>
                    <div className="w-full h-[30px] flex items-center justify-start">
                      <div className="w-[120px] h-[12px] bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="w-[100%] h-[100px] flex flex-col">
                  <div className="w-full h-[30px] flex items-center justify-start">
                    <div className="w-[150px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                  </div>
                  <div className="w-[100%] h-[40px] flex items-center justify-start">
                    <div className="w-full h-[2px] bg-gray-200 animate-pulse"></div>
                  </div>
                  <div className="w-full h-[30px] flex items-center justify-start">
                    <div className="w-[120px] h-[12px] bg-gray-200 animate-pulse rounded"></div>
                  </div>
                </div>
                <div className="w-[100%] h-[100px] flex flex-col">
                  <div className="w-full h-[30px] flex items-center justify-start">
                    <div className="w-[150px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                  </div>
                  <div className="w-[100%] h-[40px] flex items-center justify-start">
                    <div className="w-full h-[2px] bg-gray-200 animate-pulse"></div>
                  </div>
                  <div className="w-full h-[30px] flex items-center justify-start">
                    <div className="w-[120px] h-[12px] bg-gray-200 animate-pulse rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="w-full h-[auto] flex flex-col border border-[#D0D5DD] rounded mt-[30px]">
              <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] px-[10px] border-b border-[#D0D5DD]">
                <div className="w-[100px] h-[16px] bg-gray-200 animate-pulse rounded"></div>
              </div>
              <div className="w-full p-[10px] flex justify-end">
                <div className="w-[auto] h-[auto] bg-[#444444] px-[30px] py-[10px] flex flex-col items-center text-white rounded">
                  <div className="w-[80px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                  <div className="w-[60px] h-[14px] bg-gray-200 animate-pulse rounded mt-[5px]"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Items Summary Section Skeleton */}
        <section className="w-[100%] h-[100%] p-[5px] border-red-500">
          <div className="w-full h-full flex flex-col p-[20px]">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="w-full h-auto grid grid-cols-[30%_70%] border-black/10 p-[5px]"
              >
                <div className="w-[100%] h-[100%] border-red-500">
                  <div className="w-[80%] aspect-square relative flex items-center justify-center bg-gray-100 rounded border border-black/10 overflow-hidden">
                    <div className="w-full h-full bg-gray-200 animate-pulse rounded"></div>
                  </div>
                </div>
                <div className="w-[100%] h-[100%] flex flex-col border-green-500">
                  <div className="w-full h-[40px] flex items-center mb-[5px]">
                    <div className="w-[120px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                  </div>
                  <div className="w-full h-auto flex flex-wrap items-center">
                    {Array.from({ length: 2 }).map((_, attrIndex) => (
                      <div
                        key={attrIndex}
                        className="w-auto h-[auto] flex items-center mr-[8px] mb-[5px]"
                      >
                        <div className="w-[60px] h-[12px] bg-gray-200 animate-pulse rounded"></div>
                        <span className="text-[0.7rem] mx-[2px]">:</span>
                        <div className="w-[60px] h-[12px] bg-gray-200 animate-pulse rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CheckoutPageLoading;
