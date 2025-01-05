'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import { ComponentProps } from 'react';
import { Link } from '@/i18n/routing';

export default function NavigationLink({
  href,
  ...rest
}: ComponentProps<typeof Link>) {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';
  const isActive = pathname === href;

  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={`inline-block px-4 py-2 text-sm font-medium transition-colors ${
        isActive
          ? 'text-white bg-blue-600 rounded'
          : 'text-gray-500 hover:text-gray-300'
      }`}
      href={href}
      {...rest}
    />
  );
}
