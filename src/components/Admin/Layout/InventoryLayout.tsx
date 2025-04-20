import React from "react";
import MainHeader from "./MainHeader/MainHeader";
import NavigationBar from "./NavigationBar/NavigationBar";
import Sidebar from "./Sidebar/Sidebar";

const InventoryLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="
      h-screen w-full 
      flex flex-col"
    >
      <MainHeader />
      <div
        className="
        w-full h-[calc(100%-70px)]
        grid
        grid-cols-[0%_100%] md:grid-cols-[20%_80%]
        grid-rows-[50px_minmax(0,1fr)]"
      >
        <NavigationBar />
        <Sidebar />
        <div
          className="
          w-full h-full
          row-start-2 row-end-3
          col-start-2 col-end-3"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default InventoryLayout;
