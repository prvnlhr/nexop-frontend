import React from "react";

const CommonTableLoading = () => {
  const columns = ["Name", "Brand", "Category", "Action"];

  return (
    <div className="w-full h-[100%] flex flex-col items-center justify-center p-[20px]">
      <div className="w-full h-[50px] flex items-center justify-between">
        <div className="w-[100px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
        <div className="w-[80px] h-[24px] bg-gray-200 animate-pulse rounded"></div>
      </div>
      <div className="w-full h-[calc(100%-50px)] flex items-start">
        <div
          className="w-full h-full overflow-auto bg-white border-y border-[#D0D5DD]"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <table className="min-w-full border-collapse">
            <colgroup>
              <col className="w-[25%]" />
              <col className="w-[25%]" />
              <col className="w-[25%]" />
              <col className="w-auto" />
            </colgroup>
            {/* Table Head */}
            <thead className="bg-[#F7F7F7] sticky top-0 z-10 border-b-[1px] border-t-[#D0D5DD]">
              <tr className="text-left text-[#1C3553] text-[0.8rem]">
                {columns.map((col) => (
                  <th
                    key={col}
                    className="px-4 py-2 capitalize whitespace-nowrap border-x border-[#D0D5DD]"
                  >
                    <div className="w-[60px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="text-[0.8rem]">
                  {/* Name */}
                  <td className="px-4 py-2 h-[50px] border border-[#D0D5DD] text-[#1C3553] overflow-hidden">
                    <div className="flex items-center max-w-[300px]">
                      <div className="w-[150px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  </td>

                  {/* Brand */}
                  <td className="px-4 py-2 whitespace-nowrap border border-[#D0D5DD] text-[#1C3553]">
                    <div className="w-[80px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                  </td>

                  {/* Category */}
                  <td className="px-4 py-2 whitespace-nowrap border border-[#D0D5DD] text-[#1C3553]">
                    <div className="w-[80px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                  </td>

                  {/* Action */}
                  <td className="px-4 py-2 whitespace-nowrap border border-[#D0D5DD] text-[#1C3553]">
                    <div className="w-full h-full flex items-center">
                      <div className="w-[70px] h-[30px] border flex items-center mr-[10px] rounded">
                        <div className="flex-1 h-full flex items-center justify-center pl-[10px]">
                          <div className="w-[30px] h-[12px] bg-gray-200 animate-pulse rounded"></div>
                        </div>
                        <div className="h-full aspect-[1/1] flex items-center justify-center">
                          <div className="w-[15px] h-[15px] bg-gray-200 animate-pulse rounded"></div>
                        </div>
                      </div>
                      <div className="w-[80px] h-[30px] border flex items-center ml-[10px] rounded">
                        <div className="flex-1 h-full flex items-center justify-center pl-[10px]">
                          <div className="w-[40px] h-[12px] bg-gray-200 animate-pulse rounded"></div>
                        </div>
                        <div className="h-full aspect-[1/1] flex items-center justify-center">
                          <div className="w-[15px] h-[15px] bg-gray-200 animate-pulse rounded"></div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CommonTableLoading;
