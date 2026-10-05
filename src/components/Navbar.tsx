import React from 'react';
import { ShoppingBag, Heart, Search, PackageCheck, Sparkles } from 'lucide-react';
import { SportCategory } from '../types';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  activeCategory: SportCategory;
  onSelectCategory: (cat: SportCategory) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAdvisor: () => void;
  onOpenOrderLookup: () => void;
  currency: 'USD' | 'EUR';
  onToggleCurrency: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  activeCategory,
  onSelectCategory,
  onOpenCart,
  onOpenWishlist,
  onOpenAdvisor,
  onOpenOrderLookup,
  currency,
  onToggleCurrency,
}) => {
  const navLinks: { id: SportCategory; label: string }[] = [
    { id: 'all', label: 'All Gear' },
    { id: 'basketball', label: 'Basketball' },
    { id: 'running', label: 'Running' },
    { id: 'tennis', label: 'Tennis' },
    { id: 'training', label: 'Strength' },
    { id: 'accessories', label: 'Accessories' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single element brand wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onSelectCategory('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xl sm:text-2xl font-extrabold tracking-wider text-white font-display uppercase hover:text-amber-400 transition-colors shrink-0"
        >
          Vertex<span className="text-amber-400">.</span>Athletics
        </a>

        {/* Zone 2: Clean 4-6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium tracking-wide">
          {navLinks.map((link) => {
            const isActive = activeCategory === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onSelectCategory(link.id)}
                className={`transition-colors relative py-1 text-sm ${
                  isActive
                    ? 'text-amber-400 font-semibold'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 Primary functional action groups */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Currency Toggle */}
          <button
            onClick={onToggleCurrency}
            className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-mono text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700 rounded transition-colors"
            title="Switch currency"
          >
            {currency}
          </button>

          {/* Gear Advisor Finder Button */}
          <button
            onClick={onOpenAdvisor}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-200 bg-neutral-900 border border-neutral-700/80 hover:border-amber-400/60 hover:text-amber-300 rounded-md transition-all whitespace-nowrap"
            title="Find recommended sports gear"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Gear Match</span>
          </button>

          {/* Order Tracking Lookup */}
          <button
            onClick={onOpenOrderLookup}
            className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-900 rounded-lg transition-colors"
            title="Track Your Order"
            aria-label="Track Order"
          >
            <PackageCheck className="w-5 h-5" />
          </button>

          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-neutral-300 hover:text-white hover:bg-neutral-900 rounded-lg transition-colors"
            title="Saved Items"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-amber-400 text-neutral-950 font-bold text-[10px] flex items-center justify-center rounded-full">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 rounded-lg font-semibold text-xs sm:text-sm transition-transform active:scale-95 whitespace-nowrap shadow-md shadow-amber-400/10"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag</span>
            <span className="px-1.5 py-0.2 bg-neutral-950 text-amber-400 text-xs rounded font-mono font-bold">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
