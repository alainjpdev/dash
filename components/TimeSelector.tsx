// components/TimeSelector.tsx
'use client';

import { useState } from 'react';

export default function TimeSelector() {
  const [pickupTime, setPickupTime] = useState('10:00');
  const [dropoffTime, setDropoffTime] = useState('18:00');

  const times = Array.from({ length: 24 * 2 }, (_, i) => {
    const hour = Math.floor(i / 2)
      .toString()
      .padStart(2, '0');
    const min = i % 2 === 0 ? '00' : '30';
    return `${hour}:${min}`;
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-4">
      <div className="bg-white border border-gray-300 rounded-xl px-6 py-4 shadow-sm flex flex-wrap gap-6 justify-between items-center">
        <div className="flex flex-col">
          <label className="text-xs font-medium text-gray-500 mb-1">
            Pickup time
          </label>
          <select
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="text-sm text-black border border-gray-300 rounded-md px-2 py-1 focus:outline-none"
          >
            {times.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-medium text-gray-500 mb-1">
            Drop-off time
          </label>
          <select
            value={dropoffTime}
            onChange={(e) => setDropoffTime(e.target.value)}
            className="text-sm text-black border border-gray-300 rounded-md px-2 py-1 focus:outline-none"
          >
            {times.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}