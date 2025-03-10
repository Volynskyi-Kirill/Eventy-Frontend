'use client';

import {
  CitySelectInput,
  CountrySelectInput,
  StateSelectInput,
} from '@/components/accountSettings/LocationSelects';
import { FormField } from '@/components/auth/FormField';
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
import { useFieldArray, useFormContext } from 'react-hook-form';
import { DateSelector } from './DateSelector';
import { EventCategories } from './EventCategories';

export function EventInformation() {
  const { control, watch } = useFormContext<CreateEventFormData>();
  const countryValue = watch('country');
  const stateValue = watch('state');

  const {
    fields: speakerFields,
    append: appendSpeaker,
    remove: removeSpeaker,
  } = useFieldArray({
    control,
    name: 'speakerIds',
  });

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

        <EventCategories />

        <DateSelector control={control} />

        <div className='space-y-2'>
          <Label>Place</Label>
          <div className='grid grid-cols-1 gap-4'>
            <CountrySelectInput
              control={control}
              name='country'
              label='Country'
              placeholder='Country'
            />
            <StateSelectInput
              control={control}
              name='state'
              label='State'
              placeholder='State'
              countryValue={countryValue}
            />
            <CitySelectInput
              control={control}
              name='city'
              label='City'
              placeholder='City'
              countryValue={countryValue}
              stateValue={stateValue}
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
