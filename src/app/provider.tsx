"use client";

// import VariantManagement from "@/components/Admin/Pages/Product/NotInUse/VariantManagement";
// import { VariantProvider } from "@/context/VariantContext";
import { VariantManagementProvider } from "@/context/VariantManagementContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <VariantManagementProvider>{children}</VariantManagementProvider>;
}
