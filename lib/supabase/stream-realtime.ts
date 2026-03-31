import { createClient } from './client';

const supabase = createClient();

export function subscribeToStream(onEvent: (event: any) => void) {
  const channel = supabase
    .channel('stream')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'stream_events' },
      (payload) => {
        onEvent(payload.new);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

export function subscribeToDecisions(onDecision: (d: any) => void) {
  const channel = supabase
    .channel('decisions')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'decisions' },
      (payload) => {
        onDecision(payload.new);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
