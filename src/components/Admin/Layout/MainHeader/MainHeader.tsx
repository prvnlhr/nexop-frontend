"use client";

import AppLogo from "@/components/Common/AppLogo";
import Link from "next/link";
import React, { useRef, useState } from "react";
import UserBadge from "../../Common/UserBadge/UserBadge";
import { signOut, useSession } from "next-auth/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";

const MainHeader = () => {
  const router = useRouter();

  const { data: session, update } = useSession();
  const user = session?.user;
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await signOut({ redirect: false });
      await update();
      // Handle role-based redirects
      switch (user?.role) {
        case "admin":
          router.push("/admin/auth/sign-in");
          break;
        case "customer":
          router.push("/shop");
          break;
        default:
          router.push("/auth/sign-in");
      }
    } catch (error) {
      console.error("Sign-out error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <div className="w-full h-[70px] flex  border-b border-black/10">
      <div className="w-[50%] h-full flex items-center pl-[15px]">
        <Link href={"/shop"} className="w-auto h-[60%] flex items-center">
          <AppLogo />
        </Link>
      </div>
      <div className="w-[50%] h-full flex items-center justify-end pr-[20px]">
        <div
          className="w-auto h-[100%] flex items-center justify-center"
          onClick={toggleUserMenu}
        >
          <UserBadge isLoggingOut={isLoggingOut} />
        </div>
        {showUserMenu && (
          <div
            ref={userMenuRef}
            className="top-[72px] right-[5px] absolute w-[150px] h-auto bg-white z-[999] p-[10px] rounded box-shadow border border-black/10"
          >
            <div className="w-full  h-full flex flex-col items-center">
              <div className="w-full h-[40px] flex items-center text-[0.75rem] border rounded border-black/10 overflow-hidden">
                <button
                  onClick={handleLogout}
                  className="w-full h-full flex items-center px-[5px] text-[0.8rem]  font-medium hover:bg-[#FECDCA] cursor-pointer"
                >
                  <>
                    <Icon
                      icon="si:sign-out-line"
                      className="w-[15px] h-[15px] mr-[5px]"
                    />
                    Sign Out
                  </>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainHeader;
