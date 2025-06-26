'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Dialog } from '@headlessui/react';

export default function MobileCompactSearchBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Compact Button */}
<div className="mt-2.5">
  <button
    onClick={() => setIsOpen(true)}
    className="w-full px-4 py-2 bg-white border rounded-full shadow-sm flex items-center justify-between text-sm"
  >
    <span className="text-gray-500">Search</span>
    <Search className="w-4 h-4 text-gray-500" />
  </button>
</div>
      {/* Fullscreen Popup */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-white p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Search</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-sm text-gray-500 hover:text-black"
            >
              Close
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Where</label>
              <input
                type="text"
                placeholder="Tulum, Mexico"
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="text-sm font-medium">From</label>
              <input type="datetime-local" className="w-full mt-1 p-2 border rounded-md" />
            </div>

            <div>
              <label className="text-sm font-medium">Until</label>
              <input type="datetime-local" className="w-full mt-1 p-2 border rounded-md" />
            </div>

            {/*<div>
              <label className="text-sm font-medium">Age</label>
              <select className="w-full mt-1 p-2 border rounded-md">
                <option value="25">25+</option>
                <option value="30">30+</option>
                <option value="18">18+</option>
              </select>
            </div>*/}

            <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-full text-center font-semibold">
              Search
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}