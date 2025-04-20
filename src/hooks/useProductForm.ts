// useProductForm.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const imageSchema = z.union([
  z.instanceof(File),
  z.object({
    id: z.number(),
    url: z.string(),
  }),
]);

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  categoryId: z.number().min(1, "Please select a category"),
  description: z.string().min(1, "Description is required"),
  basePrice: z.number().min(0.01, "Price must be greater than 0"),
  brand: z.string().min(1, "Brand is required"),
  images: z.array(imageSchema).min(1, "At least one image is required"),
});

export type ProductFormData = z.infer<typeof productSchema>;

export const useProductForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      categoryId: undefined,
      description: "",
      basePrice: 0,
      brand: "",
      images: [],
    },
  });
  const formData = watch();

  return {
    register,
    handleSubmit,
    setValue,
    formData,
    errors,
    reset,
    watch,
  };
};
