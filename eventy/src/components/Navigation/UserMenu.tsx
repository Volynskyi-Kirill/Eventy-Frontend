'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { URLS } from './urls';

export function UserMenu() {
  const t = useTranslations('Navigation');
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const { user } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push(URLS.CLIENT.HOME);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src={user?.avatarUrl as string} alt='@username' />
            <AvatarFallback>
              {user?.userName?.[0]}
              {user?.userSurname?.[0]}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuItem
          onClick={() => router.push(URLS.SHARED.ACCOUNT_SETTINGS)}
        >
          {t('accountSettings')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleLogout}
          className='text-red-500 hover:text-red-700'
        >
          {t('logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
