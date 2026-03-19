import { createClient, SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

function getRequiredPublicEnv(name: 'NEXT_PUBLIC_SUPABASE_URL' | 'NEXT_PUBLIC_SUPABASE_ANON_KEY'): string {
  // Temporary hardcoded values to bypass env var loading issues
  if (name === 'NEXT_PUBLIC_SUPABASE_URL') {
    return 'https://mftjdjtegxgvpkdjpbas.supabase.co';
  }
  if (name === 'NEXT_PUBLIC_SUPABASE_ANON_KEY') {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mdGpkanRlZ3hndnBrZGpwYmFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4MjUzMTMsImV4cCI6MjA4OTQwMTMxM30.jodf3fUG6Ad1PvgXOlcxGMj0CtobidJ4JYRYsTWYTFI';
  }
  
  const value = process.env[name];
  console.log(`[DEBUG] ${name}:`, value ? 'exists' : 'missing', value?.substring(0, 20) + '...');
  
  if (!value) {
    throw new Error(
      `Supabase environment variables are not set. Supabase auth will not work without NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.`
    );
  }

  const trimmed = value.trim();
  if (
    trimmed.includes('YOUR-PROJECT-REF') ||
    trimmed.includes('YOUR_SUPABASE_ANON_KEY') ||
    trimmed.includes('YOUR_SUPABASE_SERVICE_ROLE_KEY') ||
    trimmed.includes('your-actual-project-ref') ||
    trimmed.includes('your-actual-anon-key-here') ||
    trimmed.includes('your-actual-service-role-key-here')
  ) {
    throw new Error(
      `Supabase env var ${name} appears to be a placeholder value. Update .env.local with real Supabase credentials from Project Settings -> API.`
    );
  }

  if (name === 'NEXT_PUBLIC_SUPABASE_URL') {
    try {
      const url = new URL(trimmed);
      if (url.protocol !== 'https:' && url.protocol !== 'http:') {
        throw new Error('Invalid protocol');
      }
    } catch {
      throw new Error(
        `Supabase env var ${name} is not a valid URL. Expected something like https://<project-ref>.supabase.co.`
      );
    }
  }

  return trimmed;
}

export function getSupabaseClient(): SupabaseClient {
  if (client) return client;

  const supabaseUrl = getRequiredPublicEnv('NEXT_PUBLIC_SUPABASE_URL');
  const supabaseAnonKey = getRequiredPublicEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');

  client = createClient(supabaseUrl, supabaseAnonKey);
  return client;
}

// Backwards compatibility - lazy initialize on first access
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return getSupabaseClient()[prop as keyof SupabaseClient];
  }
});
