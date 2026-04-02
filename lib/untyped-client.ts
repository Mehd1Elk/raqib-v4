// Generic untyped Supabase client for custom tables not in Database types
// (acq_*, diwane_*, science_*, corridor_*, etc.)
import { createClient as createServerClient } from '@/lib/supabase/server';
import type { SupabaseClient } from '@supabase/supabase-js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createUntypedClient(): Promise<SupabaseClient> {
  return (await createServerClient()) as any;
}
