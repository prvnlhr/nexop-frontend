// import { Icon } from "@iconify/react/dist/iconify.js";
// import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import testImg from "../../../..//../public/assets/iPhone_16_Pro_Max_White_Titanium_PDP_Image_Position_1__en-IN_eba16b29-a280-4119-91a7-0a2432e06cdf_grande.webp";
import Image from "next/image";
import Link from "next/link";

const CartPage = () => {
  const columns = ["Product", "Quantity", "Total"];

  const attributes = [
    { name: "Storage", value: "128GB" },
    { name: "Color", value: "White Titanium" },
  ];
  return (
    <div className="w-full h-full flex justify-center p-[10px]">
      <div className="w-[80%] h-[100%] grid  grid-cols-1 grid-rows-[70vh_70vh] md:grid-cols-[70%_30%] md:grid-rows-[100%] p-[2px] overflow-y-scroll hide-scrollbar">
        <section className="w-[100%] h-[80%] flex flex-col border border-[#D0D5DD] rounded p-[5px]">
          <div className="w-full h-[50px] flex items-center px-[15px]">
            <p className="text-[0.8rem] mt-[6px] font-semibold">
              YOUR PRODUCTS
            </p>
          </div>
          <div
            className="w-full h-full overflow-auto bg-white border-red-500"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <table className="min-w-full border-collapse  table-fixed">
              <colgroup>
                <col className="w-[50%]" />
                <col className="w-[30%]" />
                <col className="w-[20%]" />
              </colgroup>
              <thead className="h-[50px] sticky top-0 z-10 bg-white">
                <tr className="text-left text-[#1C3553] text-[0.8rem]">
                  {columns.map((col) => (
                    <th
                      key={col}
                      className="capitalize whitespace-nowrap pl-[20px]"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {Array.from({ length: 100 }).map((item, index) => (
                  <tr key={index} className="hover:bg-[#F7FAFE] text-[0.8rem]">
                    <td
                      className={`h-[100px] text-[#1C3553] border-b border-[#D0D5DD] overflow-hidden`}
                    >
                      <div className="w-[100%] h-[100%] flex items-center p-[10px]">
                        <div className="relative h-[100%] aspect-[1/1] flex items-center justify-center bg-[#D9DBDF]">
                          <Image
                            src={testImg}
                            alt="test-img"
                            fill={true}
                            className="object-contain"
                          />
                        </div>
                        <div className="h-[100%] flex-1 pl-[10px] flex justify-center flex-col">
                          <div className="w-full h-[auto] py-[5px] flex items-center">
                            <p className="text-[0.8rem] font-medium">
                              Iphone 16 Pro | 128 GB | White
                            </p>
                          </div>
                          <div className="w-full h-[auto] flex items-center border-red-500">
                            {attributes.map((attr, index) => (
                              <React.Fragment key={index}>
                                <div className="w-auto h-[100%] mr-[0px] flex  items-center">
                                  <div className="w-auto h-[100%] flex items-center text-[0.7rem] ">
                                    {attr.name}
                                  </div>
                                  <span className="mx-[2px]">-</span>
                                  <div className="w-auto h-[100%] flex items-center text-[0.7rem] ">
                                    {attr.value}
                                  </div>
                                </div>
                                {index !== attributes.length - 1 && (
                                  <Icon
                                    icon="radix-icons:dot-filled"
                                    className="w-[15px] h-[15px] mx-[5px] text-[#999999]"
                                  />
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td
                      className={`h-[100px] text-[#1C3553] border-b border-[#D0D5DD] overflow-hidden`}
                    >
                      <div className="w-[80%] h-[80%] flex items-center">
                        <div className="w-[auto] h-[40px] flex p-[2px] border border-black/10">
                          <button className="h-full aspect-square flex items-center justify-center cursor-pointer">
                            <Icon
                              icon="stash:minus-solid"
                              className="w-[40%] h-[40%]"
                            />
                          </button>
                          <div className="h-full aspect-square flex items-center justify-center text-[0.7rem]">
                            01
                          </div>
                          <button className="h-full aspect-square flex items-center justify-center cursor-pointer">
                            <Icon
                              icon="majesticons:plus-line"
                              className="w-[40%] h-[40%]"
                            />
                          </button>
                        </div>
                        <div className="h-[100%] flex-1  flex items-center justify-center ">
                          <button className="w-[20px] aspect-square flex items-center justify-center ">
                            <Icon
                              icon="ph:trash-simple-fill"
                              className="[100%] h-[100%]"
                            />
                          </button>
                        </div>
                      </div>
                    </td>

                    <td
                      className={`h-[100px] text-[#1C3553] border-b border-[#D0D5DD] overflow-hidden`}
                    >
                      <div className="w-auto h-full flex items-center">
                        <Icon icon="si:rupee-fill" width="15" height="15" />
                        <p>{129999}</p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="w-[100%] h-[100%] flex justify-center">
          <div className="w-[80%] h-[100%] flex flex-col">
            <div className="w-full h-[50px] flex items-center">
              <p className="text-[0.8rem] mt-[6px] font-semibold">
                ORDER SUMMARY
              </p>
            </div>
            <div className="w-full h-[calc(100%-50px)]">
              <div className="w-full h-[50px] flex">
                <div className="w-[50%] h-[50px] flex items-center">
                  <p className="text-[0.8rem] font-medium">Subtotal</p>
                </div>
                <div className="w-[50%] h-[50px] flex items-center justify-end pr-[5px]">
                  <Icon icon="si:rupee-fill" width="12" height="12" />
                  <p className="text-[0.8rem] font-medium">{129999}</p>
                </div>
              </div>
              <div className="w-full h-[50px] flex">
                <div className="w-[50%] h-[50px] flex items-center">
                  <p className="text-[0.8rem] font-medium">
                    Delivery & Handling charges
                  </p>
                </div>
                <div className="w-[50%] h-[50px] flex items-center justify-end pr-[5px]">
                  <Icon icon="si:rupee-fill" width="12" height="12" />
                  <p className="text-[0.8rem] font-medium">{40}</p>
                </div>
              </div>
              <div className="w-full h-[50px] flex border-t border-[#D0D5DD]">
                <div className="w-[50%] h-[50px] flex items-center">
                  <p className="text-[0.8rem] font-medium">Total Price</p>
                </div>
                <div className="w-[50%] h-[50px] flex items-center justify-end pr-[5px]">
                  <Icon icon="si:rupee-fill" width="12" height="12" />
                  <p className="text-[0.8rem] font-medium">{130040}</p>
                </div>
              </div>
              <div className="w-full h-[50px] flex mt-[10px]">
                <Link
                  href={"checkout"}
                  className="w-[100%] h-[80%] bg-[#444444] flex items-center justify-center text-[0.7rem] text-[white] cursor-pointer"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CartPage;
