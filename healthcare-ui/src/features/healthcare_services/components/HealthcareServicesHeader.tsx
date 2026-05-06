import React, { useState } from 'react';
import Link from 'next/link';

export const HealthcareServicesHeader: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filters = ['Near Me', 'Top Rated', 'Available Today'];

  return (
    <header className="sticky top-0 z-50 bg-surface-container-lowest/80 backdrop-blur-[24px]">
      <div className="max-w-lg mx-auto px-4 pt-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="material-symbols-outlined fill text-primary text-2xl">health_and_safety</span>
            <span className="font-headline font-bold text-xl text-primary">HealthCare+</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="font-label text-sm text-on-surface hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/emergency_assistance" className="font-label text-sm text-on-surface hover:text-tertiary transition-colors">
              Emergency
            </Link>
            <span className="font-label text-sm font-semibold text-primary border-b-2 border-primary pb-0.5">
              Services
            </span>
          </div>
        </div>

        <div className="relative mb-3">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by location"
            className="w-full bg-surface-container pl-10 pr-4 py-2.5 rounded-full text-sm font-label text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(activeFilter === f ? null : f)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-label font-medium transition-colors ${
                activeFilter === f
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
