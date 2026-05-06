import React from 'react';
import Link from 'next/link';

interface EmergencyBottomNavProps {
  onOpenSearch: () => void;
}

export const EmergencyBottomNav: React.FC<EmergencyBottomNavProps> = ({
  onOpenSearch,
}) => {
  return (
    <footer className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-4 pt-2 bg-white/80 backdrop-blur-xl z-50 rounded-t-3xl shadow-[0px_-4px_20px_rgba(0,0,0,0.05)]">
      <Link
        href="/"
        className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low rounded-xl px-3 py-1 transition-all"
      >
        <span className="material-symbols-outlined">home</span>
        <span className="text-[11px] font-semibold tracking-wide uppercase font-label">
          Home
        </span>
      </Link>

      <div className="flex flex-col items-center justify-center bg-primary-fixed text-on-primary-fixed rounded-xl px-3 py-1 transition-all cursor-pointer">
        <span
          className="material-symbols-outlined fill"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          emergency
        </span>
        <span className="text-[11px] font-semibold tracking-wide uppercase font-label">
          Emergency
        </span>
      </div>

      <Link
        href="/hospitals"
        className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low rounded-xl px-3 py-1 transition-all"
      >
        <span className="material-symbols-outlined">medical_services</span>
        <span className="text-[11px] font-semibold tracking-wide uppercase font-label">
          Services
        </span>
      </Link>

      <button
        type="button"
        onClick={onOpenSearch}
        className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low rounded-xl px-3 py-1 transition-all"
      >
        <span className="material-symbols-outlined">search</span>
        <span className="text-[11px] font-semibold tracking-wide uppercase font-label">
          Search
        </span>
      </button>
    </footer>
  );
};
