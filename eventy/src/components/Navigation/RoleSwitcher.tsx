'use client';

import { USER_ROLES, useRoleStore } from '@/store/roleStore';
import { cn } from '@/lib/utils';

interface RoleSwitcherProps {
  isDarkBackground?: boolean;
}

export function RoleSwitcher({ isDarkBackground = false }: RoleSwitcherProps) {
  const { role, setRole } = useRoleStore();

  const clientLabel = 'Клиент';
  const organizerLabel = 'Организатор';

  return (
    <div
      className={cn(
        'flex items-center gap-1 rounded-full border px-1 py-1',
        isDarkBackground ? 'border-white/20' : 'border-black/20'
      )}
    >
      <button
        onClick={() => setRole(USER_ROLES.CLIENT)}
        className={cn(
          'rounded-full px-3 py-1 text-sm font-medium focus:outline-none transition-colors',
          role === USER_ROLES.CLIENT
            ? isDarkBackground
              ? 'bg-white text-black'
              : 'bg-black text-white'
            : isDarkBackground
            ? 'text-white hover:bg-white/10'
            : 'text-black hover:bg-black/10'
        )}
      >
        {clientLabel}
      </button>

      <button
        onClick={() => setRole(USER_ROLES.ORGANIZER)}
        className={cn(
          'rounded-full px-3 py-1 text-sm font-medium focus:outline-none transition-colors',
          role === USER_ROLES.ORGANIZER
            ? isDarkBackground
              ? 'bg-white text-black'
              : 'bg-black text-white'
            : isDarkBackground
            ? 'text-white hover:bg-white/10'
            : 'text-black hover:bg-black/10'
        )}
      >
        {organizerLabel}
      </button>
    </div>
  );
}
