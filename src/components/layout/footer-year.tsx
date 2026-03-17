'use client';

import { useState, useEffect } from 'react';

export function FooterYear() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  // Fallback to 2026 during hydration to avoid mismatches and satisfy user request
  return <span>{year || '2026'}</span>;
}