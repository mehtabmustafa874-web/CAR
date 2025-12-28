
export enum CarType {
  SEDAN = 'Sedan',
  SUV = 'SUV',
  LUXURY = 'Luxury',
  COMPACT = 'Compact',
  CONVERTIBLE = 'Convertible',
  TRUCK = 'Truck'
}

export enum FuelType {
  GASOLINE = 'Gasoline',
  ELECTRIC = 'Electric',
  HYBRID = 'Hybrid',
  DIESEL = 'Diesel'
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  type: CarType;
  pricePerDay: number;
  image: string;
  gallery: {
    front: string;
    back: string;
    interior: string;
    exterior: string;
  };
  fuelType: FuelType;
  transmission: 'Automatic' | 'Manual';
  seats: number;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  condition: 'Mint' | 'Excellent' | 'Good';
  specs: {
    engine: string;
    acceleration: string;
    topSpeed: string;
  };
}

export interface SearchParams {
  location: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
}

export interface Booking {
  id: string;
  carId: string;
  carName: string;
  carImage: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  totalPrice: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  customerName: string;
  customerEmail: string;
  timestamp: number;
}

export interface FilterState {
  types: CarType[];
  fuelTypes: FuelType[];
  minPrice: number;
  maxPrice: number;
  brands: string[];
}
