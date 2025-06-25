// lib/types.ts
export interface Vehicle {
    id: string;
    brand: string;
    model: string;
    year: number;
    price_per_day: number;
    vehicle_type: string;
    seats: number;
    fuel_type: string;
    transmission: string;
    mileage: number;
    color: string;
    location: string;
    image_url: string;
    image_urls: string[];
    is_available: boolean;
    delivery_available: boolean;
    rating: number;
    created_at: string;
  }
  
  export interface Filters {
    priceRange: [number, number];
    vehicleTypes: string[];
    brands: string[];
    delivery: boolean;
  }