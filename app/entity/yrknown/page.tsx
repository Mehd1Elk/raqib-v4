import type { Metadata } from 'next';
import YrKnownClient from './client';

export const metadata: Metadata = {
  title: 'YrKnown — Captation du Savoir',
  description: 'Capture et preservation des savoirs immateriels. De la parole d\'expert a l\'agent IA consultable.',
};

export default function Page() {
  return <YrKnownClient />;
}
