import React from 'react';

const FEATURES = [
  '24/7 Digital Consultation',
  'Instant Prescription Refills',
  'Smart Patient Tracking',
];

export const HomeFeaturedSection: React.FC = () => {
  return (
    <section className="bg-surface-container py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        <div className="relative">
          <div className="rounded-2xl overflow-hidden aspect-video shadow-clinical-lift bg-surface-container-high">
            <img
              alt="Modern hospital environment"
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&auto=format&fit=crop&q=80"
            />
          </div>
          <div className="absolute bottom-4 left-4 bg-surface-container-lowest/80 backdrop-blur-[24px] rounded-xl px-4 py-2 shadow-clinical-lift">
            <span className="font-label font-semibold text-primary text-sm">Trusted Expertise</span>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="font-headline font-bold text-4xl text-on-surface leading-tight">
            World-class healthcare at your fingertips
          </h2>
          <p className="font-body text-on-surface-variant text-base leading-relaxed">
            Experience a new standard of medical care where technology meets compassion. Our network includes over 500+ specialized clinicians across the country.
          </p>
          <ul className="space-y-4">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-center gap-3 font-body text-on-surface">
                <span className="material-symbols-outlined fill text-secondary text-[22px] shrink-0">check_circle</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
