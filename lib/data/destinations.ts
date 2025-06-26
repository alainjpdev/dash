export type Destination = {
    name: string;
    icon: string;
  };
  
  export const destinations: Destination[] = [
    {
      name: 'Cancún',
      icon: 'https://awgdyinecxbnloehjgxu.supabase.co/storage/v1/object/public/media/logos/cancun.png',
    },
    {
      name: 'Playa del Carmen',
      icon: 'https://awgdyinecxbnloehjgxu.supabase.co/storage/v1/object/public/media/logos/playadelcarmen.png',
    },
    {
      name: 'Tulum',
      icon: 'https://awgdyinecxbnloehjgxu.supabase.co/storage/v1/object/public/media/logos/tulum.png',
    },
    {
      name: 'Puerto Aventuras',
      icon: 'https://awgdyinecxbnloehjgxu.supabase.co/storage/v1/object/public/media/logos/puerto.png',
    },
  ];