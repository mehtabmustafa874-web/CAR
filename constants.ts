
import { Car, CarType, FuelType } from './types';

export const MOCK_CARS: Car[] = [
  {
    id: '1',
    name: 'Model S',
    brand: 'Tesla',
    type: CarType.LUXURY,
    pricePerDay: 149,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=800',
    gallery: {
      front: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800',
      back: 'https://images.unsplash.com/photo-1561580119-29931327179b?auto=format&fit=crop&q=80&w=800',
      interior: 'https://images.unsplash.com/photo-1554744512-d6c603f27c54?auto=format&fit=crop&q=80&w=800',
      exterior: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=800'
    },
    fuelType: FuelType.ELECTRIC,
    transmission: 'Automatic',
    seats: 5,
    rating: 4.9,
    reviews: 128,
    description: 'The Tesla Model S is built for speed and endurance, with ludicrous acceleration and a sleek design.',
    features: ['Autopilot', 'Glass Roof', 'Premium Audio', 'Long Range'],
    condition: 'Mint',
    specs: { engine: 'Dual Motor AWD', acceleration: '1.99s 0-60', topSpeed: '200mph' }
  },
  {
    id: '2',
    name: 'X5',
    brand: 'BMW',
    type: CarType.SUV,
    pricePerDay: 120,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800',
    gallery: {
      front: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&q=80&w=800',
      back: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800',
      interior: 'https://images.unsplash.com/photo-1617814076668-8dfc6fe157c7?auto=format&fit=crop&q=80&w=800',
      exterior: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800'
    },
    fuelType: FuelType.HYBRID,
    transmission: 'Automatic',
    seats: 7,
    rating: 4.7,
    reviews: 85,
    description: 'A powerful SUV that combines luxury with off-road capabilities and cutting-edge technology.',
    features: ['Panoramic Sunroof', 'All-Wheel Drive', 'Leather Seats', 'Adaptive Suspension'],
    condition: 'Excellent',
    specs: { engine: '3.0L Inline-6', acceleration: '5.3s 0-60', topSpeed: '155mph' }
  },
  {
    id: '3',
    name: 'Civic',
    brand: 'Honda',
    type: CarType.SEDAN,
    pricePerDay: 45,
    image: 'https://images.unsplash.com/photo-1594070319944-7c0c63146b7a?auto=format&fit=crop&q=80&w=800',
    gallery: {
      front: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=800',
      back: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=800',
      interior: 'https://images.unsplash.com/photo-1534093607318-f025413f49cb?auto=format&fit=crop&q=80&w=800',
      exterior: 'https://images.unsplash.com/photo-1594070319944-7c0c63146b7a?auto=format&fit=crop&q=80&w=800'
    },
    fuelType: FuelType.GASOLINE,
    transmission: 'Automatic',
    seats: 5,
    rating: 4.5,
    reviews: 210,
    description: 'Reliable, fuel-efficient, and surprisingly spacious. The Honda Civic is the perfect daily driver.',
    features: ['Backup Camera', 'Apple CarPlay', 'Lane Assist', 'Eco Mode'],
    condition: 'Excellent',
    specs: { engine: '2.0L 4-Cyl', acceleration: '8.2s 0-60', topSpeed: '125mph' }
  },
  {
    id: '4',
    name: '911 Carrera',
    brand: 'Porsche',
    type: CarType.CONVERTIBLE,
    pricePerDay: 299,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
    gallery: {
      front: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800',
      back: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800',
      interior: 'https://images.unsplash.com/photo-1611016186353-9af58c69a533?auto=format&fit=crop&q=80&w=800',
      exterior: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800'
    },
    fuelType: FuelType.GASOLINE,
    transmission: 'Automatic',
    seats: 2,
    rating: 5.0,
    reviews: 42,
    description: 'Experience the ultimate thrill of driving with the timeless Porsche 911 Carrera.',
    features: ['Sport Exhaust', 'Bose Sound', 'Heated Seats', 'Launch Control'],
    condition: 'Mint',
    specs: { engine: '3.0L Twin-Turbo Flat-6', acceleration: '4.0s 0-60', topSpeed: '182mph' }
  },
  {
    id: '5',
    name: 'RAV4',
    brand: 'Toyota',
    type: CarType.SUV,
    pricePerDay: 65,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=800',
    gallery: {
      front: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=800',
      back: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&q=80&w=800',
      interior: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=800',
      exterior: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=800'
    },
    fuelType: FuelType.HYBRID,
    transmission: 'Automatic',
    seats: 5,
    rating: 4.6,
    reviews: 156,
    description: 'Versatile and ready for adventure. The RAV4 is perfect for families and road trips.',
    features: ['Safety Sense', 'Touchscreen', 'Dual Zone AC', 'Roof Rails'],
    condition: 'Excellent',
    specs: { engine: '2.5L 4-Cyl Hybrid', acceleration: '7.1s 0-60', topSpeed: '115mph' }
  },
  {
    id: '6',
    name: 'A-Class',
    brand: 'Mercedes',
    type: CarType.COMPACT,
    pricePerDay: 89,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
    gallery: {
      front: 'https://images.unsplash.com/photo-1598911543663-37d77962e143?auto=format&fit=crop&q=80&w=800',
      back: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800',
      interior: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800',
      exterior: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800'
    },
    fuelType: FuelType.GASOLINE,
    transmission: 'Automatic',
    seats: 5,
    rating: 4.8,
    reviews: 74,
    description: 'Compact luxury at its finest. The A-Class offers a premium interior and a smooth ride.',
    features: ['MBUX system', 'Ambient Lighting', 'Wireless Charging', 'Active Brake Assist'],
    condition: 'Mint',
    specs: { engine: '2.0L Turbo 4-Cyl', acceleration: '6.2s 0-60', topSpeed: '130mph' }
  },
  {
    id: '7',
    name: 'F-150',
    brand: 'Ford',
    type: CarType.TRUCK,
    pricePerDay: 95,
    image: 'https://images.unsplash.com/photo-1605891676495-a75e6b41bd13?auto=format&fit=crop&q=80&w=800',
    gallery: {
      front: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800',
      back: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
      interior: 'https://images.unsplash.com/photo-1605891676495-a75e6b41bd13?auto=format&fit=crop&q=80&w=800',
      exterior: 'https://images.unsplash.com/photo-1605891676495-a75e6b41bd13?auto=format&fit=crop&q=80&w=800'
    },
    fuelType: FuelType.GASOLINE,
    transmission: 'Automatic',
    seats: 5,
    rating: 4.4,
    reviews: 98,
    description: 'The best-selling truck in America. Rugged, powerful, and ready for any job.',
    features: ['Tow Package', 'Off-road Tires', 'Bed Liner', 'Sync 4'],
    condition: 'Good',
    specs: { engine: '3.5L EcoBoost V6', acceleration: '5.9s 0-60', topSpeed: '110mph' }
  },
  {
    id: '8',
    name: 'Ioniq 5',
    brand: 'Hyundai',
    type: CarType.SUV,
    pricePerDay: 110,
    image: 'https://images.unsplash.com/photo-1661102831642-956559b956ca?auto=format&fit=crop&q=80&w=800',
    gallery: {
      front: 'https://images.unsplash.com/photo-1661102831642-956559b956ca?auto=format&fit=crop&q=80&w=800',
      back: 'https://images.unsplash.com/photo-1661102831667-0c7f1a30c5e7?auto=format&fit=crop&q=80&w=800',
      interior: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=800',
      exterior: 'https://images.unsplash.com/photo-1661102831642-956559b956ca?auto=format&fit=crop&q=80&w=800'
    },
    fuelType: FuelType.ELECTRIC,
    transmission: 'Automatic',
    seats: 5,
    rating: 4.9,
    reviews: 63,
    description: 'A retro-futuristic EV that charges fast and drives incredibly well.',
    features: ['Ultra-fast charging', 'V2L support', 'Head-up Display', 'Relaxation Seats'],
    condition: 'Mint',
    specs: { engine: 'Dual Motor AWD', acceleration: '5.1s 0-60', topSpeed: '115mph' }
  }
];

export const BRANDS = Array.from(new Set(MOCK_CARS.map(c => c.brand)));
