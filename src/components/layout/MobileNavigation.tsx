"use client";

import Link from 'next/link';
import { ShoppingBasket, User, X, Search, Luggage, CreditCard, Settings, HelpCircle, LogOut, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useBasket } from '@/context/basket-context';
import { useUser, useAuth } from '@/supabase';
import { useState } from 'react';

interface MobileNavigationProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileNavigation({ isOpen, onOpenChange }: MobileNavigationProps) {
  const { items } = useBasket();
  const { user } = useUser();
  const auth = useAuth();
  const loginFor = (path: string) => `/auth/login?next=${encodeURIComponent(path)}`;
  const [searchQuery, setSearchQuery] = useState('');

  const handleSignOut = async () => {
    await auth.auth.signOut();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full max-w-sm p-0">
        <SheetHeader className="border-b border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-bold">Menu</SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        {/* Search Section */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                window.location.href = `/search?query=${encodeURIComponent(searchQuery.trim())}`;
                onOpenChange(false);
              }
            }}
            className="space-y-4"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-slate-100 placeholder:text-slate-500"
                autoFocus
              />
            </div>
            <Button type="submit" className="w-full">
              Search
            </Button>
          </form>
        </div>

        {/* User Section */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/20 border-2 border-primary overflow-hidden">
                <img 
                  src={(user.user_metadata?.avatar_url as string | undefined) || "https://picsum.photos/seed/user/48/48"} 
                  className="h-full w-full object-cover" 
                  alt="Profile" 
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  {user.user_metadata?.full_name || user.email}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {user.email}
                </p>
              </div>
            </div>
          ) : (
            <Link href="/auth/login" onClick={() => onOpenChange(false)}>
              <Button className="w-full" size="lg">
                Sign In
              </Button>
            </Link>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-6 space-y-2">
          <Link
            href="/"
            onClick={() => onOpenChange(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Home className="h-5 w-5" />
            <span className="font-medium">Home</span>
          </Link>

          <Link
            href="/search"
            onClick={() => onOpenChange(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Search className="h-5 w-5" />
            <span className="font-medium">Search</span>
          </Link>

          <Link
            href="/search?type=car"
            onClick={() => onOpenChange(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">directions_car</span>
            <span className="font-medium">Cars</span>
          </Link>

          <Link
            href={user ? "/profile/bookings" : loginFor('/profile/bookings')}
            onClick={() => onOpenChange(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Luggage className="h-5 w-5" />
            <span className="font-medium">My Bookings</span>
          </Link>

          <Link
            href="/support"
            onClick={() => onOpenChange(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <HelpCircle className="h-5 w-5" />
            <span className="font-medium">Support</span>
          </Link>

          {user && (
            <>
              <div className="border-t border-slate-200 dark:border-slate-800 my-2"></div>
              
              <Link
                href="/profile"
                onClick={() => onOpenChange(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="font-medium">Profile</span>
              </Link>

              <Link
                href="/profile/payments"
                onClick={() => onOpenChange(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <CreditCard className="h-5 w-5" />
                <span className="font-medium">Payments</span>
              </Link>

              <Link
                href="/profile/settings"
                onClick={() => onOpenChange(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Settings className="h-5 w-5" />
                <span className="font-medium">Settings</span>
              </Link>

              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </>
          )}
        </nav>

        {/* Basket Section */}
        {user && (
          <div className="p-6 border-t border-slate-200 dark:border-slate-800">
            <Link
              href="/basket"
              onClick={() => onOpenChange(false)}
              className="flex items-center justify-between w-full p-4 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <ShoppingBasket className="h-5 w-5 text-primary" />
                <span className="font-medium text-primary">Basket</span>
              </div>
              {items.length > 0 && (
                <Badge variant="default" className="bg-primary text-white">
                  {items.length}
                </Badge>
              )}
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
