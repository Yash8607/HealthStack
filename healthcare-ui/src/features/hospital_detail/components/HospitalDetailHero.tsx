import React from 'react';
import { HOSPITAL_DETAIL } from '../utils/hospitalDetailData';

export const HospitalDetailHero: React.FC = () => {
  return (
    <div className="relative w-full h-56 overflow-hidden bg-surface-container">
      <img
        src={HOSPITAL_DETAIL.imageUrl}
        alt={HOSPITAL_DETAIL.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <div className="absolute bottom-4 left-4">
        <span className="bg-primary text-on-primary text-[10px] font-label font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">
          {HOSPITAL_DETAIL.badge}
        </span>
      </div>
    </div>
  );
};
