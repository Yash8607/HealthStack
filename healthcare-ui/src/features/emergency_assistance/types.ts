export type EmergencyType =
  | 'road_accident'
  | 'heart_attack'
  | 'breathing_difficulty'
  | 'unconscious'
  | 'severe_bleeding'
  | 'other';

export interface LocationResult {
  id: string;
  name: string;
  address: string;
  distanceMi: number;
  type: 'hospital' | 'clinic' | 'urgent_care';
}

export interface EmergencyAssistanceForm {
  emergencyType: EmergencyType | '';
  patientName: string;
  phoneNumber: string;
  email: string;
  location: string;
  emergencyNotes: string;
}

export interface SearchChip {
  label: string;
  icon: string;
}
