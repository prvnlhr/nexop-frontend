export interface CategoryNode {
    id: number;
    name: string;
    slug: string;
    parentId: number | null;
    children: CategoryNode[];
  }