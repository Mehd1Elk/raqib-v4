'use client';

import dynamic from 'next/dynamic';

const DastgahModule = dynamic(() => import('@/components/dastgah/DastgahModule'), { ssr: false });

export default function DastgahPage() {
  return <DastgahModule />;
}
