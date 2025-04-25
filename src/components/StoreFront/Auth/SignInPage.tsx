"use client";
import AuthForm from "@/components/Common/Auth/AuthForm";
import { useSession } from "@/lib/auth/useSession";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useSession();
  const redirectParam = searchParams.get("redirect") || "/shop";

  const reconstructRedirect = () => {
    if (!user?.id) return redirectParam;

    // Handle cases where the redirect contains placeholder paths
    if (redirectParam.includes("/user/cart")) {
      return redirectParam.replace("/user/cart", `/user/${user.id}/cart`);
    }
    if (redirectParam.includes("/undefined")) {
      return redirectParam.replace("/undefined", `/${user.id}`);
    }

    return redirectParam;
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
}
