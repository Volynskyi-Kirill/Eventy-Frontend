import { useTranslations } from 'next-intl';
import NavigationLink from './NavigationLink';
import LocaleSwitcher from './LocaleSwitcher';

export default function Navigation() {
  const t = useTranslations('Navigation');

  return (
    <div className='bg-slate-850'>
      <nav className='container flex justify-between p-2'>
        <div className='flex gap-4'>
          <NavigationLink href='/'>{t('home')}</NavigationLink>
          <NavigationLink href='/events'>{t('events')}</NavigationLink>
          <NavigationLink href='/subscribes'>{t('subscribers')}</NavigationLink>
          <NavigationLink href='/open-space'>{t('openSpace')}</NavigationLink>
        </div>
        <div className='flex items-center gap-4'>
          <NavigationLink href='/login'>{t('login')}</NavigationLink>
        </div>
        <LocaleSwitcher />
      </nav>
    </div>
  );
}
