'use client';

import dynamic from 'next/dynamic';

const YrKnownPage = dynamic(() => import('@/components/entity/YrKnownPage'), {
  ssr: false,
});

export default function YrKnownClient() {
  return <YrKnownPage />;
}
