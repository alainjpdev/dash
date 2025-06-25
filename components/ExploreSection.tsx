'use client';

import Image from 'next/image';
import Link from 'next/link';

const carImages: string[] = [
  'https://awgdyinecxbnloehjgxu.supabase.co/storage/v1/object/public/media/images/cars/1.jpeg',
  'https://awgdyinecxbnloehjgxu.supabase.co/storage/v1/object/public/media/images/cars/2.jpeg',
  'https://awgdyinecxbnloehjgxu.supabase.co/storage/v1/object/public/media/images/cars/3.jpeg',
  'https://awgdyinecxbnloehjgxu.supabase.co/storage/v1/object/public/media/images/cars/6.jpeg',
  'https://awgdyinecxbnloehjgxu.supabase.co/storage/v1/object/public/media/images/cars/7.jpeg',
  'https://awgdyinecxbnloehjgxu.supabase.co/storage/v1/object/public/media/images/cars/8.jpeg',
  'https://awgdyinecxbnloehjgxu.supabase.co/storage/v1/object/public/media/images/cars/9.jpeg',
  "https://awgdyinecxbnloehjgxu.supabase.co/storage/v1/object/public/media/images/helicopter/helicopter1.jpeg",
  "https://awgdyinecxbnloehjgxu.supabase.co/storage/v1/object/public/media/images/helicopter/helicopter2.jpeg",
  "https://awgdyinecxbnloehjgxu.supabase.co/storage/v1/object/public/media/images/yatch/yatch2.jpeg",
  "https://awgdyinecxbnloehjgxu.supabase.co/storage/v1/object/public/media/images/yatch/yatch1.jpeg",
  "https://awgdyinecxbnloehjgxu.supabase.co/storage/v1/object/public/media/images/yatch/catamaran1.jpeg", 
  
];

export default function ExploreSection(): JSX.Element {
  return (
    <section className="w-full bg-[#f5f5f5] py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Grid de imágenes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 flex-shrink-0">
          {carImages.map((src: string, index: number) => (
            <Link
              key={index}
              href="/searchwithresults"
              className="rounded-lg overflow-hidden shadow-sm hover:scale-105 transition-transform"
            >
              <div className="w-[160px] h-[120px] relative">
                <Image
                  src={src}
                  alt={`Car ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Texto + botón */}
        <div className="max-w-md text-center lg:text-left">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Rent for any occasion
          </h2>
          <p className="text-gray-600 mb-6">
            Browse an incredible selection of vehicles, from the everyday to the extraordinary.
          </p>
          <Link
            href="/searchwithresults"
            className="inline-block bg-indigo-600 text-white text-sm font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition"
          >
            Explore cars
          </Link>
        </div>
      </div>
    </section>
  );
}