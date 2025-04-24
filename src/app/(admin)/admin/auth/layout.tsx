import React from "react";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <div className="h-screen w-full flex flex-col">{children}</div>;
};

export default layout;
