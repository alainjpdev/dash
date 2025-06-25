'use client';

import { useEffect, useState } from 'react';
import { ChevronRight, Search } from 'lucide-react';

// Este array ahora usa exactamente los valores que están en Supabase (case-sensitive)
const allMakes = [
  { id: 'Toyota', name: 'Toyota', country: 'Japan' },
  { id: 'BMW', name: 'BMW', country: 'Germany' },
  { id: 'Tesla', name: 'Tesla', country: 'USA' },
  { id: 'Nissan', name: 'Nissan', country: 'Japan' },
  { id: 'Jeep', name: 'Jeep', country: 'USA' },
  // Agrega más si tu base de datos tiene más marcas
];

export default function MakeFilter({
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
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>(filters.brands);

  useEffect(() => {
    setSelected(filters.brands);
  }, [filters.brands]);

  const toggleMake = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleApply = () => {
    setFilters((prev) => ({ ...prev, brands: selected }));
  };

  const filteredMakes = allMakes.filter((make) =>
    make.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-sm border rounded-xl shadow-md p-4 bg-white">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search make"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <h3 className="text-lg font-semibold mb-2">All makes</h3>
      <div className="border-t border-gray-200 mb-2" />

      <div className="max-h-64 overflow-y-auto space-y-1">
        {filteredMakes.map((make) => (
          <div
            key={make.id}
            className="flex items-center justify-between py-2 border-b last:border-b-0"
          >
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selected.includes(make.id)}
                onChange={() => toggleMake(make.id)}
                className="w-5 h-5 rounded border-gray-400"
              />
              <div className="flex flex-col">
                <span className="text-sm text-gray-800">{make.name}</span>
                <span className="text-xs text-gray-500">{make.country}</span>
              </div>
            </label>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => {
            setSelected([]);
            setFilters((prev) => ({ ...prev, brands: [] }));
          }}
          className="px-4 py-2 border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Reset
        </button>
        <button
          onClick={handleApply}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold shadow hover:bg-indigo-700"
        >
          View {selected.length} selected
        </button>
      </div>
    </div>
  );
}