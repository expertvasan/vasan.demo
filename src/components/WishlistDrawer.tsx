import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onMoveToCart: (product: Product) => void;
  currencySymbol: string;
  currencyRate: number;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onMoveToCart,
  currencySymbol,
  currencyRate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-neutral-900 border-l border-neutral-800 h-full flex flex-col shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/70">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-amber-400 fill-amber-400" />
            <h2 className="text-base font-bold text-white uppercase tracking-wider font-display">
              Saved Gear Locker
            </h2>
            <span className="text-xs text-neutral-400 font-mono">
              ({wishlist.length})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-400">
              <div className="w-14 h-14 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-500 mb-3">
                <Heart className="w-6 h-6" />
              </div>
              <p className="text-white font-semibold text-sm">Your gear locker is empty</p>
              <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                Tap the heart on any tournament ball, carbon shoes, or gym equipment to save it here for later.
              </p>
            </div>
          ) : (
            wishlist.map((product) => {
              const displayPrice = (product.price * currencyRate).toFixed(2);
              return (
                <div
                  key={product.id}
                  className="flex gap-3.5 p-3 bg-neutral-950/80 rounded-xl border border-neutral-800/80 items-center"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-cover bg-neutral-900 shrink-0 border border-neutral-800"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-mono uppercase text-amber-400/80 truncate">
                      {product.brand}
                    </p>
                    <h4 className="text-xs font-semibold text-white truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs font-bold text-white font-mono mt-0.5">
                      {currencySymbol}{displayPrice}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onMoveToCart(product)}
                        className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold rounded flex items-center gap-1 transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3" /> Move to Bag
                      </button>

                      <button
                        onClick={() => onRemoveFromWishlist(product.id)}
                        className="p-1 text-neutral-500 hover:text-rose-400 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
