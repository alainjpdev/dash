// HomePage.tsx

'use client';

import PublicNavbar from '@/components/PublicNavbar';
import ExploreSection from '@/components/ExploreSection';
import BrowseByDestination from '@/components/BrowseByDestination';
import SearchBar from '@/components/SearchBar';
import MobileSearchBar from '@/components/MobileSearchBar';

export default function HomePage() {
  return (
    <>
      <PublicNavbar />
      <main className="min-h-screen flex flex-col items-center bg-white text-black">
        {/* Hero Section */}
        <section
          className="relative w-full h-[80vh] bg-cover bg-center"
          style={{ backgroundImage: "url('/images/your-hero-image.png')" }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30" />

          {/* Search Bars */}
          <div className="relative z-10 w-full px-4 mt-8 sm:mt-12 flex justify-center">
            {/* Desktop SearchBar */}
            <div className="hidden sm:block w-full max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl">
              <SearchBar />
            </div>

            {/* Mobile SearchBar */}
            <div className="sm:hidden w-full max-w-md mx-auto">
              <MobileSearchBar />
            </div>
          </div>
        </section>

        {/* Title Section */}
        <section className="text-center py-16 px-6 max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">Skip the rental car counter</h1>
          <p className="text-lg text-gray-600">
            Rent just about any car, just about anywhere
          </p>
        </section>

        {/* Explore & Browse Sections */}
        <ExploreSection />
        <BrowseByDestination />
      </main>
    </>
  );
}