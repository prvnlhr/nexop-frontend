"use client";
import AuthForm from "@/components/Common/Auth/AuthForm";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  return (
    <div className="w-full h-full flex items-center justify-center p-[0px] md:p-[30px]">
      <div className="w-[100%] md:w-[70%] grid grid-cols-[100%] grid-rows-[40vh_70vh] md:grid-cols-[50%_50%] md:grid-rows-[100%] h-[100%] border border-black/10 p-[5px] overflow-y-scroll hide-scrollbar">
        <section className="w-full h-full flex items-center justify-center">
          <div className="w-[80%] h-[80%] flex flex-col">
            <p className="text-[2rem] font-medium">
              Simple Finds,
              <br />
              Seamless Checkout.
            </p>
            <p className="text-[0.9rem] font-medium mt-[10px] leading-loose">
              Effortless shopping from discovery to checkout—browse handpicked
              finds and complete your purchase in seconds.
              <span className="text-[#907AEA] ml-[5px]">
                No Wait, Just Wow.
              </span>
            </p>
          </div>
        </section>
        <section className="w-full h-full flex items-center justify-center p-[5px]">
          <AuthForm
            isSignUp={true}
            role="customer"
            basePath="/shop/auth"
            onSuccess={() => router.push("/shop/auth/sign-in")}
          />
        </section>
      </div>
    </div>
  );
}
