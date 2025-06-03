'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Calendar, Plus, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { URLS } from '@/components/shared/Navigation/urls';

export function DashboardEmptyState() {
  const t = useTranslations('DashboardPage');

  return (
    <div className='container mx-auto px-4 py-12'>
      <Card className='max-w-2xl mx-auto'>
        <CardContent className='p-12 text-center'>
          <div className='mb-6'>
            <BarChart3 className='h-24 w-24 text-muted-foreground mx-auto mb-4' />
          </div>

          <h2 className='text-2xl font-bold mb-2'>{t('emptyStateTitle')}</h2>
          <p className='text-muted-foreground mb-8 text-lg'>
            {t('emptyStateDescription')}
          </p>

          <div className='space-y-4 mb-8'>
            <div className='flex items-center gap-3 text-left'>
              <Calendar className='h-5 w-5 text-blue-500 flex-shrink-0' />
              <span className='text-sm'>{t('emptyStateFeature1')}</span>
            </div>
            <div className='flex items-center gap-3 text-left'>
              <BarChart3 className='h-5 w-5 text-green-500 flex-shrink-0' />
              <span className='text-sm'>{t('emptyStateFeature2')}</span>
            </div>
            <div className='flex items-center gap-3 text-left'>
              <Plus className='h-5 w-5 text-purple-500 flex-shrink-0' />
              <span className='text-sm'>{t('emptyStateFeature3')}</span>
            </div>
          </div>

          <Button size='lg' asChild className='min-w-48'>
            <Link href={URLS.ORGANIZER.EVENTS_NEW}>
              <Plus className='h-5 w-5 mr-2' />
              {t('createFirstEvent')}
            </Link>
          </Button>

          <p className='text-sm text-muted-foreground mt-4'>
            {t('emptyStateFooter')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
