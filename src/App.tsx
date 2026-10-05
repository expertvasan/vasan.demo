import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { PromoBanner } from './components/PromoBanner';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { GearAdvisorModal } from './components/GearAdvisorModal';
import { OrderLookupModal } from './components/OrderLookupModal';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product, SportCategory, CartItem, Order } from './types';
import { ShieldCheck, Flame, Award, CheckCircle } from 'lucide-react';

export default function App() {
  // Navigation & Category filter state
  const [selectedCategory, setSelectedCategory] = useState<SportCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Cart & Wishlist state
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      selectedOption: PRODUCTS[0].options[0],
      quantity: 1,
    },
  ]);
  const [wishlist, setWishlist] = useState<Product[]>([PRODUCTS[1]]);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountRate, setDiscountRate] = useState(0);

  // Currency
  const [currency, setCurrency] = useState<'USD' | 'EUR'>('USD');
  const currencySymbol = currency === 'USD' ? '$' : '€';
  const currencyRate = currency === 'USD' ? 1.0 : 0.92;

  // Modals & Drawers state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [isOrderLookupOpen, setIsOrderLookupOpen] = useState(false);

  // Orders list
  const [orders, setOrders] = useState<Order[]>([]);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, option: string, quantity: number = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedOption === option
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      }
      return [...prev, { product, selectedOption: option, quantity }];
    });
    showToast(`Added ${quantity}x ${product.name} to bag`);
  };

  const handleUpdateQuantity = (productId: string, option: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId, option);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedOption === option
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string, option: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedOption === option)
      )
    );
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed from saved gear`);
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved ${product.name} to locker`);
        return [...prev, product];
      }
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleMoveToCart = (product: Product) => {
    handleAddToCart(product, product.options[0]);
    handleRemoveFromWishlist(product.id);
  };

  // Promo Code Handler
  const handleApplyPromo = (code: string): boolean => {
    if (code === 'VERTEX10') {
      setAppliedPromo('VERTEX10');
      setDiscountRate(0.1);
      return true;
    }
    if (code === 'FREESHIP') {
      setAppliedPromo('FREESHIP');
      setDiscountRate(0.05);
      return true;
    }
    return false;
  };

  // Order Placement
  const handleOrderSuccess = (order: Order) => {
    setOrders([order, ...orders]);
    setCart([]);
    showToast(`Order ${order.id} placed successfully!`);
  };

  // Buy Now direct flow
  const handleBuyNow = (product: Product, option: string, quantity: number) => {
    handleAddToCart(product, option, quantity);
    setQuickViewProduct(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Currency Toggle
  const handleToggleCurrency = () => {
    setCurrency((prev) => (prev === 'USD' ? 'EUR' : 'USD'));
  };

  // Filtered Products Calculation
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesTagline = p.tagline.toLowerCase().includes(q);
        const matchesCategory = p.category.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesTagline && !matchesCategory) {
          return false;
        }
      }
      // Skill level filter
      if (selectedSkillLevel !== 'all' && p.skillLevel !== selectedSkillLevel) {
        return false;
      }
      // In stock only filter
      if (inStockOnly && p.stock <= 0) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: featured first
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, selectedSkillLevel, inStockOnly, sortBy]);

  const featuredHighlights = useMemo(() => {
    return PRODUCTS.filter((p) => p.isFeatured);
  }, []);

  const totalCartUnits = cart.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 border border-amber-400/40 text-white px-4 py-3 rounded-xl shadow-2xl text-xs flex items-center gap-2 animate-in slide-in-from-bottom-2 duration-200">
          <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Slim Dismissible Promotional Banner */}
      <PromoBanner />

      {/* Top Bar Nav */}
      <Navbar
        cartCount={totalCartUnits}
        wishlistCount={wishlist.length}
        activeCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const shopSection = document.getElementById('catalog');
          if (shopSection) {
            shopSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onOpenOrderLookup={() => setIsOrderLookupOpen(true)}
        currency={currency}
        onToggleCurrency={handleToggleCurrency}
      />

      {/* Hero Section */}
      <Hero
        onExploreCollection={() => {
          const shopSection = document.getElementById('catalog');
          if (shopSection) {
            shopSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
      />

      {/* Featured Collection Spotlight */}
      <section className="py-12 bg-neutral-900/40 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                <Flame className="w-4 h-4" />
                <span>Season 2026 Core Lineup</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase font-display tracking-tight">
                Championship Tournament Standards
              </h2>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm">
              Laboratory-tested friction coefficients, official tournament weights, and race-day carbon propulsion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredHighlights.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onQuickView={(p) => setQuickViewProduct(p)}
                onAddToCart={(p, opt) => handleAddToCart(p, opt)}
                isWishlisted={wishlist.some((w) => w.id === prod.id)}
                onToggleWishlist={handleToggleWishlist}
                currencySymbol={currencySymbol}
                currencyRate={currencyRate}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main Store Catalog & Interactive Filtering Section */}
      <main id="catalog" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Athletic Hardware & Gear Vault</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase font-display tracking-tight mt-1">
                Explore All Sports Equipment
              </h2>
            </div>
          </div>

          {/* Category tabs and filters */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedSkillLevel={selectedSkillLevel}
            onSelectSkillLevel={setSelectedSkillLevel}
            sortBy={sortBy}
            onSortChange={setSortBy}
            inStockOnly={inStockOnly}
            onToggleInStock={() => setInStockOnly(!inStockOnly)}
            resultCount={filteredProducts.length}
          />
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="p-16 text-center bg-neutral-900/50 rounded-2xl border border-neutral-800 space-y-3">
            <p className="text-lg font-bold text-white">No gear matched your query</p>
            <p className="text-xs text-neutral-400 max-w-md mx-auto">
              We couldn't find items matching "{searchQuery}" in this category and skill level. Try clearing search filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSelectedSkillLevel('all');
                setInStockOnly(false);
              }}
              className="mt-3 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
                onAddToCart={(p, opt) => handleAddToCart(p, opt)}
                isWishlisted={wishlist.some((w) => w.id === product.id)}
                onToggleWishlist={handleToggleWishlist}
                currencySymbol={currencySymbol}
                currencyRate={currencyRate}
              />
            ))}
          </div>
        )}
      </main>

      {/* Product Detail Modal (PDP) */}
      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, opt, qty) => handleAddToCart(p, opt, qty)}
        onBuyNow={(p, opt, qty) => handleBuyNow(p, opt, qty)}
        isWishlisted={quickViewProduct ? wishlist.some((w) => w.id === quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        currencySymbol={currencySymbol}
        currencyRate={currencyRate}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        discountRate={discountRate}
        onApplyPromoCode={handleApplyPromo}
        appliedPromo={appliedPromo}
        currencySymbol={currencySymbol}
        currencyRate={currencyRate}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        discountRate={discountRate}
        currencySymbol={currencySymbol}
        currencyRate={currencyRate}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onMoveToCart={handleMoveToCart}
        currencySymbol={currencySymbol}
        currencyRate={currencyRate}
      />

      {/* Athletic Gear Matcher Modal */}
      <GearAdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        onSelectProduct={(p) => setQuickViewProduct(p)}
        onAddToCart={(p, opt) => handleAddToCart(p, opt)}
        currencySymbol={currencySymbol}
        currencyRate={currencyRate}
      />

      {/* Order Lookup Tracker Modal */}
      <OrderLookupModal
        isOpen={isOrderLookupOpen}
        onClose={() => setIsOrderLookupOpen(false)}
        orders={orders}
        currencySymbol={currencySymbol}
        currencyRate={currencyRate}
      />

      {/* Store Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const shopSection = document.getElementById('catalog');
          if (shopSection) {
            shopSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
      />
    </div>
  );
}
