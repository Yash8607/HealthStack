import React from 'react';
import Link from 'next/link';

const navItems = [
  { icon: 'home', label: 'Home', href: '/' },
  { icon: 'ambulance', label: 'Emergency', href: '/emergency_assistance' },
  { icon: 'medical_services', label: 'Services', href: '/healthcare_services' },
  { icon: 'search', label: 'Search', href: '/hospital_listing' },
];

export const HospitalListingBottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-[24px] border-t border-outline-variant/20">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex flex-col items-center gap-0.5 px-4 py-1 text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
            <span className="text-[10px] font-label font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};
