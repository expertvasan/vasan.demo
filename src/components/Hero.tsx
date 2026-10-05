import React from 'react';
import { ArrowRight, Trophy, Zap, Shield, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';

interface HeroProps {
  onExploreCollection: () => void;
  onOpenAdvisor: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCollection, onOpenAdvisor }) => {
  return (
    <section className="relative overflow-hidden bg-neutral-950 border-b border-neutral-800">
      {/* Background Graphic & Media with Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Vertex Athletics high performance sports gear"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center brightness-75 scale-[1.02] transform transition-transform duration-1000 ease-out"
        />
        {/* Scrim gradients to guarantee WCAG AA contrast on text */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-neutral-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
        <div className="max-w-2xl space-y-6">
          {/* Subtle kicker text without pill box */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
            <Trophy className="w-4 h-4" />
            <span>Official Equipment Partner · Season 2026 Collection</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase font-display leading-[1.08] text-balance">
            ENGINEERED FOR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500">
              PEAK ATHLETIC
            </span> <br />
            DOMINANCE.
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-xl">
            Tournament-grade composite basketballs, carbon-propulsion race shoes, precision graphite rackets, and solid cast-iron conditioning gear calibrated for athletes who refuse to compromise.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreCollection}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm tracking-wide uppercase rounded-lg shadow-lg shadow-amber-400/20 transition-all hover:translate-y-[-1px] active:translate-y-[0]"
            >
              <span>Explore The Gear</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenAdvisor}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-neutral-900/80 hover:bg-neutral-800 text-white font-medium text-sm rounded-lg border border-neutral-700/80 backdrop-blur-sm transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Gear Match Tool</span>
            </button>
          </div>

          {/* Claim-to-Proof Adjacency */}
          <div className="pt-8 border-t border-neutral-800/80 grid grid-cols-3 gap-4 text-left">
            <div>
              <p className="text-xl sm:text-2xl font-bold text-white font-display tabular-nums">100%</p>
              <p className="text-xs text-neutral-400 mt-0.5">Tournament Spec Calibrated</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-white font-display tabular-nums">30-Day</p>
              <p className="text-xs text-neutral-400 mt-0.5">Field Trial Play Guarantee</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-white font-display tabular-nums">24 Hr</p>
              <p className="text-xs text-neutral-400 mt-0.5">Express Warehouse Dispatch</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
