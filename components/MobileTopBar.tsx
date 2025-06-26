'use client';

import { useState } from 'react';
import { SlidersHorizontal, Search } from 'lucide-react';
import MobileFilterBar from './MobileFilterBar';
import { Filters } from '@/lib/types';
import { Dialog } from '@headlessui/react';

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export default function MobileTopBar({ filters, setFilters }: Props) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <div className="bg-white px-4 pt-2 pb-3 flex items-center gap-2 border-b shadow-sm z-10 md:hidden mt-[6px]">
        {/* Search input estilo botón */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex-1 flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-full text-sm shadow-sm"
        >
          <span className="text-gray-500">Search</span>
          <Search className="w-4 h-4 text-gray-500" />
        </button>

        {/* Filter button */}
        <button
          onClick={() => setIsFilterOpen(true)}
          className="w-[42px] h-[42px] flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-sm"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Search Modal */}
      <Dialog open={isSearchOpen} onClose={() => setIsSearchOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-white p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Search</h2>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-sm text-gray-500 hover:text-black"
            >
              Close
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Where</label>
              <input
                type="text"
                placeholder="Tulum, Mexico"
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-sm font-medium">From</label>
              <input type="datetime-local" className="w-full mt-1 p-2 border rounded-md" />
            </div>
            <div>
              <label className="text-sm font-medium">Until</label>
              <input type="datetime-local" className="w-full mt-1 p-2 border rounded-md" />
            </div>

            <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-full text-center font-semibold">
              Search
            </button>
          </div>
        </div>
      </Dialog>

      {/* Filter Modal */}
      <MobileFilterBar
        open={isFilterOpen}
        setOpen={setIsFilterOpen}
        filters={filters}
        setFilters={setFilters}
      />
    </>
  );
}