import React from 'react';

const metrics = [
  { icon: 'verified', value: '500+', label: 'Verified Doctors' },
  { icon: 'support_agent', value: '24/7', label: 'Concierge Support' },
];

export const HospitalListingTrustSection: React.FC = () => {
  return (
    <section className="py-8 bg-surface">
      <div className="max-w-lg mx-auto px-4">
        <div className="bg-primary rounded-2xl p-6 shadow-clinical-lift overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-on-primary/5 rounded-full -translate-y-10 translate-x-10 pointer-events-none" />
          <div className="relative z-10">
            <span className="text-[10px] font-label font-bold tracking-widest uppercase text-on-primary/60 block mb-2">
              Our Standard
            </span>
            <h2 className="font-headline font-extrabold text-2xl text-on-primary leading-tight mb-2">
              The HealthCare+ Standard
            </h2>
            <p className="text-on-primary/80 text-sm leading-relaxed mb-6">
              Every recommendation is backed by clinical data.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {metrics.map((m) => (
                <div key={m.label} className="bg-on-primary/10 rounded-xl p-3 flex flex-col gap-1">
                  <span className="material-symbols-outlined text-primary-container text-[22px]">{m.icon}</span>
                  <span className="font-headline font-extrabold text-xl text-on-primary">{m.value}</span>
                  <span className="text-xs font-label text-on-primary/70">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
