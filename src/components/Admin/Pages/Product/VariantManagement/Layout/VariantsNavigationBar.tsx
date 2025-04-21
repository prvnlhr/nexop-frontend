"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const VariantsNavigationBar = ({ productId }: { productId: string }) => {
  const pathname = usePathname();

  const basePath = `/admin/inventory/products/edit/${productId}/manage-variants`;

  const navigationLinks = [
    {
      label: "VARIANTS",
      href: basePath,
    },
    {
      label: "GENERATE NEW",
      href: `${basePath}/generate-new`,
    },
  ];

  return (
    <div
      className="
      w-full full 
      flex items-end 
      col-start-2 col-end-3
      row-start-1 row-end-2
      border-b border-black/10 px-[10px]"
    >
      {navigationLinks.map((navLink, navIndex) => (
        <Link
          href={navLink.href}
          key={navIndex}
          className={`w-auto h-auto mr-[10px] px-[5px] py-[2px] flex items-center justify-center border-b-2 ${
            pathname === navLink.href
              ? "border-[#635DB0]"
              : "border-transparent"
          }`}
        >
          <p className="text-[0.75rem] font-medium">{navLink.label}</p>
        </Link>
      ))}
    </div>
  );
};

export default VariantsNavigationBar;
