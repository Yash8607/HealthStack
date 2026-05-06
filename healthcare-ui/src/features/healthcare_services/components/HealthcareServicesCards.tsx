import Link from 'next/link';
import React from 'react';
import type { ServiceCard } from '../types';

const services: ServiceCard[] = [
  {
    icon: 'health_and_safety',
    title: 'General Checkup',
    description: 'Comprehensive health assessments to monitor your baseline vitals',
    action: 'Learn More',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    accentColor: 'text-primary',
  },
  {
    icon: 'calendar_month',
    title: 'Appointment Booking',
    description: 'Seamless scheduling with top-tier practitioners',
    action: 'Book',
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary',
    accentColor: 'text-secondary',
  },
  {
    icon: 'child_care',
    title: 'Pre-Delivery',
    description: 'Expert maternity care and preparation',
    action: 'Learn More',
    iconBg: 'bg-tertiary/10',
    iconColor: 'text-tertiary',
    accentColor: 'text-tertiary',
  },
  {
    icon: 'person_search',
    title: 'Specialist',
    description: 'Direct access to specialists in Cardiology, Neurology',
    action: 'Explore',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    accentColor: 'text-primary',
  },
  {
    icon: 'biotech',
    title: 'Lab Test',
    description: 'State-of-the-art diagnostic testing with rapid results',
    action: 'Book',
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary',
    accentColor: 'text-secondary',
  },
  {
    icon: 'inventory_2',
    title: 'Health Package',
    description: 'Curated wellness bundles for specific age groups',
    action: 'Explore',
    iconBg: 'bg-tertiary/10',
    iconColor: 'text-tertiary',
    accentColor: 'text-tertiary',
  },
];

export const HealthcareServicesCards: React.FC = () => {
  return (
    <section className="bg-surface-container-low py-6">
      <div className="max-w-lg mx-auto px-4">
        <div className="grid grid-cols-2 gap-3">
          {services.map((s) => (
            <Link
              key={s.title}
              href="/hospital_listing"
              className="bg-surface-container-lowest rounded-2xl p-4 shadow-clinical-lift flex flex-col gap-3 hover:scale-[1.01] transition-transform"
            >
              <div className={`w-10 h-10 ${s.iconBg} rounded-xl flex items-center justify-center`}>
                <span className={`material-symbols-outlined ${s.iconColor} text-xl`}>{s.icon}</span>
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <h3 className="font-headline font-bold text-sm text-on-surface">{s.title}</h3>
                <p className="text-on-surface-variant text-xs leading-relaxed">{s.description}</p>
              </div>
              <span className={`flex items-center justify-between text-xs font-label font-semibold ${s.accentColor} mt-auto`}>
                {s.action}
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
