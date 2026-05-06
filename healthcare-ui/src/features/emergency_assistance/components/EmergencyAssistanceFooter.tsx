import React from 'react';

export const EmergencyAssistanceFooter: React.FC = () => {
  return (
    <section className="w-full flex flex-col md:flex-row justify-between items-start gap-6 px-5 py-10 bg-surface-container-low mt-8 mb-20 rounded-3xl">
      <div>
        <div className="font-headline text-base font-bold text-on-surface mb-1">HealthCare+</div>
        <p className="text-on-surface-variant text-xs max-w-xs leading-relaxed">
          © 2024 HealthCare+. The Clinical Sanctuary. Providing immediate access to life-saving
          medical data.
        </p>
      </div>
      <div className="flex flex-wrap gap-6">
        <div className="flex flex-col gap-1.5">
          <span className="font-bold text-on-surface uppercase text-[10px] tracking-widest">
            Network
          </span>
          <a
            className="text-xs text-on-surface-variant hover:text-primary transition-colors"
            href="#"
          >
            LinkedIn
          </a>
          <a
            className="text-xs text-on-surface-variant hover:text-primary transition-colors"
            href="#"
          >
            GitHub
          </a>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="font-bold text-on-surface uppercase text-[10px] tracking-widest">
            Legal
          </span>
          <a
            className="text-xs text-on-surface-variant hover:text-primary transition-colors"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="text-xs text-on-surface-variant hover:text-primary transition-colors"
            href="#"
          >
            Terms
          </a>
        </div>
      </div>
    </section>
  );
};
