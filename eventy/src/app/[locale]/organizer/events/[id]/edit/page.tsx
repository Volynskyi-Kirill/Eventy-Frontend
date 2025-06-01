'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Clock, Edit, Wrench } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function EditEventPage() {
  const router = useRouter();
  const t = useTranslations('EditEventPage');

  const handleGoBack = () => {
    router.back();
  };

  const features = [
    {
      icon: Edit,
      title: t ? t('editBasicInfo') : 'Edit Basic Information',
      description: t
        ? t('editBasicInfoDesc')
        : 'Update event title, description, dates, and location',
    },
    {
      icon: Wrench,
      title: t ? t('manageTickets') : 'Manage Tickets & Pricing',
      description: t
        ? t('manageTicketsDesc')
        : 'Configure ticket zones, pricing, and availability',
    },
    {
      icon: Clock,
      title: t ? t('updateSchedule') : 'Update Schedule',
      description: t
        ? t('updateScheduleDesc')
        : 'Modify event dates, times, and speaker lineup',
    },
  ];

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header with back button */}
        <div className='flex items-center gap-4 mb-8'>
          <Button
            variant='outline'
            size='sm'
            onClick={handleGoBack}
            className='flex items-center gap-2'
          >
            <ArrowLeft className='h-4 w-4' />
            {t ? t('goBack') : 'Go Back'}
          </Button>
          <div>
            <h1 className='text-3xl font-bold text-foreground'>
              {t ? t('pageTitle') : 'Edit Event'}
            </h1>
          </div>
        </div>

        {/* Coming Soon Card */}
        <div className='max-w-4xl mx-auto'>
          <Card className='border-2 border-dashed border-muted-foreground/30'>
            <CardHeader className='text-center pb-6'>
              <div className='mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4'>
                <Edit className='h-8 w-8 text-primary' />
              </div>
              <CardTitle className='text-2xl text-foreground mb-2'>
                {t ? t('comingSoonTitle') : 'Event Editing Coming Soon!'}
              </CardTitle>
              <p className='text-muted-foreground text-lg'>
                {t
                  ? t('comingSoonDescription')
                  : "We're working hard to bring you a powerful event editing experience."}
              </p>
              <Badge variant='secondary' className='w-fit mx-auto mt-4'>
                {t ? t('inDevelopment') : 'In Development'}
              </Badge>
            </CardHeader>

            <CardContent className='space-y-6'>
              {/* Features Preview */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold text-center text-foreground'>
                  {t ? t('upcomingFeatures') : 'Upcoming Features'}
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className='p-4 border border-muted rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors'
                    >
                      <div className='flex items-start gap-3'>
                        <div className='w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0'>
                          <feature.icon className='h-4 w-4 text-primary' />
                        </div>
                        <div>
                          <h4 className='font-medium text-sm mb-1'>
                            {feature.title}
                          </h4>
                          <p className='text-xs text-muted-foreground'>
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress indicator */}
              <div className='border-t pt-6'>
                <div className='text-center space-y-3'>
                  <p className='text-sm text-muted-foreground'>
                    {t ? t('progressMessage') : 'Development Progress'}
                  </p>
                  <div className='w-full bg-muted rounded-full h-2 max-w-md mx-auto'>
                    <div
                      className='bg-primary h-2 rounded-full transition-all duration-300'
                      style={{ width: '35%' }}
                    ></div>
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    {t
                      ? t('estimatedCompletion')
                      : 'Estimated completion: Coming soon'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
