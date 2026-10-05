import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, option: string, quantity: number) => void;
  onRemoveItem: (productId: string, option: string) => void;
  onProceedToCheckout: () => void;
  discountRate: number;
  onApplyPromoCode: (code: string) => boolean;
  appliedPromo: string | null;
  currencySymbol: string;
  currencyRate: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  discountRate,
  onApplyPromoCode,
  appliedPromo,
  currencySymbol,
  currencyRate,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const rawSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = rawSubtotal * discountRate;
  const freeShippingThreshold = 75.0;
  const shippingAmount = rawSubtotal >= freeShippingThreshold || rawSubtotal === 0 ? 0 : 8.0;
  const totalAmount = Math.max(0, rawSubtotal - discountAmount + shippingAmount);

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const success = onApplyPromoCode(promoInput.trim().toUpperCase());
    if (success) {
      setPromoMessage({ text: 'Promo code applied! 10% off entire order.', isError: false });
      setPromoInput('');
    } else {
      setPromoMessage({ text: 'Invalid promo code. Try "VERTEX10"', isError: true });
    }
  };

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - rawSubtotal);
  const progressToFreeShipping = Math.min(100, (rawSubtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-neutral-900 border-l border-neutral-800 h-full flex flex-col shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/70">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white uppercase tracking-wider font-display">
              Athletic Gear Bag
            </h2>
            <span className="text-xs text-neutral-400 font-mono">
              ({cart.reduce((total, i) => total + i.quantity, 0)} items)
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="p-3 bg-neutral-950 border-b border-neutral-800 text-xs">
          {amountNeededForFreeShipping > 0 ? (
            <p className="text-neutral-300">
              Add <span className="font-bold text-amber-400 font-mono">{currencySymbol}{(amountNeededForFreeShipping * currencyRate).toFixed(2)}</span> more to unlock <span className="font-semibold text-white">Free Express Shipping</span>
            </p>
          ) : (
            <p className="text-emerald-400 font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>You unlocked Free Standard & Express Shipping!</span>
            </p>
          )}

          <div className="w-full bg-neutral-800 rounded-full h-1.5 mt-2 overflow-hidden">
            <div
              className="bg-amber-400 h-full transition-all duration-300 ease-out"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Cart Itemized List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-400">
              <div className="w-14 h-14 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-500 mb-3">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <p className="text-white font-semibold text-sm">Your gear bag is empty</p>
              <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                Explore our pro basketballs, marathon racers, and training equipment to gear up.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 bg-amber-400 text-neutral-950 font-bold text-xs rounded-lg hover:bg-amber-300 transition-colors"
              >
                Browse Shop
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const itemTotal = (item.product.price * item.quantity * currencyRate).toFixed(2);
              return (
                <div
                  key={`${item.product.id}-${item.selectedOption}`}
                  className="flex gap-3.5 p-3 bg-neutral-950/80 rounded-xl border border-neutral-800/80 items-center"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-cover bg-neutral-900 shrink-0 border border-neutral-800"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-mono uppercase text-amber-400/80 truncate">
                      {item.product.brand}
                    </p>
                    <h4 className="text-xs font-semibold text-white truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-neutral-400 truncate">
                      {item.selectedOption}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded px-1 py-0.5">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.selectedOption, item.quantity - 1)
                          }
                          className="p-1 text-neutral-400 hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-bold text-white tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.selectedOption, item.quantity + 1)
                          }
                          className="p-1 text-neutral-400 hover:text-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white font-mono tabular-nums">
                          {currencySymbol}{itemTotal}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedOption)}
                          className="p-1 text-neutral-500 hover:text-rose-400 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Promo Code Input & Summary Footer */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-neutral-800 bg-neutral-950 space-y-3">
            {/* Promo Code Box */}
            <form onSubmit={handlePromoSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Code (try VERTEX10)"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-8 pr-2 py-1.5 text-xs text-white uppercase focus:outline-none focus:border-amber-400"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white rounded-lg transition-colors"
              >
                Apply
              </button>
            </form>

            {promoMessage && (
              <p
                className={`text-[11px] ${
                  promoMessage.isError ? 'text-rose-400' : 'text-emerald-400'
                }`}
              >
                {promoMessage.text}
              </p>
            )}

            {appliedPromo && !promoMessage && (
              <p className="text-[11px] text-emerald-400">
                Code <span className="font-mono font-bold">{appliedPromo}</span> applied (10% discount).
              </p>
            )}

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs pt-1">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span className="text-neutral-200 font-mono tabular-nums">
                  {currencySymbol}{(rawSubtotal * currencyRate).toFixed(2)}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discounts</span>
                  <span className="font-mono tabular-nums">
                    -{currencySymbol}{(discountAmount * currencyRate).toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-neutral-400">
                <span>Shipping</span>
                <span className="text-neutral-200 font-mono tabular-nums">
                  {shippingAmount === 0 ? 'FREE' : `${currencySymbol}${(shippingAmount * currencyRate).toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-neutral-800">
                <span>Estimated Total</span>
                <span className="text-amber-400 font-mono tabular-nums text-base">
                  {currencySymbol}{(totalAmount * currencyRate).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={onProceedToCheckout}
              className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
