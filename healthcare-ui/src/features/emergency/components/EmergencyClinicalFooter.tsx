import React from 'react';

export const EmergencyClinicalFooter: React.FC = () => {
  return (
    <section className="w-full flex flex-col md:flex-row justify-between items-start gap-8 px-8 py-12 max-w-7xl mx-auto bg-surface-container-low mt-12 mb-20 rounded-3xl">
      <div>
        <div className="font-headline text-lg font-bold text-on-surface mb-2">
          HealthCare+
        </div>
        <p className="text-on-surface-variant text-sm max-w-xs">
          © 2024 HealthCare+. The Clinical Sanctuary. Providing immediate access to
          life-saving medical data.
        </p>
      </div>
      <div className="flex flex-wrap gap-8">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-on-surface uppercase text-xs tracking-widest">
            Network
          </span>
          <a className="text-sm text-on-surface-variant hover:text-primary transition-colors" href="#">
            LinkedIn
          </a>
          <a className="text-sm text-on-surface-variant hover:text-primary transition-colors" href="#">
            GitHub
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold text-on-surface uppercase text-xs tracking-widest">
            Legal
          </span>
          <a className="text-sm text-on-surface-variant hover:text-primary transition-colors" href="#">
            Privacy Policy
          </a>
          <a className="text-sm text-on-surface-variant hover:text-primary transition-colors" href="#">
            Terms
          </a>
        </div>
      </div>
    </section>
  );
};
