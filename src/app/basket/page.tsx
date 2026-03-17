
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useBasket } from '@/context/basket-context';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/navbar';

export default function BasketPage() {
  const { items, removeFromBasket, totalPrice } = useBasket();

  // Group items by type for display
  const flights = items.filter(item => item.type === 'flight');
  const hotels = items.filter(item => item.type === 'hotel');

  const taxesAndFees = Math.floor(totalPrice * 0.08);
  const grandTotal = totalPrice + taxesAndFees;

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-2 mb-8">
          <nav className="flex text-sm text-slate-500 dark:text-slate-400 gap-2 items-center mb-2">
            <Link className="hover:text-primary transition-colors" href="/search">Search</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-slate-900 dark:text-slate-200 font-medium">Basket</span>
          </nav>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Your Basket</h1>
          <p className="text-slate-600 dark:text-slate-400">Review your flight and hotel selections before checkout.</p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
            <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">shopping_basket</span>
            <h3 className="text-xl font-bold">Your basket is empty</h3>
            <p className="text-slate-500 mb-8">Looks like you haven't added any trips yet.</p>
            <Link href="/search">
              <Button className="bg-primary hover:bg-primary/90 px-8 rounded-xl h-12 font-bold transition-all">Start Exploring</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Flights Section */}
              {flights.length > 0 && (
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-primary">flight_takeoff</span>
                    <h2 className="text-xl font-bold">Flights</h2>
                  </div>
                  {flights.map((flight) => (
                    <div key={flight.basketId} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm mb-4">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                          <div className="flex-1 space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex flex-col">
                                <span className="text-2xl font-bold">LHR</span>
                                <span className="text-xs text-slate-500">London, UK</span>
                              </div>
                              <div className="flex flex-col items-center flex-1 px-4">
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">7h 45m</span>
                                <div className="w-full h-px bg-slate-200 dark:bg-slate-700 relative my-2">
                                  <span className="material-symbols-outlined absolute left-1/2 -translate-x-1/2 -top-3 text-primary bg-white dark:bg-slate-900 px-1">flight</span>
                                </div>
                                <span className="text-[10px] text-slate-400 font-medium">Non-stop</span>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="text-2xl font-bold">JFK</span>
                                <span className="text-xs text-slate-500">New York, USA</span>
                              </div>
                            </div>
                            <div className="flex gap-4 text-sm text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                              <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">calendar_today</span>
                                Oct 24, 2023
                              </div>
                              <div className="flex items-center gap-1 text-primary font-semibold">
                                <span className="material-symbols-outlined text-sm">airline_seat_recline_extra</span>
                                {flight.provider}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end justify-between border-l border-slate-100 dark:border-slate-800 pl-6">
                            <div className="text-right">
                              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Subtotal</p>
                              <p className="text-2xl font-black text-primary">${flight.price.toFixed(2)}</p>
                            </div>
                            <button 
                              onClick={() => removeFromBasket(flight.basketId!)}
                              className="text-sm font-semibold text-slate-500 hover:text-red-500 flex items-center gap-1 transition-colors"
                            >
                              <span className="material-symbols-outlined text-lg">delete</span>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </section>
              )}

              {/* Hotels Section */}
              {hotels.length > 0 && (
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-primary">hotel</span>
                    <h2 className="text-xl font-bold">Hotels</h2>
                  </div>
                  {hotels.map((hotel) => (
                    <div key={hotel.basketId} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm mb-4">
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-48 h-48 md:h-auto relative bg-slate-200 shrink-0 overflow-hidden">
                          <Image fill src={hotel.image} alt={hotel.title} className="object-cover" />
                        </div>
                        <div className="p-6 flex-1 flex flex-col md:flex-row justify-between gap-6">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-1 text-primary">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={`material-symbols-outlined text-sm ${i < Math.floor(hotel.rating) ? 'fill-1' : ''}`}>star</span>
                              ))}
                            </div>
                            <h3 className="text-lg font-bold">{hotel.title}</h3>
                            <p className="text-sm text-slate-500 flex items-center gap-1">
                              <span className="material-symbols-outlined text-sm">location_on</span>
                              {hotel.location || 'New York, USA'}
                            </p>
                            <div className="flex gap-4 pt-2 text-sm text-slate-600 dark:text-slate-400">
                              <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold text-slate-400">Provider</span>
                                <span>{hotel.provider}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end justify-between border-l border-slate-100 dark:border-slate-800 pl-6">
                            <div className="text-right">
                              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Subtotal</p>
                              <p className="text-2xl font-black text-primary">${hotel.price.toFixed(2)}</p>
                            </div>
                            <button 
                              onClick={() => removeFromBasket(hotel.basketId!)}
                              className="text-sm font-semibold text-slate-500 hover:text-red-500 flex items-center gap-1 transition-colors"
                            >
                              <span className="material-symbols-outlined text-lg">delete</span>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </section>
              )}

              <div className="flex gap-4 items-center p-4 bg-primary/5 rounded-xl border border-primary/20">
                <span className="material-symbols-outlined text-primary">info</span>
                <p className="text-sm text-slate-700 dark:text-slate-300">Prices and availability are subject to change until booking is completed. Use 'Verify Availability' to lock in your selections.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Items ({items.length})</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <span>Taxes & Fees</span>
                    <span>${taxesAndFees.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-3xl font-black text-primary tracking-tight">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <Link href="/checkout">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 h-auto">
                      <span className="material-symbols-outlined">verified_user</span>
                      Verify Availability
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full py-6 rounded-xl font-bold flex items-center justify-center gap-2 h-auto border-slate-200 dark:border-slate-700">
                    <span className="material-symbols-outlined">bookmark</span>
                    Save for Later
                  </Button>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-green-500">lock</span>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Secure Checkout</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 w-12 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center">
                      <span className="material-symbols-outlined text-slate-400">credit_card</span>
                    </div>
                    <div className="h-8 w-12 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center">
                      <span className="material-symbols-outlined text-slate-400">account_balance</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-primary/10 rounded-xl p-6 border border-primary/10">
                <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined">redeem</span>
                  Membership Perks
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">As a Premium Member, you're earning <strong className="text-slate-900 dark:text-white">{Math.floor(totalPrice)} points</strong> on this trip!</p>
              </div>
            </div>
          </div>
        )}

        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Recently Viewed</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] relative rounded-xl overflow-hidden mb-3">
                <Image fill src="https://picsum.photos/seed/aspen/400/300" alt="Cottage" className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <h4 className="font-bold group-hover:text-primary transition-colors">Mountain Retreat Cabin</h4>
              <p className="text-sm text-slate-500">Aspen, Colorado</p>
            </div>
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] relative rounded-xl overflow-hidden mb-3">
                <Image fill src="https://picsum.photos/seed/maldives/400/300" alt="Beach" className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <h4 className="font-bold group-hover:text-primary transition-colors">Blue Lagoon Resort</h4>
              <p className="text-sm text-slate-500">Maldives</p>
            </div>
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] relative rounded-xl overflow-hidden mb-3">
                <Image fill src="https://picsum.photos/seed/tokyo/400/300" alt="City" className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <h4 className="font-bold group-hover:text-primary transition-colors">Shinjuku Luxury Suite</h4>
              <p className="text-sm text-slate-500">Tokyo, Japan</p>
            </div>
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] relative rounded-xl overflow-hidden mb-3">
                <Image fill src="https://picsum.photos/seed/paris/400/300" alt="Paris" className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <h4 className="font-bold group-hover:text-primary transition-colors">Le Marais Boutique</h4>
              <p className="text-sm text-slate-500">Paris, France</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-primary p-1 rounded text-white">
                  <span className="material-symbols-outlined block text-lg">flight_takeoff</span>
                </div>
                <span className="text-lg font-bold tracking-tight uppercase text-slate-900 dark:text-white">Travel<span className="text-primary">Ease</span></span>
              </div>
              <p className="text-sm text-slate-500">Making travel simple, smart, and accessible for everyone.</p>
            </div>
            <div>
              <h5 className="font-bold mb-4 text-slate-900 dark:text-white">Support</h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link className="hover:text-primary" href="#">Help Center</Link></li>
                <li><Link className="hover:text-primary" href="#">Safety Info</Link></li>
                <li><Link className="hover:text-primary" href="#">Cancellation Options</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4 text-slate-900 dark:text-white">Company</h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link className="hover:text-primary" href="#">About Us</Link></li>
                <li><Link className="hover:text-primary" href="#">Careers</Link></li>
                <li><Link className="hover:text-primary" href="#">Press</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4 text-slate-900 dark:text-white">Legal</h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link className="hover:text-primary" href="#">Terms of Service</Link></li>
                <li><Link className="hover:text-primary" href="#">Privacy Policy</Link></li>
                <li><Link className="hover:text-primary" href="#">Cookie Settings</Link></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-100 dark:border-slate-800 gap-4">
            <p className="text-xs text-slate-500">© 2024 TravelEase Inc. All rights reserved.</p>
            <div className="flex gap-4">
              <Link className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">share</span></Link>
              <Link className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">mail</span></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
