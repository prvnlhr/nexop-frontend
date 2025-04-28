import React from "react";

const CustomerAuthFormLoading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-[0px] md:p-[30px]">
      <div className="w-[100%] md:w-[70%] grid grid-cols-[100%] grid-rows-[40vh_70vh] md:grid-cols-[50%_50%] md:grid-rows-[100%] h-[100%] border border-black/10 p-[5px] overflow-y-scroll hide-scrollbar">
        {/* Description Section */}
        <section className="w-full h-full flex items-center justify-center">
          <div className="w-[80%] h-[80%] flex flex-col">
            <div className="w-[250px] h-[48px] bg-gray-200 animate-pulse rounded"></div>
            <div className="w-[300px] h-[60px] bg-gray-200 animate-pulse rounded mt-[10px]"></div>
          </div>
        </section>

        {/* Auth Form Section */}
        <section className="w-full h-full flex items-center justify-center p-[5px]">
          <div className="w-[95%] h-[90%] md:w-[80%] md:h-[100%] grid grid-rows-[15%_20%_20%_20%_25%] border border-black/10 rounded px-[25px] py-[10px]">
            {/* Root Error Placeholder */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-[200px] h-[24px] bg-gray-200 animate-pulse rounded"></div>
            </div>

            {/* FULLNAME GROUP (Sign-up only) */}
            {true && (
              <div className="w-[100%] h-[100%] grid grid-rows-[30px_minmax(0,1fr)_30px]">
                <div className="w-full h-[100%] flex items-center">
                  <div className="w-[80px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                </div>
                <div className="w-full h-[100%]">
                  <div className="w-full h-[2px] bg-gray-200 animate-pulse"></div>
                </div>
                <div className="w-full h-[100%]">
                  <div className="w-[120px] h-[12px] bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>
            )}

            {/* EMAIL GROUP */}
            <div className="w-[100%] h-[100%] grid grid-rows-[30px_minmax(0,1fr)_30px]">
              <div className="w-full h-[100%] flex items-center">
                <div className="w-[80px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
              </div>
              <div className="w-full h-[100%]">
                <div className="w-full h-[2px] bg-gray-200 animate-pulse"></div>
              </div>
              <div className="w-full h-[100%]">
                <div className="w-[120px] h-[12px] bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>

            {/* PASSWORD GROUP */}
            <div className="w-[100%] h-[100%] grid grid-rows-[30px_minmax(0,1fr)_30px]">
              <div className="w-full h-[100%] flex items-center">
                <div className="w-[80px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
              </div>
              <div className="w-full h-[100%]">
                <div className="w-full h-[2px] bg-gray-200 animate-pulse"></div>
              </div>
              <div className="w-full h-[100%]">
                <div className="w-[120px] h-[12px] bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>

            {/* Footer - Submit Button and Link */}
            <div className="w-[100%] h-[100%] flex flex-col items-center">
              <div className="w-full h-[50%]">
                <div className="w-full h-[80%] flex items-center justify-center bg-[#444444]">
                  <div className="w-[80px] h-[14px] bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>
              <div className="w-full h-[50%] flex items-center justify-center">
                <div className="w-[150px] h-[12px] bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CustomerAuthFormLoading;
