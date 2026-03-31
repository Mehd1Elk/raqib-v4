import { EigenDashboard } from '@/components/eigen/EigenDashboard';

interface PageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function EigenDashboardPage({ searchParams }: PageProps) {
  const { tab } = await searchParams;
  return <EigenDashboard initialTab={tab || 'overview'} />;
}
