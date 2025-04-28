"use client";
import AuthForm from "@/components/Common/Auth/AuthForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

interface SignInPageProps {
  redirectURL?: string;
}
const SignInPage = ({ redirectURL = "/shop" }: SignInPageProps) => {
  const router = useRouter();
  const { data: session } = useSession();

  const reconstructRedirect = () => {
    if (!session?.user?.id) {
      return redirectURL;
    }

    if (redirectURL.includes("cart")) {
      return `/shop/user/${session.user.id}/cart`;
    }

    return redirectURL;
  };

  const handleSuccess = () => {
    const finalRedirect = reconstructRedirect();
    router.push(finalRedirect);
  };
  return (
    <div className="w-full h-full flex items-center justify-center p-[0px] md:p-[30px]">
      <div className="w-[100%] md:w-[70%] grid grid-cols-[100%] grid-rows-[40vh_70vh] md:grid-cols-[50%_50%] md:grid-rows-[100%] h-[100%] border border-black/10 p-[5px] overflow-y-scroll hide-scrollbar">
        <section className="w-full h-full flex items-center justify-center">
          <div className="w-[80%] h-[80%] flex flex-col">
            <p className="text-[2rem] font-medium">
              Sign In,
              <br />
              for seamless experience.
            </p>
            <p className="text-[0.9rem] font-medium mt-[10px] leading-loose">
              Welcome back! Dive straight into your favorite finds and breeze
              through checkout.
              <span className="text-[#907AEA] ml-[5px]">
                Unlock, excitement.
              </span>
            </p>
          </div>
        </section>
        <section className="w-full h-full flex items-center justify-center p-[5px]">
          <AuthForm
            isSignUp={false}
            role="customer"
            basePath="/shop/auth"
            onSuccess={handleSuccess}
          />
        </section>
      </div>
    </div>
  );
};

export default SignInPage;
