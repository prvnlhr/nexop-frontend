import React from "react";

const CategoryAddFormLoading = () => {
  return (
    <div className="w-full h-full flex justify-center items-start md:justify-start p-[0px] md:p-[20px]">
      <div className="w-[90%] md:w-[50%] h-auto border-[#D0D5DD] mt-[10%] md:mt-[5%]">
        <div className="w-[100%] h-[90px] flex flex-col mb-[10px]">
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
        <div className="w-[100%] h-[90px] flex flex-col">
          <div className="w-full h-[30px] flex items-center justify-start">
            <div className="w-[150px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div className="w-full flex-1 flex items-center justify-start">
            <div className="w-full h-[2px] bg-gray-200 animate-pulse"></div>
          </div>
          <div className="w-full h-[30px] flex items-center justify-start">
            <div className="w-[120px] h-[12px] bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
        <div className="w-full h-auto">
          <div className="w-[100px] h-[28px] bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default CategoryAddFormLoading;
