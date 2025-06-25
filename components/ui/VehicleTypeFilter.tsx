'use client';

import { useEffect, useState } from 'react';
import { CarFront, Truck, BusFront, MoveRight } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

type FiltersState = {
  priceRange: [number, number];
  vehicleTypes: string[];
  brands: string[];
  delivery: boolean;
};

const vehicleTypes = [
  { label: 'Car', icon: CarFront },
  { label: 'SUV', icon: Truck },
  { label: 'Minivan', icon: BusFront },
  { label: 'Truck', icon: Truck },
  { label: 'Box truck', icon: MoveRight },
];

export default function VehicleTypeFilter({
  filters,
  setFilters,
}: {
  filters: FiltersState;
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
}) {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [selected, setSelected] = useState<string[]>(filters.vehicleTypes);

  useEffect(() => {
    setSelected(filters.vehicleTypes);
  }, [filters.vehicleTypes]);

  const handleToggle = (type: string) => {
    const updated = selected.includes(type)
      ? selected.filter((t) => t !== type)
      : [...selected, type];
    setSelected(updated);
  };

  const handleReset = () => {
    setSelected([]);
    setFilters((prev) => ({ ...prev, vehicleTypes: [] }));
  };

  const handleApply = () => {
    setFilters((prev) => ({ ...prev, vehicleTypes: selected }));
  };

  const hasActiveFilters = filters.vehicleTypes.length > 0;

  return (
    <div
      className={`p-6 w-[480px] max-w-full rounded-xl shadow-xl border transition bg-white ${
        hasActiveFilters ? 'border-indigo-600 shadow-indigo-200' : 'border-gray-200'
      }`}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {vehicleTypes.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => handleToggle(label)}
            className={`flex flex-col items-center justify-center border rounded-xl p-4 transition ${
              selected.includes(label)
                ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                : 'hover:bg-gray-50'
            }`}
          >
            <Icon className="w-6 h-6 mb-1" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handleReset}
          className="border px-4 py-2 rounded-lg text-sm font-medium"
        >
          Reset
        </button>
        <button
          onClick={handleApply}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold text-sm"
        >
          View results
        </button>
      </div>
    </div>
  );
}