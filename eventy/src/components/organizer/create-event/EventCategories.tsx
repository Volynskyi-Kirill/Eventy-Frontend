'use client';

import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { eventsService, type Category } from '@/lib/api/events.service';
import type { CreateEventFormData } from '@/lib/validation/createEventSchema';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';

export function EventCategories() {
  const { setValue, watch } = useFormContext<CreateEventFormData>();
  const t = useTranslations('EventCategories');
  const selectedCategories = watch('categoryIds') || [];

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: eventsService.getCategories,
  });

  const handleCategorySelect = (categoryId: number) => {
    const currentCategories = [...selectedCategories];
    if (currentCategories.indexOf(categoryId) === -1) {
      setValue('categoryIds', [...currentCategories, categoryId], {
        shouldValidate: true,
      });
    }
  };

  const handleRemoveCategory = (categoryId: number) => {
    const newCategories = selectedCategories.filter(
      (id: number) => id !== categoryId
    );
    setValue('categoryIds', newCategories, { shouldValidate: true });
  };

  return (
    <div className='space-y-2'>
      <Label>{t('label')}</Label>
      <div className='flex flex-wrap gap-2 mb-2'>
        {selectedCategories.map((categoryId: number) => {
          const category = categories.find((c) => c.id === categoryId);
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
      <Select onValueChange={(value) => handleCategorySelect(Number(value))}>
        <SelectTrigger>
          <SelectValue placeholder={t('selectPlaceholder')} />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
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
  );
}
