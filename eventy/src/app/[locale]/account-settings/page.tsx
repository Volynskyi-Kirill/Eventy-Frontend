'use client';

import { useAuthStore } from '@/store/authStore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function AccountSettingsPage() {
  const { user } = useAuthStore();
  console.log('user: ', user);

  if (!user) {
    return (
      <div className='flex flex-col items-center justify-center h-screen space-y-4'>
        <p className='text-lg'>You are not logged in</p>
      </div>
    );
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className='space-y-2'>
          <p className='text-sm text-muted-foreground'>ID: {user.id}</p>
          <p className='text-sm text-muted-foreground'>Name: {user.userName}</p>
          <p className='text-sm text-muted-foreground'>
            Surname: {user.userSurname}
          </p>
          <p className='text-sm text-muted-foreground'>Email: {user.email}</p>
        </CardContent>
      </Card>
    </div>
  );
}
