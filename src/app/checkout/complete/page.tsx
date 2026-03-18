"use client";

import { Suspense } from 'react';
import CheckoutCompleteContent from './CheckoutCompleteContent';

export default function CheckoutCompletePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 p-6">
          <div className="max-w-lg w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-slate-100 dark:border-slate-800 rounded-full" />
              <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">refresh</span>
              </div>
            </div>
            <h1 className="text-2xl font-black mt-4">Completing checkout</h1>
            <p className="text-slate-500 mt-2">Preparing payment verification...</p>
          </div>
        </div>
      }
    >
      <CheckoutCompleteContent />
    </Suspense>
  );
}
