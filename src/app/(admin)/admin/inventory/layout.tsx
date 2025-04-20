import { Providers } from "@/app/provider";
import InventoryLayout from "@/components/Admin/Layout/InventoryLayout";
import React from "react";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <Providers>
      <InventoryLayout>{children}</InventoryLayout>
    </Providers>
  );
};

export default layout;
