import React from "react";

const OrderConfirmationPageLoading: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-gray-50">
      <div className="w-[90%] md:w-[400px] h-auto flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        {/* Success Icon Placeholder */}
        <div className="w-full flex justify-center mb-4">
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 rounded-full bg-gray-200 animate-pulse"></div>
          </div>
        </div>

        {/* Order Confirmed Title Placeholder */}
        <div className="w-full text-center mb-6">
          <div className="w-[150px] h-[24px] bg-gray-200 animate-pulse rounded mx-auto"></div>
        </div>

        {/* Order Summary Placeholder */}
        <div className="w-full space-y-4 mb-6">
          <div className="w-[120px] h-[20px] bg-gray-200 animate-pulse rounded"></div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="w-[80px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
              <div className="w-[100px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
            </div>

            <div className="flex justify-between items-center">
              <div className="w-[60px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
              <div className="w-[120px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
            </div>

            <div className="flex justify-between items-center">
              <div className="w-[90px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
              <div className="w-[70px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        </div>

        {/* Shipping Address Placeholder */}
        <div className="w-full mb-6">
          <div className="w-[100px] h-[16px] bg-gray-200 animate-pulse rounded mb-2"></div>
          <div className="space-y-2">
            <div className="w-[200px] h-[12px] bg-gray-200 animate-pulse rounded"></div>
            <div className="w-[150px] h-[12px] bg-gray-200 animate-pulse rounded"></div>
            <div className="w-[180px] h-[12px] bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>

        {/* Action Buttons Placeholder */}
        <div className="w-full space-y-3">
          <div className="w-full h-10 bg-gray-200 animate-pulse rounded-lg"></div>
          <div className="w-full h-10 bg-gray-200 animate-pulse rounded-lg"></div>
        </div>

        {/* Support Info Placeholder */}
        <div className="w-full text-center mt-6">
          <div className="w-[150px] h-[12px] bg-gray-200 animate-pulse rounded mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPageLoading;
