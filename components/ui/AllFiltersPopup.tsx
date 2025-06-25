'use client';

import { useState, useEffect } from 'react';
import PriceFilter from './PriceFilter';
import VehicleTypeFilter from './VehicleTypeFilter';
import MakeFilter from './MakeFilter';
import DeliverToMeFilter from './DeliverToMeFilter';
import { Filters } from '@/lib/types';

interface AllFiltersPopupProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export default function AllFiltersPopup({ filters, setFilters }: AllFiltersPopupProps) {
  const [applied, setApplied] = useState(false);

  // Detecta si hay algún filtro aplicado
  const isActive = () => {
    const defaultFilters: Filters = {
      priceRange: [300, 2500],
      vehicleTypes: [],
      brands: [],
      delivery: false,
    };
    return JSON.stringify(filters) !== JSON.stringify(defaultFilters);
  };

  const handleApplyAll = () => {
    setApplied(true);
    console.log('✅ All filters applied:', filters);
  };

  useEffect(() => {
    setApplied(isActive());
  }, [filters]);

  return (
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl flex flex-col">
      <h2 className="text-xl font-semibold text-gray-800 text-center py-4 border-b">
        All Filters
      </h2>

      <div className="overflow-y-auto max-h-[calc(100vh-200px)] p-6 space-y-8">
        <section className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Daily Price</h3>
          <PriceFilter filters={filters} setFilters={setFilters} />
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Vehicle Type</h3>
          <VehicleTypeFilter filters={filters} setFilters={setFilters} />
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Make & Model</h3>
          <MakeFilter filters={filters} setFilters={setFilters} />
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Delivery</h3>
          <DeliverToMeFilter filters={filters} setFilters={setFilters} />
        </section>
      </div>

      <div className="p-4 border-t">
        <button
          onClick={handleApplyAll}
          className={`w-full px-6 py-2 rounded-lg font-semibold text-sm text-white transition 
            ${applied ? 'bg-indigo-700 shadow-md' : 'bg-indigo-600 hover:bg-indigo-700'}
          `}
        >
          Apply all filters
        </button>
      </div>
    </div>
  );
}