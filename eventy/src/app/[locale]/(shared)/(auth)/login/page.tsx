'use client';

import { FormField } from '@/components/auth/FormField';
import { URLS } from '@/components/Navigation/urls';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Link, useRouter } from '@/i18n/routing';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { ApiErrorResponse } from '@/lib/api/types';
import { useAuthStore } from '@/store/authStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as z from 'zod';

export default function LoginPage() {
  const t = useTranslations('LoginPage');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  //TODO в свой кастомный хук или даже мидлвар?
  useEffect(() => {
    if (isLoggedIn) {
      router.push(URLS.CLIENT.HOME);
    }
  }, [isLoggedIn, router]);

  const loginSchema = z.object({
    email: z.string().email(t('validation.emailInvalid')),
    password: z.string().min(1, t('validation.passwordRequired')),
  });

  type LoginFormData = z.infer<typeof loginSchema>;

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      await useAuthStore.getState().login(data.email, data.password);
      toast.success(t('loginSuccess'));
      router.push(URLS.CLIENT.HOME);
    } catch (error: any) {
      //TODO handle error 401 invalid credentials
      if (error.response?.data) {
        const apiError: ApiErrorResponse = error.response.data;
        toast.error(apiError.message || t('loginError'));
      } else {
        toast.error(t('loginError'));
      }
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const redirectToGoogleAuth = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ENDPOINTS.AUTH.GOOGLE}`;
  };

  return (
    <div className='dark'>
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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
              >
                <FormField
                  control={form.control}
                  name='email'
                  label={t('emailPlaceholder')}
                  placeholder={t('emailPlaceholder')}
                  type='email'
                />
                <FormField
                  control={form.control}
                  name='password'
                  label={t('passwordPlaceholder')}
                  placeholder={t('passwordPlaceholder')}
                  type='password'
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('submitting') : t('loginButton')}
                </Button>
              </form>
            </Form>

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
              onClick={redirectToGoogleAuth}
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
                href={URLS.SHARED.REGISTER}
                className='text-emerald-500 hover:text-emerald-400'
              >
                {t('signUp')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
