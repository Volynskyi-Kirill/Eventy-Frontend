'use client';

import {
  CitySelectInput,
  CountrySelectInput,
  StateSelectInput,
} from '@/components/shared/accountSettings/LocationSelects';
import { FormField } from '@/components/shared/FormField';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import type { CreateEventFormData } from '@/lib/validation/createEventSchema';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import { DateSelector } from './DateSelector';
import { EventCategories } from './EventCategories';
import { EventSpeakers } from './EventSpeakers';

export function EventInformation() {
  const { control, watch } = useFormContext<CreateEventFormData>();
  const t = useTranslations('EventInformation');
  const countryValue = watch('country');
  const stateValue = watch('state');

  return (
    <Card className='max-w-[45em] mx-auto'>
      <CardHeader className='text-center'>
        <CardTitle className='text-2xl font-bold'>{t('title')}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='space-y-2'>
          <FormField
            control={control}
            name='title'
            label={t('eventTitle')}
            placeholder={t('eventTitle')}
          />
        </div>

        <EventCategories />

        <DateSelector control={control} />

        <div className='space-y-2'>
          <Label>{t('placeLabel')}</Label>
          <div className='grid grid-cols-1 gap-4'>
            <CountrySelectInput
              control={control}
              name='country'
              label={t('countryLabel')}
              placeholder={t('countryLabel')}
            />
            <StateSelectInput
              control={control}
              name='state'
              label={t('stateLabel')}
              placeholder={t('stateLabel')}
              countryValue={countryValue}
            />
            <CitySelectInput
              control={control}
              name='city'
              label={t('cityLabel')}
              placeholder={t('cityLabel')}
              countryValue={countryValue}
              stateValue={stateValue}
            />
          </div>
          <div className='grid grid-cols-2 gap-4 mt-2'>
            <FormField
              control={control}
              name='street'
              label={t('streetLabel')}
              placeholder={t('streetLabel')}
            />
            <FormField
              control={control}
              name='buildingNumber'
              label={t('buildingNumberLabel')}
              placeholder={t('buildingNumberLabel')}
            />
          </div>
        </div>

        <EventSpeakers />

        <div className='space-y-2'>
          <FormField
            control={control}
            name='shortDescription'
            label={t('shortDescriptionLabel')}
            placeholder={t('shortDescriptionPlaceholder')}
            type='textarea'
            className='min-h-[8em]'
          />
        </div>

        <div className='space-y-2'>
          <FormField
            control={control}
            name='fullDescription'
            label={t('fullDescriptionLabel')}
            placeholder={t('fullDescriptionPlaceholder')}
            type='textarea'
            className='min-h-[16em]'
          />
        </div>
      </CardContent>
    </Card>
  );
}
