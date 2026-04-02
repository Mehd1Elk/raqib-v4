import type { Metadata } from 'next';
import { Playfair_Display, JetBrains_Mono, Noto_Sans } from 'next/font/google';
import 'leaflet/dist/leaflet.css';
import './globals.css';
import { Breadcrumb } from '@/components/Breadcrumb';
import WormholeBreadcrumb from '@/components/wormhole/WormholeBreadcrumb';
import LoadingBar from '@/components/LoadingBar';
import { ClientProviders } from '@/components/ClientProviders';
import StatusBar from '@/components/StatusBar';
import ConscienceBar from '@/components/ConscienceBar';

const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://raqib-v4.vercel.app');

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', ''],
});

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const noto = Noto_Sans({
  variable: '--font-noto',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: 'Raqib V4 · رقيب · Intelligence Stratégique',
    template: '%s | Raqib V4',
  },
  description: 'Raqib V4 — 1000 couches uniques · 9 plateformes · 10 entités · Eigen Holding SAS · Souveraineté Intégrale',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Raqib V4 · رقيب · Intelligence Stratégique',
    description: '1000 couches uniques, 10 entités et 9 plateformes pour l\'architecture multi-plateforme RAQIB V4.',
    locale: 'fr_FR',
    siteName: 'Raqib V4',
    type: 'website',
    url: '/',
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${jetbrains.variable} ${noto.variable} h-full`}
    >
      <body className="h-full font-[family-name:var(--font-noto)] text-t1 bg-cream antialiased pb-[22px]">
        <LoadingBar />
        <Breadcrumb />
        <WormholeBreadcrumb />
        <ClientProviders>
          {children}
        </ClientProviders>
        <ConscienceBar />
        <StatusBar />
      </body>
    </html>
  );
}
