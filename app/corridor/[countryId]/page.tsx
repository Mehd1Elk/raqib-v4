'use client';

import { useParams } from 'next/navigation';
import { CountryPage } from '../../../components/corridor/CountryPage';

export default function CountryDetailPage() {
  const params = useParams();
  const countryId = params.countryId as string;
  return <CountryPage countryId={countryId} />;
}
