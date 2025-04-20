import React from "react";

const UserBadge = () => {
  return (
    <div className="h-[70%] aspect-square flex items-center justify-center bg-white rounded-full p-[2px] border border-black/10">
      <div className="w-[100%] h-[100%] flex items-center justify-center bg-[#EFF1F3] rounded-full">
        <p className="text-[1rem] font-medium">P</p>
      </div>
    </div>
  );
};

export default UserBadge;
