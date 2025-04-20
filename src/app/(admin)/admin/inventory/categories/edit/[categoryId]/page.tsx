import CategoryAddForm from "@/components/Admin/Pages/Category/CategoryAddForm";
import {
  getCategories,
  getCategoryById,
} from "@/lib/services/admin/categoryServices";
import { Category } from "@/types/categoryTypes";

type Params = Promise<{ categoryId: string }>;

const Page = async ({ params }: { params: Params }) => {
  const { categoryId } = await params;

  const editCategoryData = categoryId
    ? await getCategoryById(Number(categoryId))
    : null;

  const allCategories: Category[] = await getCategories();

  return (
    <CategoryAddForm categories={allCategories} editData={editCategoryData} />
  );
};

export default Page;
