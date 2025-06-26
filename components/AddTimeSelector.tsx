'use client';

import React from 'react';

interface AddTimeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function AddTimeSelector({ value, onChange }: AddTimeSelectorProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-transparent text-sm text-gray-800 pr-6 cursor-pointer focus:outline-none"
      >
        {[
          '9:00 AM', '10:00 AM', '11:00 AM',
          '12:00 PM', '1:00 PM', '2:00 PM',
          '3:00 PM', '4:00 PM', '5:00 PM',
          '6:00 PM', '7:00 PM', '8:00 PM',
          '9:00 PM', '10:00 PM'
        ].map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      {/* Flecha nativa de select (oculta por defecto en algunos navegadores) */}
      <div className="pointer-events-none absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400">
        ▼
      </div>
    </div>
  );
}