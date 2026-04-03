'use client';
import dynamic from 'next/dynamic';
const MYNEShell = dynamic(() => import('@/components/myne/MYNEShell'), { ssr: false });
export default function Page() { return <MYNEShell />; }
