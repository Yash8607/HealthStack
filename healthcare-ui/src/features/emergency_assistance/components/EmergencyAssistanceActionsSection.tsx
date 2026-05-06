import React, { useState } from 'react';
import Link from 'next/link';

interface RapidAction {
  label: string;
  icon: string;
  colorClass: string;
  textClass: string;
  description: string;
  href?: string;
}

const RAPID_ACTIONS: RapidAction[] = [
  {
    label: 'Find Nearby Hospitals',
    icon: 'local_hospital',
    colorClass: 'bg-primary',
    textClass: 'text-on-primary',
    description: 'Locate emergency-ready hospitals near you',
    href: '/emergency',
  },
  {
    label: 'Call Ambulance',
    icon: 'ambulance',
    colorClass: 'bg-tertiary',
    textClass: 'text-on-tertiary',
    description: 'Dispatch ambulance to your location immediately',
  },
  {
    label: 'Share Live Location',
    icon: 'share_location',
    colorClass: 'bg-secondary',
    textClass: 'text-on-secondary',
    description: 'Send your real-time GPS coordinates to responders',
  },
  {
    label: 'First Aid Tips',
    icon: 'health_and_safety',
    colorClass: 'bg-secondary-container',
    textClass: 'text-on-secondary-container',
    description: 'Step-by-step first aid guidance for common emergencies',
  },
];

export const EmergencyAssistanceActionsSection: React.FC = () => {
  const [gpsActive, setGpsActive] = useState(false);

  return (
    <div className="bg-surface-container-lowest rounded-2xl shadow-clinical-lift p-5">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-full bg-tertiary flex items-center justify-center shrink-0">
          <span className="font-headline font-black text-on-tertiary text-sm">3</span>
        </div>
        <div>
          <h2 className="font-headline font-bold text-on-surface text-base">
            Rapid Response Actions
          </h2>
          <p className="text-on-surface-variant text-xs">Take immediate action</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {RAPID_ACTIONS.map((action) => {
          const isShare = action.label === 'Share Live Location';
          const content = (
            <div
              className={`${action.colorClass} rounded-xl p-4 flex items-center gap-4 hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer`}
              onClick={
                isShare
                  ? () => setGpsActive(true)
                  : undefined
              }
            >
              <div className="w-11 h-11 rounded-full bg-black/10 flex items-center justify-center shrink-0">
                <span className={`material-symbols-outlined ${action.textClass} text-2xl`}>
                  {action.icon}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-headline font-bold text-sm ${action.textClass}`}>
                  {action.label}
                </p>
                <p className={`text-xs leading-snug ${action.textClass} opacity-80`}>
                  {action.description}
                </p>
              </div>
              <span className={`material-symbols-outlined ${action.textClass} text-xl shrink-0`}>
                arrow_forward_ios
              </span>
            </div>
          );

          if (action.href) {
            return (
              <Link key={action.label} href={action.href}>
                {content}
              </Link>
            );
          }

          return <div key={action.label}>{content}</div>;
        })}
      </div>

      <div
        className={`mt-4 flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
          gpsActive
            ? 'bg-secondary/10 border border-secondary'
            : 'bg-surface-container-low border border-outline-variant'
        }`}
      >
        <span
          className={`material-symbols-outlined text-lg ${
            gpsActive ? 'text-secondary' : 'text-on-surface-variant'
          }`}
        >
          {gpsActive ? 'gps_fixed' : 'gps_not_fixed'}
        </span>
        <div className="flex-1">
          <p
            className={`text-xs font-bold ${
              gpsActive ? 'text-secondary' : 'text-on-surface-variant'
            }`}
          >
            {gpsActive ? 'GPS Location Tracking Active' : 'GPS Location Tracking Inactive'}
          </p>
          <p className="text-[10px] text-on-surface-variant">
            {gpsActive
              ? 'Your location is being shared with emergency services'
              : 'Enable location sharing for faster response'}
          </p>
        </div>
        {gpsActive && (
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shrink-0" />
        )}
      </div>
    </div>
  );
};
