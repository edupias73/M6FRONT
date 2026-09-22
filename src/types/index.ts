export type VehicleStatus = 'available' | 'sold' | 'reserved';

export type Transmission = 'Automático' | 'Manual' | 'CVT';

export type Fuel = 'Nafta' | 'Diésel' | 'Híbrido' | 'Eléctrico' | 'Flex';

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  version: string;
  year: number;
  km: number;
  price: number;
  transmission: Transmission;
  fuel: Fuel;
  color: string;
  description: string;
  images: string[];
  features: string[];
  status: VehicleStatus;
  featured: boolean;
  isNew: boolean;
  createdAt: string;
}

export interface GarageConfig {
  name: string;
  shortName: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  instagramUrl: string;
  address: {
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
    zip: string;
  };
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  mapEmbedUrl: string;
  mapsUrl: string;
  colors: {
    primary: string;
    accent: string;
  };
}

export interface TrustItem {
  icon: string;
  title: string;
  description: string;
}

export type SortOption = 'recent' | 'price-asc' | 'price-desc' | 'km-asc' | 'year-desc';

export interface VehicleFilters {
  search: string;
  brand: string;
  model: string;
  priceMin: string;
  priceMax: string;
  yearMin: string;
  yearMax: string;
  transmission: string;
  fuel: string;
  sort: SortOption;
}
