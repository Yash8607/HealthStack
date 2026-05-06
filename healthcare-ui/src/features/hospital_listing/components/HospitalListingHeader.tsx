import React, { useState } from 'react';
import Link from 'next/link';

export const HospitalListingHeader: React.FC = () => {
  const [search, setSearch] = useState('');

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
            <Link href="/healthcare_services" className="font-label text-sm text-on-surface hover:text-secondary transition-colors">
              Services
            </Link>
          </div>
        </div>

        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by hospital name"
            className="w-full bg-surface-container pl-10 pr-4 py-2.5 rounded-full text-sm font-label text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
    </header>
  );
};
