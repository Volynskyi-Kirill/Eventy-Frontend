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
import type { CreateEventFormData } from '@/lib/validation/createEventSchema';
import { X } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

export const CATEGORIES = [
  { id: 1, name: 'Fun' },
  { id: 2, name: 'Education' },
  { id: 3, name: 'Business' },
  { id: 4, name: 'Technology' },
  { id: 5, name: 'Art' },
];

export function EventCategories() {
  const { setValue, watch } = useFormContext<CreateEventFormData>();
  const selectedCategories = watch('categoryIds') || [];

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
      <Label>Event categories</Label>
      <div className='flex flex-wrap gap-2 mb-2'>
        {selectedCategories.map((categoryId: number) => {
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
      <Select onValueChange={(value) => handleCategorySelect(Number(value))}>
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
  );
}
