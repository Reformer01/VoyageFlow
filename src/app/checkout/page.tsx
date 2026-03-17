
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBasket } from '@/context/basket-context';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CheckoutPage() {
  const router = useRouter();
  const { totalPrice, items, clearBasket } = useBasket();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'ussd'>('card');

  const taxesAndFees = Math.floor(totalPrice * 0.1);
  const serviceFee = Math.floor(totalPrice * 0.02);
  const grandTotal = totalPrice + taxesAndFees + serviceFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      const bookingId = Math.random().toString(36).substring(2, 9).toUpperCase();
      clearBasket();
      toast({
        title: "Payment Successful",
        description: `Your booking ${bookingId} has been confirmed.`,
      });
      router.push(`/confirmation/${bookingId}`);
    }, 2500);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your basket is empty</h2>
          <Link href="/search">
            <Button className="bg-primary hover:bg-primary/90">Go to Search</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased font-display min-h-screen">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-4 text-primary">
              <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined">flight_takeoff</span>
              </div>
              <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold tracking-tight">TravelEase</h2>
            </Link>
            <div className="flex flex-1 justify-end gap-6 items-center">
              <nav className="hidden md:flex items-center gap-8">
                <Link className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="/">Home</Link>
                <Link className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="/search">Bookings</Link>
                <Link className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">Support</Link>
              </nav>
              <Link href="/auth/login">
                <button className="flex items-center justify-center rounded-full size-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  <span className="material-symbols-outlined text-[20px]">person</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8">
          <Link className="hover:text-primary" href="/search">Search Results</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="hover:text-primary">Passenger Details</span>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-slate-900 dark:text-slate-100 font-semibold">Secure Payment</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Forms */}
          <div className="lg:col-span-8 space-y-8">
            {/* Page Heading */}
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Checkout</h1>
              <p className="text-slate-500 dark:text-slate-400">Complete your booking by providing the required details below.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Passenger Details Section */}
              <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">groups</span>
                  <h2 className="text-lg font-bold">Passenger Details</h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">First Name</Label>
                      <Input required className="rounded-lg border-slate-300 dark:border-slate-700 bg-transparent focus:border-primary focus:ring-primary" placeholder="John" type="text" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Last Name</Label>
                      <Input required className="rounded-lg border-slate-300 dark:border-slate-700 bg-transparent focus:border-primary focus:ring-primary" placeholder="Doe" type="text" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</Label>
                      <Input required className="rounded-lg border-slate-300 dark:border-slate-700 bg-transparent focus:border-primary focus:ring-primary" placeholder="john@example.com" type="email" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone Number</Label>
                      <Input required className="rounded-lg border-slate-300 dark:border-slate-700 bg-transparent focus:border-primary focus:ring-primary" placeholder="+1 000 000 0000" type="tel" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Payment Processing Section (Paystack UI inspired) */}
              <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">shield</span>
                    <h2 className="text-lg font-bold">Payment Gateway</h2>
                  </div>
                  <div className="flex items-center gap-1 opacity-60">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Powered by</span>
                    <span className="text-blue-600 font-extrabold text-sm">paystack</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Payment Tabs */}
                    <div className="w-full md:w-1/3 flex flex-col gap-2">
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all border ${paymentMethod === 'card' ? 'bg-primary/10 text-primary border-primary/20' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 border-transparent'}`}
                      >
                        <span className="material-symbols-outlined">credit_card</span>
                        <span className="font-semibold text-sm">Card</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod('bank')}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all border ${paymentMethod === 'bank' ? 'bg-primary/10 text-primary border-primary/20' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 border-transparent'}`}
                      >
                        <span className="material-symbols-outlined">account_balance</span>
                        <span className="font-semibold text-sm">Bank Transfer</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod('ussd')}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all border ${paymentMethod === 'ussd' ? 'bg-primary/10 text-primary border-primary/20' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 border-transparent'}`}
                      >
                        <span className="material-symbols-outlined">dialpad</span>
                        <span className="font-semibold text-sm">USSD</span>
                      </button>
                    </div>
                    {/* Card Details Interface */}
                    <div className="flex-1 space-y-4 pt-2 md:pt-0">
                      <div className="flex flex-col gap-1.5">
                        <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Card Number</Label>
                        <div className="relative">
                          <Input required className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-transparent pr-12 focus:border-primary focus:ring-primary" placeholder="0000 0000 0000 0000" type="text" />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                            <span className="material-symbols-outlined text-slate-400">credit_card</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Expiry Date</Label>
                          <Input required className="rounded-lg border-slate-300 dark:border-slate-700 bg-transparent focus:border-primary focus:ring-primary" placeholder="MM / YY" type="text" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">CVV</Label>
                          <Input required className="rounded-lg border-slate-300 dark:border-slate-700 bg-transparent focus:border-primary focus:ring-primary" placeholder="***" type="password" />
                        </div>
                      </div>
                      <div className="pt-4">
                        <Button 
                          type="submit"
                          disabled={loading}
                          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-7 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 h-auto"
                        >
                          {loading ? 'Processing...' : `Pay $${grandTotal.toFixed(2)}`}
                          {!loading && <span className="material-symbols-outlined">lock</span>}
                        </Button>
                        <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">verified_user</span>
                          Your payment information is encrypted and secure.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </form>
          </div>

          {/* Right Column: Booking Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Booking Summary Card */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                  <h3 className="font-bold text-lg">Booking Summary</h3>
                </div>
                <div className="p-5 space-y-6">
                  {/* Items Summary */}
                  <div className="flex flex-col gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                    {items.map((item) => (
                      <div key={item.basketId} className="flex items-center gap-3">
                        <div className="relative size-12 rounded overflow-hidden shrink-0">
                          <Image src={item.image} alt={item.title} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-xs truncate">{item.title}</p>
                          <p className="text-[10px] text-slate-500 uppercase tracking-wider">{item.type} • {item.provider}</p>
                        </div>
                        <p className="font-bold text-sm text-primary">${item.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Base Fare ({items.length} items)</span>
                      <span className="font-medium">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Taxes & Fees</span>
                      <span className="font-medium">${taxesAndFees.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Service Fee</span>
                      <span className="font-medium">${serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="pt-3 border-t border-dashed border-slate-200 dark:border-slate-700 flex justify-between items-center">
                      <span className="font-bold">Total Amount</span>
                      <span className="font-black text-2xl text-primary">${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-green-500/5 border border-green-500/20 rounded-lg flex flex-col items-center text-center">
                  <span className="material-symbols-outlined text-green-500 mb-1">verified</span>
                  <p className="text-[10px] font-bold uppercase tracking-tighter text-green-700 dark:text-green-400">Secure Payment</p>
                </div>
                <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg flex flex-col items-center text-center">
                  <span className="material-symbols-outlined text-blue-500 mb-1">support_agent</span>
                  <p className="text-[10px] font-bold uppercase tracking-tighter text-blue-700 dark:text-blue-400">24/7 Support</p>
                </div>
              </div>

              {/* Promo Code */}
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-primary text-sm">sell</span>
                  <h4 className="text-sm font-bold">Have a Promo Code?</h4>
                </div>
                <div className="flex gap-2">
                  <Input className="flex-1 text-sm rounded-lg border-slate-300 dark:border-slate-700 bg-transparent focus:border-primary focus:ring-primary h-9" placeholder="Enter code" type="text" />
                  <Button variant="secondary" className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-4 py-2 rounded-lg text-sm font-bold h-9">Apply</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">© 2024 TravelEase. All rights reserved.</p>
          <div className="flex gap-8 text-sm text-slate-500 dark:text-slate-400">
            <Link className="hover:text-primary" href="#">Terms of Service</Link>
            <Link className="hover:text-primary" href="#">Privacy Policy</Link>
            <Link className="hover:text-primary" href="#">Refund Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
