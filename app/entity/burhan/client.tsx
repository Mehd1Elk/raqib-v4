'use client';

import dynamic from 'next/dynamic';

const BurhanPage = dynamic(() => import('@/components/entity/BurhanPage'), {
  ssr: false,
});

export default function BurhanClient() {
  return <BurhanPage />;
}
