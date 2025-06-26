'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function PublicNavbar() {
  return (
    <header className="w-full fixed top-0 z-50 bg-white/90 backdrop-blur-md border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="https://awgdyinecxbnloehjgxu.supabase.co/storage/v1/object/public/media/logos/ESCAINET.svg"
            alt="Escainet Logo"
            width={120}
            height={32}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>

        {/* Sign In */}
        <Link
          href="/sign-in"
          className="text-sm font-medium px-4 py-2 border border-gray-800 rounded-full hover:bg-gray-100 transition"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
}
