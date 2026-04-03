import { createClient as createServerClient } from '@/lib/supabase/server';
import type { SupabaseClient } from '@supabase/supabase-js';

export async function createConfianceClient(): Promise<SupabaseClient> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (await createServerClient()) as any;
}
