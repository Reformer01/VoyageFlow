"use client";

import { useUser, useAuth, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signOut } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const db = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });

  const profileRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, 'users', user.uid);
  }, [db, user]);

  const { data: profile, isLoading: isProfileLoading } = useDoc(profileRef);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || user?.email || '',
        phoneNumber: profile.phoneNumber || ''
      });
    } else if (user) {
      const names = user.displayName?.split(' ') || ['', ''];
      setFormData({
        firstName: names[0] || '',
        lastName: names.slice(1).join(' ') || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || ''
      });
    }
  }, [profile, user]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileRef || !user) return;

    setSaving(true);
    const updateData = {
      ...formData,
      id: user.uid,
      updatedAt: serverTimestamp(),
      createdAt: profile?.createdAt || serverTimestamp(),
      email: user.email // Ensure email matches auth for security/consistency
    };

    setDoc(profileRef, updateData, { merge: true })
      .then(() => {
        toast({ title: "Profile Updated", description: "Your changes have been saved successfully." });
        setSaving(false);
      })
      .catch((error) => {
        const permissionError = new FirestorePermissionError({
          path: profileRef.path,
          operation: 'update',
          requestResourceData: updateData,
        });
        errorEmitter.emit('permission-error', permissionError);
        setSaving(false);
      });
  };

  if (isUserLoading || isProfileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark text-primary">
        <span className="material-symbols-outlined text-5xl animate-spin">refresh</span>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display transition-colors duration-300">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-8">
            <Link href="/" className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-3xl font-bold">flight_takeoff</span>
              <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold tracking-tight uppercase">TravelEase</h2>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm font-medium" href="/search">Explore</Link>
              <Link className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm font-medium" href="/profile/bookings">Bookings</Link>
              <Link className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm font-medium" href="/support">Support</Link>
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
                <h3 className="mt-4 text-lg font-bold truncate max-w-full text-center px-2">
                  {formData.firstName || formData.lastName ? `${formData.firstName} ${formData.lastName}` : (user.displayName || 'Explorer')}
                </h3>
                <p className="text-sm text-primary font-medium">Verified Account</p>
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
            <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-xl font-bold">Personal Information</h2>
              </div>
              <form onSubmit={handleSave} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-600 dark:text-slate-400">First Name</Label>
                    <Input 
                      value={formData.firstName} 
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      placeholder="John"
                      className="rounded-xl border-slate-200 dark:border-slate-700 h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-600 dark:text-slate-400">Last Name</Label>
                    <Input 
                      value={formData.lastName} 
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      placeholder="Doe"
                      className="rounded-xl border-slate-200 dark:border-slate-700 h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-600 dark:text-slate-400">Email Address</Label>
                    <Input 
                      value={formData.email} 
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="name@example.com"
                      type="email"
                      disabled
                      className="rounded-xl border-slate-200 dark:border-slate-700 h-11 bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed opacity-70"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-600 dark:text-slate-400">Phone Number</Label>
                    <Input 
                      value={formData.phoneNumber} 
                      onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                      placeholder="+1 (555) 000-0000"
                      className="rounded-xl border-slate-200 dark:border-slate-700 h-11"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Button disabled={saving} type="submit" className="px-10 font-bold rounded-xl h-12 shadow-lg shadow-primary/20 hover:scale-[0.98] transition-all">
                    {saving ? (
                      <>
                        <span className="material-symbols-outlined animate-spin mr-2">refresh</span>
                        Saving...
                      </>
                    ) : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}