"use client";

import { VariantProvider } from "@/context/VariantContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <VariantProvider>{children}</VariantProvider>;
}
