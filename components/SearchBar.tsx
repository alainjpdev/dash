'use client';

import { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import AddTimeSelector from '@/components/AddTimeSelector';
import { Calendar } from '@/components/ui/calendar';
import { Search } from 'lucide-react';
import { destinations } from '@/lib/data/destinations';

export default function SearchBar() {
  const today = new Date();

  const [location, setLocation] = useState('');
  const [fromTime, setFromTime] = useState('10:00 AM');
  const [untilTime, setUntilTime] = useState('10:00 AM');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showDestinations, setShowDestinations] = useState(false);

  const calendarRef = useRef<HTMLDivElement | null>(null);
  const destinationRef = useRef<HTMLDivElement | null>(null);

  const formatDate = (date?: Date) =>
    date ? format(date, 'MM/dd/yyyy') : 'Add date';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setShowCalendar(false);
      }
      if (destinationRef.current && !destinationRef.current.contains(e.target as Node)) {
        setShowDestinations(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full px-4 sm:px-6 lg:px-0 max-w-6xl mx-auto">
      {/* Calendar Popup */}
      {showCalendar && (
        <div
          ref={calendarRef}
          className="absolute top-full mt-2 z-50 bg-white border rounded-xl shadow-xl p-4"
        >
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
            numberOfMonths={2}
            disabled={{ before: today }}
          />
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setDateRange(undefined)}
              className="text-sm px-4 py-1.5 rounded-md border hover:bg-gray-100 transition"
            >
              Clear
            </button>
            <button
              onClick={() => setShowCalendar(false)}
              className="text-sm px-4 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Destination Popup */}
      {showDestinations && (
        <div
          ref={destinationRef}
          className="absolute z-50 bg-white shadow-xl border rounded-xl mt-2 w-[90%] sm:w-[80%] md:w-[420px] max-h-64 overflow-y-auto"
        >
          {destinations
            .filter((d) => d.name.toLowerCase().includes(location.toLowerCase()))
            .map((dest, i) => (
              <button
                key={i}
                onClick={() => {
                  setLocation(dest.name);
                  setShowDestinations(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                {dest.name}
              </button>
            ))}
        </div>
      )}

      {/* Search Container */}
      <div className="w-full flex flex-col md:flex-row items-stretch justify-between bg-white rounded-full shadow-lg overflow-hidden border">
        {/* Location */}
        <div className="flex flex-col px-6 py-4 border-b md:border-b-0 md:border-r w-full md:w-[28%] relative">
          <label className="text-sm font-semibold mb-1">Where</label>
          <input
            type="text"
            value={location}
            onFocus={() => setShowDestinations(true)}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, airport, address or hotel"
            className="outline-none placeholder:text-gray-400 text-base bg-transparent"
          />
        </div>

        {/* From Date + Time */}
        <div className="flex flex-col px-6 py-4 border-b md:border-b-0 md:border-r w-full md:w-[24%]">
          <label className="text-sm font-semibold mb-1">From</label>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowCalendar(true)} className="text-base">
              {formatDate(dateRange?.from)}
            </button>
            <AddTimeSelector value={fromTime} onChange={setFromTime} />
          </div>
        </div>

        {/* Until Date + Time */}
        <div className="flex flex-col px-6 py-4 border-b md:border-b-0 md:border-r w-full md:w-[24%]">
          <label className="text-sm font-semibold mb-1">Until</label>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowCalendar(true)} className="text-base">
              {formatDate(dateRange?.to)}
            </button>
            <AddTimeSelector value={untilTime} onChange={setUntilTime} />
          </div>
        </div>

        {/* Search Button */}
        <button className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-6 py-4 flex items-center justify-center w-full md:w-[10%]">
          <Search className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}