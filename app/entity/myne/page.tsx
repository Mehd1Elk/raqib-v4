'use client';
import dynamic from 'next/dynamic';
const MynePage = dynamic(() => import('@/components/entity/MynePage'), { ssr: false });
export default function Page() { return <MynePage />; }
