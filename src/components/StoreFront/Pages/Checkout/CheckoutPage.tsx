"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  houseBuilding: z.string().min(1, "House/Building information is required"),
  roadArea: z.string().min(1, "Road/Area information is required"),
});

type FormValues = z.infer<typeof formSchema>;

type CheckoutPageProps = {
  amount?: number;
};

const CheckoutPage = ({ amount = 20 }: CheckoutPageProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    // Redirect to payment page with form data and amount
    const query = new URLSearchParams({
      email: data.email,
      state: data.state,
      city: data.city,
      houseBuilding: data.houseBuilding,
      roadArea: data.roadArea,
      amount: amount.toString(),
    }).toString();
    router.push(`/shop/payment?${query}`);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[60%] h-[90%] grid grid-cols-1 grid-rows-[70vh_70vh] md:grid-cols-[70%_30%] md:grid-rows-[100%] p-[2px] overflow-y-scroll hide-scrollbar">
        <section className="w-[100%] h-[100%] p-[10px] overflow-y-scroll hide-scrollbar">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-[100%] h-[auto] border border-[#D0D5DD] rounded">
              <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] px-[10px] border-b border-[#D0D5DD]">
                <p className="text-[0.8rem] mt-[4px] font-medium">CONTACT</p>
              </div>
              <div className="w-full h-auto flex flex-col p-[10px]">
                <div className="w-[48%] h-[100px] flex flex-col">
                  <div className="w-full h-[30px] flex items-center justify-start">
                    <label
                      htmlFor="email"
                      className="text-[0.8rem] font-medium"
                    >
                      EMAIL
                    </label>
                  </div>
                  <div className="w-full h-[40px] flex items-center justify-start">
                    <input
                      id="email"
                      placeholder="Enter your email"
                      className="w-full h-full text-[0.8rem] placeholder:text-[0.75rem] border-b border-[#D0D5DD]"
                      {...register("email")}
                    />
                  </div>
                  <div className="w-full h-[30px] flex items-center justify-start text-red-500 text-[0.75rem]">
                    {errors.email?.message}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[100%] h-[auto] border border-[#D0D5DD] rounded mt-[10px]">
              <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] px-[10px] border-b border-[#D0D5DD]">
                <p className="text-[0.8rem] mt-[4px] font-medium">SHIPPING</p>
              </div>
              <div className="w-full h-auto flex flex-col p-[10px]">
                <div className="w-full h-auto flex justify-between">
                  <div className="w-[48%] h-[100px] flex flex-col">
                    <div className="w-full h-[30px] flex items-center justify-start">
                      <label
                        htmlFor="state"
                        className="text-[0.8rem] font-medium"
                      >
                        STATE
                      </label>
                    </div>
                    <div className="w-full h-[40px] flex items-center justify-start">
                      <input
                        id="state"
                        placeholder="Enter your state"
                        className="w-full h-full text-[0.8rem] placeholder:text-[0.75rem] border-b border-[#D0D5DD]"
                        {...register("state")}
                      />
                    </div>
                    <div className="w-full h-[30px] flex items-center justify-start text-red-500 text-[0.75rem]">
                      {errors.state?.message}
                    </div>
                  </div>
                  <div className="w-[48%] h-[100px] flex flex-col">
                    <div className="w-full h-[30px] flex items-center justify-start">
                      <label
                        htmlFor="city"
                        className="text-[0.8rem] font-medium"
                      >
                        CITY
                      </label>
                    </div>
                    <div className="w-full h-[40px] flex items-center justify-start">
                      <input
                        id="city"
                        type="text"
                        placeholder="Enter your city"
                        className="w-full h-full text-[0.8rem] placeholder:text-[0.75rem] border-b border-[#D0D5DD]"
                        {...register("city")}
                      />
                    </div>
                    <div className="w-full h-[30px] flex items-center justify-start text-red-500 text-[0.75rem]">
                      {errors.city?.message}
                    </div>
                  </div>
                </div>
                <div className="w-[100%] h-[100px] flex flex-col">
                  <div className="w-full h-[30px] flex items-center justify-start">
                    <label
                      htmlFor="houseBuilding"
                      className="text-[0.8rem] font-medium"
                    >
                      HOUSE NO. , BUILDING NAME
                    </label>
                  </div>
                  <div className="w-[100%] h-[40px] flex items-center justify-start">
                    <input
                      id="houseBuilding"
                      placeholder="Enter house no. or building name"
                      className="w-full h-full text-[0.8rem] placeholder:text-[0.75rem] border-b border-[#D0D5DD]"
                      {...register("houseBuilding")}
                    />
                  </div>
                  <div className="w-full h-[30px] flex items-center justify-start text-red-500 text-[0.75rem]">
                    {errors.houseBuilding?.message}
                  </div>
                </div>
                <div className="w-[100%] h-[100px] flex flex-col">
                  <div className="w-full h-[30px] flex items-center justify-start">
                    <label
                      htmlFor="roadArea"
                      className="text-[0.8rem] font-medium"
                    >
                      ROAD NAME, AREA, COLONY
                    </label>
                  </div>
                  <div className="w-[100%] h-[40px] flex items-center justify-start">
                    <input
                      id="roadArea"
                      placeholder="Enter road name, area, or colony"
                      className="w-full h-full text-[0.8rem] placeholder:text-[0.75rem] border-b border-[#D0D5DD]"
                      {...register("roadArea")}
                    />
                  </div>
                  <div className="w-full h-[30px] flex items-center justify-start text-red-500 text-[0.75rem]">
                    {errors.roadArea?.message}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-[auto] flex flex-col border border-[#D0D5DD] rounded mt-[30px]">
              <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] px-[10px] border-b border-[#D0D5DD]">
                <p className="text-[0.8rem] mt-[4px] font-medium">PAYMENT</p>
              </div>
              <div className="w-full p-[10px] flex justify-end">
                <button
                  type="submit"
                  className="w-[200px] bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  Checkout ${amount}
                </button>
              </div>
            </div>
          </form>
        </section>
        <section className="w-[100%] h-[100%]"></section>
      </div>
    </div>
  );
};

export default CheckoutPage;
