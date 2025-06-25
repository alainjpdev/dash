'use client';

import CarCard, { Vehicle } from './CarCard';

const CarCardList = ({ cars }: { cars: Vehicle[] }) => {
  return (
    <div className="flex flex-col gap-4">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CarCardList;