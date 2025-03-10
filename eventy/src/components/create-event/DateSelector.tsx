'use client';

import { FormField } from '@/components/auth/FormField';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';
import React from 'react';

interface DateSelectorProps {
  control: any;
}

export function DateSelector({ control }: DateSelectorProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dates',
  });

  const minDateTime = new Date().toISOString().slice(0, 16);

  return (
    <div className='space-y-4'>
      <Label>Select date and time</Label>
      <div className='grid grid-cols-3 gap-4'>
        {fields.map((field, index) => (
          <div key={field.id} className='flex items-end gap-2'>
            <FormField
              control={control}
              name={`dates.${index}.date`}
              label=''
              placeholder='YYYY-MM-DDThh:mm'
              type='datetime-local'
              min={minDateTime}
            />
            {index > 0 && (
              <Button
                type='button'
                variant='destructive'
                size='icon'
                onClick={() => remove(index)}
              >
                <X className='h-4 w-4' />
              </Button>
            )}
          </div>
        ))}
      </div>
      <Button
        type='button'
        variant='outline'
        className='w-full bg-emerald-500 text-white hover:bg-emerald-600'
        onClick={() => append({ date: '' })}
      >
        Add more date
      </Button>
    </div>
  );
}
