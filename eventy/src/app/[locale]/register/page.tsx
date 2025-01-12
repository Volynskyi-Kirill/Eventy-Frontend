'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PasswordInput from '@/components/originUI/PasswordInput';
import { URLS } from '@/components/Navigation/urls';

export default function RegisterPage() {
  const t = useTranslations('RegisterPage');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form submitted!');
  };

  return (
    <div className='dark'>
      <div className='grid lg:grid-cols-2 min-h-screen'>
        <div className='relative hidden lg:block'>
          <Image
            src='/login-page/login-event-background-img.jpg'
            alt='Event crowd background'
            fill
            className='object-cover'
            priority
          />
          <div className='absolute inset-0 flex items-center justify-center'>
            <Image
              src='/login-page/login-image-logo.svg'
              alt='Evently logo'
              width={80}
              height={80}
              priority
            />
          </div>
        </div>

        <div className='flex items-center justify-center p-8 bg-black'>
          <div className='w-full max-w-md space-y-8'>
            <div className='space-y-2'>
              <h1 className='text-4xl font-bold tracking-tight text-white'>
                {t('title')}
                <div className='w-[100px] h-[2px] bg-emerald-500 mt-2'></div>
              </h1>
              <p className='text-gray-400'>
                {t.rich('subtitle', {
                  br: () => <br />,
                  strong: (chunks) => (
                    <strong className='text-emerald-500'>{chunks}</strong>
                  ),
                })}
              </p>
            </div>

            <form className='space-y-4' onSubmit={handleSubmit}>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Input
                    type='text'
                    placeholder={t('namePlaceholder')}
                    className='bg-transparent border-gray-800 text-white'
                    required
                  />
                </div>
                <div>
                  <Input
                    type='text'
                    placeholder={t('surnamePlaceholder')}
                    className='bg-transparent border-gray-800 text-white'
                    required
                  />
                </div>
              </div>

              <div>
                <Input
                  type='tel'
                  placeholder={t('phonePlaceholder')}
                  className='bg-transparent border-gray-800 text-white'
                  required
                />
              </div>

              <div>
                <Input
                  type='email'
                  placeholder={t('emailPlaceholder')}
                  className='bg-transparent border-gray-800 text-white'
                  required
                />
              </div>

              <PasswordInput
                placeholder={t('passwordPlaceholder')}
                className='bg-transparent border-gray-800 text-white'
              />

              <PasswordInput
                placeholder={t('confirmPasswordPlaceholder')}
                className='bg-transparent border-gray-800 text-white'
              />

              <Button className='w-full bg-emerald-500 hover:bg-emerald-600 text-white'>
                {t('signUpButton')}
              </Button>

              <p className='text-center text-gray-400'>
                {t('haveAccount')}{' '}
                <Link
                  href={URLS.LOGIN}
                  className='text-emerald-500 hover:text-emerald-400'
                >
                  {t('login')}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
