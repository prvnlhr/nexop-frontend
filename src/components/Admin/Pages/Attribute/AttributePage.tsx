import Link from "next/link";
import React from "react";
import AttributesTable from "./AttributesTable";
import {  AttributeItem } from "@/types/attributeTypes";

interface AttributePageProps {
  attributes: AttributeItem[];
}
const AttributePage: React.FC<AttributePageProps> = ({ attributes }) => {
  return (
    <div className="w-full h-[100%] flex flex-col items-center justify-center p-[20px]">
      <div className="w-full h-[50px] flex items-center justify-between">
        <p className="text-[0.8rem] font-medium">ALL Attributes</p>
        <Link
          href={"attributes/add"}
          className="w-auto h-auto px-[10px] py-[5px] bg-[#625DAF] text-[0.75rem] text-white"
        >
          Add Attribute
        </Link>
      </div>
      <div className="w-full h-[calc(100%-50px)] flex items-start">
        <AttributesTable attributes={attributes}/>
      </div>
    </div>
  );
};

export default AttributePage;
