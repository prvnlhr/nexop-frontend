"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckoutData } from "@/types/storefront/checkoutTypes";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import LoadingSpinner from "@/components/Common/LoadingSpinner";
import { useToast } from "@/context/ToastContext";
import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession } from "@/actions/payment/stripePaymentAction";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  houseBuilding: z.string().min(1, "House/Building information is required"),
  roadArea: z.string().min(1, "Road/Area information is required"),
  postalCode: z.string().optional(),
});

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

type FormValues = z.infer<typeof formSchema>;

interface CheckoutPageProps {
  userId: string;
  checkoutData: CheckoutData;
  queryParams: {
    type?: string;
    product_id?: string;
    variant_id?: string;
  };
}
const CheckoutPage: React.FC<CheckoutPageProps> = ({
  checkoutData,
  userId,
  queryParams: searchParams,
}) => {
  const { total } = checkoutData || 0;
  const { showToast } = useToast();
  const [isInitiatingPayment, setIsInitiatingPayment] = useState(false);

  const queryParams = {
    type: searchParams.type || "",
    product_id: searchParams.product_id || "",
    variant_id: searchParams.variant_id || "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsInitiatingPayment(true);

    try {
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe failed to load");
      }

      const shippingAddress = {
        line1: `${data.houseBuilding}, ${data.roadArea}`,
        city: data.city,
        state: data.state,
        country: "IN",
        postal_code: data.postalCode || undefined,
      };

      // Create Stripe checkout session
      const session = await createCheckoutSession({
        amount: total * 100,
        email: data.email,
        shippingAddress,
        userId,
        queryParams,
      });

      // Redirect to Stripe checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        showToast({
          type: "error",
          title: "Payment Error",
          description: error.message || "Failed to redirect to checkout",
        });
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to initiate payment";
      showToast({
        type: "error",
        title: "Payment Error",
        description: errorMessage,
      });
    } finally {
      setIsInitiatingPayment(false);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[95%] md:w-[80%] h-[90%] grid grid-cols-1 grid-rows-[auto_70vh] md:grid-cols-[70%_30%] md:grid-rows-[100%] p-[2px] overflow-y-scroll hide-scrollbar">
        <section className="w-[100%] h-auto md:h-[100%]  md:overflow-y-scroll  hide-scrollbar border-green-500">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
            <div className="w-[100%] h-[auto] border border-[#D0D5DD] rounded  overflow-hidden">
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
            <div className="w-[100%] h-[auto] border border-[#D0D5DD] rounded mt-[10px]  overflow-hidden">
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
            <div className="w-full h-[auto] flex flex-col border border-[#D0D5DD] rounded mt-[30px]  overflow-hidden">
              <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] px-[10px] border-b border-[#D0D5DD]">
                <p className="text-[0.8rem] mt-[4px] font-medium">PAYMENT</p>
              </div>
              <div className="w-full p-[10px] flex justify-end">
                <button
                  type="submit"
                  disabled={isInitiatingPayment}
                  className={`
                    w-[auto] h-[auto] bg-[#444444] px-[30px] py-[10px] flex flex-col items-center text-white rounded
                    ${
                      isInitiatingPayment
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }
                  `}
                >
                  {isInitiatingPayment ? (
                    <div className="w-[20px] h-[20px] flex items-center justify-center">
                      <LoadingSpinner ringColor={"white"} />
                    </div>
                  ) : (
                    <>
                      <p className="text-[0.8rem]">Checkout</p>
                      <div className="w-full h-auto flex items-center">
                        <Icon
                          icon="si:rupee-fill"
                          className="w-[15px] h-[15px]"
                        />
                        {total}
                      </div>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </section>
        <section className="w-[100%] h-[100%] px-[10px]">
          <div className="w-full h-full flex flex-col border border-[#D0D5DD] rounded overflow-hidden">
            <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] px-[10px] border-b border-[#D0D5DD]">
              <p className="text-[0.8rem] mt-[4px] font-medium">
                ORDER SUMMARY
              </p>
            </div>
            <div className="w-full h-[calc(100%-40px)] flex flex-col p-[20px]  overflow-y-scroll hide-scrollbar">
              {checkoutData.items.length > 0 &&
                checkoutData.items.map((item) => (
                  <div
                    key={item.id}
                    className="w-full h-auto grid grid-cols-[30%_70%]  border-black/10 p-[5px]"
                  >
                    <div className="w-[100%] h-[100%]  border-red-500">
                      <div className="w-[90%] aspect-square relative flex items-center justify-center bg-gray-100 rounded border border-black/10 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.variantName}
                          fill={true}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="w-[100%] h-[100%] flex flex-col border-green-500 px-[10px]">
                      <div className="w-full h-[40px] flex items-center mb-[5px] overflow-hidden">
                        <p className="text-[0.8rem] truncate">
                          {item.variantName}
                        </p>
                      </div>
                      <div className="w-full h-auto flex flex-wrap items-center">
                        {item.attributes.map((atrr, attrIndex) => (
                          <div
                            key={attrIndex}
                            className="w-auto h-[auto] flex items-center mr-[8px] mb-[5px]"
                          >
                            <p className="text-[0.7rem] text-gray-500">
                              {atrr.attributeName}
                            </p>
                            <span className="text-[0.7rem] mx-[2px]">:</span>
                            <p className="text-[0.7rem] font-medium">
                              {atrr.optionValue}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="w-full h-[40px] flex items-center mb-[5px] overflow-hidden border-t border-black/10">
                        <p className="text-[0.8rem] truncate line-clamp-3">
                          ₹{item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CheckoutPage;
