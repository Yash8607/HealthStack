import React from 'react';
import { HOSPITAL_DETAIL } from '../utils/hospitalDetailData';

const CENTER_ICONS: Record<string, string> = {
  Cardiology: 'favorite',
  Neurology: 'neurology',
  Oncology: 'science',
  Pediatrics: 'child_care',
  Orthopedics: 'accessibility_new',
};

export const HospitalDetailCenters: React.FC = () => {
  return (
    <section className="bg-surface-container-low py-5">
      <div className="max-w-lg mx-auto px-4">
        <span className="text-[10px] font-label font-bold tracking-widest uppercase text-outline block mb-3">
          Centers of Excellence
        </span>
        <div className="flex flex-wrap gap-2">
          {HOSPITAL_DETAIL.centers.map((c) => (
            <div
              key={c.name}
              className="flex items-center gap-2 bg-surface-container-lowest px-4 py-2.5 rounded-full shadow-clinical-lift"
            >
              <span className="material-symbols-outlined text-primary text-[18px]">
                {CENTER_ICONS[c.name] ?? 'medical_services'}
              </span>
              <span className="font-label font-semibold text-sm text-on-surface">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
