import React from 'react';
import Link from 'next/link';

export const HomeEmergencyBanner: React.FC = () => {
  return (
    <section className="bg-tertiary py-6 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
        <span className="material-symbols-outlined fill text-on-tertiary text-3xl">emergency_share</span>
        <span className="font-headline font-bold text-xl text-on-tertiary">Emergency SOS</span>
        <Link href="/emergency" className="ml-4">
          <button className="bg-on-tertiary text-tertiary font-label font-semibold px-5 py-2 rounded-lg text-sm hover:opacity-90 transition">
            Get help now
          </button>
        </Link>
      </div>
    </section>
  );
};
