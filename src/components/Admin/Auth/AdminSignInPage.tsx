"use client";
import AuthForm from "@/components/Common/Auth/AuthForm";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminSignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin/inventory/products";

  return (
    <div className="w-full h-full flex items-center justify-center p-[0px] md:p-[30px] border">
      <div className="w-[100%] md:w-[70%] grid grid-cols-[100%] grid-rows-[40vh_70vh] md:grid-cols-[50%_50%] md:grid-rows-[100%] h-[100%] border border-black/10 p-[5px] overflow-y-scroll hide-scrollbar">
        <section className="w-full h-full flex items-center justify-center">
          <div className="w-[80%] h-[80%] flex flex-col">
            <p className="text-[2rem] font-medium">
              Admin Sign In,
              <br />
              for seamless management.
            </p>
            <p className="text-[0.9rem] font-medium mt-[10px] leading-loose">
              Welcome back! Manage products and orders with ease.
              <span className="text-[#907AEA] ml-[5px]">Unlock control.</span>
            </p>
          </div>
        </section>
        <section className="w-full h-full flex items-center justify-center p-[5px]">
          <AuthForm
            isSignUp={false}
            role="admin"
            basePath="/admin/auth"
            onSuccess={() => router.push(redirect)}
          />
        </section>
      </div>
    </div>
  );
}
