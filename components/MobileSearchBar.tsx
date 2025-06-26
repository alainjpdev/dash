'use client';

import { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import AddTimeSelector from '@/components/AddTimeSelector';
import { Search, CalendarIcon, MapPin } from 'lucide-react';
import { destinations } from '@/lib/data/destinations';

export default function MobileSearchBar() {
  const today = new Date();

  const [location, setLocation] = useState('');
  const [showDestinations, setShowDestinations] = useState(false);
  const [fromTime, setFromTime] = useState('10:00 AM');
  const [untilTime, setUntilTime] = useState('10:00 AM');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [showCalendar, setShowCalendar] = useState(false);

  const destinationRef = useRef<HTMLDivElement | null>(null);

  const formatDate = (date?: Date) => date ? format(date, 'MM/dd/yyyy') : 'Add date';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (destinationRef.current && !destinationRef.current.contains(e.target as Node)) {
        setShowDestinations(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="md:hidden w-full px-4 py-4 bg-white rounded-xl shadow-md border">
      <div className="flex flex-col gap-4 relative">
        {/* Location Input */}
        <div className="flex items-center gap-2 border-b pb-2 relative">
          <MapPin className="text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Where to?"
            value={location}
            onFocus={() => setShowDestinations(true)}
            onChange={(e) => {
              setLocation(e.target.value);
              setShowDestinations(true);
            }}
            className="w-full outline-none text-sm"
          />
        </div>

        {/* Destination suggestions */}
        {showDestinations && (
          <div
            ref={destinationRef}
            className="absolute top-[50px] left-0 w-full bg-white z-50 border rounded-md shadow-md p-2"
          >
            {destinations
              .filter((d) =>
                d.name.toLowerCase().includes(location.toLowerCase())
              )
              .map((dest, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setLocation(dest.name);
                    setShowDestinations(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
                >
                  {dest.name}
                </button>
              ))}
          </div>
        )}

        {/* Date Range */}
        <div className="flex items-center gap-2 border-b pb-2">
          <CalendarIcon className="text-gray-500 w-5 h-5" />
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="text-sm text-left w-full text-gray-700"
          >
            {dateRange?.from
              ? `${formatDate(dateRange.from)} → ${formatDate(dateRange.to)}`
              : 'Add dates'}
          </button>
        </div>

        {/* Calendar Popup */}
        {showCalendar && (
          <div className="mt-2">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={(range) => {
                if (range?.from) {
                  setDateRange({ from: range.from, to: range.to ?? range.from });
                } else {
                  setDateRange(undefined);
                }
              }}
              numberOfMonths={1}
              disabled={{ before: today }}
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setDateRange(undefined)}
                className="text-sm px-4 py-1.5 rounded-md border hover:bg-gray-100"
              >
                Clear
              </button>
              <button
                onClick={() => setShowCalendar(false)}
                className="text-sm px-4 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Time Selectors */}
        <div className="flex justify-between gap-4">
          <div className="flex flex-col flex-1">
            <label className="text-xs text-gray-500 mb-1">From</label>
            <AddTimeSelector value={fromTime} onChange={setFromTime} />
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-xs text-gray-500 mb-1">Until</label>
            <AddTimeSelector value={untilTime} onChange={setUntilTime} />
          </div>
        </div>

        {/* Search Button */}
        <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 transition text-white w-full py-3 rounded-xl flex items-center justify-center">
          <Search className="w-5 h-5 mr-2" />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
}