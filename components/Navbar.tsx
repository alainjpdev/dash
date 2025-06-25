'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="w-full fixed top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="https://awgdyinecxbnloehjgxu.supabase.co/storage/v1/object/public/media/logos/ESCAINET.svg"
            alt="Escainet Logo"
            width={120}
            height={40}
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/sign-in"
            className="text-sm font-medium px-4 py-2 border border-gray-800 rounded-full hover:bg-gray-100 transition"
          >
            Sign In
          </Link>

          <button className="p-2 rounded-full hover:bg-gray-200">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}