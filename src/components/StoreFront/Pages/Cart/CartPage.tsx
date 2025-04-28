"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import testImg from "../../../..//../public/assets/iPhone_16_Pro_Max_White_Titanium_PDP_Image_Position_1__en-IN_eba16b29-a280-4119-91a7-0a2432e06cdf_grande.webp";
import Image from "next/image";
import Link from "next/link";
import { Cart } from "@/types/storefront/cartTypes";
import {
  updateCartItem,
  removeFromCart,
} from "@/lib/services/storefront/cartServices";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/Common/LoadingSpinner";
import { useSession } from "next-auth/react";

interface CartPageProps {
  initialCart: Cart;
}

const CartPage: React.FC<CartPageProps> = ({ initialCart }) => {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  const [cart, setCart] = useState(initialCart);
  const [updatingItems, setUpdatingItems] = useState<Record<string, boolean>>(
    {}
  );
  const [removingItems, setRemovingItems] = useState<Record<string, boolean>>(
    {}
  );

  const columns = ["Product", "Quantity", "Total"];

  const handleQuantityChange = async (
    cartItemId: string,
    newQuantity: number
  ) => {
    if (!user || newQuantity < 1) return;

    setUpdatingItems((prev) => ({ ...prev, [cartItemId]: true }));

    try {
      const cartItem = cart.items.find((item) => item.id === cartItemId);
      if (!cartItem) return;

      await updateCartItem({
        userId: user.id,
        productId: cartItem.productId,
        variantId: cartItem.variantId,
        quantity: newQuantity,
      });

      setCart((prev) => ({
        ...prev,
        items: prev.items.map((item) =>
          item.id === cartItemId ? { ...item, quantity: newQuantity } : item
        ),
      }));
    } catch (error) {
      console.error("Failed to update quantity:", error);
    } finally {
      setUpdatingItems((prev) => ({ ...prev, [cartItemId]: false }));
    }
  };

  const handleRemoveItem = async (cartItemId: string) => {
    if (!user) {
      router.push("/shop/auth/sign-in");
      return;
    }

    setRemovingItems((prev) => ({ ...prev, [cartItemId]: true }));

    try {
      const cartItem = cart.items.find((item) => item.id === cartItemId);
      if (!cartItem) return;

      await removeFromCart({
        userId: user.id,
        productId: cartItem.productId,
        variantId: cartItem.variantId,
      });

      setCart((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.id !== cartItemId),
      }));
    } catch (error) {
      console.error("Failed to remove item:", error);
    } finally {
      setRemovingItems((prev) => ({ ...prev, [cartItemId]: false }));
    }
  };

  const incrementQuantity = (cartItemId: string, currentQuantity: number) => {
    handleQuantityChange(cartItemId, currentQuantity + 1);
  };

  const decrementQuantity = (cartItemId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      handleQuantityChange(cartItemId, currentQuantity - 1);
    }
  };

  const calculateTotals = () => {
    const subtotal = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const deliveryCharge = 40;
    const total = subtotal + deliveryCharge;

    return { subtotal, deliveryCharge, total };
  };

  const { subtotal, deliveryCharge, total } = calculateTotals();

  if (!cart.items.length) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-10">
        <div className="text-center">
          <Icon
            icon="mdi:cart-remove"
            className="w-16 h-16 mx-auto text-gray-400"
          />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            Your cart is empty
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Start shopping to add items to your cart
          </p>
          <div className="mt-6">
            <Link
              href="/shop"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex justify-center p-[10px]">
      <div className="w-[95%] md:w-[80%] h-[100%] grid grid-cols-1 grid-rows-[70vh_70vh] md:grid-cols-[70%_30%] md:grid-rows-[100%] p-[2px] overflow-y-scroll hide-scrollbar">
        {/* Products Section */}
        <section className="w-[100%] h-[80%] flex flex-col border border-[#D0D5DD] rounded p-[5px]">
          <div className="w-full h-[50px] flex items-center px-[15px]">
            <p className="text-[0.8rem] mt-[6px] font-semibold">
              YOUR PRODUCTS ({cart.items.length})
            </p>
          </div>
          <div className="w-full h-full overflow-auto">
            <table className="min-w-full border-collapse table-fixed">
              <colgroup>
                <col className="w-[50%]" />
                <col className="w-[30%]" />
                <col className="w-[20%]" />
              </colgroup>
              <thead className="h-[50px] sticky top-0 z-10 ">
                <tr className="text-left text-[#1C3553] text-[0.8rem]">
                  {columns.map((col) => (
                    <th
                      key={col}
                      className="capitalize whitespace-nowrap pl-[20px]"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cart.items.map((cartItem) => {
                  const variant = {
                    name: cartItem.variantName || cartItem.productName,
                    price: cartItem.price,
                    image: cartItem.image,
                    attributes: cartItem.variantDetails?.attributes || [],
                  };

                  return (
                    <tr
                      key={cartItem.id}
                      className="hover:bg-[#F7FAFE] text-[0.8rem]"
                    >
                      {/* Product Info Cell */}
                      <td className="h-[100px] text-[#1C3553] border-b border-[#D0D5DD] overflow-hidden p-[2px]">
                        <div className="w-[100%] h-[100%] flex items-center p-[10px]">
                          <div className="relative h-[100%] aspect-[1/1] flex items-center justify-center bg-[#FAFAFA]">
                            <Image
                              src={variant.image || testImg}
                              alt="product-img"
                              fill={true}
                              className="object-contain"
                              priority={true}
                              sizes="100%"
                            />
                          </div>
                          <div className="h-[100%] flex-1 pl-[10px] flex justify-center flex-col">
                            <div className="w-full h-[auto] py-[5px] flex items-center">
                              <p className="text-[0.8rem] font-medium">
                                {variant.name}
                              </p>
                            </div>
                            <div className="w-full h-[auto] flex items-center">
                              {variant.attributes.map((attr, index) => (
                                <React.Fragment key={index}>
                                  <div className="w-auto h-[100%] mr-[0px] flex items-center">
                                    <div className="w-auto h-[100%] flex items-center text-[0.7rem]">
                                      {attr.attributeName}
                                    </div>
                                    <span className="mx-[2px]">-</span>
                                    <div className="w-auto h-[100%] flex items-center text-[0.7rem]">
                                      {attr.optionValue}
                                    </div>
                                  </div>
                                  {index !== variant.attributes.length - 1 && (
                                    <Icon
                                      icon="radix-icons:dot-filled"
                                      className="w-[15px] h-[15px] mx-[5px] text-[#999999]"
                                    />
                                  )}
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Quantity Cell */}
                      <td className="h-[100px] text-[#1C3553] border-b border-[#D0D5DD] overflow-hidden">
                        <div className="w-[80%] h-[80%] flex items-center">
                          <div className="w-[auto] h-[40px] flex p-[2px] border border-black/10">
                            <button
                              onClick={() =>
                                decrementQuantity(
                                  cartItem.id,
                                  cartItem.quantity
                                )
                              }
                              disabled={
                                cartItem.quantity <= 1 ||
                                updatingItems[cartItem.id]
                              }
                              className={`h-full aspect-square flex items-center justify-center cursor-pointer ${
                                cartItem.quantity <= 1
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                            >
                              <Icon
                                icon="stash:minus-solid"
                                className="w-[40%] h-[40%]"
                              />
                            </button>
                            <div className="h-full aspect-square flex items-center justify-center text-[0.7rem]">
                              {updatingItems[cartItem.id] ? (
                                <div className="w-[10px] h-[10px] flex items-center justify-center">
                                  <LoadingSpinner ringColor={"black"} />
                                </div>
                              ) : (
                                cartItem.quantity.toString().padStart(2, "0")
                              )}
                            </div>
                            <button
                              onClick={() =>
                                incrementQuantity(
                                  cartItem.id,
                                  cartItem.quantity
                                )
                              }
                              disabled={updatingItems[cartItem.id]}
                              className="h-full aspect-square flex items-center justify-center cursor-pointer"
                            >
                              <Icon
                                icon="majesticons:plus-line"
                                className="w-[40%] h-[40%]"
                              />
                            </button>
                          </div>
                          <div className="h-[100%] flex-1 flex items-center justify-center">
                            <button
                              onClick={() => handleRemoveItem(cartItem.id)}
                              disabled={removingItems[cartItem.id]}
                              className="w-[20px] aspect-square flex items-center justify-center transition-colors cursor-pointer"
                            >
                              {removingItems[cartItem.id] ? (
                                <div className="w-[10px] h-[10px] flex items-center justify-center">
                                  <LoadingSpinner ringColor={"black"} />
                                </div>
                              ) : (
                                <Icon
                                  icon="ph:trash-simple-fill"
                                  className="w-full h-full"
                                />
                              )}
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Total Price Cell */}
                      <td className="h-[100px] text-[#1C3553] border-b border-[#D0D5DD] overflow-hidden">
                        <div className="w-auto h-full flex items-center">
                          <Icon icon="si:rupee-fill" width="15" height="15" />
                          <p>
                            {(cartItem.price * cartItem.quantity).toFixed(2)}
                          </p>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Order Summary Section */}
        <section className="w-[100%] h-[100%] flex justify-center">
          <div className="w-[95%] md:w-[80%] h-[100%] flex flex-col">
            <div className="w-full h-[50px] flex items-center">
              <p className="text-[0.8rem] mt-[6px] font-semibold">
                ORDER SUMMARY
              </p>
            </div>
            <div className="w-full h-[calc(100%-50px)]">
              <div className="w-full h-[50px] flex">
                <div className="w-[50%] h-[50px] flex items-center">
                  <p className="text-[0.8rem] font-medium">Subtotal</p>
                </div>
                <div className="w-[50%] h-[50px] flex items-center justify-end pr-[5px]">
                  <Icon icon="si:rupee-fill" width="12" height="12" />
                  <p className="text-[0.8rem] font-medium">
                    {subtotal.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="w-full h-[50px] flex">
                <div className="w-[50%] h-[50px] flex items-center">
                  <p className="text-[0.8rem] font-medium">
                    Delivery & Handling
                  </p>
                </div>
                <div className="w-[50%] h-[50px] flex items-center justify-end pr-[5px]">
                  <Icon icon="si:rupee-fill" width="12" height="12" />
                  <p className="text-[0.8rem] font-medium">
                    {deliveryCharge.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="w-full h-[50px] flex border-t border-[#D0D5DD]">
                <div className="w-[50%] h-[50px] flex items-center">
                  <p className="text-[0.8rem] font-medium">Total Price</p>
                </div>
                <div className="w-[50%] h-[50px] flex items-center justify-end pr-[5px]">
                  <Icon icon="si:rupee-fill" width="12" height="12" />
                  <p className="text-[0.8rem] font-medium">
                    {total.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="w-full h-[50px] flex mt-[10px]">
                <Link
                  href={`/shop/user/${user?.id}/checkout?type=cart`}
                  className="w-[100%] h-[80%] bg-[#444444] flex items-center justify-center text-[0.7rem] text-[white] cursor-pointer hover:bg-[#333333] transition-colors"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CartPage;
