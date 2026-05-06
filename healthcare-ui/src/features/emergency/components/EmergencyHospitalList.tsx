import React from 'react';
import type { EmergencyHospital } from '../types';
import { EmergencyHospitalCard } from './EmergencyHospitalCard';

interface EmergencyHospitalListProps {
  hospitals: EmergencyHospital[];
}

export const EmergencyHospitalList: React.FC<EmergencyHospitalListProps> = ({
  hospitals,
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 mb-12">
      {hospitals.map((hospital) => (
        <EmergencyHospitalCard key={hospital.id} hospital={hospital} />
      ))}
    </div>
  );
};
