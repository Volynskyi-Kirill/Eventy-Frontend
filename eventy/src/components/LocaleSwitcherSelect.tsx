'use client';

import { useParams } from 'next/navigation';
import { ChangeEvent, ReactNode, useTransition } from 'react';
import { Locale, usePathname, useRouter } from '@/i18n/routing';

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  return (
    <label className='relative block text-gray-400'>
      <p className='sr-only'>{label}</p>
      <select
        className={`inline-flex w-full appearance-none rounded-md bg-gray-800 py-2 pl-3 pr-8 text-sm text-white 
          shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
          ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <span className='absolute right-2 top-2 pointer-events-none text-white'>
        ⌄
      </span>
    </label>
  );
}
