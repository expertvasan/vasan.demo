import React, { useState } from 'react';
import { X, CheckCircle2, Truck, CreditCard, Banknote, ShieldCheck, Copy, ArrowRight, Package } from 'lucide-react';
import { CartItem, Order, OrderCustomerDetails } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  discountRate: number;
  currencySymbol: string;
  currencyRate: number;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  discountRate,
  currencySymbol,
  currencyRate,
  onOrderSuccess,
}) => {
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'same-day'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'instant'>('card');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [copiedTracking, setCopiedTracking] = useState(false);

  // Form State
  const [customer, setCustomer] = useState<OrderCustomerDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
  });

  // Card Form State
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = rawSubtotal * discountRate;
  
  // Shipping cost calculation based on method
  let shippingCost = 0;
  if (shippingMethod === 'standard') {
    shippingCost = rawSubtotal >= 75 ? 0 : 8;
  } else if (shippingMethod === 'express') {
    shippingCost = 15;
  } else if (shippingMethod === 'same-day') {
    shippingCost = 25;
  }

  const finalTotal = Math.max(0, rawSubtotal - discountAmount + shippingCost);

  const handleAutofillDemo = () => {
    setCustomer({
      fullName: 'Alex Vance',
      email: 'alex.vance@athletics.example',
      phone: '+1 (555) 234-8921',
      address: '742 Performance Way, Suite 4B',
      city: 'Portland',
      postalCode: '97201',
      country: 'United States',
    });
    setCardNumber('4242 •••• •••• 4242');
    setCardExpiry('10/28');
    setCardCvc('884');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const orderId = `VTX-${Math.floor(100000 + Math.random() * 900000)}`;
    const trackingId = `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const deliveryDates: Record<string, string> = {
      standard: '3-4 business days (Estimated Oct 8, 2026)',
      express: '1-2 business days (Estimated Oct 6, 2026)',
      'same-day': 'Next 18 hours priority courier',
    };

    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      items: cart.map((i) => ({
        productId: i.product.id,
        productName: i.product.name,
        brand: i.product.brand,
        option: i.selectedOption,
        quantity: i.quantity,
        price: i.product.price,
        image: i.product.image,
      })),
      subtotal: rawSubtotal,
      discount: discountAmount,
      shipping: shippingCost,
      total: finalTotal,
      customerDetails: customer,
      shippingMethod,
      paymentMethod,
      status: 'Processing',
      trackingNumber: trackingId,
      estimatedDelivery: deliveryDates[shippingMethod],
    };

    setConfirmedOrder(newOrder);
    onOrderSuccess(newOrder);
  };

  const handleCopyOrderNumber = () => {
    if (confirmedOrder) {
      navigator.clipboard.writeText(confirmedOrder.id);
      setCopiedTracking(true);
      setTimeout(() => setCopiedTracking(false), 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/80">
          <div className="flex items-center gap-2">
            <span className="font-extrabold tracking-wider uppercase font-display text-white text-base">
              Vertex Athletics Secure Checkout
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Order Confirmation OR Form */}
        <div className="overflow-y-auto p-6 flex-1">
          {confirmedOrder ? (
            /* Post-Order State with receipt summary */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-extrabold text-white uppercase font-display">
                  Order Confirmed
                </h3>
                <p className="text-sm text-neutral-400">
                  We are preparing your tournament sports equipment for dispatch.
                </p>
              </div>

              {/* Order Reference Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs font-mono">
                <span className="text-neutral-400">Order Ref:</span>
                <span className="text-amber-400 font-bold">{confirmedOrder.id}</span>
                <button
                  onClick={handleCopyOrderNumber}
                  className="p-1 text-neutral-400 hover:text-white"
                  title="Copy Order ID"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                {copiedTracking && <span className="text-[10px] text-emerald-400">Copied!</span>}
              </div>

              {/* Delivery Timeline Card */}
              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 text-left space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <Truck className="w-4 h-4 text-amber-400" />
                    <span>Estimated Arrival</span>
                  </div>
                  <span className="text-amber-400 font-mono">{confirmedOrder.estimatedDelivery}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-neutral-300">
                  <div>
                    <span className="text-neutral-500 block mb-0.5">Shipping Destination:</span>
                    <p className="text-white font-medium">{confirmedOrder.customerDetails.fullName}</p>
                    <p>{confirmedOrder.customerDetails.address}</p>
                    <p>
                      {confirmedOrder.customerDetails.city}, {confirmedOrder.customerDetails.postalCode}
                    </p>
                  </div>
                  <div>
                    <span className="text-neutral-500 block mb-0.5">Payment Method:</span>
                    <p className="text-white font-medium uppercase font-mono">
                      {confirmedOrder.paymentMethod === 'card'
                        ? 'Credit / Debit Card (Verified)'
                        : confirmedOrder.paymentMethod === 'cod'
                        ? 'Cash on Delivery (Pay on Arrival)'
                        : 'Instant Verified Pay'}
                    </p>
                    <p className="text-neutral-400 mt-1">
                      Tracking code: <span className="font-mono text-white">{confirmedOrder.trackingNumber}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Receipt Summary Breakdown */}
              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 text-left space-y-2 text-xs">
                <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-2">
                  Itemized Receipt
                </h4>
                {confirmedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-300">
                      {it.quantity}x {it.productName} ({it.option})
                    </span>
                    <span className="text-white font-mono tabular-nums">
                      {currencySymbol}{(it.price * it.quantity * currencyRate).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="pt-2 flex justify-between font-bold text-white text-sm">
                  <span>Grand Total Paid</span>
                  <span className="text-amber-400 font-mono tabular-nums">
                    {currencySymbol}{(confirmedOrder.total * currencyRate).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm rounded-xl transition-all shadow-lg"
              >
                Back to Shop Catalog
              </button>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Demo Autofill Banner */}
              <div className="flex items-center justify-between p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs">
                <span className="text-neutral-400">Want to test the checkout experience quickly?</span>
                <button
                  type="button"
                  onClick={handleAutofillDemo}
                  className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-amber-300 rounded font-medium transition-colors"
                >
                  Autofill Athlete Info
                </button>
              </div>

              {/* 1. Customer Shipping Details */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  1. Athlete Contact & Shipping Address
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-neutral-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={customer.fullName}
                      onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                      placeholder="e.g. Jordan Miller"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={customer.email}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                      placeholder="athlete@example.com"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">Phone Number (For Delivery SMS)</label>
                    <input
                      type="tel"
                      required
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">Country</label>
                    <input
                      type="text"
                      required
                      value={customer.country}
                      onChange={(e) => setCustomer({ ...customer, country: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-neutral-400 mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      placeholder="123 Field House Lane, Apt 2"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={customer.city}
                      onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                      placeholder="Seattle"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={customer.postalCode}
                      onChange={(e) => setCustomer({ ...customer, postalCode: e.target.value })}
                      placeholder="98101"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Shipping Speed */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  2. Delivery Speed & Carrier
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <label
                    className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between ${
                      shippingMethod === 'standard'
                        ? 'border-amber-400 bg-amber-400/5 text-white'
                        : 'border-neutral-800 bg-neutral-950 text-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Standard Ground</span>
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                        className="accent-amber-400"
                      />
                    </div>
                    <span className="text-[11px] text-neutral-400 mt-1">3-5 business days</span>
                    <span className="mt-2 font-mono font-bold text-amber-400">
                      {rawSubtotal >= 75 ? 'FREE' : `${currencySymbol}${(8 * currencyRate).toFixed(2)}`}
                    </span>
                  </label>

                  <label
                    className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between ${
                      shippingMethod === 'express'
                        ? 'border-amber-400 bg-amber-400/5 text-white'
                        : 'border-neutral-800 bg-neutral-950 text-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Express Air</span>
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                        className="accent-amber-400"
                      />
                    </div>
                    <span className="text-[11px] text-neutral-400 mt-1">1-2 business days</span>
                    <span className="mt-2 font-mono font-bold text-amber-400">
                      {currencySymbol}{(15 * currencyRate).toFixed(2)}
                    </span>
                  </label>

                  <label
                    className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between ${
                      shippingMethod === 'same-day'
                        ? 'border-amber-400 bg-amber-400/5 text-white'
                        : 'border-neutral-800 bg-neutral-950 text-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Priority Courier</span>
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={shippingMethod === 'same-day'}
                        onChange={() => setShippingMethod('same-day')}
                        className="accent-amber-400"
                      />
                    </div>
                    <span className="text-[11px] text-neutral-400 mt-1">Same-day dispatch</span>
                    <span className="mt-2 font-mono font-bold text-amber-400">
                      {currencySymbol}{(25 * currencyRate).toFixed(2)}
                    </span>
                  </label>
                </div>
              </div>

              {/* 3. Payment Method */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  3. Payment Method
                </h3>
                <div className="grid grid-cols-3 gap-2.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-center font-medium flex flex-col items-center gap-1.5 transition-colors ${
                      paymentMethod === 'card'
                        ? 'bg-amber-400/10 border-amber-400 text-white'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-amber-400" />
                    <span>Credit / Debit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-center font-medium flex flex-col items-center gap-1.5 transition-colors ${
                      paymentMethod === 'cod'
                        ? 'bg-amber-400/10 border-amber-400 text-white'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Banknote className="w-4 h-4 text-amber-400" />
                    <span>Cash on Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('instant')}
                    className={`p-3 rounded-xl border text-center font-medium flex flex-col items-center gap-1.5 transition-colors ${
                      paymentMethod === 'instant'
                        ? 'bg-amber-400/10 border-amber-400 text-white'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Instant Pay</span>
                  </button>
                </div>

                {/* Conditional Fields Based on Payment */}
                {paymentMethod === 'card' && (
                  <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3 text-xs">
                    <div>
                      <label className="block text-neutral-400 mb-1">Card Number</label>
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4242 4242 4242 4242"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-neutral-400 mb-1">Expiry Date (MM/YY)</label>
                        <input
                          type="text"
                          required
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="12/28"
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-400 mb-1">CVC Code</label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="884"
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 text-xs text-neutral-300 space-y-1.5">
                    <p className="font-semibold text-white flex items-center gap-1.5">
                      <Banknote className="w-4 h-4 text-amber-400" />
                      <span>Cash on Delivery Terms:</span>
                    </p>
                    <p className="text-neutral-400">
                      Payment is made directly in cash upon package delivery. You will receive an SMS phone confirmation prior to courier arrival. Please have exact change ready.
                    </p>
                  </div>
                )}

                {paymentMethod === 'instant' && (
                  <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 text-xs text-neutral-300 space-y-1.5">
                    <p className="text-neutral-400">
                      Simulated biometric one-click verification. Your digital wallet will authenticate automatically upon submitting.
                    </p>
                  </div>
                )}
              </div>

              {/* Order Final Summary */}
              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal ({cart.length} items)</span>
                  <span className="font-mono text-neutral-200">
                    {currencySymbol}{(rawSubtotal * currencyRate).toFixed(2)}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span className="font-mono">
                      -{currencySymbol}{(discountAmount * currencyRate).toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-400">
                  <span>Shipping Fee</span>
                  <span className="font-mono text-neutral-200">
                    {shippingCost === 0 ? 'FREE' : `${currencySymbol}${(shippingCost * currencyRate).toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-white text-base pt-2 border-t border-neutral-800">
                  <span>Total Amount</span>
                  <span className="text-amber-400 font-mono">
                    {currencySymbol}{(finalTotal * currencyRate).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Authorize & Place Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
