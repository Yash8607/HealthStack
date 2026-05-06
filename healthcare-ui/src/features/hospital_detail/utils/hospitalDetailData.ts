import type { HospitalDetailData } from '../types';

export const RECENT_SEARCHES = ['Cardiologists', 'St. Jude', 'ER wait time'];
export const POPULAR_SPECIALTIES = ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics'];

export const HOSPITAL_DETAIL: HospitalDetailData = {
  name: 'St. Jude Medical Sanctuary',
  tagline: 'Leading the future of clinical excellence with a patient-first approach',
  rating: 4.9,
  reviewCount: '2.4k Reviews',
  imageUrl:
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&auto=format&fit=crop&q=80',
  badge: 'Multi-Specialty',
  specialists: 450,
  bedCapacity: '1.2k',
  founded: 1988,
  clinicalPhilosophy:
    'We believe healing begins with environment. Every space, process, and interaction is designed to restore trust, dignity, and health to every patient who walks through our doors.',
  centers: [
    { name: 'Cardiology', icon: 'cardiology' },
    { name: 'Neurology', icon: 'neurology' },
  ],
  realTimeMetrics: [
    { label: 'General Beds', value: '42 Available', icon: 'bed', status: 'good' },
    { label: 'ICU Capacity', value: '3 Available', icon: 'monitor_heart', status: 'limited' },
  ],
  doctorsList: [
    {
      id: 'dr-vance',
      name: 'Dr. Julian Vance',
      title: 'Senior Cardiologist',
      rating: 4.9,
      reviewCount: '120+',
      availability: 'Available Today  14:00 – 18:00',
      imageUrl:
        'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=80',
    },
  ],
};
