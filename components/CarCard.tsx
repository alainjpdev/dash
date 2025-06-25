'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  rating: number;
  location: string;
  price_per_day: number;
  image_urls: string[] | string;
}

const CarCard = ({ car }: { car: Vehicle }) => {
  const images = typeof car.image_urls === 'string' ? JSON.parse(car.image_urls) : car.image_urls;

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col sm:flex-row relative hover:shadow-md transition">
      {/* Image section */}
      <div className="relative w-full sm:w-[300px] aspect-video sm:aspect-auto sm:h-[200px]">
        {images?.[0] ? (
          <Image
            src={images[0]}
            alt={`${car.brand} ${car.model}`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            No image
          </div>
        )}

        {/* Heart icon */}
        <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-sm hover:bg-gray-100">
          <Heart className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Info section */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-base font-semibold leading-tight">
            {car.brand} {car.model} {car.year}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            ⭐ {car.rating.toFixed(1)} · 📍 {car.location}
          </p>
          <p className="text-sm text-gray-500 mt-1">Jul 9 – 12</p> {/* Puedes hacer esto dinámico */}
        </div>

        <div className="mt-4 text-right">
          <p className="text-lg font-semibold">
            ${car.price_per_day * 3}{' '}
            <span className="text-sm font-normal text-gray-600">total</span>
          </p>
          <p className="text-xs text-gray-400">Before taxes</p>
        </div>
      </div>
    </div>
  );
};

export default CarCard;