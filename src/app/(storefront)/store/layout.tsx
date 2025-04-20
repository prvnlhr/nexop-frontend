import StoreFrontLayout from "@/components/StoreFront/Layout/StoreFrontLayout";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <StoreFrontLayout>{children}</StoreFrontLayout>;
};

export default layout;
