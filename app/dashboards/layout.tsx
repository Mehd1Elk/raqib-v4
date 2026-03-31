import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tableaux de bord',
};

export default function DashboardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
