import React from "react";

const OrdersPageLoading: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-[20px]">
      <div className="w-[100%] md:w-[80%] h-full flex flex-col border border-black/10 rounded">
        {/* Header */}
        <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] px-[10px] border-b border-[#D0D5DD]">
          <div className="w-[120px] h-[16px] bg-gray-200 animate-pulse rounded" />
        </div>
        {/* Orders List */}
        <div className="w-full h-[calc(100%-40px)] flex flex-col overflow-y-scroll hide-scrollbar p-[20px]">
          {/* Simulate 2-3 order cards for loading */}
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="w-[100%] md:w-[60%] h-[auto] flex flex-col border border-black/10 rounded mb-[30px]"
            >
              {/* Order Header */}
              <div className="w-full h-[50px] md:h-[30px] flex items-center bg-[#e4f0ff] px-[10px] border-b border-[#D0D5DD]">
                <div className="w-[100px] h-[16px] bg-gray-200 animate-pulse rounded" />
              </div>
              {/* Order Content */}
              <div className="w-full h-[auto] flex flex-col p-[10px]">
                {/* Item Count */}
                <div className="w-full h-[30px] flex items-center">
                  <div className="w-[120px] h-[20px] bg-gray-200 animate-pulse rounded" />
                </div>
                {/* Items List */}
                <div className="w-full flex-1 h-auto flex flex-col p-[5px] overflow-y-scroll hide-scrollbar">
                  {/* Simulate 1-2 items per order */}
                  {Array.from({ length: 2 }).map((_, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="w-full h-[50px] min-h-[50px] flex mb-[10px]"
                    >
                      {/* Thumbnail Placeholder */}
                      <div className="h-[100%] aspect-square bg-gray-200 animate-pulse rounded" />
                      {/* Item Name Placeholder */}
                      <div className="h-[100%] flex-1 flex items-center px-[10px]">
                        <div className="w-[80%] h-[16px] bg-gray-200 animate-pulse rounded" />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Order Amount */}
                <div className="w-full h-[30px] flex items-center justify-end">
                  <div className="w-[100px] h-[16px] bg-gray-200 animate-pulse rounded" />
                </div>
              </div>
              {/* Shipping Address */}
              <div className="w-full h-[80px] flex flex-col items-center p-[10px] border-t border-black/10">
                <div className="w-full h-[20px] flex items-center">
                  <div className="w-[80px] h-[16px] bg-gray-200 animate-pulse rounded" />
                </div>
                <div className="w-full flex-1 flex items-end">
                  <div className="w-[90%] h-[32px] bg-gray-200 animate-pulse rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPageLoading;
