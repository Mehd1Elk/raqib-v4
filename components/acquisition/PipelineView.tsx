'use client';

import { C, FONTS } from './shared/constants';

export default function PipelineView() {
  return (
    <div style={{
      fontFamily: FONTS.title,
      fontStyle: 'italic',
      fontSize: 18,
      color: C.t2,
      padding: 40,
      textAlign: 'center',
    }}>
      Pipeline — En construction
    </div>
  );
}
