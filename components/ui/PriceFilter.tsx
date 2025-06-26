'use client';

import { useEffect, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { useMediaQuery } from 'react-responsive';

type FiltersState = {
  priceRange: [number, number];
  vehicleTypes: string[];
  brands: string[];
  delivery: boolean;
};

export default function PriceFilter({
  filters,
  setFilters,
}: {
  filters: FiltersState;
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
}) {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [range, setRange] = useState<[number, number]>(filters.priceRange);

  useEffect(() => {
    setRange(filters.priceRange);
  }, [filters.priceRange]);

  const handleApply = () => {
    setFilters((prev) => ({ ...prev, priceRange: range }));
  };

  const handleReset = () => {
    const defaultRange: [number, number] = [300, 2500];
    setRange(defaultRange);
    setFilters((prev) => ({ ...prev, priceRange: defaultRange }));
  };

  const formatPrice = (num: number) => `$${num.toLocaleString('en-US')}`;

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-xl space-y-4">
      <h3 className="text-center text-lg font-semibold">Daily price</h3>
      <p className="text-sm text-center text-gray-700">
        {formatPrice(range[0])} – {formatPrice(range[1])}+ /day
      </p>

      <Slider
        min={300}
        max={2500}
        step={50}
        value={range}
        onValueChange={(val) => setRange(val as [number, number])}
      />

      <div className="flex justify-between gap-4 pt-2">
        {!isMobile && (
          <button
            onClick={handleReset}
            className="border border-gray-300 px-4 py-2 rounded-lg text-sm"
          >
            Reset
          </button>
        )}
        <button
          onClick={handleApply}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold text-sm w-full"
        >
          View results
        </button>
      </div>
    </div>
  );
}