"use client";

import { Suspense } from 'react';
import RegisterRedirectContent from './RegisterRedirectContent';

export default function RegisterPageRedirect() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <span className="material-symbols-outlined text-primary text-5xl animate-spin">refresh</span>
      </div>
    }>
      <RegisterRedirectContent />
    </Suspense>
  );
}