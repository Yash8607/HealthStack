import React from 'react';
import { HOSPITAL_DETAIL } from '../utils/hospitalDetailData';

export const HospitalDetailOverview: React.FC = () => {
  return (
    <section className="max-w-lg mx-auto px-4 pt-5 pb-4">
      <h1 className="font-headline font-extrabold text-2xl text-on-surface leading-tight mb-2">
        {HOSPITAL_DETAIL.name}
      </h1>
      <div className="flex items-center gap-2 mb-3">
        <span
          className="material-symbols-outlined text-yellow-500 text-[18px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star
        </span>
        <span className="font-label font-bold text-sm text-on-surface">{HOSPITAL_DETAIL.rating}</span>
        <span className="text-xs text-on-surface-variant">({HOSPITAL_DETAIL.reviewCount})</span>
      </div>
      <p className="text-on-surface-variant text-sm leading-relaxed">{HOSPITAL_DETAIL.tagline}</p>
    </section>
  );
};
