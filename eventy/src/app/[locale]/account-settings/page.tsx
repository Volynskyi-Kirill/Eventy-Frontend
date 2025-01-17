'use client';

import { FormField } from '@/components/auth/FormField';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { useAuthStore } from '@/store/authStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as z from 'zod';

const isCurrentPasswordRequired = (data: any) =>
  data.newPassword && !data.password;
const doPasswordsMatch = (data: any) =>
  data.newPassword === data.confirmPassword;

const accountSettingsSchema = z
  .object({
    userName: z.string().min(1, 'Name is required'),
    userSurname: z.string().min(1, 'Surname is required'),
    phoneNumber: z.string().optional(),
    email: z.string().email('Invalid email address'),
    password: z.string().optional(),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => !isCurrentPasswordRequired(data), {
    message: 'Current password is required when setting a new password',
    path: ['password'],
  })
  .refine((data) => doPasswordsMatch(data), {
    message: 'New password and confirm password must match',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof accountSettingsSchema>;

export default function AccountSettingsPage() {
  const { user, fetchUser } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const form = useForm<FormData>({
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

  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // const response = await usersService.uploadAvatar(file);
      toast.success('will be available later');
      return;

      await fetchUser();
      toast.success('Avatar updated successfully');
    } catch (error) {
      toast.error('Failed to upload avatar');
      console.error('Avatar upload error:', error);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      console.log('data: ', data);
      toast.success('form submitted');
      return;
      // await usersService.updateUser(data);
      // await fetchUser();
      // setIsDirty(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Update error:', error);
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
                <div className='flex flex-col items-center space-y-4'>
                  <Avatar className='h-32 w-32'>
                    <AvatarImage src={user.avatarUrl || ''} />
                    <AvatarFallback>
                      {user.userName?.[0]}
                      {user.userSurname?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant='outline' className='relative' asChild>
                    <label>
                      Load photo
                      <input
                        type='file'
                        className='absolute inset-0 w-full opacity-0 cursor-pointer'
                        accept='image/*'
                        onChange={handleAvatarUpload}
                      />
                    </label>
                  </Button>
                </div>

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
