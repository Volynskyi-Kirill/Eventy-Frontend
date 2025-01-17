'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { usersService } from '@/lib/api/users.service';
import { useAuthStore } from '@/store/authStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as z from 'zod';

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
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      if (data.newPassword !== data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message:
        'New password and confirm password must match and current password is required',
      path: ['confirmPassword'],
    }
  );

type FormData = z.infer<typeof accountSettingsSchema>;

export default function AccountSettingsPage() {
  const { user, fetchUser } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      await usersService.updateUser(data);
      await fetchUser();
      setIsDirty(false);
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
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='userSurname'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Surname</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name='phoneNumber'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {user.isHavePassword && (
                  <>
                    <FormField
                      control={form.control}
                      name='password'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current password</FormLabel>
                          <FormControl>
                            <div className='relative'>
                              <Input
                                type={showPassword ? 'text' : 'password'}
                                {...field}
                              />
                              <Button
                                type='button'
                                variant='ghost'
                                size='icon'
                                className='absolute right-2 top-1/2 -translate-y-1/2'
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff className='h-4 w-4' />
                                ) : (
                                  <Eye className='h-4 w-4' />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='newPassword'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New password</FormLabel>
                          <FormControl>
                            <div className='relative'>
                              <Input
                                type={showNewPassword ? 'text' : 'password'}
                                {...field}
                              />
                              <Button
                                type='button'
                                variant='ghost'
                                size='icon'
                                className='absolute right-2 top-1/2 -translate-y-1/2'
                                onClick={() =>
                                  setShowNewPassword(!showNewPassword)
                                }
                              >
                                {showNewPassword ? (
                                  <EyeOff className='h-4 w-4' />
                                ) : (
                                  <Eye className='h-4 w-4' />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='confirmPassword'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm password</FormLabel>
                          <FormControl>
                            <div className='relative'>
                              <Input
                                type={showConfirmPassword ? 'text' : 'password'}
                                {...field}
                              />
                              <Button
                                type='button'
                                variant='ghost'
                                size='icon'
                                className='absolute right-2 top-1/2 -translate-y-1/2'
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className='h-4 w-4' />
                                ) : (
                                  <Eye className='h-4 w-4' />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
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
