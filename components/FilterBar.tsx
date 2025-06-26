'use client';

import { useState, useRef, useEffect } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import PriceFilter from './ui/PriceFilter';
import VehicleTypeFilter from './ui/VehicleTypeFilter';
import MakeFilter from './ui/MakeFilter';
import DeliverToMeFilter from './ui/DeliverToMeFilter';
import { Filters } from '@/lib/types';

const DEFAULT_FILTERS: Filters = {
  priceRange: [300, 2500],
  vehicleTypes: [],
  brands: [],
  delivery: false,
};

interface FilterBarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export default function FilterBar({ filters, setFilters }: FilterBarProps) {
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const popupRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        activePopup &&
        popupRefs.current[activePopup] &&
        !popupRefs.current[activePopup]?.contains(event.target as Node)
      ) {
        setActivePopup(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activePopup]);

  const filtersList = [
    {
      label: 'Daily price',
      component: <PriceFilter filters={filters} setFilters={setFilters} />,
    },
    {
      label: 'Vehicle type',
      component: <VehicleTypeFilter filters={filters} setFilters={setFilters} />,
    },
    {
      label: 'Make & model',
      component: <MakeFilter filters={filters} setFilters={setFilters} />,
    },
    {
      label: 'Deliver to me',
      component: <DeliverToMeFilter filters={filters} setFilters={setFilters} />,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 border-b px-4 py-2.5 bg-white mt-2 z-10 relative">
      {filtersList.map((filter, index) => {
        const isActive =
          filter.label === 'Daily price'
            ? filters.priceRange[0] !== DEFAULT_FILTERS.priceRange[0] ||
              filters.priceRange[1] !== DEFAULT_FILTERS.priceRange[1]
            : filter.label === 'Vehicle type'
            ? filters.vehicleTypes.length > 0
            : filter.label === 'Make & model'
            ? filters.brands.length > 0
            : filter.label === 'Deliver to me'
            ? filters.delivery
            : false;

        const isOpen = activePopup === filter.label;

        return (
          <div
            key={index}
            ref={(el) => (popupRefs.current[filter.label] = el)}
            className="relative"
          >
            <button
              onClick={() =>
                setActivePopup((prev) =>
                  prev === filter.label ? null : filter.label
                )
              }
              className={`border rounded-full px-4 py-2 text-sm transition
                ${isActive ? 'border-indigo-500 text-indigo-700 bg-indigo-50' : 'border-gray-300 text-gray-700'}
                ${isOpen ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
            >
              {filter.label === 'All filters' ? (
                <div className="flex items-center gap-1">
                  <SlidersHorizontal className="w-4 h-4" />
                  {filter.label}
                </div>
              ) : (
                filter.label
              )}
            </button>

            {isOpen && (
              <div className="absolute top-12 left-0 z-50">{filter.component}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}