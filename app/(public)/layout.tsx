'use client';

import React from 'react';
import PublicNavbar from '@/components/PublicNavbar';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicNavbar />
      <main className="pt-[64px] min-h-screen bg-white text-black">
        {children}
      </main>
    </>
  );
}