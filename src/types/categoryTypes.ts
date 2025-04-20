export interface Category {
  id: number;
  name: string;
  parentId: number | null;
  slug: string;
  createdAt: string;
  updatedAt: string;
  children?: Category[];
}
