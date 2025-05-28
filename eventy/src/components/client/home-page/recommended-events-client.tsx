'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const RecommendedEvents = dynamic(
  () => import('./recommended-events').then((mod) => mod.RecommendedEvents),
  { ssr: false }
);

export function RecommendedEventsClient() {
  return (
    <Suspense fallback={<div className='h-[100dvh]'></div>}>
      <RecommendedEvents />
    </Suspense>
  );
}
