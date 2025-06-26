'use client';

import { useState, useRef, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import AddTimeSelector from '@/components/AddTimeSelector';
import { format } from 'date-fns';
import { CalendarIcon, MapPin, Search } from 'lucide-react';
import { destinations } from '@/lib/data/destinations';

export default function CompactSearchBar() {
  const [location, setLocation] = useState('');
  const [showDestinations, setShowDestinations] = useState(false);
  const [fromTime, setFromTime] = useState('10:00 AM');
  const [untilTime, setUntilTime] = useState('10:00 AM');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [showCalendar, setShowCalendar] = useState(false);
  const today = new Date();

  const destinationRef = useRef<HTMLDivElement | null>(null);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  const formatDate = (date?: Date) =>
    date ? format(date, 'MM/dd/yyyy') : 'Add date';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (destinationRef.current && !destinationRef.current.contains(e.target as Node)) {
        setShowDestinations(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full">
      {/* Destinations Dropdown */}
      {showDestinations && (
        <div
          ref={destinationRef}
          className="absolute top-[52px] left-0 w-full bg-white z-50 border rounded-md shadow-md p-2"
        >
          {destinations
            .filter((d) => d.name.toLowerCase().includes(location.toLowerCase()))
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

      {/* Calendar Popup */}
      {showCalendar && (
        <div
          ref={calendarRef}
          className="absolute top-[52px] right-0 w-full md:w-[400px] z-50 bg-white border rounded-xl shadow-xl p-4"
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
            numberOfMonths={1}
            disabled={{ before: today }}
          />
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setDateRange(undefined)}
              className="text-sm px-3 py-1.5 rounded-md border hover:bg-gray-100"
            >
              Clear
            </button>
            <button
              onClick={() => setShowCalendar(false)}
              className="text-sm px-3 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Main Input Area */}
      <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3">
        {/* Location Input */}
        <div className="flex items-center border border-gray-300 px-3 py-2 rounded-full flex-1 bg-white">
          <MapPin className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Where to?"
            className="outline-none w-full text-sm text-gray-700 bg-transparent"
            value={location}
            onFocus={() => setShowDestinations(true)}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Date Range */}
        <div className="flex items-center border border-gray-300 px-3 py-2 rounded-full bg-white">
          <CalendarIcon className="w-4 h-4 text-gray-400 mr-2" />
          <button
            onClick={() => setShowCalendar(true)}
            className="text-sm text-gray-700"
          >
            {dateRange?.from
              ? `${formatDate(dateRange.from)} → ${formatDate(dateRange.to)}`
              : 'Add date'}
          </button>
        </div>

        {/* Time Pickers */}
        <div className="hidden md:flex gap-2 items-center">
          <AddTimeSelector value={fromTime} onChange={setFromTime} />
          <AddTimeSelector value={untilTime} onChange={setUntilTime} />
        </div>

        {/* Search Button */}
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full flex items-center justify-center">
          <Search className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}