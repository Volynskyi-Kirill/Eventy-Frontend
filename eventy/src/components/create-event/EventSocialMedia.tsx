'use client';

import { useFormContext, useFieldArray } from 'react-hook-form';
import { X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { CreateEventFormData } from '@/lib/validation/createEventSchema';

const SOCIAL_PLATFORMS = [
  'Instagram',
  'Facebook',
  'Twitter',
  'LinkedIn',
  'YouTube',
  'TikTok',
  'Telegram',
];

export function EventSocialMedia() {
  const { control, register } = useFormContext<CreateEventFormData>();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'socialMedia',
  });

  const addSocialMedia = () => {
    append({ platform: 'Instagram', link: '' });
  };

  return (
    <Card className='max-w-[45em] mx-auto'>
      <CardHeader>
        <CardTitle>Social media</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {fields.map((field, index) => (
          <div key={field.id} className='space-y-2'>
            <div className='flex justify-between items-center'>
              <Label>{field.platform}</Label>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className='text-red-500 hover:text-red-700'
                onClick={() => remove(index)}
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
            <div className='flex flex-col gap-2'>
              <Select
                defaultValue={field.platform}
                onValueChange={(value) => {
                  update(index, { ...field, platform: value });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select platform' />
                </SelectTrigger>
                <SelectContent>
                  {SOCIAL_PLATFORMS.map((platform) => (
                    <SelectItem key={platform} value={platform}>
                      {platform}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                {...register(`socialMedia.${index}.link`)}
                placeholder='@ Username'
                className='w-full'
              />
            </div>
          </div>
        ))}

        <Button
          type='button'
          variant='outline'
          className='w-full bg-emerald-500 text-white hover:bg-emerald-600'
          onClick={addSocialMedia}
        >
          Add social media link
        </Button>
      </CardContent>
    </Card>
  );
}
