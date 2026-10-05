import React, { useState } from 'react';
import { X, Star, Check, ShieldCheck, Truck, RotateCcw, Heart, ShoppingBag, Plus, Minus, MessageSquarePlus } from 'lucide-react';
import { Product, ProductReview } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, option: string, quantity: number) => void;
  onBuyNow: (product: Product, option: string, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  currencySymbol: string;
  currencyRate: number;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
  currencySymbol,
  currencyRate,
}) => {
  if (!product) return null;

  const [selectedOption, setSelectedOption] = useState<string>(product.options[0] || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'reviews'>('specs');
  const [reviewsList, setReviewsList] = useState<ProductReview[]>(product.reviews);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [justAdded, setJustAdded] = useState(false);

  const displayPrice = (product.price * currencyRate).toFixed(2);
  const displayOriginalPrice = product.originalPrice
    ? (product.originalPrice * currencyRate).toFixed(2)
    : null;

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;

    const newRev: ProductReview = {
      id: `user-rev-${Date.now()}`,
      author: reviewerName.trim(),
      rating: reviewRating,
      date: 'Just now',
      verified: true,
      title: reviewTitle.trim() || 'Verified Performance Test',
      comment: reviewComment.trim(),
    };

    setReviewsList([newRev, ...reviewsList]);
    setReviewerName('');
    setReviewTitle('');
    setReviewComment('');
    setShowReviewForm(false);
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedOption, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header & Close Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/60 sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-wider">
            <span>{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span>{product.category}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 flex-1 space-y-8">
          {/* Main Grid: Gallery Left + Contiguous Purchase Module Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Gallery Left */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] bg-neutral-950 rounded-xl overflow-hidden border border-neutral-800 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                {product.badge && (
                  <div className="absolute top-3 left-3 text-xs font-semibold tracking-wider uppercase text-amber-400 bg-neutral-950/80 px-2.5 py-1 rounded border border-amber-400/20 backdrop-blur-sm">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Guarantees Box */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs space-y-2.5 text-neutral-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>30-Day Unconditional Field Play Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Dispatches within 24 hours in secure athletic packaging</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Complimentary hassle-free size exchanges</span>
                </div>
              </div>
            </div>

            {/* Contiguous Purchase Module Right */}
            <div className="space-y-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {product.name}
                </h2>
                <p className="mt-1 text-sm text-neutral-400">{product.tagline}</p>
              </div>

              {/* Rating and Reviews Count */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-neutral-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-white font-mono tabular-nums">
                  {product.rating}
                </span>
                <span className="text-xs text-neutral-500 font-mono">
                  ({reviewsList.length} verified reviews)
                </span>
              </div>

              {/* Price display */}
              <div className="flex items-baseline gap-3 pt-2 border-t border-neutral-800">
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                  {currencySymbol}{displayPrice}
                </span>
                {displayOriginalPrice && (
                  <span className="text-base text-neutral-500 line-through font-mono tabular-nums">
                    {currencySymbol}{displayOriginalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-xs font-semibold text-amber-400 font-mono">
                    Save {currencySymbol}{((product.originalPrice - product.price) * currencyRate).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-neutral-300 leading-relaxed">
                {product.description}
              </p>

              {/* Options selection */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold text-neutral-200 uppercase tracking-wider">
                  Select {product.optionsName}:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.options.map((opt) => {
                    const isSelected = selectedOption === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => setSelectedOption(opt)}
                        className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-400 text-neutral-950 border-amber-400 font-bold shadow-md shadow-amber-400/10'
                            : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Stepper & Stock */}
              <div className="flex items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-neutral-400 uppercase">Quantity</span>
                  <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-lg p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-white font-mono tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-xs font-mono">
                  {product.stock > 10 ? (
                    <span className="text-emerald-400">In Stock ({product.stock} units ready)</span>
                  ) : (
                    <span className="text-amber-400">Only {product.stock} units left</span>
                  )}
                </div>
              </div>

              {/* Purchase Actions */}
              <div className="pt-4 space-y-2.5">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer ${
                      justAdded
                        ? 'bg-emerald-500 text-white'
                        : 'bg-amber-400 hover:bg-amber-300 text-neutral-950 shadow-amber-400/20'
                    }`}
                  >
                    {justAdded ? (
                      <>
                        <Check className="w-4 h-4" /> Added to Shopping Bag!
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" /> Add to Bag
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`p-3 rounded-xl border transition-colors ${
                      isWishlisted
                        ? 'bg-amber-400 text-neutral-950 border-amber-400'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800'
                    }`}
                    title="Toggle Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-neutral-950' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={() => onBuyNow(product, selectedOption, quantity)}
                  className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 transition-colors cursor-pointer"
                >
                  Buy Now with 1-Click Checkout
                </button>
              </div>
            </div>
          </div>

          {/* Deep Tabs: Specs, Key Features, Real Customer Reviews */}
          <div className="pt-6 border-t border-neutral-800 space-y-6">
            <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
              <button
                onClick={() => setActiveTab('specs')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'specs'
                    ? 'bg-amber-400 text-neutral-950'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Technical Specifications
              </button>
              <button
                onClick={() => setActiveTab('features')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'features'
                    ? 'bg-amber-400 text-neutral-950'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Engineering Highlights
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'bg-amber-400 text-neutral-950'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Athlete Reviews ({reviewsList.length})
              </button>
            </div>

            {/* Tab: Specs */}
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="p-3 bg-neutral-950 rounded-lg border border-neutral-800/80 flex items-center justify-between text-xs"
                  >
                    <span className="text-neutral-400 font-medium">{spec.label}</span>
                    <span className="text-white font-mono font-semibold text-right pl-2">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Features */}
            {activeTab === 'features' && (
              <ul className="space-y-3">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Tab: Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-neutral-400">
                    Based on <span className="text-white font-bold">{reviewsList.length}</span> verified player reviews
                  </div>

                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-medium transition-colors"
                  >
                    <MessageSquarePlus className="w-3.5 h-3.5 text-amber-400" />
                    <span>{showReviewForm ? 'Cancel Review' : 'Write Review'}</span>
                  </button>
                </div>

                {/* Form to submit review */}
                {showReviewForm && (
                  <form onSubmit={handleAddReview} className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Leave Field Review</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-1">Your Name / Title</label>
                        <input
                          type="text"
                          required
                          value={reviewerName}
                          onChange={(e) => setReviewerName(e.target.value)}
                          placeholder="e.g. Jordan V., Point Guard"
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-1">Rating</label>
                        <select
                          value={reviewRating}
                          onChange={(e) => setReviewRating(Number(e.target.value))}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
                        >
                          <option value={5}>5 Stars - Elite Performance</option>
                          <option value={4}>4 Stars - Solid Gear</option>
                          <option value={3}>3 Stars - Average</option>
                          <option value={2}>2 Stars - Subpar</option>
                          <option value={1}>1 Star - Defective</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">Review Headline</label>
                      <input
                        type="text"
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        placeholder="e.g. Incredible bounce and grip on hardwood"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">Comments & Play Experience</label>
                      <textarea
                        required
                        rows={3}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Describe hand feel, durability, grip, or race performance..."
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs rounded-lg transition-colors"
                    >
                      Post Athlete Review
                    </button>
                  </form>
                )}

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviewsList.map((rev) => (
                    <div key={rev.id} className="p-4 bg-neutral-950 rounded-xl border border-neutral-800/80 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">{rev.author}</span>
                          {rev.verified && (
                            <span className="text-[10px] text-emerald-400 font-mono">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <span className="text-neutral-500 font-mono text-[11px]">{rev.date}</span>
                      </div>

                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-neutral-700'
                            }`}
                          />
                        ))}
                      </div>

                      <p className="text-xs font-semibold text-white">{rev.title}</p>
                      <p className="text-xs text-neutral-300 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
