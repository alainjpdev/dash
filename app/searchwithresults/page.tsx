'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CompactSearchBar from '@/components/CompactSearchBar';
import FilterBar from '@/components/FilterBar';
import MobileFilterBar from '@/components/MobileFilterBar';
import CarCardList from '@/components/CarCardList';
import MapView from '@/components/MapView';
import { MapPin } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { Vehicle, Filters } from '@/lib/types';
import { useMediaQuery } from 'react-responsive';
import MobileTopBar from '@/components/MobileTopBar';

// Hook para evitar hydration mismatch
function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
}

export default function SearchWithResultsPage() {
  const hasMounted = useHasMounted();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const [showMap, setShowMap] = useState(false);
  const [cars, setCars] = useState<Vehicle[]>([]);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [300, 2500],
    vehicleTypes: [],
    brands: [],
    delivery: false,
  });

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
      filters.brands.includes(car.brand);

    const matchesDelivery =
      !filters.delivery || car.delivery_available === true;

    return inPriceRange && matchesType && matchesBrand && matchesDelivery;
  });

  if (!hasMounted) return null;

  return (
    <section className="w-full h-screen flex flex-col pt-[40px]">
      <Navbar />

      {/* Mostrar solo una barra según pantalla */}
      {hasMounted && isMobile && (
        <MobileTopBar filters={filters} setFilters={setFilters} />
      )}

      {hasMounted && !isMobile && (
        <>
          {/*<div className="bg-white px-4 pt-3 pb-1 border-b shadow-sm">
            <CompactSearchBar />
          </div>*/}
          <FilterBar filters={filters} setFilters={setFilters} />
        </>
      )}

      <div className="flex flex-1 overflow-hidden">
        <div className="w-full lg:w-[50%] h-full overflow-y-auto p-6 space-y-8">
          <h2 className="text-xl font-semibold">{filteredCars.length}+ cars available</h2>
          <p className="text-sm text-gray-500">These cars are located in and around Tulum.</p>
          <CarCardList cars={filteredCars} />
        </div>

        <div className="hidden lg:block lg:w-[50%] h-full sticky top-0">
          <MapView />
        </div>
      </div>

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

      <button
        onClick={() => setShowMap(!showMap)}
        className="lg:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 shadow-md rounded-full p-3 z-50"
      >
        <MapPin className="w-5 h-5 text-indigo-600" />
      </button>
    </section>
  );
}