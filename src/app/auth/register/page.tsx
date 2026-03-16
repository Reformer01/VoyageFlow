
"use client";

import Link from 'next/link';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-20 flex items-center justify-center">
      <Card className="w-full max-w-md glass-card border-none">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-3xl font-bold font-headline">Join VoyageFlow</CardTitle>
          <p className="text-muted-foreground mt-2">Start your next journey today</p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullname">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="fullname" placeholder="John Doe" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="name@example.com" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" className="pl-10" />
              </div>
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <input type="checkbox" id="terms" className="rounded border-muted text-primary focus:ring-primary" required />
              <label htmlFor="terms" className="text-xs text-muted-foreground">
                I agree to the <Link href="#" className="text-primary hover:underline">Terms of Service</Link> and <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
              </label>
            </div>
            <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-lg font-bold group">
              Create Account <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center border-t border-white/20 pt-6">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
