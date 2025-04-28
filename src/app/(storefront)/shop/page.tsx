import React from "react";
import bannerImage from "../../../../public/assets/Desktop_1_1592x 1.png";
import mobileCategoryImg from "../../../../public/assets/Samsung-Galaxy-S25-Series-Reviewer-Photo-SOURCE-Julian-Chokkattu 1.png";
import tvCategoryImg from "../../../../public/assets/top-banner-40 1.png";
import laptopCategoryImg from "../../../../public/assets/businesslaptops-2048px-233284-2x1-1.webp";
import acCategoryImg from "../../../../public/assets/Truth-about-hot-wind 1.png";

import Image from "next/image";
import Link from "next/link";
const page = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full  overflow-y-scroll hide-scrollbar p-[0px]">
        <div className="relative w-full h-[100%]">
          <Image
            src={bannerImage}
            fill={true}
            className="object-cover object-top"
            alt="image-banner"
            priority={true}
          />
          <div className="absolute bottom-5 left-5 w-auto h-auto">
            <p className="text-[1rem] text-[#101828] font-black">NEW LAUNCH</p>
            <p className="text-[3rem] text-[#101828] font-black">
              Nothing Phone (3a)
            </p>
          </div>
        </div>
        <div className="w-full h-[auto] flex  items-center justify-center my-[50px]">
          <div className="w-full h-auto flex flex-col">
            <div className="w-full h-[80px] flex items-center justify-center text-center my-[20px]">
              <p className="text-[1.5rem] font-black">
                POPULAR
                <br />
                CATEGORIES
              </p>
            </div>
            <div className="w-full h-[calc(100%-80px)] flex flex-wrap justify-center overflow-x-scroll hide-scrollbar">
              <div className="relative h-[120px] mx-[10px] my-[10px] aspect-[2/1.5] flex flex-col">
                <Link
                  href={"/shop/categories/mobiles/products"}
                  className="relative w-full aspect-[2/1] flex items-center justify-center"
                >
                  <Image
                    src={mobileCategoryImg}
                    fill={true}
                    className="object-cover"
                    alt="mobile-cat"
                  />
                </Link>
                <div className="w-full flex-1 flex items-center  justify-center">
                  <p className="bottom-2 right-2 text-[0.8rem] font-bold">
                    Mobiles
                  </p>
                </div>
              </div>
              <div className="relative h-[120px] mx-[10px] my-[10px] aspect-[2/1.5] flex flex-col">
                <Link
                  href={"/shop/categories/tvs/products"}
                  className="relative w-full aspect-[2/1] flex items-center justify-center"
                >
                  <Image
                    src={tvCategoryImg}
                    fill={true}
                    className="object-cover"
                    alt="mobile-cat"
                  />
                </Link>
                <div className="w-full flex-1 flex items-center  justify-center">
                  <p className="bottom-2 right-2 text-[0.8rem] font-bold">
                    Televisions
                  </p>
                </div>
              </div>
              <div className="relative h-[120px] mx-[10px] my-[10px] aspect-[2/1.5] flex flex-col">
                <Link
                  href={"/shop/categories/laptops/products"}
                  className="relative w-full aspect-[2/1] flex items-center justify-center"
                >
                  <Image
                    src={laptopCategoryImg}
                    fill={true}
                    className="object-cover"
                    alt="mobile-cat"
                  />
                </Link>
                <div className="w-full flex-1 flex items-center  justify-center">
                  <p className="bottom-2 right-2 text-[0.8rem] font-bold">
                    Laptops
                  </p>
                </div>
              </div>
              <div className="relative h-[120px] mx-[10px] my-[10px] aspect-[2/1.5] flex flex-col">
                <Link
                  href={"/shop/categories/air-conditioners/products"}
                  className="relative w-full aspect-[2/1] flex items-center justify-center"
                >
                  <Image
                    src={acCategoryImg}
                    fill={true}
                    className="object-cover"
                    alt="mobile-cat"
                  />
                </Link>
                <div className="w-full flex-1 flex items-center  justify-center">
                  <p className="bottom-2 right-2 text-[0.8rem] font-bold">
                    Air conditioners
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
