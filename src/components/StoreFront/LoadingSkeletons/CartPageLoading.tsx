import React from "react";

const CartPageLoading = () => {
  return (
    <div className="w-full h-full flex justify-center p-[10px]">
      <div className="w-[95%] md:w-[80%] h-[100%] grid grid-cols-1 grid-rows-[70vh_70vh] md:grid-cols-[70%_30%] md:grid-rows-[100%] p-[2px] overflow-y-scroll hide-scrollbar">
        {/* Products Section Skeleton */}
        <section className="w-[100%] h-[80%] flex flex-col border border-[#D0D5DD] rounded p-[5px]">
          <div className="w-full h-[50px] flex items-center px-[15px]">
            <div className="w-[150px] h-[16px] bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div className="w-full h-full overflow-auto">
            <table className="min-w-full border-collapse table-fixed">
              <colgroup>
                <col className="w-[50%]" />
                <col className="w-[30%]" />
                <col className="w-[20%]" />
              </colgroup>
              <thead className="h-[50px] sticky top-0 z-10">
                <tr className="text-left text-[#1C3553] text-[0.8rem]">
                  {["Product", "Quantity", "Total"].map((col) => (
                    <th
                      key={col}
                      className="capitalize whitespace-nowrap pl-[20px]"
                    >
                      <div className="w-[80px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 3 }).map((_, index) => (
                  <tr key={index} className="text-[0.8rem]">
                    {/* Product Info Cell */}
                    <td className="h-[100px] text-[#1C3553] border-b border-[#D0D5DD] overflow-hidden p-[2px]">
                      <div className="w-[100%] h-[100%] flex items-center p-[10px]">
                        <div className="relative h-[100%] aspect-[1/1] flex items-center justify-center bg-[#FAFAFA]">
                          <div className="w-full h-full bg-gray-200 animate-pulse rounded"></div>
                        </div>
                        <div className="h-[100%] flex-1 pl-[10px] flex justify-center flex-col">
                          <div className="w-full h-[auto] py-[5px] flex items-center">
                            <div className="w-[120px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                          </div>
                          <div className="w-full h-[auto] flex items-center">
                            <div className="w-[100px] h-[12px] bg-gray-200 animate-pulse rounded"></div>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Quantity Cell */}
                    <td className="h-[100px] text-[#1C3553] border-b border-[#D0D5DD] overflow-hidden">
                      <div className="w-[80%] h-[80%] flex items-center">
                        <div className="w-[auto] h-[40px] flex p-[2px] border border-black/10">
                          <div className="h-full aspect-square flex items-center justify-center">
                            <div className="w-[16px] h-[16px] bg-gray-200 animate-pulse rounded"></div>
                          </div>
                          <div className="h-full aspect-square flex items-center justify-center">
                            <div className="w-[20px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                          </div>
                          <div className="h-full aspect-square flex items-center justify-center">
                            <div className="w-[16px] h-[16px] bg-gray-200 animate-pulse rounded"></div>
                          </div>
                        </div>
                        <div className="h-[100%] flex-1 flex items-center justify-center">
                          <div className="w-[20px] h-[20px] bg-gray-200 animate-pulse rounded"></div>
                        </div>
                      </div>
                    </td>

                    {/* Total Price Cell */}
                    <td className="h-[100px] text-[#1C3553] border-b border-[#D0D5DD] overflow-hidden">
                      <div className="w-auto h-full flex items-center">
                        <div className="w-[60px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Order Summary Section Skeleton */}
        <section className="w-[100%] h-[100%] flex justify-center">
          <div className="w-[95%] md:w-[80%] h-[100%] flex flex-col">
            <div className="w-full h-[50px] flex items-center">
              <div className="w-[120px] h-[16px] bg-gray-200 animate-pulse rounded"></div>
            </div>
            <div className="w-full h-[calc(100%-50px)]">
              <div className="w-full h-[50px] flex">
                <div className="w-[50%] h-[50px] flex items-center">
                  <div className="w-[80px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                </div>
                <div className="w-[50%] h-[50px] flex items-center justify-end pr-[5px]">
                  <div className="w-[60px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>
              <div className="w-full h-[50px] flex">
                <div className="w-[50%] h-[50px] flex items-center">
                  <div className="w-[120px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                </div>
                <div className="w-[50%] h-[50px] flex items-center justify-end pr-[5px]">
                  <div className="w-[60px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>
              <div className="w-full h-[50px] flex border-t border-[#D0D5DD]">
                <div className="w-[50%] h-[50px] flex items-center">
                  <div className="w-[100px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                </div>
                <div className="w-[50%] h-[50px] flex items-center justify-end pr-[5px]">
                  <div className="w-[60px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>
              <div className="w-full h-[50px] flex mt-[10px]">
                <div className="w-[100%] h-[80%] bg-[#444444] flex items-center justify-center">
                  <div className="w-[80px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CartPageLoading;
