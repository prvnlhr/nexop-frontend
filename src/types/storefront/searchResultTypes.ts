// Database model types
interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface SearchResult {
  categories: Category[];
  products: {
    id: number;
    name: string;
    price: number;
    slug: string;
    image?: string;
    product: {
      id: number;
      name: string;
      slug: string;
      image?: string;
      category: Category;
    };
    attributes: {
      attribute: {
        id: number;
        name: string;
      };
      option: {
        id: number;
        value: string;
      };
    }[];
  }[];
}
