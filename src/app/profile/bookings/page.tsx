
"use client";

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function MyBookingsPage() {
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
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark px-6 md:px-20 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-3xl font-bold">flight_takeoff</span>
            <h2 className="text-xl font-black leading-tight tracking-tight text-slate-900 dark:text-white uppercase">TravelEase</h2>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link className="text-slate-600 dark:text-slate-300 hover:text-primary text-sm font-semibold transition-colors" href="/">Home</Link>
            <Link className="text-slate-600 dark:text-slate-300 hover:text-primary text-sm font-semibold transition-colors" href="/search">Search</Link>
            <Link className="text-primary text-sm font-bold border-b-2 border-primary pb-1" href="/profile/bookings">My Bookings</Link>
            <Link className="text-slate-600 dark:text-slate-300 hover:text-primary text-sm font-semibold transition-colors" href="/profile">Profile</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">My Bookings</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Manage your upcoming journeys and travel history</p>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary">event_upcoming</span>
            Upcoming Trips
          </h3>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-48 h-40 relative">
                <Image fill src="https://picsum.photos/seed/santorini/400/300" alt="Santorini" className="object-cover" />
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold uppercase tracking-widest text-primary">Booking #TE-88291</span>
                      <span className="px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] font-bold uppercase">Confirmed</span>
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white">Santorini, Greece</h4>
                    <p className="text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-sm">calendar_today</span>
                      Oct 12 - Oct 19, 2024
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400">Total Price</p>
                    <p className="text-xl font-black text-slate-900 dark:text-white">$1,840.00</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-400 uppercase font-bold">Flight</span>
                      <span className="text-sm font-medium">Lufthansa A320</span>
                    </div>
                    <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-400 uppercase font-bold">Hotel</span>
                      <span className="text-sm font-medium">Azure Resort & Spa</span>
                    </div>
                  </div>
                  <Link href="/profile/bookings/TE-88291">
                    <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-bold transition-colors">View Details</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
