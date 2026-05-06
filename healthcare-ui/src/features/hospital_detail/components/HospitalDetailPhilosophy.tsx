import React from 'react';
import { HOSPITAL_DETAIL } from '../utils/hospitalDetailData';

export const HospitalDetailPhilosophy: React.FC = () => {
  return (
    <section className="max-w-lg mx-auto px-4 py-5">
      <span className="text-[10px] font-label font-bold tracking-widest uppercase text-primary block mb-2">
        Clinical Philosophy
      </span>
      <p className="text-on-surface-variant text-sm leading-relaxed">
        {HOSPITAL_DETAIL.clinicalPhilosophy}
      </p>
    </section>
  );
};
