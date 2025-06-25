'use client';

import { useState, useEffect } from 'react';

export default function DeliverToMeFilter({
  filters,
  setFilters,
}: {
  filters: {
    priceRange: [number, number];
    vehicleTypes: string[];
    brands: string[];
    delivery: boolean;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      priceRange: [number, number];
      vehicleTypes: string[];
      brands: string[];
      delivery: boolean;
    }>
  >;
}) {
  const [isChecked, setIsChecked] = useState(filters.delivery);

  useEffect(() => {
    setIsChecked(filters.delivery);
  }, [filters.delivery]);

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    setFilters((prev) => ({ ...prev, delivery: newValue }));
  };

  return (
    <div className="p-6 w-[300px] max-w-full bg-white rounded-xl shadow-xl space-y-4">
      <label className="flex items-center gap-3 text-sm font-medium">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleToggle}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        Deliver the unit to my location
      </label>
    </div>
  );
}