"use client";
import React from "react";
import ProductDetailsCard from "../Management/ProductDetailsCard";
import VariantsTable from "../../NotInUse/VariantsTable";
import EditVariantDetailsForm from "../Management/EditVariantDetailsForm";
import VariantImageManagement from "../Management/VariantImageManagement";
import AttributesManagement from "../Management/AttributesManagement";

const ManageVariantsPage = () => {
  return (
    <div className="w-full h-full flex">
      <div className="w-[70%] h-full flex flex-col p-[10px] overflow-y-scroll hide-scrollbar">
        <section className="w-full h-[auto] flex flex-col my-[20px]  border rounded border-[#D0D5DD]">
          <ProductDetailsCard />
        </section>

        <section className="w-full h-auto border border-[#D0D5DD] rounded">
          <AttributesManagement />
        </section>

        <section className="w-full h-auto  border border-[#D0D5DD] my-[20px] rounded">
          <VariantImageManagement />
        </section>

        <section className="w-full h-auto  border border-[#D0D5DD] mb-[10px] rounded">
          <div className="w-full h-[40px] flex items-center bg-[#e4f0ff] px-[10px] border-b border-[#D0D5DD]">
            <p className="text-[0.8rem] font-medium ">GENERATED VARIANTS</p>
          </div>
          <div className="w-full h-[calc(100%-40px)] border-red-500 p-[8px]">
            <div className="w-full h-[400px] flex items-center justify-end">
              <VariantsTable />
            </div>
            <div className="w-full h-[50px] flex items-center justify-end px-[10px]">
              <button className="w-auto h-auto px-[10px] py-[8px] disabled:bg-gray-400 bg-[#635DB0] text-white text-[0.7rem] cursor-pointer">
                Save variants
              </button>
            </div>
          </div>
        </section>
      </div>

      <div className="w-[30%] h-[100%] flex flex-col border-[#D0D5DD] p-[10px] my-[20px]">
        <EditVariantDetailsForm />
      </div>
    </div>
  );
};

export default ManageVariantsPage;
