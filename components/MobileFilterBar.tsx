'use client';

import { SlidersHorizontal } from 'lucide-react';
import PriceFilter from './ui/PriceFilter';
import VehicleTypeFilter from './ui/VehicleTypeFilter';
import MakeFilter from './ui/MakeFilter';
import DeliverToMeFilter from './ui/DeliverToMeFilter';
import { Filters } from '@/lib/types';
import { Dialog, DialogContent } from './ui/dialog';

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export default function MobileFilterBar({ open, setOpen, filters, setFilters }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5" />
          Filter cars
        </h2>

        <div className="space-y-6">
          <PriceFilter filters={filters} setFilters={setFilters} />
          <VehicleTypeFilter filters={filters} setFilters={setFilters} />
          <MakeFilter filters={filters} setFilters={setFilters} />
          <DeliverToMeFilter filters={filters} setFilters={setFilters} />
        </div>
      </DialogContent>
    </Dialog>
  );
}