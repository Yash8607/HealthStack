import Link from 'next/link';
import React from 'react';

export const HospitalDetailFooter: React.FC = () => {
  return (
    <footer className="bg-inverse-surface text-inverse-on-surface pt-8 pb-24 px-4">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined fill text-inverse-primary text-2xl">health_and_safety</span>
          <span className="font-headline font-bold text-xl text-inverse-primary">HealthCare+</span>
        </div>
        <p className="font-body text-sm text-inverse-on-surface/70 leading-relaxed mb-4">
          The Clinical Sanctuary. Dedicated to world-class clinical excellence and compassionate care.
        </p>

        <div className="flex gap-3 mb-5">
          <a
            href="https://linkedin.com/in/yash8607/"
            rel="noopener noreferrer"
            target="_blank"
            className="w-9 h-9 rounded-full bg-inverse-on-surface/10 flex items-center justify-center hover:bg-inverse-on-surface/20 transition"
          >
            <span className="material-symbols-outlined text-inverse-on-surface text-[18px]">group</span>
          </a>
          <a
            href="https://instagram.com"
            rel="noopener noreferrer"
            target="_blank"
            className="w-9 h-9 rounded-full bg-inverse-on-surface/10 flex items-center justify-center hover:bg-inverse-on-surface/20 transition"
          >
            <span className="material-symbols-outlined text-inverse-on-surface text-[18px]">photo_camera</span>
          </a>
        </div>

        <div className="flex gap-4 mb-4">
          <Link href="#" className="font-body text-sm text-inverse-on-surface/70 hover:text-inverse-on-surface transition">
            Privacy Policy
          </Link>
          <Link href="#" className="font-body text-sm text-inverse-on-surface/70 hover:text-inverse-on-surface transition">
            Terms of Service
          </Link>
        </div>

        <div className="border-t border-inverse-on-surface/10 pt-4">
          <p className="font-body text-xs text-inverse-on-surface/40">
            © 2024 HealthCare+. The Clinical Sanctuary.
          </p>
        </div>
      </div>
    </footer>
  );
};
