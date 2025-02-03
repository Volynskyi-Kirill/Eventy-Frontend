'use client';

import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { URLS } from './urls';
import { useTranslations } from 'next-intl';

export function CreateEventButton() {
  const t = useTranslations('Navigation');

  return (
    <Link
      href={URLS.ORGANIZER.EVENTS_NEW}
      className={cn(
        'inline-flex h-9 items-center justify-center rounded-md px-4 text-sm transition-colors',
        'bg-emerald-500 text-white hover:bg-emerald-600',
        'font-semibold'
      )}
    >
      {t('organizer.createEvent')}
    </Link>
  );
}
