import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

export default function LoginPage() {
  const t = useTranslations('LoginPage');

  return (
    <div className='min-h-screen flex items-center justify-center bg-background text-foreground'>
      {/* Контейнер страницы */}
      <div className='container mx-auto px-4 lg:px-0 flex flex-col lg:flex-row items-center max-w-5xl'>
        {/* Левая часть с изображением */}
        <div className='hidden lg:block lg:w-1/2 h-[500px] rounded-lg overflow-hidden relative'>
          <Image
            // src='/login-event.jpg'
            src='/background-login-img.jpeg'
            alt='Login background image'
            layout='fill'
            objectFit='cover'
            priority
          />
          {/* Затемнение через overlay */}
          <div className='absolute inset-0 bg-black bg-opacity-50'></div>

          {/* Контейнер для логотипа */}
          <div className='absolute inset-0 flex items-center justify-center'>
            <Image
              src='/login-image-logo.svg'
              alt='Logo'
              width={80}
              height={80}
              className='opacity-80'
            />
          </div>
        </div>

        {/* Правая часть с формой */}
        <div className='w-full lg:w-1/2 bg-card p-6 lg:p-12 rounded-lg shadow-lg'>
          <h1 className='text-2xl lg:text-4xl font-bold text-primary mb-4'>
            {t('title')}
          </h1>
          <p className='text-muted-foreground mb-6'>{t('subtitle')}</p>

          <form className='space-y-4'>
            {/* Поле Email */}
            <div>
              <Label htmlFor='email'>{t('emailPlaceholder')}</Label>
              <Input
                id='email'
                type='email'
                placeholder={t('emailPlaceholder')}
                className='mt-2'
              />
            </div>

            {/* Поле Password */}
            <div>
              <Label htmlFor='password'>{t('passwordPlaceholder')}</Label>
              <Input
                id='password'
                type='password'
                placeholder={t('passwordPlaceholder')}
                className='mt-2'
              />
            </div>

            {/* Забыл пароль */}
            <div className='text-right'>
              <Link
                href='/forgot-password'
                className='text-sm text-primary hover:underline'
              >
                {t('forgotPassword')}
              </Link>
            </div>

            {/* Кнопка логина */}
            <Button className='w-full mt-4'>{t('loginButton')}</Button>
          </form>

          {/* Разделитель */}
          <div className='flex items-center justify-center my-6 text-muted-foreground'>
            <span className='w-1/4 border-t border-muted'></span>
            <span className='mx-4 text-sm'>{t('orContinueWith')}</span>
            <span className='w-1/4 border-t border-muted'></span>
          </div>

          {/* Кнопка Google */}
          <Button
            variant='outline'
            className='w-full flex items-center justify-center gap-2'
          >
            <Image
              src='/login-button-google.png'
              alt='Google'
              width={20}
              height={20}
              className='w-5 h-5'
            />
            {t('loginWithGoogle')}
          </Button>

          {/* Ссылка на регистрацию */}
          <p className='mt-6 text-center text-sm text-muted-foreground'>
            {t('noAccount')}{' '}
            <Link
              href='/sign-up'
              className='text-primary hover:underline font-medium'
            >
              {t('signUp')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
