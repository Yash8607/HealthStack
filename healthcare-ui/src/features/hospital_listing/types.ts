export type AvailabilityTone = 'available' | 'limited' | 'unavailable';

export interface Hospital {
  id: string;
  name: string;
  imageUrl: string;
  dailyRate: string;
  rating: number;
  experience: string;
  departments: string[];
  availability: string;
  availabilityTone: AvailabilityTone;
}

export interface FilterChip {
  id: string;
  label: string;
  group: 'care' | 'distance' | 'rating' | 'department' | 'insurance';
}
