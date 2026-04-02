// Untyped Supabase client for acq_* tables
// The generated Database types don't include acq_ tables yet.
// This helper wraps the server client with a type cast.
import { createClient as createServerClient } from '@/lib/supabase/server';
import type { SupabaseClient } from '@supabase/supabase-js';

export async function createAcqClient(): Promise<SupabaseClient> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (await createServerClient()) as any;
}
