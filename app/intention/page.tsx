import React from 'react';
import IntentionShell from '@/components/intention/IntentionShell';

export const metadata = {
  title: "Intelligence de l'Intention | RAQIB V4",
  description: "Économie de l'Intention - Bloomberg des données",
};

export default function IntentionPage() {
  return (
    <main className="w-full h-screen overflow-hidden">
      <IntentionShell />
    </main>
  );
}
