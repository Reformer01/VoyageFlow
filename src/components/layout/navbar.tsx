
"use client";

import Link from 'next/link';
import { Plane, ShoppingBasket, User, Menu, Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBasket } from '@/context/basket-context';
import { Badge } from '@/components/ui/badge';

export function Navbar() {
  const { items } = useBasket();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-lg group-hover:bg-accent transition-colors">
            <Plane className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight text-primary">
            Voyage<span className="text-accent">Flow</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/search?type=flight" className="text-sm font-medium hover:text-primary transition-colors">Flights</Link>
          <Link href="/search?type=hotel" className="text-sm font-medium hover:text-primary transition-colors">Hotels</Link>
          <Link href="/search?type=activity" className="text-sm font-medium hover:text-primary transition-colors">Activities</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/basket">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBasket className="h-5 w-5" />
              {items.length > 0 && (
                <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 text-[10px] min-w-[1.25rem] h-5" variant="default">
                  {items.length}
                </Badge>
              )}
            </Button>
          </Link>
          <Link href="/auth/login" className="hidden sm:block">
            <Button variant="ghost" className="gap-2">
              <User className="h-4 w-4" />
              Sign In
            </Button>
          </Link>
          <Button className="md:hidden" variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
