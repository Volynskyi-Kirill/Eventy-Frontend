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

const LOCALE_REGEX = /^\/[a-z]{2}(\/?)*$/;

export function NavigationLinks({ pathname }: NavigationLinksProps) {
  const t = useTranslations('Navigation');

  return (
    <div className='flex items-center gap-1'>
      {NAV_LINKS.map(({ href, labelKey }) => {
        const isHomeActive =
          labelKey === 'home' &&
          (pathname === '/' || LOCALE_REGEX.test(pathname));
        const isOtherActive = labelKey !== 'home' && pathname.includes(href);
        const isActive = isHomeActive || isOtherActive;

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors',
              isActive
                ? 'bg-emerald-500 text-white shadow-md ring-2 ring-emerald-500'
                : 'text-muted-foreground hover:text-emerald-500 hover:bg-muted/10',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500'
            )}
          >
            {t(labelKey)}
          </Link>
        );
      })}
    </div>
  );
}
