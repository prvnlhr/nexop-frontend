import AppLogo from "@/components/Common/AppLogo";
import React from "react";
import UserBadge from "./UserBadge/UserBadge";
import Link from "next/link";

const MainHeader = () => {
  return (
    <div className="w-full h-[70px] flex  border-b border-black/10">
      <div className="w-[50%] h-full flex items-center pl-[15px]">
        <Link href={"/shop"} className="w-auto h-[60%] flex items-center">
          <AppLogo />
        </Link>
      </div>
      <div className="w-[50%] h-full flex items-center justify-end pr-[20px]">
        <UserBadge />
      </div>
    </div>
  );
};

export default MainHeader;
