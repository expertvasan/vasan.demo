import React, { useState } from 'react';
import { Mail, ShieldCheck, Trophy, Sparkles, Check } from 'lucide-react';
import { SportCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: SportCategory) => void;
  onOpenAdvisor: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenAdvisor }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-xs">
      {/* Upper Features Strip */}
      <div className="border-b border-neutral-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <Trophy className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-white uppercase tracking-wider text-xs">
                Tournament Grade Regulation
              </p>
              <p className="text-neutral-400 text-[11px] mt-0.5">
                Every basketball, racket, shoe, and weight meets official federation specifications.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-white uppercase tracking-wider text-xs">
                30-Day Play Test Guarantee
              </p>
              <p className="text-neutral-400 text-[11px] mt-0.5">
                Take it on court, on track, or into the gym. If it doesn’t elevate your play, return it hassle-free.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-white uppercase tracking-wider text-xs">
                Field Match Advisory
              </p>
              <p className="text-neutral-400 text-[11px] mt-0.5">
                Tailored gear recommendations calibrated for your playing surface and athletic biomechanics.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="space-y-3">
          <span className="text-lg font-extrabold text-white uppercase font-display tracking-wider">
            Vertex<span className="text-amber-400">.</span>Athletics
          </span>
          <p className="text-neutral-400 text-xs leading-relaxed">
            High-performance athletic hardware, tournament balls, carbon racers, and competition conditioning gear for athletes who refuse mediocrity.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenAdvisor}
              className="text-amber-400 hover:text-amber-300 font-semibold text-xs inline-flex items-center gap-1"
            >
              <span>Launch Gear Match Finder</span> →
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-2">
          <p className="font-semibold text-white uppercase tracking-wider text-xs mb-3">
            Sport Disciplines
          </p>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => onSelectCategory('basketball')}
                className="hover:text-white transition-colors"
              >
                Championship Basketball
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('running')}
                className="hover:text-white transition-colors"
              >
                Carbon Marathon & Track
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('tennis')}
                className="hover:text-white transition-colors"
              >
                Graphite Tour Tennis
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('training')}
                className="hover:text-white transition-colors"
              >
                Competition Cast Iron
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('accessories')}
                className="hover:text-white transition-colors"
              >
                Recovery & Technical Bags
              </button>
            </li>
          </ul>
        </div>

        {/* Support & Policies */}
        <div className="space-y-2">
          <p className="font-semibold text-white uppercase tracking-wider text-xs mb-3">
            Athlete Support
          </p>
          <ul className="space-y-2 text-xs">
            <li className="hover:text-white cursor-pointer">Order Tracking & Dispatch</li>
            <li className="hover:text-white cursor-pointer">30-Day Field Test Return Policy</li>
            <li className="hover:text-white cursor-pointer">Equipment Sizing & Grip Charts</li>
            <li className="hover:text-white cursor-pointer">High School & Collegiate Team Orders</li>
            <li className="hover:text-white cursor-pointer">Warranty & Replacement Claims</li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div className="space-y-3">
          <p className="font-semibold text-white uppercase tracking-wider text-xs">
            Athletic Dispatch Newsletter
          </p>
          <p className="text-xs text-neutral-400">
            Receive early access to limited edition competition runs and tournament releases.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="athlete@team.com"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              {subscribed ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Subscribed to Field Dispatch!</span>
                </>
              ) : (
                'Join Priority Athlete List'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-neutral-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <p>© 2026 Vertex Athletics Co. All rights reserved. Official athletic equipment maker.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-300 cursor-pointer">Terms of Competition</span>
            <span className="hover:text-neutral-300 cursor-pointer">Equipment Certification</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
