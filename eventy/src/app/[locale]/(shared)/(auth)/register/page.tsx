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

export default function RegisterPage() {
  const t = useTranslations('RegisterPage');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      router.push(URLS.CLIENT.HOME);
    }
  }, [isLoggedIn, router]);

  //TODO вынести схему как в accountSettings
  const registerSchema = z
    .object({
      name: z.string().min(2, t('validation.nameMin')),
      surname: z.string().min(2, t('validation.surnameMin')),
      phone: z
        .string()
        .regex(/^\+?[0-9]\d{1,14}$/, t('validation.phoneInvalid')),
      email: z.string().email(t('validation.emailInvalid')),
      password: z.string().min(8, t('validation.passwordMin')),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('validation.passwordsMatch'),
      path: ['confirmPassword'],
    });

  type RegisterFormData = z.infer<typeof registerSchema>;

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      surname: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    try {
      await useAuthStore.getState().register({
        userName: data.name,
        userSurname: data.surname,
        phoneNumber: data.phone,
        email: data.email,
        password: data.password,
      });

      toast.success(t('registerSuccess'));
      router.push(URLS.CLIENT.HOME);
    } catch (error: any) {
      //TODO handle error user already exist
      if (error.response?.data) {
        const apiError: ApiErrorResponse = error.response.data;
        toast.error(apiError.message || t('registerError'));
      } else {
        toast.error(t('registerError'));
      }
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const redirectToGoogleAuth = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ENDPOINTS.AUTH.GOOGLE}`;
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
              <p className='text-white'>
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
                <div className='grid grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='name'
                    label={t('namePlaceholder')}
                    placeholder={t('namePlaceholder')}
                  />
                  <FormField
                    control={form.control}
                    name='surname'
                    label={t('surnamePlaceholder')}
                    placeholder={t('surnamePlaceholder')}
                  />
                </div>

                <FormField
                  control={form.control}
                  name='phone'
                  label={t('phonePlaceholder')}
                  placeholder={t('phonePlaceholder')}
                  type='tel'
                />

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

                <FormField
                  control={form.control}
                  name='confirmPassword'
                  label={t('confirmPasswordPlaceholder')}
                  placeholder={t('confirmPasswordPlaceholder')}
                  type='password'
                />

                <Button
                  type='submit'
                  className='w-full bg-emerald-500 hover:bg-emerald-600 text-white'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('submitting') : t('signUpButton')}
                </Button>
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

                <p className='text-center text-white'>
                  {t('haveAccount')}{' '}
                  <Link
                    href={URLS.SHARED.LOGIN}
                    className='text-emerald-500 hover:text-emerald-400'
                  >
                    {t('login')}
                  </Link>
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
