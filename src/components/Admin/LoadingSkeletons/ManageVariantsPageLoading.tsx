import React from "react";

const ManageVariantsPageLoading = () => {
  return (
    <div className="w-full h-full flex">
      <div className="w-[70%] h-full flex flex-col p-[10px] overflow-y-scroll hide-scrollbar">
        {/* Product Details Card */}
        <section className="w-full h-[auto] flex flex-col my-[20px] border rounded border-[#D0D5DD]">
          <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] px-[10px] border-b border-[#D0D5DD]">
            <div className="w-[150px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div className="w-full h-auto grid grid-cols-2 grid-rows-[80px_80px] gap-2 p-[10px]">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="w-full h-full">
                <div className="w-full h-[40px] flex items-center">
                  <div className="w-[100px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                </div>
                <div className="w-full h-[40px] flex items-center border-b border-[#D0D5DD]">
                  <div className="w-[120px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Attributes Management */}
        <section className="w-full h-auto border border-[#D0D5DD] rounded">
          <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] px-[10px] border-b border-[#D0D5DD]">
            <div className="w-[150px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div className="w-full h-[calc(100%-40px)] p-[8px]">
            <div className="w-full h-[40px] flex items-center justify-start mb-[10px]">
              <div className="w-[200px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
            </div>
            <div className="w-[100%] h-auto flex flex-col border border-[#D0D5DD] p-[10px] rounded">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="w-full h-auto flex flex-col">
                  <div className="w-full h-[30px] flex items-center">
                    <div className="w-[80px] h-[12px] bg-gray-200 animate-pulse rounded"></div>
                  </div>
                  <div className="w-full h-auto min-h-[40px] flex flex-wrap">
                    {Array.from({ length: 3 }).map((_, optIndex) => (
                      <div
                        key={optIndex}
                        className="w-[80px] h-[30px] bg-gray-200 animate-pulse rounded-full my-[10px] mr-[10px]"
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Variant Image Management */}
        <section className="w-full h-auto border border-[#D0D5DD] my-[20px] rounded">
          <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] px-[10px] border-b border-[#D0D5DD]">
            <div className="w-[150px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div className="w-full h-[calc(100%-40px)] p-[8px]">
            <div className="w-full h-auto flex flex-col border border-[#D0D5DD] p-[10px] rounded">
              <div className="w-full h-[40px] flex items-center overflow-x-scroll hide-scrollbar gap-[10px]">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-[80px] h-[30px] bg-gray-200 animate-pulse rounded-full"
                  ></div>
                ))}
              </div>
              <div className="w-full h-[200px] mt-[10px] border-2 border-dashed border-[#D0D5DD] rounded bg-gray-200 animate-pulse"></div>
              <div className="w-full h-auto max-h-[300px] grid grid-cols-5 gap-5 mt-[10px]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-[100%] aspect-square bg-gray-200 animate-pulse rounded"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Variants Table */}
        <section className="w-full h-auto border border-[#D0D5DD] mb-[10px] rounded">
          <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] px-[10px] border-b border-[#D0D5DD]">
            <div className="w-[120px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div className="w-full h-[calc(100%-40px)] p-[8px]">
            <div className="w-full h-[auto] flex items-center justify-end">
              <div
                className="w-full h-full overflow-auto bg-white border-y border-[#D0D5DD]"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <table className="min-w-full border-collapse">
                  <colgroup>
                    <col className="w-[40%]" />
                    <col className="w-[20%]" />
                    <col className="w-[auto]" />
                    <col className="w-auto" />
                  </colgroup>
                  <thead className="bg-[#F7F7F7] sticky top-0 z-10 border-b-[1px] border-t-[#D0D5DD]">
                    <tr className="text-left text-[#1C3553] text-[0.8rem]">
                      {["SKU", "Name", "Price", "Stock", "Action"].map(
                        (col) => (
                          <th
                            key={col}
                            className="px-4 py-2 capitalize whitespace-nowrap border-x border-[#D0D5DD]"
                          >
                            <div className="w-[60px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index} className="text-[0.8rem]">
                        <td className="px-4 py-2 h-[50px] border border-[#D0D5DD]">
                          <div className="w-[120px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                        </td>
                        <td className="px-4 py-2 h-[50px] border border-[#D0D5DD]">
                          <div className="w-[100px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap border border-[#D0D5DD]">
                          <div className="w-[60px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap border border-[#D0D5DD]">
                          <div className="w-[40px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap border border-[#D0D5DD]">
                          <div className="w-full h-full flex items-center">
                            <div className="w-[80px] h-[30px] bg-gray-200 animate-pulse rounded mr-[10px]"></div>
                            <div className="w-[80px] h-[30px] bg-gray-200 animate-pulse rounded ml-[10px]"></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-full h-[50px] flex items-center justify-end px-[0px] mt-[20px]">
              <div className="w-[100px] h-[24px] bg-gray-200 animate-pulse rounded"></div>
            </div>
            <div className="w-full h-[40px] flex items-center">
              <div className="w-[120px] h-[12px] bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        </section>
      </div>

      {/* Edit Variant Details Form */}
      <div className="w-[30%] h-[100%] flex flex-col border-[#D0D5DD] p-[10px] my-[20px]">
        <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] px-[10px] rounded-t border border-[#D0D5DD]">
          <div className="w-[100px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div className="w-full h-[calc(100%-40px)] border-x border-b border-[#D0D5DD] p-[10px] overflow-y-scroll hide-scrollbar">
          <section className="w-full h-[auto] flex flex-col border border-[#D0D5DD] p-[10px] rounded">
            {["Variant Name", "Price", "Stock"].map((label, index) => (
              <div key={index} className="w-[100%] h-[100px] flex flex-col">
                <div className="w-full h-[30px] flex items-center justify-start">
                  <div className="w-[100px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                </div>
                <div className="w-full h-[40px] flex items-center justify-start">
                  <div className="w-full h-[2px] bg-gray-200 animate-pulse"></div>
                </div>
                <div className="w-full h-[30px] flex items-center justify-start"></div>
              </div>
            ))}
            <div className="w-[100%] h-[auto] flex flex-col">
              <div className="w-full h-[30px] flex items-center justify-start">
                <div className="w-[80px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
              </div>
              <div className="w-full h-[auto] grid grid-cols-[50%_50%] grid-rows-[40px_40px] gap-[5px] p-[2px]">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-[80%] h-[95%] bg-gray-200 animate-pulse rounded-full"
                  ></div>
                ))}
              </div>
              <div className="w-full h-[30px] flex items-center justify-start"></div>
            </div>
          </section>
          <section className="w-full h-auto border border-[#D0D5DD] mt-[10px] p-[5px]">
            <div className="w-full h-[30px] flex items-center border-b border-[#D0D5DD]">
              <div className="w-[120px] h-[12px] bg-gray-200 animate-pulse rounded"></div>
            </div>
            <div className="w-full h-auto max-h-[300px] grid grid-cols-2 gap-5 mt-[10px]">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="w-[100%] aspect-square bg-gray-200 animate-pulse rounded"
                ></div>
              ))}
            </div>
          </section>
        </div>
        <div className="w-full h-[50px] flex items-center justify-end px-[5px] border-x border-b border-[#D0D5DD]">
          <div className="w-[100px] h-[24px] bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ManageVariantsPageLoading;
