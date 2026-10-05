import React, { useState } from 'react';
import { Star, Heart, Eye, Plus, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, option: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  currencySymbol: string;
  currencyRate: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  currencySymbol,
  currencyRate,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(product.options[0] || '');
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [imgError, setImgError] = useState(false);

  const displayPrice = (product.price * currencyRate).toFixed(2);
  const displayOriginalPrice = product.originalPrice
    ? (product.originalPrice * currencyRate).toFixed(2)
    : null;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedOption);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col bg-neutral-900/90 rounded-xl border border-neutral-800/90 overflow-hidden hover:border-neutral-700 hover:shadow-xl hover:shadow-black/50 transition-all duration-200 cursor-pointer"
    >
      {/* Visual Area (65%-70% height) */}
      <div className="relative aspect-[4/3] bg-neutral-950 overflow-hidden flex items-center justify-center">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-neutral-900 to-neutral-950 text-neutral-400">
            <span className="text-3xl font-display font-black text-neutral-700 uppercase">
              {product.brand}
            </span>
            <span className="text-xs text-neutral-500 mt-2 text-center">{product.name}</span>
          </div>
        )}

        {/* Subtle subtle top text spec tag (Maximum 1 subtle tag, clean unboxed) */}
        {product.badge && (
          <div className="absolute top-3 left-3 text-[11px] font-semibold tracking-wider uppercase text-amber-400 bg-neutral-950/80 px-2 py-0.5 rounded border border-amber-400/20 backdrop-blur-sm">
            {product.badge}
          </div>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md transition-all ${
            isWishlisted
              ? 'bg-amber-400 text-neutral-950'
              : 'bg-neutral-950/70 text-neutral-300 hover:text-white hover:bg-neutral-900'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
          aria-label="Toggle wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-neutral-950' : ''}`} />
        </button>

        {/* Quick View Overlay Hover Affordance */}
        <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900/90 text-white text-xs font-medium rounded-md border border-neutral-700 shadow-lg backdrop-blur-sm">
            <Eye className="w-3.5 h-3.5" /> Quick View
          </span>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Metadata line without pill enclosures */}
          <div className="flex items-center gap-2 text-[11px] font-medium text-neutral-400 tracking-wider uppercase">
            <span>{product.brand}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>{product.category}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-amber-400/90">{product.skillLevel}</span>
          </div>

          {/* Product Title */}
          <h3 className="mt-1 text-sm sm:text-base font-semibold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Short tagline */}
          <p className="mt-1 text-xs text-neutral-400 line-clamp-1">
            {product.tagline}
          </p>
        </div>

        {/* Price & Rating Bar */}
        <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-white font-mono tabular-nums">
              {currencySymbol}{displayPrice}
            </span>
            {displayOriginalPrice && (
              <span className="text-xs text-neutral-500 line-through font-mono tabular-nums">
                {currencySymbol}{displayOriginalPrice}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs text-neutral-400 font-mono">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-neutral-200 font-semibold tabular-nums">{product.rating}</span>
            <span className="text-neutral-500">({product.reviewCount})</span>
          </div>
        </div>

        {/* Quick Add Action & Option selection */}
        <div className="pt-1 flex items-center gap-2">
          {product.options.length > 1 ? (
            <select
              value={selectedOption}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-2 py-1.5 text-xs text-neutral-300 focus:outline-none focus:border-amber-400 truncate"
              title={product.optionsName}
            >
              {product.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <div className="flex-1 text-xs text-neutral-400 truncate py-1">
              {selectedOption}
            </div>
          )}

          <button
            onClick={handleQuickAdd}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shrink-0 ${
              addedAnimation
                ? 'bg-emerald-500 text-white'
                : 'bg-neutral-800 hover:bg-amber-400 hover:text-neutral-950 text-white'
            }`}
            title="Add to shopping bag"
            aria-label="Add to bag"
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
