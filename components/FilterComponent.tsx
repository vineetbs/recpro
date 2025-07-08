"use client";

import { ChevronDown, ListFilter } from "lucide-react";
import { useState } from "react";

interface IFilter {
  newSort: any;
  oldSort: any;
}

const FilterComponent = ({ newSort, oldSort }: IFilter) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative ">
      <div
        className="cursor-pointer rounded-2xl p-2 border border-gray-300 mt-1 max-w-50 "
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex gap-1">
          <ListFilter />
          <div>Filter by date</div>
          <ChevronDown />
        </div>
      </div>
      {isOpen && (
        <div className="absolute border border-gray-300 rounded-3xl p-2 mt-2 w-full z-50 bg-white  ">
          <button
            className="border border-gray-200 p-2 w-full hover:bg-gray-300 cursor-pointer rounded-2xl my-2"
            onClick={newSort}
          >
            Newest
          </button>
          <button
            className="border border-gray-200 p-2 w-full hover:bg-gray-300 cursor-pointer rounded-2xl my-2"
            onClick={oldSort}
          >
            Oldest
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
