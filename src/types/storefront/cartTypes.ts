interface CartItems {
  id: string;
  productId: number;
  variantId?: number;
  quantity: number;
  price: number;
  productName: string;
  variantName?: string;
  image?: string;
  variantDetails?: {
    name: string;
    price: number;
    images: { url: string }[];
    attributes: {
      attributeId: number;
      optionId: number;
      attributeName?: string;
      optionValue?: string;
    }[];
  };
}

export interface Cart {
  id: string;
  items: CartItems[];
}
