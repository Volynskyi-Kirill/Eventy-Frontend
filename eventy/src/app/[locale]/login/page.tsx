'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import PasswordInput from '@/components/originUI/PasswordInput';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const t = useTranslations('LoginPage');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form submitted!'); 
  };

  return (
    <div className='grid h-screen w-full lg:grid-cols-2'>
      <div className='relative hidden lg:block'>
        <Image
          src='/login-page/login-event-background-img.jpg'
          alt='Login background image'
          fill
          className='object-cover'
          priority
        />
        <div className='absolute inset-0 flex items-center justify-center'>
          <Image
            src='/login-page/login-image-logo.svg'
            alt='Logo'
            width={80}
            height={80}
          />
        </div>
      </div>
      <div className='flex items-center justify-center bg-black px-6 lg:px-16'>
        <div className='w-full max-w-[440px] space-y-6'>
          <div className='space-y-2'>
            <h1 className='text-5xl font-bold tracking-tight text-white'>
              {t('title')}
            </h1>
            <div className='w-[100px] h-[2px] bg-emerald-500'></div>
            <p className='text-base text-white'>
              {t.rich('subtitle', {
                br: () => <br />,
                strong: (chunks) => (
                  <strong className='text-emerald-500'>{chunks}</strong>
                ),
              })}
            </p>
          </div>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div className='space-y-2'>
              <Input
                id='email'
                type='email'
                placeholder={t('emailPlaceholder')}
                className='h-12 border-0 bg-white/5 text-white placeholder:text-muted-foreground'
                required
              />
            </div>
            <PasswordInput
              placeholder={t('passwordPlaceholder')}
              className='h-12'
            />
            <div className='text-right'>
              <Link
                href='/forgot-password'
                className='text-sm text-emerald-500 hover:text-emerald-400'
              >
                {t('forgotPassword')}
              </Link>
            </div>
            <Button
              type='submit'
              className='h-12 w-full bg-emerald-500 text-white hover:bg-emerald-600'
            >
              {t('loginButton')}
            </Button>
          </form>

          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-emerald-500'></div>
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-black px-2 text-muted-foreground text-white'>
                {t('orContinueWith')}
              </span>
            </div>
          </div>
          <Button
            variant='outline'
            className='h-12 w-full border-white/10 bg-white/5 text-white hover:bg-white/10'
          >
            <Image
              src='/login-page/login-button-google.png'
              alt='Google'
              width={20}
              height={20}
              className='mr-2 h-5 w-5'
            />
            {t('loginWithGoogle')}
          </Button>
          <p className='text-center text-sm text-muted-foreground text-white'>
            {t('noAccount')}{' '}
            <Link
              href='/sign-up'
              className='text-emerald-500 hover:text-emerald-400'
            >
              {t('signUp')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
