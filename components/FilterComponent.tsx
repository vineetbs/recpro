"use client";

import { ChevronDown, ListFilter } from "lucide-react";
import { useState } from "react";

const FilterComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative ">
      <div
        className="cursor-pointer rounded-2xl p-2 border border-gray-300 mt-1 max-w-50 "
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex gap-1">
          <ListFilter />
          <div>Most Viewed</div>
          <ChevronDown />
        </div>
      </div>
      {isOpen && (
        <ul className="absolute border border-gray-300 rounded-3xl p-2 mt-2 w-full z-50 bg-white  ">
          {["Most Recent", "Most Liked"].map((e) => (
            <li
              className="border border-gray-200 p-2 w-full hover:bg-gray-300 cursor-pointer rounded-2xl my-2  "
              key={e}
            >
              {e}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterComponent;
