
"use client";

import { useUser, useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { signOut } from 'firebase/auth';

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, isUserLoading, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

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
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-8">
            <Link href="/" className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-3xl font-bold">flight_takeoff</span>
              <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold tracking-tight uppercase">TravelEase</h2>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm font-medium" href="/search">Explore</Link>
              <Link className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm font-medium" href="/profile/bookings">Bookings</Link>
              <Link className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm font-medium" href="#">Support</Link>
            </nav>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 border-2 border-primary overflow-hidden">
                <Image width={40} height={40} alt="Profile" className="h-full w-full object-cover" src={user.photoURL || "https://picsum.photos/seed/user/200/200"} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="flex flex-col items-center pb-6 border-b border-slate-100 dark:border-slate-800 mb-4">
                <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-primary/10">
                  <Image width={96} height={96} alt={user.displayName || "User"} src={user.photoURL || "https://picsum.photos/seed/user/200/200"} />
                </div>
                <h3 className="mt-4 text-lg font-bold">{user.displayName || "Explorer"}</h3>
                <p className="text-sm text-primary font-medium">Gold Member</p>
              </div>
              <nav className="space-y-1">
                <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-white font-medium">
                  <span className="material-symbols-outlined">person</span>
                  <span>Profile</span>
                </Link>
                <Link href="/profile/bookings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <span className="material-symbols-outlined">luggage</span>
                  <span>My Bookings</span>
                </Link>
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors font-medium">
                  <span className="material-symbols-outlined">logout</span>
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </aside>

          <div className="flex-1 space-y-8">
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-slate-500">Total Trips</p>
                  <span className="material-symbols-outlined text-primary">flight_takeoff</span>
                </div>
                <p className="text-3xl font-bold">24</p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-slate-500">Loyalty Points</p>
                  <span className="material-symbols-outlined text-primary">stars</span>
                </div>
                <p className="text-3xl font-bold">4,250</p>
              </div>
            </section>

            <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h2 className="text-xl font-bold">Personal Information</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-600 dark:text-slate-400">Full Name</Label>
                    <Input readOnly value={user.displayName || ""} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-600 dark:text-slate-400">Email Address</Label>
                    <Input readOnly value={user.email || ""} />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
