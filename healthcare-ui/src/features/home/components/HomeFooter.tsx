import React, { useState } from 'react';
import Link from 'next/link';

const QUICK_LINKS = ['About Us', 'Find a Doctor', 'Medical Services'];
const PATIENT_LINKS = ['Patient Portal', 'Privacy Policy', 'Contact Support'];

export const HomeFooter: React.FC = () => {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-inverse-surface text-inverse-on-surface pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined fill text-inverse-primary text-2xl">health_and_safety</span>
              <span className="font-headline font-bold text-xl text-inverse-primary">HealthCare+</span>
            </div>
            <p className="font-body text-sm text-inverse-on-surface/70 leading-relaxed">
              Providing cutting-edge medical services with a focus on patient comfort and clinical excellence.
            </p>
            <div className="flex gap-3">
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
          </div>

          <div>
            <h4 className="font-label font-semibold text-xs uppercase tracking-[0.1em] text-inverse-on-surface/50 mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((label) => (
                <li key={label}>
                  <Link href="#" className="font-body text-sm text-inverse-on-surface/70 hover:text-inverse-on-surface transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-label font-semibold text-xs uppercase tracking-[0.1em] text-inverse-on-surface/50 mb-5">
              Patient
            </h4>
            <ul className="space-y-3">
              {PATIENT_LINKS.map((label) => (
                <li key={label}>
                  <Link href="#" className="font-body text-sm text-inverse-on-surface/70 hover:text-inverse-on-surface transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-label font-semibold text-xs uppercase tracking-[0.1em] text-inverse-on-surface/50 mb-5">
              Newsletter
            </h4>
            <p className="font-body text-sm text-inverse-on-surface/70 mb-4 leading-relaxed">
              Stay updated with the latest clinical breakthroughs.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-inverse-on-surface/10 text-inverse-on-surface placeholder:text-inverse-on-surface/40 px-3 py-2 rounded-lg text-sm font-label focus:outline-none focus:ring-2 focus:ring-inverse-primary/30 min-w-0"
              />
              <button className="bg-inverse-primary text-on-primary-fixed font-label font-semibold px-4 py-2 rounded-lg text-sm hover:opacity-90 transition shrink-0">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-inverse-on-surface/10 pt-6 text-center">
          <p className="font-body text-xs text-inverse-on-surface/40">
            © 2024 HealthCare+. Defined by The Clinical Sanctuary.
          </p>
        </div>
      </div>
    </footer>
  );
};
