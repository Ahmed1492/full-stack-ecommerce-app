"use client";
import Image from "next/image";
import React, { useState } from "react";
import DropDownMenue from "@/components/DropDownMenue";

export default function Filters() {
  const [isOpenMenue, setIsOpenMenue] = useState(false);

  const types = ["option 01", "option 02", "option 03"];
  const sizes = ["lg", "md", "sm"];
  const colors = ["red", "green", "blue"];
  const category = ["cat 01", "cat 02", "cat 03"];
  const filters = ["filter 01 ", "filter 02", "filter 03"];
  const [openMenuType, setOpenMenuType] = useState(null); // Track the open dropdown by type

  const handleToggleMenu = (type) => {
    setOpenMenuType((prev) => (prev === type ? null : type)); // Toggle or close
  };

  return (
    <div className="mt-5">
      <div className="flex flex-wrdap gap-y-6 items-center justify-between">
        {/* LEFT */}
        <div className="flex flex-wrap gap-5 items-center">
          <DropDownMenue
            isOpen={openMenuType === "Type"}
            onToggleMenu={() => handleToggleMenu("Type")}
            filterBy={types}
            type="Type"
          />
          <input
            className="border border-gray-400 rounded-2xl px-2 py-2 outline-none w-24 text-sm"
            type="text"
            placeholder="Max Price "
          />
          <input
            className="border border-gray-400 rounded-2xl px-2 py-2 outline-none w-24 text-sm"
            type="text"
            placeholder="Min Price "
          />
          <DropDownMenue
            isOpen={openMenuType === "Size"}
            onToggleMenu={() => handleToggleMenu("Size")}
            filterBy={sizes}
            type="Size"
          />
          <DropDownMenue
            isOpen={openMenuType === "Color"}
            onToggleMenu={() => handleToggleMenu("Color")}
            filterBy={colors}
            type="Color"
          />
          <DropDownMenue
            isOpen={openMenuType === "Category"}
            onToggleMenu={() => handleToggleMenu("Category")}
            filterBy={category}
            type="Category"
          />
          <DropDownMenue
            isOpen={openMenuType === "AllFilters"}
            onToggleMenu={() => handleToggleMenu("AllFilters")}
            filterBy={filters}
            type="AllFilters"
          />
        </div>
        {/* RIGHT */}
        <div className="self-start">
          <DropDownMenue
            isOpen={openMenuType === "SortBy"}
            onToggleMenu={() => handleToggleMenu("SortBy")}
            filterBy={sizes}
            type="SortBy"
          />
        </div>
      </div>
    </div>
  );
}
