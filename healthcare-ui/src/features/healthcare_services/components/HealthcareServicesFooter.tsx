import React from 'react';
import Link from 'next/link';

export const HealthcareServicesFooter: React.FC = () => {
  return (
    <footer className="bg-inverse-surface text-inverse-on-surface pt-10 pb-8 px-4">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined fill text-inverse-primary text-2xl">health_and_safety</span>
          <span className="font-headline font-bold text-xl text-inverse-primary">HealthCare+</span>
        </div>
        <p className="font-body text-sm text-inverse-on-surface/70 leading-relaxed mb-5">
          Dedicated to providing world-class clinical excellence with compassionate, patient-centered care.
        </p>

        <div className="flex gap-3 mb-6">
          <a
            href="https://github.com/Yash8607"
            rel="noopener noreferrer"
            target="_blank"
            className="w-9 h-9 rounded-full bg-inverse-on-surface/10 flex items-center justify-center hover:bg-inverse-on-surface/20 transition"
          >
            <span className="material-symbols-outlined text-inverse-on-surface text-[18px]">code</span>
          </a>
          <a
            href="https://linkedin.com/in/yash8607/"
            rel="noopener noreferrer"
            target="_blank"
            className="w-9 h-9 rounded-full bg-inverse-on-surface/10 flex items-center justify-center hover:bg-inverse-on-surface/20 transition"
          >
            <span className="material-symbols-outlined text-inverse-on-surface text-[18px]">group</span>
          </a>
        </div>

        <div className="flex gap-4 mb-6">
          <Link href="#" className="font-body text-sm text-inverse-on-surface/70 hover:text-inverse-on-surface transition">
            Privacy Policy
          </Link>
          <Link href="#" className="font-body text-sm text-inverse-on-surface/70 hover:text-inverse-on-surface transition">
            Terms
          </Link>
          <Link href="#" className="font-body text-sm text-inverse-on-surface/70 hover:text-inverse-on-surface transition">
            Contact Support
          </Link>
        </div>

        <div className="border-t border-inverse-on-surface/10 pt-4">
          <p className="font-body text-xs text-inverse-on-surface/40">
            © 2024 HealthCare+. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
