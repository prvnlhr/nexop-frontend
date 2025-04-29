import { OrderListResponse } from "@/types/storefront/orderTypes";
import Image from "next/image";
import React from "react";

interface OrdersPageProps {
  userOrders: OrderListResponse[];
}
const OrdersPage: React.FC<OrdersPageProps> = ({ userOrders }) => {
  // console.log(" userOrders:", userOrders);
  return (
    <div className="full h-full flex items-center justify-center p-[20px]">
      <div className="w-[100%] md:w-[80%] h-full flex flex-col border border-black/10 rounded">
        <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] px-[10px] border-b border-[#D0D5DD]">
          <p className="text-[0.8rem] mt-[4px] font-medium">
            ORDERS - {userOrders.length.toString().padStart(2, "0")}
          </p>
        </div>
        <div className="w-full h-[calc(100%-40px)] flex flex-col overflow-y-scroll hide-scrollbar p-[20px]">
          {userOrders.map((order) => (
            <div
              key={order.id}
              className="w-[100%] md:w-[60%] h-[auto] flex flex-col border border-black/10 rounded mb-[30px]"
            >
              <div className="w-full h-[50px] md:h-[30px] flex items-center bg-[#e4f0ff] px-[10px] border-b border-[#D0D5DD]">
                <p className="text-[0.8rem] mt-[4px] font-medium">
                  <span className="">ORDER NO #</span>
                  {order.id}
                </p>
              </div>
              <div className="w-full h-[auto] flex flex-col p-[10px]">
                <div className="w-full h-[30px] flex items-center">
                  <p className="text-[0.7rem] font-medium border border-[#D0D5DD] px-[10px] py-[5px] rounded">
                    NUMBER OF ITEMS -
                    {order.itemCount.toString().padStart(2, "0")}
                  </p>
                </div>
                <div className="w-full flex-1 h-auto flex flex-col p-[5px] overflow-y-scroll hide-scrollbar">
                  {order.items.map((item) => (
                    <div
                      key={item.variantName}
                      className="w-full h-[50px] min-h-[50px] flex my-[10px]"
                    >
                      <div className="h-[100%] aspect-square bg-[#EEEEEE] p-[5px] rounded">
                        <div className="relative w-[100%] h-[100%] flex items-center justify-center">
                          <Image
                            fill={true}
                            src={item.thumbnail as string}
                            alt={item.variantName as string}
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <div className="h-[100%] flex-1 flex flex-col center px-[10px]">
                        <p className="text-[0.75rem] font-normal">
                          {item.variantName}
                        </p>
                        <p className="text-[0.75rem] font-normal">
                          ₹ {item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="w-full h-[30px] flex items-center justify-end">
                  <p className="text-[0.75rem] font-medium">
                    ORDER AMOUNT:
                    <span className="mx-[5px]">₹{order.totalAmount}</span>
                  </p>
                </div>
              </div>
              <div className="w-full h-[80px] flex flex-col items-center p-[10px] border-t border-black/10">
                <div className="w-full h-[20px] flex items-center">
                  <p className="text-[0.8rem] font-medium border-b border-black/10">
                    Shipping to:
                  </p>
                </div>
                <div className="w-full flex-1 flex items-end">
                  <p className="text-[0.75rem] line-clamp-2">
                    {order.address.address}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
