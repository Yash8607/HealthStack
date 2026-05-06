export type IcuStatus = 'AVAILABLE' | 'FULL' | 'LIMITED';

export type EmergencyBadgeTone = 'tertiary' | 'primary' | 'secondary';

export interface EmergencyBadge {
  label: string;
  tone: EmergencyBadgeTone;
}

export interface EmergencyHospital {
  id: string;
  name: string;
  imageUrl: string;
  badge: EmergencyBadge;
  rating: number;
  etaMinutes: number;
  distanceKm: number;
  icuStatus: IcuStatus;
  bedsAvailable: number;
}

export interface EmergencyFilter {
  id: string;
  label: string;
  icon: string;
}

export interface EmergencySearchChip {
  label: string;
  icon: string;
}
