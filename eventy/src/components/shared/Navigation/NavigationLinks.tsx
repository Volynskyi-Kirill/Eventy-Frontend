import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { URLS } from './urls';
import { USER_ROLES, useRoleStore } from '@/store/roleStore';

type NavigationLinksProps = {
  pathname: string;
  isDarkBackground?: boolean;
};

const CLIENT_NAV_LINKS = [
  { href: URLS.CLIENT.HOME, labelKey: 'home' },
  { href: URLS.CLIENT.EVENTS, labelKey: 'events' },
  { href: URLS.CLIENT.SUBSCRIBERS, labelKey: 'subscribers' },
  { href: URLS.CLIENT.OPEN_SPACE, labelKey: 'openSpace' },
];

const ORGANIZER_NAV_LINKS = [
  { href: URLS.ORGANIZER.DASHBOARD, labelKey: 'dashboard' },
  { href: URLS.ORGANIZER.EVENTS, labelKey: 'events' },
  { href: URLS.ORGANIZER.TICKETS, labelKey: 'tickets' },
  { href: URLS.ORGANIZER.TARGET, labelKey: 'target' },
  { href: URLS.ORGANIZER.PEOPLE, labelKey: 'people' },
];

export function NavigationLinks({
  pathname,
  isDarkBackground,
}: NavigationLinksProps) {
  const t = useTranslations('Navigation');
  const { role } = useRoleStore();

  const isClientMode = role === USER_ROLES.CLIENT;
  const links = isClientMode ? CLIENT_NAV_LINKS : ORGANIZER_NAV_LINKS;
  const localizationKey = isClientMode ? 'client' : 'organizer';

  return (
    <div className='flex items-center gap-3'>
      {links.map(({ href, labelKey }) => {
        const isActive = pathname.includes(href);

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'inline-flex h-9 items-center justify-center px-4 text-sm font-semibold uppercase transition-colors',
              isActive
                ? 'text-emerald-500 underline'
                : isDarkBackground
                ? 'text-white hover:text-emerald-500 hover:underline'
                : 'text-black hover:text-emerald-500 hover:underline',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500'
            )}
          >
            {t(`${localizationKey}.${labelKey}`)}
          </Link>
        );
      })}
    </div>
  );
}
