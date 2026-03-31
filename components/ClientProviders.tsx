'use client';

import { ToastProvider } from '@/components/ui/Toast';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { FocusProvider } from '@/components/focus/FocusContext';
import { FocusManager } from '@/components/focus/FocusManager';
import { WormholeProvider } from '@/components/wormhole/WormholeContext';

function KeyboardShortcuts({ children }: { children: React.ReactNode }) {
  useKeyboardShortcuts();
  return <>{children}</>;
}

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <FocusProvider>
        <KeyboardShortcuts>
          <WormholeProvider>
            <FocusManager />
            {children}
          </WormholeProvider>
        </KeyboardShortcuts>
      </FocusProvider>
    </ToastProvider>
  );
}
