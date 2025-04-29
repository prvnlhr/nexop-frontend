import { Icon } from "@iconify/react";
import Link from "next/link";

interface OrderItem {
  productId?: string;
  variantId?: string;
  name?: string;
  price?: number;
  image?: string;
}

interface OrderDetails {
  orderId: string;
  amount: number;
  date: string;
  email: string;
  shippingAddress: {
    line1: string;
    city: string;
    state: string;
    country: string;
    postal_code?: string;
  };
  items: OrderItem[];
}

interface OrderConfirmationPageProps {
  orderDetails: OrderDetails;
  userId: string;
}

const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({
  orderDetails,
  userId,
}) => {
  if (!orderDetails) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4 bg-gray-50">
        <div className="w-[90%] md:w-[400px] h-auto flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <Icon icon="ion:warning" className="w-12 h-12 text-yellow-400" />
          <h1 className="mt-4 text-xl font-bold text-gray-800">
            Order Not Found
          </h1>
          <p className="mt-2 text-center text-gray-600">
            We couldnt find your order details. Please check your order history.
          </p>
          <Link
            href="/shop/user/orders"
            className="mt-6 w-full max-w-[200px] flex items-center justify-center bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            View Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-gray-50">
      <div className="w-[90%] md:w-[400px] h-auto flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        {/* Success Icon */}
        <div className="w-full flex justify-center mb-4">
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 rounded-full bg-green-100/80 animate-ping"></div>
            <Icon
              icon="clarity:success-standard-line"
              className="relative text-green-500 w-full h-full"
            />
          </div>
        </div>

        {/* Order Confirmed Title */}
        <div className="w-full text-center mb-6">
          <h1 className="text-xl font-bold text-gray-800">ORDER CONFIRMED!</h1>
        </div>

        {/* Order Summary */}
        <div className="w-full space-y-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Order Summary</h2>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Order Number</span>
            <span className="text-sm font-medium text-gray-800">
              {orderDetails.orderId}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Date</span>
            <span className="text-sm font-medium text-gray-800">
              {new Date(orderDetails.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Amount</span>
            <span className="text-sm font-medium text-gray-800">
              ₹{orderDetails.amount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="w-full mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            Shipping Address
          </h3>
          <p className="text-xs font-medium text-gray-800">
            {orderDetails.shippingAddress.line1}
            <br />
            {orderDetails.shippingAddress.city},{" "}
            {orderDetails.shippingAddress.state}
            <br />
            {orderDetails.shippingAddress.postal_code && (
              <>{orderDetails.shippingAddress.postal_code}, </>
            )}
            {orderDetails.shippingAddress.country}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-3">
          <Link
            href={`/shop/user/${userId}/orders`}
            className="w-full h-10 flex items-center justify-center bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            <Icon icon="ph:list" className="w-4 h-4 mr-2" />
            View Order History
          </Link>

          <Link
            href="/shop"
            className="w-full h-10 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors border border-gray-300 rounded-lg text-sm font-medium"
          >
            <Icon icon="mdi:shopping-outline" className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </div>

        {/* Support Info */}
        <div className="w-full text-center mt-6 text-xs text-gray-500">
          <p>
            Need help?{" "}
            <Link href="/contact" className="text-gray-700 underline">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
