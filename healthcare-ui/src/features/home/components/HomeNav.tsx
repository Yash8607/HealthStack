import React, { useState } from 'react';
import Link from 'next/link';

export const HomeNav: React.FC = () => {
  const [search, setSearch] = useState('');

  return (
    <nav className="sticky top-0 z-50 bg-surface-container-lowest/80 backdrop-blur-[24px]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2 shrink-0">
          <span className="material-symbols-outlined fill text-primary text-2xl">health_and_safety</span>
          <span className="font-headline font-bold text-xl text-primary">HealthCare+</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="font-label font-medium text-sm text-on-surface hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/emergency_assistance" className="font-label font-medium text-sm text-on-surface hover:text-tertiary transition-colors">
            Emergency
          </Link>
          <Link href="/healthcare_services" className="font-label font-medium text-sm text-on-surface hover:text-secondary transition-colors">
            Services
          </Link>
        </div>

        <div className="relative shrink-0">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Emergency"
            className="bg-surface-container pl-10 pr-4 py-2 rounded-full text-sm font-label text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 w-52"
          />
        </div>
      </div>
    </nav>
  );
};
