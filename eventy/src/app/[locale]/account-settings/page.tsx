'use client';

import { AvatarUpload } from '@/components/account/AvatarUpload';
import { FormField } from '@/components/auth/FormField';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { usersService } from '@/lib/api/users.service';
import { ERROR_MESSAGES } from '@/lib/constants';
import {
  AccountSettingsFormData,
  accountSettingsSchema,
} from '@/lib/validation/accountSettingsSchema';
import { useAuthStore } from '@/store/authStore';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useTranslations } from 'next-intl';

export default function AccountSettingsPage() {
  const { user, fetchUser } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const t = useTranslations('AccountSettingsPage');

  const form = useForm<AccountSettingsFormData>({
    resolver: zodResolver(accountSettingsSchema),
    defaultValues: {
      userName: '',
      userSurname: '',
      phoneNumber: '',
      email: '',
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        userName: user.userName || '',
        userSurname: user.userSurname || '',
        phoneNumber: user.phoneNumber || '',
        email: user.email,
        password: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  }, [user, form]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const onSubmit = async (data: AccountSettingsFormData) => {
    setIsSubmitting(true);
    try {
      await usersService.updateUser(data);
      await fetchUser();
      setIsDirty(false);
      toast.success(t('updateSuccess'));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const serverMessage =
          error.response?.data?.message || t('unexpectedError');

        switch (status) {
          case 409: {
            const conflictField = 'email';
            form.setError(conflictField as keyof AccountSettingsFormData, {
              type: 'manual',
              message: serverMessage,
            });
            break;
          }
          case 400: {
            if (serverMessage === ERROR_MESSAGES.INVALID_OLD_PASSWORD) {
              form.setError('password', {
                type: 'manual',
                message: serverMessage,
              });
            } else {
              toast.error(serverMessage);
            }
            break;
          }
          default:
            toast.error(serverMessage);
        }
      } else {
        toast.error(t('unexpectedError'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className='flex flex-col items-center justify-center h-screen space-y-4'>
        <p className='text-lg'>{t('notLoggedIn')}</p>
      </div>
    );
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='container max-w-2xl py-10'>
        <Card>
          <CardHeader>
            <CardTitle>{t('mainSettings')}</CardTitle>
          </CardHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              onChange={() => setIsDirty(true)}
            >
              <CardContent className='space-y-6'>
                <AvatarUpload />

                <div className='grid grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='userName'
                    label={t('name')}
                    placeholder={t('namePlaceholder')}
                  />
                  <FormField
                    control={form.control}
                    name='userSurname'
                    label={t('surname')}
                    placeholder={t('surnamePlaceholder')}
                  />
                </div>

                <FormField
                  control={form.control}
                  name='phoneNumber'
                  label={t('phoneNumber')}
                  placeholder={t('phoneNumberPlaceholder')}
                  type='tel'
                />

                <FormField
                  control={form.control}
                  name='email'
                  label={t('email')}
                  placeholder={t('emailPlaceholder')}
                  type='email'
                />

                {user.isHavePassword && (
                  <>
                    <FormField
                      control={form.control}
                      name='password'
                      label={t('currentPassword')}
                      placeholder={t('currentPasswordPlaceholder')}
                      type='password'
                    />
                    <FormField
                      control={form.control}
                      name='newPassword'
                      label={t('newPassword')}
                      placeholder={t('newPasswordPlaceholder')}
                      type='password'
                    />
                    <FormField
                      control={form.control}
                      name='confirmPassword'
                      label={t('confirmPassword')}
                      placeholder={t('confirmPasswordPlaceholder')}
                      type='password'
                    />
                  </>
                )}
              </CardContent>
              <CardFooter className='flex justify-between space-x-4'>
                <Button
                  type='submit'
                  className='flex-1'
                  disabled={isSubmitting || !isDirty}
                >
                  {isSubmitting && (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  )}
                  {t('save')}
                </Button>
                <Button
                  type='button'
                  variant='outline'
                  className='flex-1'
                  onClick={() => {
                    form.reset();
                    setIsDirty(false);
                  }}
                  disabled={!isDirty}
                >
                  {t('cancel')}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
