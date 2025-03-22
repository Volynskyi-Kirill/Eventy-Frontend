'use client';

import { useFormContext, useFieldArray } from 'react-hook-form';
import { X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { CreateEventFormData } from '@/lib/validation/createEventSchema';
import { useTranslations } from 'next-intl';

const CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];

export function EventSeatsAndPrice() {
  const { control, register, watch, setValue } =
    useFormContext<CreateEventFormData>();
  const t = useTranslations('EventSeatsAndPrice');

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'eventZones',
  });

  const isPaid = watch('eventZones')?.[0]?.price > 0;

  const handlePriceTypeChange = (value: string) => {
    const isFree = value === 'free';
    const updatedZones = fields.map((field) => ({
      ...field,
      price: isFree ? 0 : field.price || 10,
    }));

    setValue('eventZones', updatedZones, { shouldValidate: true });
  };

  const addZone = () => {
    append({
      name: `Zone - ${fields.length + 1}`,
      price: isPaid ? 10 : 0,
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
        {/* Price Type */}
        <div className='space-y-2'>
          <Label>{t('priceLabel')}</Label>
          <RadioGroup
            defaultValue={isPaid ? 'paid' : 'free'}
            className='flex items-center gap-4'
            onValueChange={handlePriceTypeChange}
          >
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='free' id='free' />
              <Label htmlFor='free'>{t('freeLabel')}</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='paid' id='paid' />
              <Label htmlFor='paid'>{t('paidLabel')}</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Zones */}
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
            <Input
              {...register(`eventZones.${index}.name`)}
              placeholder={t('zoneNameLabel')}
            />

            <div className='grid grid-cols-2 gap-4 mt-2'>
              <div>
                <Label>{t('priceFieldLabel')}</Label>
                <div className='flex gap-2'>
                  <Input
                    type='number'
                    {...register(`eventZones.${index}.price`, {
                      valueAsNumber: true,
                    })}
                    placeholder={t('priceFieldLabel')}
                    disabled={!isPaid}
                  />
                  <Select
                    defaultValue={field.currency}
                    onValueChange={(value) => {
                      setValue(`eventZones.${index}.currency`, value);
                    }}
                  >
                    <SelectTrigger className='w-24'>
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
                <Input
                  type='number'
                  {...register(`eventZones.${index}.seatCount`, {
                    valueAsNumber: true,
                  })}
                  placeholder={t('seatsLabel')}
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
