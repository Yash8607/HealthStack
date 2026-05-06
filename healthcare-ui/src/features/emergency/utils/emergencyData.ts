import type {
  EmergencyFilter,
  EmergencyHospital,
  EmergencySearchChip,
} from '../types';

export const EMERGENCY_HOSPITALS: EmergencyHospital[] = [
  {
    id: 'city-emergency',
    name: 'City Emergency',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAtO1H7xcDeY8HNf8M3Rb6V_uEJkmE3A6hIu6HfECXLWVHrsyTDGBqu9Z_kgPDbj02RKOc-88L_9QhmBNst1rW6Xy1HO-WQY3y1uo5BovN79jXSasfxirf0E_AqdFXUqRVJgwbNohPhHjJsZalmYvPApM9-Sa6EO_eCwP6mUX6ek2QZc5e-gPYzvbDNSNd5AwNJsIQSFmild6Y8CvqkuUd95YsG0j6GF0jlWvPMDkNqk1OCAxr1mPHz77b0iudo_PhR1LOxMy9FZJQ',
    badge: { label: 'Emergency Hub', tone: 'tertiary' },
    rating: 4.8,
    etaMinutes: 4,
    distanceKm: 1.2,
    icuStatus: 'AVAILABLE',
    bedsAvailable: 12,
  },
  {
    id: 'apollo-trauma',
    name: 'Apollo Trauma',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAiSsHwfa3jSQ6chwbEzP1kbP3y1zZqLvyk6XXJUMV5ZshyWLJfvAp_YpMlS5l54H7296_0DhJnd0JOSG0m5m7tClryMyaPSyQTSC1HpRfXvsvWVmATxa2mis4HvYyCY_XCBH3oR5rLc4_rLEeRLmwGgIqELEwH3rCZqyF3xtMm6v3Rf5qhHPoZEhUKS7SIxN-BT5lciQtozXoFrx_fL3m_5l3MELD1lmaDZ2DcJ8fmBOTrXGhX3ewjgD5yNxQ4JzMAgRz6x2oljMA',
    badge: { label: 'Level 1 Trauma', tone: 'primary' },
    rating: 4.5,
    etaMinutes: 9,
    distanceKm: 3.4,
    icuStatus: 'FULL',
    bedsAvailable: 3,
  },
  {
    id: 'max-superspeciality',
    name: 'Max Superspeciality',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB20nfHeeebLr97_1eStMqX28TmvbMbJXUukSWJzhi9-ZvV8jracLEZ20Ch7Tz5vjte1e9d9KAuUUWRWA7BKOWVkfmH2jKjrnqnUpz6Tr2WRCy0x7GK5kdDNhMRRZ_uks92cxo89nfMXBL1bF7n2OfaHQ8m03Ysy_cjfKVNB52wuEHkV_wMcIOlvBAPYcM7gN9II1j8DtZ2Tyt6W3bFc4NW5B42kUZrouM9zIyeJLlR-YN_uhLVJ6dq6ToeDQcQVbv0Ed65ZLmLDzk',
    badge: { label: 'Cardiology Lead', tone: 'secondary' },
    rating: 4.9,
    etaMinutes: 12,
    distanceKm: 5.1,
    icuStatus: 'AVAILABLE',
    bedsAvailable: 25,
  },
];

export const EMERGENCY_FILTERS: EmergencyFilter[] = [
  { id: 'distance', label: 'Distance', icon: 'distance' },
  { id: 'icu', label: 'ICU Available', icon: 'ventilator' },
  { id: 'beds', label: 'Beds Available', icon: 'bed' },
  { id: 'rating', label: 'Rating', icon: 'star' },
];

export const EMERGENCY_RECENT_SEARCHES: EmergencySearchChip[] = [
  { label: 'ICU Available', icon: 'history' },
  { label: 'City Emergency', icon: 'history' },
];

export const EMERGENCY_POPULAR_SEARCHES: EmergencySearchChip[] = [
  { label: 'Trauma Level 1', icon: 'trending_up' },
  { label: 'Cardiology', icon: 'trending_up' },
  { label: '24/7 Pharmacy', icon: 'trending_up' },
];

export const EMERGENCY_MAP_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDm96adiWTuvn52Ux5wDVsXRgm0Ac8OyRZY9gYFm5GbOxPrJTjOhFowW-oex3Q3smQn3Fyf7BgZMZPk_OYel8yQ7awI6ihtGlqcZtDvukfkFwzqXjtBYJqkjcVDuyzlTV9jcCS-i49TzE5DhVWDBbd6tG2IofzEXCwRTj1lQBtiw545npztwKs0f5rlJRmZU32gaBnGwTyuDpHqYmWs1SmLScEYCYMi5zkH5YXKabgqrPgV8kyPDJgy7z5NXyIbCHBCwTETBCk0qu8';
