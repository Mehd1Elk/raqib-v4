'use client';
import dynamic from 'next/dynamic';
const AelyaPage = dynamic(() => import('@/components/entity/AelyaPage'), { ssr: false });
export default function Page() { return <AelyaPage />; }
