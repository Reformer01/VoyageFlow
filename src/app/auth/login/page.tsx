
"use client";

import Link from 'next/link';
import { Mail, Lock, Chrome, Facebook, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-20 flex items-center justify-center">
      <Card className="w-full max-w-md glass-card border-none">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-3xl font-bold font-headline">Welcome Back</CardTitle>
          <p className="text-muted-foreground mt-2">Sign in to your VoyageFlow account</p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="gap-2">
              <Chrome className="h-4 w-4 text-red-500" /> Google
            </Button>
            <Button variant="outline" className="gap-2">
              <Facebook className="h-4 w-4 text-blue-600" /> Facebook
            </Button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="name@example.com" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-xs text-primary font-bold">Forgot?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" className="pl-10" />
              </div>
            </div>
            <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-lg font-bold group">
              Sign In <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center border-t border-white/20 pt-6">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-primary font-bold hover:underline">
              Create one
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
