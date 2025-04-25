"use client";
import AppLogo from "@/components/Common/AppLogo";
import React from "react";
import UserBadge from "../../../Admin/Common/UserBadge/UserBadge";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSession } from "@/lib/auth/useSession";
import { useRouter, useSearchParams } from "next/navigation";

const MainHeader = () => {
  const { user } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTakeToCart = () => {
    if (user && user.id) {
      router.push(`/shop/user/${user.id}/cart`);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.set("redirect", `/shop/user/${user?.id}/cart`);
      router.push(`/shop/auth/sign-in/?${params.toString()}`);
    }
  };

  return (
    <div className="w-full h-[70px] flex  border-b border-black/10">
      <div className="w-[50%] h-full flex items-center pl-[15px]">
        <Link href={"/shop"} className="w-auto h-[60%] flex items-center">
          <AppLogo />
        </Link>
      </div>
      <div className="w-[50%] h-full flex items-center justify-end pr-[20px]">
        <button
          onClick={handleTakeToCart}
          className="h-[100%] aspect-square flex items-center justify-center cursor-pointer"
        >
          <Icon icon="famicons:cart-outline" className="w-[20px] h-[20px]" />
        </button>
        <UserBadge />
      </div>
    </div>
  );
};

export default MainHeader;
