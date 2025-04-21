import VariantManagementLayout from "@/components/Admin/Pages/Product/VariantManagement/VariantManagementLayout";
import React from "react";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <VariantManagementLayout>{children}</VariantManagementLayout>;
};
export default layout;
