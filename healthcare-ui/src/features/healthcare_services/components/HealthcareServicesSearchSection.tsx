import React from 'react';
import type { LiveResult } from '../types';

const recentSearches = ['General Hospital', 'Dr. Sarah Johnson'];
const popularSearches = ['Blood Test', 'Emergency Room', 'Cardiology', 'Pediatrics'];

const liveResults: LiveResult[] = [
  { icon: 'local_hospital', name: 'City Emergency Hospital', meta: '24/7 · 0.8 miles' },
  { icon: 'person', name: 'Dr. Emily Smith', meta: 'Lab Analysis · 2 PM available' },
  { icon: 'biotech', name: 'Comprehensive Lab Panel', meta: '12 tests · 24h results' },
];

export const HealthcareServicesSearchSection: React.FC = () => {
  return (
    <section className="max-w-lg mx-auto px-4 py-4 bg-surface-container-lowest border-b border-outline-variant/30">
      <div className="mb-5">
        <p className="text-[10px] font-label font-bold tracking-widest uppercase text-outline mb-2">
          Recent Searches
        </p>
        <div className="flex flex-col gap-2">
          {recentSearches.map((s) => (
            <button key={s} className="flex items-center gap-2 text-on-surface-variant text-sm hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[16px] text-outline">history</span>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <p className="text-[10px] font-label font-bold tracking-widest uppercase text-outline mb-2">
          Popular Searches
        </p>
        <div className="flex flex-wrap gap-2">
          {popularSearches.map((s) => (
            <button
              key={s}
              className="px-3 py-1.5 bg-surface-container rounded-full text-xs font-label font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[10px] font-label font-bold tracking-widest uppercase text-outline mb-2">
          Live Results
        </p>
        <div className="flex flex-col gap-2">
          {liveResults.map((r) => (
            <button
              key={r.name}
              className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl hover:bg-surface-container transition-colors text-left"
            >
              <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-[18px]">{r.icon}</span>
              </div>
              <div>
                <p className="text-sm font-label font-medium text-on-surface">{r.name}</p>
                <p className="text-xs text-on-surface-variant">{r.meta}</p>
              </div>
              <span className="material-symbols-outlined text-outline text-[16px] ml-auto">arrow_forward</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
