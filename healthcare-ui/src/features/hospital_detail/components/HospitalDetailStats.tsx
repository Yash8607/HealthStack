import React from 'react';
import { HOSPITAL_DETAIL } from '../utils/hospitalDetailData';

const stats = [
  { icon: 'groups', value: `${HOSPITAL_DETAIL.specialists}+`, label: 'Specialists' },
  { icon: 'bed', value: HOSPITAL_DETAIL.bedCapacity, label: 'Bed Capacity' },
  { icon: 'history_edu', value: String(HOSPITAL_DETAIL.founded), label: 'Founded' },
];

export const HospitalDetailStats: React.FC = () => {
  return (
    <section className="bg-surface-container-low py-4">
      <div className="max-w-lg mx-auto px-4">
        <div className="grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-surface-container-lowest rounded-2xl p-4 shadow-clinical-lift flex flex-col items-center gap-1.5 text-center"
            >
              <span className="material-symbols-outlined text-primary text-[22px]">{s.icon}</span>
              <span className="font-headline font-extrabold text-lg text-on-surface leading-none">
                {s.value}
              </span>
              <span className="text-[10px] font-label font-medium text-on-surface-variant uppercase tracking-wider">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
