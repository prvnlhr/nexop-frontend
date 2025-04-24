"use client";
import AuthForm from "@/components/Common/Auth/AuthForm";
import { useRouter } from "next/navigation";

export default function AdminSignUpPage() {
  const router = useRouter();

  return (
    <div className="w-full h-full flex items-center justify-center p-[0px] md:p-[30px]">
      <div className="w-[100%] md:w-[70%] grid grid-cols-[100%] grid-rows-[40vh_70vh] md:grid-cols-[50%_50%] md:grid-rows-[100%] h-[100%] border border-black/10 p-[5px] overflow-y-scroll hide-scrollbar">
        <section className="w-full h-full flex items-center justify-center">
          <div className="w-[80%] h-[80%] flex flex-col">
            <p className="text-[2rem] font-medium">
              Admin Sign Up,
              <br />
              for seamless management.
            </p>
            <p className="text-[0.9rem] font-medium mt-[10px] leading-loose">
              Join as an admin to manage products and orders effortlessly.
              <span className="text-[#907AEA] ml-[5px]">
                Start controlling now.
              </span>
            </p>
          </div>
        </section>
        <section className="w-full h-full flex items-center justify-center p-[5px]">
          <AuthForm
            isSignUp={true}
            role="admin"
            basePath="/admin/auth"
            onSuccess={() => router.push("/admin/auth/sign-in")}
          />
        </section>
      </div>
    </div>
  );
}
