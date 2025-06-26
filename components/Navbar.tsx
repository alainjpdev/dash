'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import HeaderUser from './HeaderUser';
import CompactSearchBar from './CompactSearchBar';

export default function Navbar() {
  return (
    <header className="w-full fixed top-0 z-50 bg-white/90 backdrop-blur-md border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center min-w-[120px]">
          <Image
            src="https://awgdyinecxbnloehjgxu.supabase.co/storage/v1/object/public/media/logos/ESCAINET.svg"
            alt="Escainet Logo"
            width={120}
            height={32}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>

        {/* Search bar (centrado, visible solo en pantallas sm+) */}
        <div className="flex-1 max-w-4xl hidden sm:block">
         <CompactSearchBar />
        </div>

        {/* Actions: usuario o login */}
        <div className="flex items-center gap-3 min-w-[200px] justify-end">
          <HeaderUser />
          <button className="p-2 rounded-full hover:bg-gray-200">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}