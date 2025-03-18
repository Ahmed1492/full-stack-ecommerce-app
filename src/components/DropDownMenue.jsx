"use client";
import Image from "next/image";
import { useState } from "react";

export default function DropDownMenue({
  filterBy,
  type,
  isOpen,
  onToggleMenu,
  handleFilterChange
}) {
  const [isOpenMenue, setIsOpenMenue] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const handleSelect = (option) => {
    setSelectedOption(option);
    onToggleMenu(); // Close the menu after selecting
    handleFilterChange(type , option)
  };

  filterBy = [type, ...filterBy];
  const handleOpenMenue = () => {
    setIsOpenMenue((prev) => !prev);
  };

  return (
    <div>
      <div
        className="flex items-center justify-between gap-3 bg-gray-100 py-2 px-4 rounded-2xl cursor-pointer w-max"
        role="button"
        aria-haspopup="menu"
        aria-expanded={isOpenMenue}
        onClick={onToggleMenu}
      >
        <button className="text-sm">{selectedOption || type}</button>
        <button>
          <Image src="/drowpdown.png" alt="" width={12} height={12} />
        </button>
      </div>
      {isOpen && (
        <div
        onChange={handleFilterChange}
          className="bg-[#636363] absolute z-50 shadow-lg flex w-[12rem] px-1 flex-col gap-1 py-3 justify-center items-center rounded-lg"
          role="menu"
          aria-hidden={!isOpenMenue}
        >
          {filterBy.map((type) => (
            <span
              onClick={() => handleSelect(type)}
              className="cursor-pointer w-full pe-4 text-sm duration-300 ease-in-out ps-2 py-1 self-start hover:bg-[#77C463] rounded-lg text-white"
              role="menuitem"
              key={type}
            >
              {type} 
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
