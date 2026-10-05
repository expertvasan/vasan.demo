import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, RotateCcw, ShoppingBag } from 'lucide-react';
import { Product, SportCategory } from '../types';
import { PRODUCTS } from '../data/products';

interface GearAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, option: string) => void;
  currencySymbol: string;
  currencyRate: number;
}

export const GearAdvisorModal: React.FC<GearAdvisorModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart,
  currencySymbol,
  currencyRate,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [sport, setSport] = useState<SportCategory>('basketball');
  const [surface, setSurface] = useState<string>('Hardwood Court');
  const [priority, setPriority] = useState<string>('Maximum Grip & Control');

  if (!isOpen) return null;

  const sportsOptions: { id: SportCategory; label: string; desc: string }[] = [
    { id: 'basketball', label: 'Basketball', desc: 'Championship balls, indoor/outdoor grip' },
    { id: 'running', label: 'Running & Track', desc: 'Road marathons, speedwork, tempo runs' },
    { id: 'tennis', label: 'Tennis & Racket', desc: 'Baselines, precision serves, spin control' },
    { id: 'training', label: 'Strength & Conditioning', desc: 'Kettlebells, metabolic conditioning, speed ropes' },
  ];

  const surfaceOptions: Record<SportCategory, string[]> = {
    all: ['Indoor Studio', 'Outdoor Asphalt', 'Tournament Arena'],
    basketball: ['Indoor Hardwood Court', 'Outdoor Blacktop / Concrete', 'Multi-Surface All Court'],
    running: ['Paved Asphalt Road', 'Rubber Track & Tempo', 'Mixed Trail & Road'],
    tennis: ['Hard Courts', 'Clay / Synthetic Grass', 'All-Court Tournament'],
    training: ['Gym Concrete & Rubber Matting', 'Home Garage Setup', 'Functional Cross-Training Box'],
    soccer: ['Natural Grass Pitch', 'AG Turf / 3G Surface'],
    accessories: ['Recovery Lounge', 'Travel Duffel & Transition Area'],
  };

  const priorityOptions = [
    { id: 'Maximum Grip & Control', label: 'Maximum Grip & Control', desc: 'Tactile feel and no-slip handling' },
    { id: 'Propulsion & Pure Speed', label: 'Propulsion & Pure Speed', desc: 'Carbon snap, quick cadence, energy return' },
    { id: 'Indestructible Durability', label: 'Indestructible Durability', desc: 'Heavy-duty construction and long lifecycle' },
    { id: 'Injury Prevention & Cushion', label: 'Injury Prevention & Cushion', desc: 'Vibration damping, joint protection' },
  ];

  // Logic to find matched product
  const getMatchedProduct = (): Product => {
    const candidates = PRODUCTS.filter((p) => p.category === sport);
    if (candidates.length > 0) {
      return candidates[0];
    }
    return PRODUCTS[0];
  };

  const matchedProduct = getMatchedProduct();

  const handleReset = () => {
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/80">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-extrabold text-white uppercase tracking-wider font-display">
              Vertex Athletic Gear Matcher
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3 text-xs">
            <span className="text-neutral-400 font-mono">
              Step {step} of 4: {step === 1 ? 'Primary Sport' : step === 2 ? 'Playing Surface' : step === 3 ? 'Performance Goal' : 'Your Match'}
            </span>
            {step > 1 && step < 4 && (
              <button
                onClick={() => setStep((step - 1) as any)}
                className="text-amber-400 hover:underline"
              >
                Back
              </button>
            )}
          </div>

          {/* Step 1: Select Sport */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                What discipline are you gearing up for?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sportsOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setSport(opt.id);
                      setSurface(surfaceOptions[opt.id]?.[0] || 'Tournament Arena');
                      setStep(2);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      sport === opt.id
                        ? 'border-amber-400 bg-amber-400/5'
                        : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
                    }`}
                  >
                    <p className="text-sm font-bold text-white">{opt.label}</p>
                    <p className="text-xs text-neutral-400 mt-1">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Surface */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                What primary surface or arena do you train on?
              </h3>
              <div className="space-y-2.5">
                {(surfaceOptions[sport] || ['Indoor', 'Outdoor']).map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSurface(s);
                      setStep(3);
                    }}
                    className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      surface === s
                        ? 'border-amber-400 bg-amber-400/5'
                        : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
                    }`}
                  >
                    <span className="text-sm font-semibold text-white">{s}</span>
                    <ArrowRight className="w-4 h-4 text-neutral-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Priority */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                What is your number one performance goal?
              </h3>
              <div className="space-y-2.5">
                {priorityOptions.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setPriority(p.id);
                      setStep(4);
                    }}
                    className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      priority === p.id
                        ? 'border-amber-400 bg-amber-400/5'
                        : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">{p.label}</p>
                      <p className="text-xs text-neutral-400 mt-0.5">{p.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Result */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="p-3 bg-amber-400/10 border border-amber-400/30 rounded-xl text-xs text-amber-300">
                Matched for: <span className="font-bold uppercase text-white">{sport}</span> on{' '}
                <span className="font-semibold text-white">{surface}</span> targeting{' '}
                <span className="font-semibold text-white">{priority}</span>.
              </div>

              {/* Matched Product Card */}
              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 flex flex-col sm:flex-row gap-4 items-center">
                <img
                  src={matchedProduct.image}
                  alt={matchedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-32 h-32 rounded-xl object-cover bg-neutral-900 border border-neutral-800 shrink-0"
                />

                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono uppercase text-amber-400">
                    <span>{matchedProduct.brand}</span>
                    <span>·</span>
                    <span>{matchedProduct.skillLevel}</span>
                  </div>

                  <h4 className="text-base font-bold text-white">
                    {matchedProduct.name}
                  </h4>

                  <p className="text-xs text-neutral-400">
                    {matchedProduct.tagline}
                  </p>

                  <div className="text-base font-bold text-white font-mono">
                    {currencySymbol}{(matchedProduct.price * currencyRate).toFixed(2)}
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <button
                      onClick={() => {
                        onSelectProduct(matchedProduct);
                        onClose();
                      }}
                      className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold transition-colors"
                    >
                      View Full Specs
                    </button>

                    <button
                      onClick={() => {
                        onAddToCart(matchedProduct, matchedProduct.options[0]);
                        onClose();
                      }}
                      className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add to Bag
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Start Matcher Over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
