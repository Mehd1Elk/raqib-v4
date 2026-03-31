'use client';
import dynamic from 'next/dynamic';
const NOOSPage = dynamic(() => import('@/components/entity/NOOSPage'), { ssr: false });
export default function Page() { return <NOOSPage />; }
