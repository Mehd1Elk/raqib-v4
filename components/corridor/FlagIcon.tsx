'use client';

import { getFlag } from '../../lib/corridor/flags';

interface FlagIconProps {
  code: string;
  size?: number;
}

export function FlagIcon({ code, size = 40 }: FlagIconProps) {
  const svg = getFlag(code, size);
  return <span className="country-flag" dangerouslySetInnerHTML={{ __html: svg }} />;
}
