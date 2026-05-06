import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export const HospitalDetailHeader: React.FC = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');

  return (
    <header className="sticky top-0 z-50 bg-surface-container-lowest/80 backdrop-blur-[24px]">
      <div className="max-w-lg mx-auto px-4 pt-4 pb-3">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center shrink-0 hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-on-surface text-[20px]">arrow_back</span>
          </button>

          <Link href="/" className="flex items-center gap-1.5 flex-1">
            <span className="material-symbols-outlined fill text-primary text-xl">health_and_safety</span>
            <span className="font-headline font-bold text-lg text-primary">HealthCare+</span>
          </Link>

          <Link
            href="/hospital_listing"
            className="shrink-0 bg-primary text-on-primary font-label font-semibold text-xs px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            Book Appointment
          </Link>
        </div>

        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search specialists, departments…"
            className="w-full bg-surface-container pl-10 pr-10 py-2.5 rounded-full text-sm font-label text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2">
            <span className="material-symbols-outlined text-outline text-[20px]">mic</span>
          </button>
        </div>
      </div>
    </header>
  );
};
