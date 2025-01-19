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

export default function AccountSettingsPage() {
  const { user, fetchUser } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

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
      toast.success('Profile updated successfully');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const serverMessage =
          error.response?.data?.message || 'An error occurred.';

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
        toast.error('Unexpected error occurred.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className='flex flex-col items-center justify-center h-screen space-y-4'>
        <p className='text-lg'>You are not logged in</p>
      </div>
    );
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='container max-w-2xl py-10'>
        <Card>
          <CardHeader>
            <CardTitle>Main settings</CardTitle>
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
                    label='Name'
                    placeholder='Enter your name'
                  />
                  <FormField
                    control={form.control}
                    name='userSurname'
                    label='Surname'
                    placeholder='Enter your surname'
                  />
                </div>

                <FormField
                  control={form.control}
                  name='phoneNumber'
                  label='Phone number'
                  placeholder='Enter your phone number'
                  type='tel'
                />

                <FormField
                  control={form.control}
                  name='email'
                  label='Email'
                  placeholder='Enter your email'
                  type='email'
                />

                {user.isHavePassword && (
                  <>
                    <FormField
                      control={form.control}
                      name='password'
                      label='Current password'
                      placeholder='Enter your current password'
                      type='password'
                    />
                    <FormField
                      control={form.control}
                      name='newPassword'
                      label='New password'
                      placeholder='Enter your new password'
                      type='password'
                    />
                    <FormField
                      control={form.control}
                      name='confirmPassword'
                      label='Confirm password'
                      placeholder='Confirm your new password'
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
                  Save
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
                  Cancel
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
