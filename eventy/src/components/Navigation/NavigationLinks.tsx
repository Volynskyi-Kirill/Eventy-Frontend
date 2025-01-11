import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { URLS } from './urls';

type NavigationLinksProps = {
  pathname: string;
};

const NAV_LINKS = [
  { href: URLS.HOME, labelKey: 'home' },
  { href: URLS.EVENTS, labelKey: 'events' },
  { href: URLS.SUBSCRIBERS, labelKey: 'subscribers' },
  { href: URLS.OPEN_SPACE, labelKey: 'openSpace' },
];

export function NavigationLinks({ pathname }: NavigationLinksProps) {
  const t = useTranslations('Navigation');

  return (
    <div className='flex items-center gap-1'>
      {NAV_LINKS.map(({ href, labelKey }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors hover:text-white',
            pathname === href
              ? 'bg-emerald-500 text-white'
              : 'text-muted-foreground'
          )}
        >
          {t(labelKey)}
        </Link>
      ))}
    </div>
  );
}
