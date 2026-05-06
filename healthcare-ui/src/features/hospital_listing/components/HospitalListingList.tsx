import React from 'react';
import { HOSPITALS } from '../utils/hospitalData';
import { HospitalListingCard } from './HospitalListingCard';

export const HospitalListingList: React.FC = () => {
  return (
    <section className="bg-surface-container-low py-4">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-label font-semibold text-on-surface-variant">
            {HOSPITALS.length} results found
          </span>
          <button className="flex items-center gap-1 text-xs font-label font-semibold text-primary">
            <span className="material-symbols-outlined text-[14px]">swap_vert</span>
            Sort
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {HOSPITALS.map((hospital) => (
            <HospitalListingCard key={hospital.id} hospital={hospital} />
          ))}
        </div>
      </div>
    </section>
  );
};
