export interface CheckoutItem {
  id: string;
  productId: number;
  variantId: number;
  quantity: number;
  price: number;
  productName: string;
  variantName: string;
  image: string;
  attributes: {
    attributeName: string;
    optionValue: string;
  }[];
}

interface UserDetails {
  id: string;
  fullname: string;
  email: string;
}

export interface CheckoutData {
  items: CheckoutItem[];
  user: UserDetails;
  subtotal: number;
  deliveryCharge: number;
  total: number;
}
