import Link from "next/link";
import React from "react";

const DeleteModal = () => {
  return (
    <div className="absolute w-[300px] aspect-[2/1.2] flex flex-col bg-white z-50 box-shadow border border-black/10 p-[10px]">
      <div className="w-full h-[30px] flex items-center justify-between">
        <p className="text-[0.7rem] font-medium">DELETE CATEGORY</p>
      </div>
      <div className="w-full flex-1 flex items-center justify-center px-[5px]">
        <p className="text-[0.7rem]">
          Deleting this category will also remove its child categories,
          products, and attributes. This action is permanent and cannot be
          undone.
        </p>
      </div>
      <div className="w-full h-[40px] flex items-center justify-around">
        <Link
          href={"/admin/inventory/categories"}
          className="w-[45%] h-[80%] bg-[#F2F4F7] rounded text-[0.75rem] flex items-center justify-center text-[#1D2939] border border-black/10"
        >
          Cancel
        </Link>
        <button className="w-[45%] h-[80%] bg-[#b91c1c] rounded text-[0.75rem] text-white">
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
