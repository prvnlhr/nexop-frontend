import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Oval } from "react-loader-spinner";

interface UserBadgeProps {
  isLoggingOut: boolean;
}
const UserBadge: React.FC<UserBadgeProps> = ({ isLoggingOut }) => {
  const { data: session } = useSession();

  // Directly use session data instead of local state
  const user = session?.user;
  const firstLetter = user?.fullname?.[0]?.toUpperCase();

  return (
    <>
      {user ? (
        <div className="h-[60%] aspect-square flex items-center justify-center bg-white rounded-full p-[2px] border border-black/20 cursor-pointer">
          {isLoggingOut ? (
            <div className="w-full h-full max-w-full flex items-center justify-center bg-[#EFF1F3] rounded-full">
              <Oval
                visible={true}
                color={"#336CF3"}
                secondaryColor="transparent"
                strokeWidth="3"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass="w-[30px] h-[30px] flex items-center justify-center"
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#EFF1F3] rounded-full border border-black/20">
              <p className="text-[1rem] font-medium">{firstLetter}</p>
            </div>
          )}
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
