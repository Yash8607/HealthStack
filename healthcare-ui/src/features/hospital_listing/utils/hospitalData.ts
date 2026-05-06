import type { FilterChip, Hospital } from '../types';

export const HOSPITALS: Hospital[] = [
  {
    id: 'fortis',
    name: 'Fortis',
    imageUrl:
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&auto=format&fit=crop&q=80',
    dailyRate: '₹2,500/day',
    rating: 4.8,
    experience: '12+ Years Avg.',
    departments: ['Cardiology', 'Neurology', 'IVF'],
    availability: 'Available Tomorrow',
    availabilityTone: 'available',
  },
  {
    id: 'medanta',
    name: 'Medanta',
    imageUrl:
      'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&auto=format&fit=crop&q=80',
    dailyRate: '₹3,200/day',
    rating: 4.9,
    experience: '15+ Years Avg.',
    departments: ['Organ Transplant', 'Oncology', 'Urology'],
    availability: 'Available Tomorrow',
    availabilityTone: 'available',
  },
  {
    id: 'apollo',
    name: 'Apollo',
    imageUrl:
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80',
    dailyRate: '₹2,800/day',
    rating: 4.7,
    experience: '10+ Years Avg.',
    departments: ['Orthopedic', 'Radiology', 'Gastro'],
    availability: 'Available Tomorrow',
    availabilityTone: 'available',
  },
];

export const FILTER_CHIPS: FilterChip[] = [
  { id: 'specialized', label: 'Specialized Care', group: 'care' },
  { id: 'within5', label: 'Within 5km', group: 'distance' },
  { id: 'within10', label: 'Within 10km', group: 'distance' },
  { id: 'within20', label: 'Within 20km', group: 'distance' },
  { id: 'rating45', label: '4.5+', group: 'rating' },
  { id: 'rating40', label: '4.0+', group: 'rating' },
  { id: 'cardiology', label: 'Cardiology', group: 'department' },
  { id: 'neurology', label: 'Neurology', group: 'department' },
  { id: 'oncology', label: 'Oncology', group: 'department' },
  { id: 'pediatrics', label: 'Pediatrics', group: 'department' },
  { id: 'insurance', label: 'Insurance Only', group: 'insurance' },
];

export const RECENT_SEARCHES = ['Fortis', 'Cardiac', 'Medanta', 'Oncology'];
export const POPULAR_SEARCHES = ['Apollo', 'Neurology', 'Pediatrics', 'Max Healthcare'];
