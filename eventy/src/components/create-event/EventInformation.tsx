'use client';

import { FormField } from '@/components/auth/FormField';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { CreateEventFormData } from '@/lib/validation/createEventSchema';
import { X } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

const CATEGORIES = [
  { id: 1, name: 'Fun' },
  { id: 2, name: 'Education' },
  { id: 3, name: 'Business' },
  { id: 4, name: 'Technology' },
  { id: 5, name: 'Art' },
];

export function EventInformation() {
  const minDateTime = new Date().toISOString().slice(0, 16);

  const { control, register, setValue, watch } =
    useFormContext<CreateEventFormData>();

  const {
    fields: dateFields,
    append: appendDate,
    remove: removeDate,
  } = useFieldArray({
    control,
    name: 'dates',
  });

  const {
    fields: speakerFields,
    append: appendSpeaker,
    remove: removeSpeaker,
  } = useFieldArray({
    control,
    name: 'speakerIds',
  });

  const selectedCategories = watch('categoryIds') || [];

  const handleCategorySelect = (categoryId: number) => {
    const currentCategories = [...selectedCategories];
    const index = currentCategories.indexOf(categoryId);

    if (index === -1) {
      setValue('categoryIds', [...currentCategories, categoryId], {
        shouldValidate: true,
      });
    }
  };

  const handleRemoveCategory = (categoryId: number) => {
    const newCategories = selectedCategories.filter((id) => id !== categoryId);
    setValue('categoryIds', newCategories, { shouldValidate: true });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event information</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='space-y-2'>
          <FormField
            control={control}
            name='title'
            label='Event title'
            placeholder='Event title'
          />
        </div>

        <div className='space-y-2'>
          <Label>Event categories</Label>
          <div className='flex flex-wrap gap-2 mb-2'>
            {selectedCategories.map((categoryId) => {
              const category = CATEGORIES.find((c) => c.id === categoryId);
              return category ? (
                <Badge
                  key={categoryId}
                  className='bg-emerald-500 hover:bg-emerald-600'
                >
                  #{category.name}
                  <button
                    type='button'
                    className='ml-1'
                    onClick={() => handleRemoveCategory(categoryId)}
                  >
                    <X className='h-3 w-3' />
                  </button>
                </Badge>
              ) : null;
            })}
          </div>
          <Select
            onValueChange={(value) => handleCategorySelect(Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder='Categories' />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((category) => (
                <SelectItem
                  key={category.id}
                  value={category.id.toString()}
                  disabled={selectedCategories.includes(category.id)}
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-4'>
          <Label>Select date and time</Label>
          <div className='grid grid-cols-3 gap-4'>
            {dateFields.map((field, index) => (
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
                    onClick={() => removeDate(index)}
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
            onClick={() => appendDate({ date: '' })}
          >
            Add more date
          </Button>
        </div>

        <div className='space-y-2'>
          <Label>Place</Label>
          <div className='grid grid-cols-2 gap-4'>
            <FormField
              control={control}
              name='country'
              label='Country'
              placeholder='Country'
            />
            <FormField
              control={control}
              name='state'
              label='City'
              placeholder='City'
            />
          </div>
          <div className='grid grid-cols-2 gap-4 mt-2'>
            <FormField
              control={control}
              name='street'
              label='Street'
              placeholder='Street'
            />
            <FormField
              control={control}
              name='buildingNumber'
              label='Building number'
              placeholder='Building number'
            />
          </div>
          <Button
            type='button'
            variant='outline'
            className='w-full bg-emerald-500 text-white hover:bg-emerald-600 mt-2'
          >
            Select location
          </Button>
        </div>

        <div className='space-y-2'>
          <Label>Speakers</Label>
          <div className='flex items-center gap-2'>
            <div className='flex-1'>
              <Select>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='@ Username' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='1'>John Doe</SelectItem>
                  <SelectItem value='2'>Jane Smith</SelectItem>
                  <SelectItem value='3'>Alex Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            type='button'
            variant='outline'
            className='w-full bg-emerald-500 text-white hover:bg-emerald-600 mt-2'
          >
            Add speaker
          </Button>
        </div>

        <div className='space-y-2'>
          <FormField
            control={control}
            name='shortDescription'
            label='Event Short description'
            placeholder='Short description'
            type='textarea'
          />
        </div>

        <div className='space-y-2'>
          <FormField
            control={control}
            name='fullDescription'
            label='Event full description'
            placeholder='Full description'
            type='textarea'
          />
        </div>
      </CardContent>
    </Card>
  );
}
