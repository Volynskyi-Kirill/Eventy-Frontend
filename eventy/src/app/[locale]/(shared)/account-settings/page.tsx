'use client';

import { AvatarUpload } from '@/components/shared/accountSettings/AvatarUpload';
import {
  CitySelectInput,
  CountrySelectInput,
  StateSelectInput,
} from '@/components/shared/accountSettings/LocationSelects';
import {
  convertLocation,
  getCityByName,
  getCountryByName,
  getStateByName,
} from '@/components/shared/accountSettings/utils';
import { FormField } from '@/components/shared/FormField';
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
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export default function AccountSettingsPage() {
  const { user, fetchUser } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations('AccountSettingsPage');

  const form = useForm<AccountSettingsFormData>({
    resolver: zodResolver(accountSettingsSchema),
    defaultValues: {
      userName: '',
      userSurname: '',
      phoneNumber: '',
      email: '',
      country: null as any,
      state: null as any,
      city: null as any,
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (user) {
      const countryObj = convertLocation(user.country, getCountryByName);
      const stateObj = convertLocation(user.state, getStateByName);
      const cityObj = convertLocation(user.city, getCityByName);

      form.reset({
        userName: user.userName || '',
        userSurname: user.userSurname || '',
        phoneNumber: user.phoneNumber || '',
        email: user.email,
        country: countryObj as any,
        state: stateObj as any,
        city: cityObj as any,
        password: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  }, [user, form]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (form.formState.isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [form.formState.isDirty]);

  const onSubmit = async (data: AccountSettingsFormData) => {
    setIsSubmitting(true);
    try {
      await usersService.updateUser(data);
      await fetchUser();
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
    <div className='flex items-start justify-center min-h-screen py-5'>
      <div className='container max-w-2xl'>
        <Card>
          <CardHeader>
            <CardTitle>{t('mainSettings')}</CardTitle>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className='space-y-6'>
                <AvatarUpload />

                <div className='grid grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='userName'
                    label={t('nameLabel')}
                    placeholder={t('namePlaceholder')}
                  />
                  <FormField
                    control={form.control}
                    name='userSurname'
                    label={t('surnameLabel')}
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

                {/* Блок для выбора локаций */}
                <div className='grid grid-cols-1 gap-4'>
                  <CountrySelectInput
                    control={form.control}
                    name='country'
                    label={t('countryLabel')}
                    placeholder={t('countryPlaceholder')}
                  />
                  <StateSelectInput
                    control={form.control}
                    name='state'
                    label={t('stateLabel')}
                    placeholder={t('statePlaceholder')}
                    countryValue={form.watch('country')}
                  />
                  <CitySelectInput
                    control={form.control}
                    name='city'
                    label={t('cityLabel')}
                    placeholder={t('cityPlaceholder')}
                    countryValue={form.watch('country')}
                    stateValue={form.watch('state')}
                  />
                </div>

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
                      placeholder={t('confirmPassword')}
                      type='password'
                    />
                  </>
                )}
              </CardContent>
              <CardFooter className='flex justify-between space-x-4'>
                <Button
                  type='submit'
                  className='flex-1'
                  disabled={isSubmitting || !form.formState.isDirty}
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
                  }}
                  disabled={!form.formState.isDirty}
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
