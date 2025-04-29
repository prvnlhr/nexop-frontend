import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const UserBadge = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, update } = useSession();

  // Directly use session data instead of local state
  const user = session?.user;
  const firstLetter = user?.fullname?.[0]?.toUpperCase();

  return (
    <>
      {user ? (
        <div className="h-[60%] aspect-square flex items-center justify-center bg-white rounded-full p-[2px] border border-black/20 cursor-pointer">
          <div className="w-full h-full flex items-center justify-center bg-[#EFF1F3] rounded-full border border-black/20">
            <p className="text-[1rem] font-medium">
              {isLoading ? "..." : firstLetter}
            </p>
          </div>
        </div>
      ) : (
        <Link
          href="/shop/auth/sign-in"
          className="w-auto h-auto px-[8px] py-[10px] flex items-center justify-center border-x border-black/20 cursor-pointer"
        >
          <p className="text-[0.8rem]">Sign In</p>
        </Link>
      )}
    </>
  );
};

export default UserBadge;
