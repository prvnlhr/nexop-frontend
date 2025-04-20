"use client";
import { usePathname } from "next/navigation";
import React from "react";

const TabBar = () => {
  const pathname = usePathname();
  console.log(" pathname:", pathname);
  return <div className="w-full h-full border-b border-black/10"></div>;
};

export default TabBar;
