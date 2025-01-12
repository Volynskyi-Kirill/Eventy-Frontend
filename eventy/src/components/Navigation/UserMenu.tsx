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
import { TokenService } from '@/lib/token.service';
import { useRouter } from 'next/navigation';
import { URLS } from './urls';

export function UserMenu() {
  const t = useTranslations('Navigation');
  const router = useRouter();

  const handleLogout = () => {
    TokenService.removeAccessToken();
    router.push(URLS.HOME);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src='/avatars/01.png' alt='@username' />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuItem onClick={() => router.push(URLS.ACCOUNT_SETTINGS)}>
          {t('accountSettings')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          {t('logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
