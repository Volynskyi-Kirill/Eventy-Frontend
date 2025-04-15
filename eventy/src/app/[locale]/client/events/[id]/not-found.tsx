'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { URLS } from '@/components/shared/Navigation/urls';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar, Search } from 'lucide-react';

export default function EventNotFound() {
  const t = useTranslations('NotFoundPage');
  const eventsT = useTranslations('Navigation.client');

  return (
    <div className='flex flex-col items-center justify-center min-h-[70vh] p-4'>
      <Card className='max-w-md w-full border-none shadow-lg'>
        <CardHeader className='space-y-1 text-center'>
          <Search className='mx-auto text-muted-foreground w-16 h-16 mb-2' />
          <CardTitle className='text-3xl font-bold'>
            {t('event.title')}
          </CardTitle>
          <CardDescription className='text-lg text-muted-foreground'>
            {t('event.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col items-center space-y-4 py-4'>
          <div className='flex flex-col items-center justify-center text-muted-foreground space-y-2'>
            <Calendar className='w-6 h-6' />
            <p className='text-center'>{eventsT('events')}</p>
          </div>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
          <Button asChild className='w-full'>
            <Link href={URLS.CLIENT.EVENTS}>{t('event.backToEvents')}</Link>
          </Button>
          <Button asChild variant='outline' className='w-full'>
            <Link href={URLS.CLIENT.HOME}>{t('goHome')}</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
