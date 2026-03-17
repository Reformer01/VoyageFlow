"use client";

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/router';
import Image from 'next/image';
import { useUser } from '@/firebase';
import { useEffect } from 'react';

export default function BookingDetailsPage() {
  const { id } = useParams();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <span className="material-symbols-outlined text-primary text-5xl animate-spin">refresh</span>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
      <div className="layout-container flex h-full grow flex-col">
        {/* Top Navigation */}
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 py-3 lg:px-40">
          <div className="flex items-center gap-4 text-primary">
            <div className="size-6 flex items-center justify-center">
              <span className="material-symbols-outlined font-bold">flight_takeoff</span>
            </div>
            <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight">Booking Details</h2>
          </div>
          <div className="flex gap-2">
            <button className="flex size-10 cursor-pointer items-center justify-center rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-slate-700 dark:text-slate-300">share</span>
            </button>
            <button className="flex size-10 cursor-pointer items-center justify-center rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-slate-700 dark:text-slate-300">more_horiz</span>
            </button>
          </div>
        </header>

        <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full py-6 px-4 lg:px-0 gap-6">
          {/* Hero Header */}
          <div className="relative group">
            <div 
              className="bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-xl min-h-80 shadow-lg relative" 
              style={{ backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 50%), url("https://picsum.photos/seed/santorini-details/1200/800")` }}
            >
              <div className="p-6 relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Upcoming Trip</span>
                </div>
                <h1 className="text-white text-4xl font-bold leading-tight">Santorini, Greece</h1>
                <p className="text-slate-200 text-lg">October 12 - October 19, 2024</p>
              </div>
            </div>
          </div>

          {/* Status Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-3 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined">check_circle</span>
              </div>
              <div>
                <p className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight">Booking Confirmed</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Reference: <span className="font-mono text-primary uppercase">#{id || 'TRV-8829104'}</span></p>
              </div>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none px-4 py-2 text-sm font-bold bg-primary text-white rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">download</span>
                Invoice
              </button>
              <button className="flex-1 sm:flex-none px-4 py-2 text-sm font-bold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                Modify
              </button>
            </div>
          </div>

          {/* Itinerary Section */}
          <section className="flex flex-col gap-4">
            <h2 className="text-slate-900 dark:text-slate-100 text-2xl font-bold px-1">Your Itinerary</h2>
            
            {/* Flight Card */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 overflow-hidden shadow-sm">
              <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-3 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">flight_takeoff</span>
                  <span className="font-bold text-sm uppercase tracking-wide">Flight Details</span>
                </div>
                <span className="text-xs font-medium text-slate-500">Economy Class</span>
              </div>
              <div className="p-6 flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1 flex justify-between items-center w-full">
                  <div className="text-center sm:text-left">
                    <p className="text-3xl font-bold">LHR</p>
                    <p className="text-sm text-slate-500">London, UK</p>
                    <p className="text-xs font-bold mt-1">10:30 AM</p>
                  </div>
                  <div className="flex flex-col items-center px-4 flex-1">
                    <div className="w-full flex items-center gap-2">
                      <div className="h-[2px] flex-1 bg-slate-200 dark:bg-slate-700 border-dotted border-b-2"></div>
                      <span className="material-symbols-outlined text-slate-400 rotate-90">flight</span>
                      <div className="h-[2px] flex-1 bg-slate-200 dark:bg-slate-700 border-dotted border-b-2"></div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 uppercase font-bold tracking-widest">3h 15m</p>
                  </div>
                  <div className="text-center sm:text-right">
                    <p className="text-3xl font-bold">JTR</p>
                    <p className="text-sm text-slate-500">Santorini, GR</p>
                    <p className="text-xs font-bold mt-1">1:45 PM</p>
                  </div>
                </div>
                <div className="w-full md:w-px md:h-16 bg-slate-200 dark:bg-slate-800"></div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">airplane_ticket</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-slate-100">Aegean Airlines</p>
                    <p className="text-sm text-slate-500">Flight A3 420 • Oct 12</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hotel Card */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 overflow-hidden shadow-sm">
              <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">hotel</span>
                <span className="font-bold text-sm uppercase tracking-wide">Accommodation</span>
              </div>
              <div className="p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-full sm:w-32 h-32 relative rounded-lg overflow-hidden shrink-0">
                    <Image 
                      alt="Luxury hotel room" 
                      fill 
                      className="object-cover" 
                      src="https://picsum.photos/seed/hotel-cave/400/400"
                      data-ai-hint="luxury hotel"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">Iconic Santorini, a Boutique Cave Hotel</h3>
                    <p className="text-sm text-slate-500 mb-4">Imerovigli, Santorini, 84700</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                        <p className="text-[10px] uppercase font-bold text-slate-400">Check-in</p>
                        <p className="font-bold text-slate-900 dark:text-slate-100">Oct 12, 3:00 PM</p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                        <p className="text-[10px] uppercase font-bold text-slate-400">Check-out</p>
                        <p className="font-bold text-slate-900 dark:text-slate-100">Oct 19, 11:00 AM</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm">
                      <span className="material-symbols-outlined text-primary text-sm">bed</span>
                      <span className="font-medium">Deluxe Cave Suite (1 Bedroom)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Traveler & Payment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traveler Information */}
            <section className="flex flex-col gap-4">
              <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold px-1">Travelers</h2>
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 shadow-sm h-full">
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">JD</div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-slate-100">John Doe</p>
                      <p className="text-xs text-slate-500">Primary Contact • Adult</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold">SD</div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-slate-100">Sarah Doe</p>
                      <p className="text-xs text-slate-500">Adult</p>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* Payment Summary */}
            <section className="flex flex-col gap-4">
              <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold px-1">Payment Summary</h2>
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 shadow-sm h-full">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Flight (2 Adults)</span>
                    <span className="font-medium">$840.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Accommodation (7 Nights)</span>
                    <span className="font-medium">$2,150.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Taxes & Fees</span>
                    <span className="font-medium">$124.50</span>
                  </div>
                  <div className="border-t border-slate-200 dark:border-slate-800 pt-3 flex justify-between">
                    <span className="font-bold">Total Paid</span>
                    <span className="font-bold text-primary">$3,114.50</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-500">credit_card</span>
                    <span className="text-xs font-bold text-slate-500">Visa ending in 4242</span>
                  </div>
                  <span className="text-[10px] font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded">PAID</span>
                </div>
              </div>
            </section>
          </div>

          {/* Danger Zone */}
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20">
              <div>
                <p className="font-bold text-red-700 dark:text-red-400">Cancel Booking</p>
                <p className="text-sm text-red-600/70 dark:text-red-400/70">Cancellations are free until Oct 05, 2024.</p>
              </div>
              <button className="w-full sm:w-auto px-6 py-2 border border-red-200 dark:border-red-900/30 text-red-700 dark:text-red-400 font-bold rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-all">
                Cancel Trip
              </button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto px-6 py-10 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">Need help with your booking? <Link href="#" className="text-primary font-bold">Contact Support</Link></p>
          <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest">© 2024 TravelEase Global Inc.</p>
        </footer>
      </div>
    </div>
  );
}
