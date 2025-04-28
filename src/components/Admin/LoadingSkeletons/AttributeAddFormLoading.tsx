import React from "react";

const AttributeAddFormLoading = () => {
  return (
    <div className="w-full h-full flex justify-center items-start md:justify-start p-[0px] md:p-[20px]">
      <div className="w-[100%] md:w-[50%] h-auto max-h-[95%] border-[#D0D5DD] p-[5px] border rounded">
        <div className="w-full h-auto flex flex-col border border-[#D0D5DD] rounded mb-[20px]">
          <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] justify-start border-b border-[#D0D5DD] px-[10px] mb-[10px]">
            <div className="w-[120px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div className="w-[100%] h-[90px] flex flex-col mb-[5px] px-[10px]">
            <div className="w-full h-[30px] flex items-center justify-start">
              <div className="w-[100px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
            </div>
            <div className="w-full flex-1 flex items-center justify-start">
              <div className="w-full h-[2px] bg-gray-200 animate-pulse"></div>
            </div>
            <div className="w-full h-[30px] flex items-center justify-start">
              <div className="w-[120px] h-[12px] bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
          <div className="w-[100%] h-[90px] flex flex-col mb-[5px] px-[10px]">
            <div className="w-full h-[30px] flex items-center justify-start">
              <div className="w-[100px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
            </div>
            <div className="w-full flex-1 flex items-center justify-start">
              <div className="w-full h-[2px] bg-gray-200 animate-pulse"></div>
            </div>
            <div className="w-full h-[30px] flex items-center justify-start">
              <div className="w-[120px] h-[12px] bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
        <div className="w-[100%] h-auto flex flex-col mb-[20px] border border-[#D0D5DD] rounded">
          <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] justify-start border-b border-[#D0D5DD] p-[10px]">
            <div className="w-[120px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div className="w-full min-h-[40px] max-h-[100px] flex flex-wrap items-center border-[#D0D5DD] p-[10px]">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="w-[80px] h-[30px] bg-gray-200 animate-pulse rounded my-[5px] mr-[10px]"
              ></div>
            ))}
            <div className="h-[40px] min-w-[100px] bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div className="w-full h-[30px] flex items-center justify-start px-[10px]">
            <div className="w-[120px] h-[12px] bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
        <div className="w-full h-[50px] flex items-center">
          <div className="w-[100px] h-[24px] bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default AttributeAddFormLoading;
