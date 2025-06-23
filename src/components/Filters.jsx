"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import DropDownMenue from "@/components/DropDownMenue";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { debounce } from "../utlity/debounce";

export default function Filters() {
  const [isOpenMenue, setIsOpenMenue] = useState(false);
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const types = ["physical", "digital"];
  const sizes = [
    "price (low to high)",
    "price (high to low)",
    "Newest",
    "Oldest",
  ];
  const colors = ["red", "green", "blue"];
  const category = [
    "all-products",
    "accessories",
    "featured",
    "home",
    "sales",
    "shose",
    "tshirts",
  ];
  const filters = ["filter 01 ", "filter 02", "filter 03"];
  const [openMenuType, setOpenMenuType] = useState(null); // Track the open dropdown by type

  const handleToggleMenu = (type) => {
    setOpenMenuType((prev) => (prev === type ? null : type)); // Toggle or close
  };

  const handleFilterChange = (type, option) => {
    if (type === "SortBy") {
      if (option === "price (low to high)") {
        option = "asc price";
      } else if (option === "price (high to low)") {
        option = "desc price";
      } else if (option === "Newest") {
        option = "asc lastUpdated";
      } else if (option === "Oldest") {
        option = "desc lastUpdated";
      }
    }

    const params = new URLSearchParams(searchParams);

    if (option && option.trim() !== "") {
      params.set(type, option);
    } else {
      params.delete(type);
    }

    replace(`${pathName}?${params.toString()}`, { shallow: true });
  };
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/all-products");
  }, []);
  return (
    <div className="mt-5">
      <div className="flex flex-wrdap gap-y-6 items-center justify-between">
        {/* LEFT */}
        <div className="flex flex-wrap gap-5 items-center">
          <DropDownMenue
            handleFilterChange={handleFilterChange}
            isOpen={openMenuType === "Type"}
            onToggleMenu={() => handleToggleMenu("Type")}
            filterBy={types}
            type="Type"
          />
          <input
            className="border border-gray-400 rounded-2xl px-2 py-2 outline-none w-24 text-sm"
            type="text"
            placeholder="Min Price "
            onChange={debounce(
              (e) => handleFilterChange("min", e.target.value),
              500
            )}
          />

          <input
            className="border border-gray-400 rounded-2xl px-2 py-2 outline-none w-24 text-sm"
            type="text"
            placeholder="Max Price "
            onChange={debounce(
              (e) => handleFilterChange("max", e.target.value),
              500
            )}
          />

          {/* <DropDownMenue
          handleFilterChange ={handleFilterChange}
            isOpen={openMenuType === "Size"}
            onToggleMenu={() => handleToggleMenu("Size")}
            filterBy={sizes}
            type="Size"
          />
          <DropDownMenue
          handleFilterChange ={handleFilterChange}
            isOpen={openMenuType === "Color"}
            onToggleMenu={() => handleToggleMenu("Color")}
            filterBy={colors}
            type="Color"
          /> */}
          <DropDownMenue
            handleFilterChange={handleFilterChange}
            isOpen={openMenuType === "Category"}
            onToggleMenu={() => handleToggleMenu("Category")}
            filterBy={category}
            type="cat"
          />
          {/* <DropDownMenue
            handleFilterChange={handleFilterChange}
            isOpen={openMenuType === "AllFilters"}
            onToggleMenu={() => handleToggleMenu("AllFilters")}
            filterBy={filters}
            type="AllFilters"
          /> */}
        </div>
        {/* RIGHT */}
        <div className="self-start">
          <DropDownMenue
            handleFilterChange={handleFilterChange}
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
