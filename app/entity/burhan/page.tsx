import type { Metadata } from 'next';
import BurhanClient from './client';

export const metadata: Metadata = {
  title: 'BURHAN — Blockchain & Preuve',
  description: 'Couche de preuve immutable pour l\'ecosysteme sante. Transactions hashees on-chain via Polygon zkEVM.',
};

export default function Page() {
  return <BurhanClient />;
}
