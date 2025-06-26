'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Calendar } from './ui/calendar';
import { DateRange } from 'react-day-picker';

export default function DateRangePicker({
  from,
  to,
  onChange,
}: {
  from: Date | undefined;
  to: Date | undefined;
  onChange: (range: { from: Date | undefined; to: Date | undefined }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [tempRange, setTempRange] = useState<DateRange | undefined>({
    from,
    to,
  });

  const handleSave = () => {
    onChange({ from: tempRange?.from, to: tempRange?.to });
    setOpen(false);
  };

  const handleClear = () => {
    setTempRange({ from: undefined, to: undefined });
    onChange({ from: undefined, to: undefined });
    setOpen(false);
  };

  const formatted = from && to ? `${format(from, 'MMM d')} - ${format(to, 'MMM d')}` : 'Add dates';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1 text-sm text-gray-700 focus:outline-none border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm">
          <CalendarIcon className="w-4 h-4 text-gray-500" />
          <span>{formatted}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-4 bg-white rounded-xl shadow-xl w-auto">
        <Calendar
          mode="range"
          selected={tempRange}
          onSelect={setTempRange}
          numberOfMonths={2}
        />
        <div className="flex justify-between mt-4 px-1">
          <button onClick={handleClear} className="text-sm text-indigo-600 hover:underline">
            Clear
          </button>
          <button
            onClick={handleSave}
            className="bg-indigo-600 text-white px-4 py-1.5 rounded-md text-sm font-semibold"
          >
            Save
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}