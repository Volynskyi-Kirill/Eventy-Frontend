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

// Импортируем наши новые компоненты выбора локации
import {
  CountrySelectInput,
  StateSelectInput,
  CitySelectInput,
  CountryType,
  StateType,
  CityType,
} from '@/components/account/LocationSelects';

// Импорт локальных JSON-данных
import countriesData from '@/lib/countryData/countriesminified.json';
import statesData from '@/lib/countryData/statesminified.json';
import citiesData from '@/lib/countryData/citiesminified.json';

// Функции для поиска объекта по имени
function getCountryByName(name: string): CountryType | null {
  // Предполагаем, что countriesData имеет тип CountryType[]
  const countries = countriesData as CountryType[];
  return countries.find((c) => c.name === name) || null;
}

function getStateByName(name: string): StateType | null {
  // Предполагаем, что statesData имеет структуру: Array<{ states: StateType[] }>
  const arr = statesData as { states: StateType[] }[];
  const allStates = arr.flatMap((item) => item.states);
  return allStates.find((s) => s.name === name) || null;
}

function getCityByName(name: string): CityType | null {
  // Предполагаем, что citiesData имеет структуру: Array<{ states: { cities: CityType[] }[] }>
  const arr = citiesData as { states: { cities: CityType[] }[] }[];
  const allCities = arr.flatMap((item) =>
    item.states.flatMap((state) => state.cities)
  );
  return allCities.find((c) => c.name === name) || null;
}

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
      // Если данные из БД хранятся как строки, преобразуем их в объекты через локальные JSON
      const countryObj =
        typeof user.country === 'string'
          ? getCountryByName(user.country)
          : user.country;
      const stateObj =
        typeof user.state === 'string'
          ? getStateByName(user.state)
          : user.state;
      const cityObj =
        typeof user.city === 'string' ? getCityByName(user.city) : user.city;

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
    <div className='flex items-start justify-center min-h-screen py-5'>
      <div className='container max-w-2xl'>
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
