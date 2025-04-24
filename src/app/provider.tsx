"use client";

import { VariantManagementProvider } from "@/context/VariantManagementContext";
export function Providers({ children }: { children: React.ReactNode }) {
  return <VariantManagementProvider>{children}</VariantManagementProvider>;
}
