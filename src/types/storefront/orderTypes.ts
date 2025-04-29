export interface OrderListResponse {
  id: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  itemCount: number;
  address: {
    address: string;
  };
  items: {
    name: string;
    variantName?: string;
    quantity: number;
    price: number;
    thumbnail?: string;
  }[];
}
