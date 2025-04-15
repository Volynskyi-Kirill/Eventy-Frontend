'use client';

import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { URLS } from './urls';

interface NavigationLogoProps {
  isDarkBackground: boolean;
}

export default function NavigationLogo({
  isDarkBackground,
}: NavigationLogoProps) {
  const logoSrc = isDarkBackground
    ? '/logo-nav-white.svg'
    : '/logo-nav-black.svg';

  return (
    <Link href={URLS.CLIENT.HOME} className='flex items-center'>
      <Image src={logoSrc} alt='Company Logo' width={30} height={26} />
    </Link>
  );
}
