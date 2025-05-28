'use client';

import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { URLS } from './urls';
import { USER_ROLES, useRoleStore } from '@/store/roleStore';

interface NavigationLogoProps {
  isDarkBackground: boolean;
}

export default function NavigationLogo({
  isDarkBackground,
}: NavigationLogoProps) {
  const { role } = useRoleStore();

  const logoSrc = isDarkBackground
    ? '/logo-nav-white.svg'
    : '/logo-nav-black.svg';

  const href =
    role === USER_ROLES.CLIENT ? URLS.CLIENT.HOME : URLS.ORGANIZER.DASHBOARD;

  return (
    <Link href={href} className='flex items-center'>
      <Image src={logoSrc} alt='Company Logo' width={30} height={26} />
    </Link>
  );
}
