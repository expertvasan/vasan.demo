import React, { useState } from 'react';
import { X, Search, PackageCheck, Truck, CheckCircle2, Clock } from 'lucide-react';
import { Order } from '../types';

interface OrderLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  currencySymbol: string;
  currencyRate: number;
}

export const OrderLookupModal: React.FC<OrderLookupModalProps> = ({
  isOpen,
  onClose,
  orders,
  currencySymbol,
  currencyRate,
}) => {
  const [searchId, setSearchId] = useState('');
  const [activeOrder, setActiveOrder] = useState<Order | null>(orders[0] || null);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    const found = orders.find(
      (o) => o.id.toLowerCase() === searchId.trim().toLowerCase()
    );
    if (found) {
      setActiveOrder(found);
    } else {
      // Mock order fallback for demonstration
      setActiveOrder({
        id: searchId.trim().toUpperCase(),
        createdAt: 'Oct 3, 2026',
        items: [
          {
            productId: 'sample',
            productName: 'AeroGrip Tournament Composite Basketball',
            brand: 'Vertex Court',
            option: 'Size 7 (Official Mens 29.5")',
            quantity: 1,
            price: 89.0,
            image: '/src/assets/images/product_pro_basketball_1791180751462.jpg',
          },
        ],
        subtotal: 89.0,
        discount: 0,
        shipping: 0,
        total: 89.0,
        customerDetails: {
          fullName: 'Registered Athlete',
          email: 'athlete@example.com',
          phone: '+1 (555) 019-2831',
          address: '400 Olympic Blvd',
          city: 'Los Angeles',
          postalCode: '90015',
          country: 'United States',
        },
        shippingMethod: 'express',
        paymentMethod: 'card',
        status: 'In Transit',
        trackingNumber: `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`,
        estimatedDelivery: 'Tomorrow by 5:00 PM',
      });
    }
  };

  const steps = [
    { title: 'Order Verified', desc: 'Payment approved and specs verified', done: true },
    { title: 'Quality Calibrated', desc: 'Precision pressure and weight checked', done: true },
    { title: 'Courier Dispatched', desc: 'In custody of athletic freight carrier', done: true },
    { title: 'Out for Delivery', desc: 'Arriving at destination address', done: false },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/80">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-extrabold text-white uppercase tracking-wider font-display">
              Track Athletic Gear Shipment
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
          {/* Lookup Input */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter Order ID (e.g. VTX-104291)..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs rounded-lg transition-colors"
            >
              Track
            </button>
          </form>

          {/* Quick Recent Orders Chips */}
          {orders.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-neutral-500 shrink-0">Recent Orders:</span>
              {orders.map((o) => (
                <button
                  key={o.id}
                  onClick={() => setActiveOrder(o)}
                  className={`px-2.5 py-1 rounded font-mono text-xs border transition-colors shrink-0 ${
                    activeOrder?.id === o.id
                      ? 'border-amber-400 text-amber-300 bg-amber-400/10'
                      : 'border-neutral-800 text-neutral-400 bg-neutral-950 hover:text-white'
                  }`}
                >
                  {o.id}
                </button>
              ))}
            </div>
          )}

          {activeOrder ? (
            <div className="space-y-6">
              {/* Order Status Card */}
              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between text-xs border-b border-neutral-800/80 pb-3">
                  <div>
                    <span className="text-neutral-400">Order ID: </span>
                    <span className="font-mono font-bold text-amber-400">{activeOrder.id}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Status: {activeOrder.status}</span>
                  </div>
                </div>

                <div className="text-xs space-y-1">
                  <p className="text-neutral-400">
                    Carrier Tracking Code:{' '}
                    <span className="font-mono text-white font-bold">{activeOrder.trackingNumber}</span>
                  </p>
                  <p className="text-neutral-400">
                    Estimated Delivery:{' '}
                    <span className="text-amber-400 font-semibold">{activeOrder.estimatedDelivery}</span>
                  </p>
                </div>
              </div>

              {/* Progress Steps Timeline */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Dispatch & Logistics Milestones
                </h4>
                <div className="space-y-3 pl-2 border-l-2 border-neutral-800">
                  {steps.map((s, idx) => (
                    <div key={idx} className="relative pl-5">
                      <div
                        className={`absolute -left-[17px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          s.done
                            ? 'bg-amber-400 text-neutral-950'
                            : 'bg-neutral-800 text-neutral-500'
                        }`}
                      >
                        {s.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                      </div>
                      <p className={`text-xs font-semibold ${s.done ? 'text-white' : 'text-neutral-500'}`}>
                        {s.title}
                      </p>
                      <p className="text-[11px] text-neutral-400">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items in this Order */}
              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2 text-xs">
                <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
                  Order Package Contents
                </h4>
                {activeOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1">
                    <span className="text-neutral-300">
                      {it.quantity}x {it.productName} ({it.option})
                    </span>
                    <span className="font-mono text-white">
                      {currencySymbol}{(it.price * it.quantity * currencyRate).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-neutral-500 text-xs">
              Enter an order number above to inspect delivery progress.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
