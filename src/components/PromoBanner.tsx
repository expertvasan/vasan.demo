import React, { useState } from 'react';
import { X, ShieldCheck, Zap } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="bg-neutral-900 border-b border-neutral-800 text-neutral-300 text-xs py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="w-6" /> {/* spacer for center balance */}
        <div className="flex items-center gap-2 text-center truncate">
          <span className="inline-flex items-center gap-1 font-semibold text-amber-400">
            <Zap className="w-3.5 h-3.5" /> SEASON LAUNCH:
          </span>
          <span className="truncate">
            Free express delivery on athletic gear orders over $75 · Complimentary 30-day field test return policy
          </span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-neutral-400 hover:text-white p-1 rounded hover:bg-neutral-800 transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
