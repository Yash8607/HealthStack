import React, { useState } from 'react';
import { FILTER_CHIPS, POPULAR_SEARCHES, RECENT_SEARCHES } from '../utils/hospitalData';

export const HospitalListingFilters: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set(['specialized']));

  const toggle = (id: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <section className="max-w-lg mx-auto px-4 pb-4">
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 mb-4">
        {FILTER_CHIPS.map((chip) => (
          <button
            key={chip.id}
            onClick={() => toggle(chip.id)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-label font-medium transition-colors ${
              activeFilters.has(chip.id)
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-clinical-lift">
        <div className="mb-4">
          <p className="text-[10px] font-label font-bold tracking-widest uppercase text-outline mb-2">
            Recent Searches
          </p>
          <div className="flex flex-wrap gap-2">
            {RECENT_SEARCHES.map((s) => (
              <button
                key={s}
                className="flex items-center gap-1.5 text-on-surface-variant text-sm hover:text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined text-[14px] text-outline">history</span>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-label font-bold tracking-widest uppercase text-outline mb-2">
            Popular Searches
          </p>
          <div className="flex flex-wrap gap-2">
            {POPULAR_SEARCHES.map((s) => (
              <button
                key={s}
                className="px-3 py-1.5 bg-surface-container rounded-full text-xs font-label font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
