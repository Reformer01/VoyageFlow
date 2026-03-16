
"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Globe, Chrome, Facebook, ArrowRight, User, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/firebase';
import { initiateEmailSignIn, initiateEmailSignUp } from '@/firebase/non-blocking-login';
import { GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import Image from 'next/image';

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const auth = useAuth();
  const [view, setView] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'register') setView('register');
  }, [searchParams]);

  const handleEmailAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      if (view === 'login') {
        initiateEmailSignIn(auth, email, password);
      } else {
        initiateEmailSignUp(auth, email, password);
      }
      // Success is handled by the provider's onAuthStateChanged which usually triggers a redirect
      // We'll add a slight delay for better UX
      setTimeout(() => router.push('/'), 1500);
    } catch (error) {
      console.error("Auth error:", error);
      setLoading(false);
    }
  };

  const handleSocialLogin = async (providerName: 'google' | 'facebook') => {
    try {
      const provider = providerName === 'google' 
        ? new GoogleAuthProvider() 
        : new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch (error) {
      console.error(`${providerName} login failed`, error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://picsum.photos/seed/travel-bg/1920/1080" 
          alt="Travel Background" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[2px]"></div>
      </div>

      <main className="relative w-full max-w-5xl flex flex-col md:flex-row shadow-2xl rounded-3xl overflow-hidden glass-card min-h-[600px] z-10 border border-white/40">
        
        {/* Visual Brand Section */}
        <section className="hidden md:flex md:w-1/2 relative p-12 flex-col justify-between text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/60 to-indigo-900/80 z-0"></div>
          
          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-2 mb-12">
              <div className="bg-blue-400/20 p-2 rounded-lg backdrop-blur-md">
                <Globe className="h-8 w-8 text-blue-400" />
              </div>
              <span className="text-2xl font-bold tracking-tight">TravelEase</span>
            </Link>
            
            <h1 className="text-5xl font-extrabold leading-tight mb-6">
              Your next adventure <br/> starts here.
            </h1>
            <p className="text-lg text-blue-50 max-w-sm">
              Explore hidden gems and iconic landmarks around the globe with our curated travel experiences.
            </p>
          </div>

          <div className="relative z-10">
            <div className="flex -space-x-3 mb-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 w-10 rounded-full border-2 border-white overflow-hidden relative shadow-lg">
                  <Image 
                    src={`https://picsum.photos/seed/traveler-${i}/40/40`} 
                    alt={`Explorer ${i}`} 
                    fill 
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm text-blue-100 font-medium">
              Joined by <span className="text-white font-bold">50,000+</span> world explorers
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="w-full md:w-1/2 p-8 md:p-12 bg-white flex flex-col justify-center">
          {/* Tab Switch */}
          <div className="flex border-b border-gray-100 mb-8">
            <button 
              className={`py-3 px-6 text-sm font-bold transition-all border-b-2 ${view === 'login' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
              onClick={() => setView('login')}
            >
              Login
            </button>
            <button 
              className={`py-3 px-6 text-sm font-bold transition-all border-b-2 ${view === 'register' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
              onClick={() => setView('register')}
            >
              Register
            </button>
          </div>

          <div className="space-y-6">
            {view === 'login' ? (
              <header>
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome Back</h2>
                <p className="text-gray-500 mt-2">Please enter your details to access your trips.</p>
              </header>
            ) : (
              <header>
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Create Account</h2>
                <p className="text-gray-500 mt-2">Join the community and plan your next journey.</p>
              </header>
            )}

            <form onSubmit={handleEmailAuth} className="space-y-4">
              {view === 'register' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fname">First Name</Label>
                    <Input id="fname" name="fname" placeholder="John" required className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lname">Last Name</Label>
                    <Input id="lname" name="lname" placeholder="Doe" required className="h-11 rounded-xl" />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input id="email" name="email" type="email" placeholder="alex@example.com" className="pl-10 h-11 rounded-xl" required />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {view === 'login' && (
                    <Link href="#" className="text-xs text-blue-600 font-bold hover:underline">Forgot password?</Link>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input id="password" name="password" type="password" placeholder="••••••••" className="pl-10 h-11 rounded-xl" required minLength={8} />
                </div>
              </div>

              {view === 'login' && (
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" className="rounded-md" />
                  <label htmlFor="remember" className="text-sm font-medium text-gray-600 cursor-pointer">Remember me</label>
                </div>
              )}

              <Button 
                type="submit" 
                className={`w-full h-12 text-lg font-bold group rounded-xl transition-all ${view === 'login' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-indigo-600 hover:bg-indigo-700'}`} 
                disabled={loading}
              >
                {loading ? 'Processing...' : (view === 'login' ? 'Sign In' : 'Create Account')}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>

            <div className="relative mt-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-100" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest font-semibold">
                <span className="bg-white px-3 text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="h-12 font-bold gap-3 rounded-xl border-gray-200 hover:bg-gray-50 transition-all group" 
                onClick={() => handleSocialLogin('google')}
              >
                <Chrome className="h-5 w-5 text-red-500 group-hover:scale-110 transition-transform" /> Google
              </Button>
              <Button 
                variant="outline" 
                className="h-12 font-bold gap-3 rounded-xl bg-[#1877F2] text-white border-transparent hover:bg-[#166fe5] transition-all group" 
                onClick={() => handleSocialLogin('facebook')}
              >
                <Facebook className="h-5 w-5 fill-current group-hover:scale-110 transition-transform" /> Facebook
              </Button>
            </div>

            {view === 'register' && (
              <p className="text-[11px] text-gray-400 text-center">
                By clicking Register, you agree to our <Link href="#" className="text-blue-600 hover:underline">Terms</Link> and <Link href="#" className="text-blue-600 hover:underline">Privacy Policy</Link>.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
