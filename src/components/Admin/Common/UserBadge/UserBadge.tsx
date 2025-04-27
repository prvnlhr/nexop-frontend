import { useSession } from "@/lib/auth/useSession";
import { signOut } from "@/lib/services/auth/authServices";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserBadge = () => {
  const router = useRouter();
  const { user } = useSession();
  const firstLetter = user?.fullname[0];
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    if (isLoading) return; // Prevent multiple clicks

    setIsLoading(true);

    try {
      await signOut();

      switch (user?.role) {
        case "admin":
          router.push("/admin/auth/sign-in");
          break;
        case "customer":
          window.location.reload();
          break;
        default:
          router.push("/auth/sign-in");
      }
    } catch (error) {
      console.error("Sign-out error:", error);
    } finally {
      if (user?.role !== "customer") {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {user && user.id ? (
        <div
          onClick={handleLogout}
          className="h-[60%] aspect-square flex items-center justify-center bg-white rounded-full p-[2px] border border-black/20"
        >
          <div className="w-[100%] h-[100%] flex items-center justify-center bg-[#EFF1F3] rounded-full border border-black/20">
            <p className="text-[1rem] font-medium">
              {isLoading ? "..." : firstLetter}
            </p>
          </div>
        </div>
      ) : (
        <Link
          href={"/shop/auth/sign-in"}
          className="w-auto h-auto px-[8px] py-[10] flex items-center justify-center border-x border-black/20 cursor-pointer"
        >
          <p className="text-[0.8rem]">Sign in</p>
        </Link>
      )}
    </>
  );
};

export default UserBadge;
