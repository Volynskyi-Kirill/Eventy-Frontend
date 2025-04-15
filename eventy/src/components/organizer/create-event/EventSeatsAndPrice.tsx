'use client';

import { useFormContext, useFieldArray } from 'react-hook-form';
import { X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { CreateEventFormData } from '@/lib/validation/createEventSchema';
import { useTranslations } from 'next-intl';
import { FormField } from '@/components/shared/FormField';

const CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];

export function EventSeatsAndPrice() {
  const { control, setValue } = useFormContext<CreateEventFormData>();
  const t = useTranslations('EventSeatsAndPrice');

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'eventZones',
  });

  const addZone = () => {
    append({
      name: `Zone - ${fields.length + 1}`,
      price: 0,
      currency: 'USD',
      seatCount: 100,
    });
  };

  return (
    <Card className='max-w-[45em] mx-auto'>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {fields.map((field, index) => (
          <div key={field.id} className='space-y-2'>
            <div className='flex justify-between items-center'>
              <Label>{t('zoneNameLabel')}</Label>
              {index > 0 && (
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  className='text-red-500 hover:text-red-700'
                  onClick={() => remove(index)}
                >
                  <X className='h-4 w-4' />
                </Button>
              )}
            </div>
            <FormField
              control={control}
              name={`eventZones.${index}.name`}
              label=''
              placeholder={t('zoneNameLabel')}
            />

            <div className='grid grid-cols-2 gap-4 mt-2'>
              <div>
                <Label>{t('priceFieldLabel')}</Label>
                <div className='flex gap-2 items-end'>
                  <FormField
                    control={control}
                    name={`eventZones.${index}.price`}
                    label=''
                    placeholder={t('priceFieldLabel')}
                    type='number'
                    className='flex-1'
                  />
                  <Select
                    defaultValue={field.currency}
                    onValueChange={(value) => {
                      setValue(`eventZones.${index}.currency`, value);
                    }}
                  >
                    <SelectTrigger className='w-24 h-10'>
                      <SelectValue placeholder='USD' />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCIES.map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>{t('seatsLabel')}</Label>
                <FormField
                  control={control}
                  name={`eventZones.${index}.seatCount`}
                  label=''
                  placeholder={t('seatsLabel')}
                  type='number'
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          type='button'
          variant='outline'
          className='w-full bg-emerald-500 text-white hover:bg-emerald-600'
          onClick={addZone}
        >
          {t('addZone')}
        </Button>
      </CardContent>
    </Card>
  );
}
