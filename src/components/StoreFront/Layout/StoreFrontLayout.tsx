import React from "react";
import MainHeader from "./MainHeader/MainHeader";
import NavigationBar from "./NavigationBar/NavigationBar";

const StoreFrontLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="
      h-screen w-full 
      flex flex-col"
    >
      <MainHeader />
      <NavigationBar />
      <div className="w-full h-[calc(100%-110px)]">{children}</div>
    </div>
  );
};

export default StoreFrontLayout;
