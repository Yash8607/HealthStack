import React from 'react';

export const EmergencyFab: React.FC = () => {
  return (
    <button
      type="button"
      aria-label="Emergency"
      className="fixed right-6 bottom-24 w-16 h-16 bg-tertiary text-on-tertiary rounded-full shadow-2xl flex items-center justify-center z-[60] active:scale-95 transition-transform"
    >
      <span
        className="material-symbols-outlined fill text-3xl"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        emergency
      </span>
    </button>
  );
};
