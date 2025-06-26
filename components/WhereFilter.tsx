'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { destinations, Destination } from '@/lib/data/destinations';

export default function WhereFilter() {
  const [showPopup, setShowPopup] = useState(false);
  const [selected, setSelected] = useState<Destination>(destinations[0]);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setShowPopup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={popupRef}>
      <button
        onClick={() => setShowPopup(!showPopup)}
        className="flex items-center gap-2 border-b border-gray-300 px-2 py-1 text-sm hover:text-indigo-600 transition"
      >
        <span className="text-indigo-600 font-medium">Where</span>
        <span className="truncate max-w-[150px]">{selected.name}</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {showPopup && (
        <div className="absolute top-10 left-0 w-[280px] bg-white shadow-xl rounded-xl border z-50 p-3">
          <h4 className="text-sm font-semibold mb-2 text-gray-700">Choose a destination</h4>
          <ul className="divide-y divide-gray-200 max-h-64 overflow-y-auto">
            {destinations.map((dest) => (
              <li
                key={dest.name}
                onClick={() => {
                  setSelected(dest);
                  setShowPopup(false);
                }}
                className="flex items-center gap-3 py-2 px-2 hover:bg-gray-50 rounded cursor-pointer"
              >
                <Image
                  src={dest.icon}
                  alt={dest.name}
                  width={36}
                  height={36}
                  className="rounded-full"
                />
                <span className="text-sm font-medium">{dest.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}