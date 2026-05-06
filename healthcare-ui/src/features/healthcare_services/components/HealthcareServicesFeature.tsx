import React from 'react';

export const HealthcareServicesFeature: React.FC = () => {
  return (
    <section className="py-8 bg-surface">
      <div className="max-w-lg mx-auto px-4">
        <div className="bg-primary rounded-2xl p-6 shadow-clinical-lift overflow-hidden relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-on-primary/5 rounded-full -translate-y-12 translate-x-12 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-on-primary/5 rounded-full translate-y-8 -translate-x-8 pointer-events-none" />

          <div className="relative z-10">
            <span className="text-[10px] font-label font-bold tracking-widest uppercase text-on-primary/60 block mb-2">
              Our Commitment
            </span>
            <h2 className="font-headline font-extrabold text-2xl text-on-primary leading-tight mb-3">
              Precision Diagnostics,{' '}
              <span className="text-primary-container">Human Touch.</span>
            </h2>
            <p className="text-on-primary/80 text-sm leading-relaxed mb-5">
              We blend cutting-edge medical technology with empathetic, patient-centered care to deliver diagnostics that are both highly accurate and deeply humane.
            </p>
            <button className="flex items-center gap-2 bg-on-primary text-primary font-label font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition text-sm">
              Schedule a Facility Tour
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        <div className="mt-4 rounded-2xl overflow-hidden shadow-clinical-lift">
          <img
            src="https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80"
            alt="Medical lab environment"
            className="w-full h-48 object-cover"
          />
        </div>
      </div>
    </section>
  );
};
