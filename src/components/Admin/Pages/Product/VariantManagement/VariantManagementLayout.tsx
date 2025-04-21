import React from "react";
import VariantsNavigationBar from "./VariantsNavigationBar";

const VariantManagementLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full h-full border-red-500 p-[20px]">
      <div className="w-full h-full flex flex-col">
        <VariantsNavigationBar productId="11" />
        <div className="w-full h-[calc(100%-40px)]">{children}</div>
      </div>
    </div>
  );
};

export default VariantManagementLayout;
