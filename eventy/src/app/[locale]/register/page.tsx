'use client';

import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { URLS } from '@/components/Navigation/urls';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { Form } from '@/components/ui/form';
import { FormField } from '@/components/auth/FormField';
import { authService } from '@/lib/api/auth.service';
import { toast } from 'react-hot-toast';
import { TokenService } from '@/lib/token.service';
import { ApiErrorResponse } from '@/lib/api/types';

export default function RegisterPage() {
  const t = useTranslations('RegisterPage');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

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
      const response = await authService.register({
        userName: data.name,
        userSurname: data.surname,
        phoneNumber: data.phone,
        email: data.email,
        password: data.password,
      });

      TokenService.setAccessToken(response.access_token);

      toast.success(t('registerSuccess'));
      router.push(URLS.HOME);
    } catch (error: any) {
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

                <p className='text-center text-white'>
                  {t('haveAccount')}{' '}
                  <Link
                    href={URLS.LOGIN}
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
