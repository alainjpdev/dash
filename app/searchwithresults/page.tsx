'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import FilterBar from '@/components/FilterBar';
import CarCardList from '@/components/CarCardList';
import MapView from '@/components/MapView';
import { MapPin } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { Vehicle, Filters } from '@/lib/types';


export default function SearchWithResultsPage() {
  const [showMap, setShowMap] = useState(false);
  const [cars, setCars] = useState<Vehicle[]>([]);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 2000],
    vehicleTypes: [],
    brands: [],
    delivery: false,
  });

  const constraintsRef = useRef(null);

  useEffect(() => {
    const fetchCars = async () => {
      const { data, error } = await supabase.from('vehicles').select('*');
      if (error) {
        console.error('❌ Error fetching cars:', error.message);
      } else {
        setCars(data as Vehicle[]);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) => {
    const inPriceRange =
      car.price_per_day >= filters.priceRange[0] &&
      car.price_per_day <= filters.priceRange[1];

    const matchesType =
      filters.vehicleTypes.length === 0 ||
      filters.vehicleTypes.includes(car.vehicle_type);

    const matchesBrand =
      filters.brands.length === 0 ||
      filters.brands.includes(car.brand); // ✅ Corregido: 'brand' en lugar de 'make'

    const matchesDelivery =
      !filters.delivery || car.delivery_available === true;

    return inPriceRange && matchesType && matchesBrand && matchesDelivery;
  });

  return (
    <section className="w-full h-screen flex flex-col overflow-hidden">
      <Navbar />
      <FilterBar filters={filters} setFilters={setFilters} />

      <div className="flex flex-1 overflow-hidden">
        {/* Car list - Desktop */}
        <div className="w-full lg:w-[50%] h-full overflow-y-auto p-6 space-y-8">
          <h2 className="text-xl font-semibold">{filteredCars.length}+ cars available</h2>
          <p className="text-sm text-gray-500">These cars are located in and around Las Vegas.</p>
          <CarCardList cars={filteredCars} />
        </div>

        {/* Map - Desktop */}
        <div className="hidden lg:block lg:w-[50%] h-full sticky top-0">
          <MapView />
        </div>
      </div>

      {/* Mobile View with toggle */}
      {showMap && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white overflow-y-auto">
          <MapView />
          <div className="p-4">
            <h2 className="text-lg font-semibold text-center mt-4">
              {filteredCars.length}+ cars available
            </h2>
            <CarCardList cars={filteredCars} />
          </div>
        </div>
      )}

      {/* Toggle Map Button - Mobile */}
      <button
        onClick={() => setShowMap(!showMap)}
        className="lg:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 shadow-md rounded-full p-3 z-50"
      >
        <MapPin className="w-5 h-5 text-indigo-600" />
      </button>
    </section>
  );
}