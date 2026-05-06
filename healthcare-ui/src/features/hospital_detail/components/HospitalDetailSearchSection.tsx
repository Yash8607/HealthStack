import React from 'react';
import { POPULAR_SPECIALTIES, RECENT_SEARCHES } from '../utils/hospitalDetailData';

export const HospitalDetailSearchSection: React.FC = () => {
  return (
    <section className="max-w-lg mx-auto px-4 py-4 bg-surface-container-lowest border-b border-outline-variant/20">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-label font-bold tracking-widest uppercase text-outline">
            Recent Searches
          </p>
          <button className="text-xs font-label font-semibold text-primary">Clear All</button>
        </div>
        <div className="flex flex-col gap-2">
          {RECENT_SEARCHES.map((s) => (
            <button
              key={s}
              className="flex items-center gap-2 text-on-surface-variant text-sm hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-[15px] text-outline">history</span>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[10px] font-label font-bold tracking-widest uppercase text-outline mb-2">
          Popular Specialties
        </p>
        <div className="flex flex-wrap gap-2">
          {POPULAR_SPECIALTIES.map((s) => (
            <button
              key={s}
              className="px-3 py-1.5 bg-surface-container rounded-full text-xs font-label font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
