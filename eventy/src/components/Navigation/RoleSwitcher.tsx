'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { USER_ROLES, useRoleStore } from '@/store/roleStore';

interface RoleSwitcherProps {
  isDarkBackground?: boolean;
}

const containerBaseClass =
  'flex items-center gap-1 rounded-full border px-1 py-1';
const buttonBaseClass =
  'rounded-full px-3 py-1 text-sm font-medium focus:outline-none transition-colors';

const activeDarkClass = 'bg-white text-black';
const inactiveDarkClass = 'text-white hover:bg-white/10';
const activeLightClass = 'bg-black text-white';
const inactiveLightClass = 'text-black hover:bg-black/10';

export function RoleSwitcher({ isDarkBackground = false }: RoleSwitcherProps) {
  const { role, setRole } = useRoleStore();
  const t = useTranslations('Navigation');

  const getButtonClasses = (buttonRole: USER_ROLES) => {
    const isActive = role === buttonRole;

    if (isActive && isDarkBackground)
      return cn(buttonBaseClass, activeDarkClass);

    if (isActive && !isDarkBackground)
      return cn(buttonBaseClass, activeLightClass);

    if (!isActive && isDarkBackground)
      return cn(buttonBaseClass, inactiveDarkClass);

    return cn(buttonBaseClass, inactiveLightClass);
  };

  return (
    <div
      className={cn(
        containerBaseClass,
        isDarkBackground ? 'border-white/20' : 'border-black/20'
      )}
    >
      <button
        onClick={() => setRole(USER_ROLES.CLIENT)}
        className={getButtonClasses(USER_ROLES.CLIENT)}
      >
        {t('roleSwitcher.client')}
      </button>

      <button
        onClick={() => setRole(USER_ROLES.ORGANIZER)}
        className={getButtonClasses(USER_ROLES.ORGANIZER)}
      >
        {t('roleSwitcher.organizer')}
      </button>
    </div>
  );
}
