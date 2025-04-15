import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  DEFAULT_PRICE_RANGE,
  PRICE_RANGE_MAX,
  PRICE_RANGE_MIN,
  PRICE_RANGE_STEP,
} from './constants';
import { EventFiltersProps, SelectedCategoriesFilterProps } from './types';

export function EventFilters({
  selectedCategories,
  toggleCategory,
  priceRange,
  onPriceChange,
  categories,
}: EventFiltersProps) {
  const t = useTranslations('EventsPage');

  return (
    <div className='w-full md:w-1/4 space-y-6'>
      <div>
        <h2 className='text-lg font-semibold mb-2'>{t('price')}</h2>
        <div className='space-y-4'>
          <Slider
            defaultValue={DEFAULT_PRICE_RANGE}
            min={PRICE_RANGE_MIN}
            max={PRICE_RANGE_MAX}
            step={PRICE_RANGE_STEP}
            value={priceRange}
            onValueChange={onPriceChange}
            className='mt-6'
          />
          <div className='flex justify-between'>
            <span>
              {priceRange[0] === 0
                ? t('free')
                : `${priceRange[0]} ${t('currency')}`}
            </span>
            <span>{`${priceRange[1]} ${t('currency')}`}</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className='text-lg font-semibold mb-2'>{t('categories')}</h2>
        <div className='space-y-2'>
          {categories.map((category) => (
            <div key={category.id} className='flex items-center'>
              <input
                type='checkbox'
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onChange={() => toggleCategory(category.id)}
                className='mr-2'
              />
              <label htmlFor={`category-${category.id}`}>{category.name}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SelectedCategoriesFilter({
  selectedCategories,
  categories,
  toggleCategory,
}: SelectedCategoriesFilterProps) {
  const hasSelectedCategories = selectedCategories.length > 0;

  if (!hasSelectedCategories) {
    return null;
  }

  return (
    <div className='flex flex-wrap gap-2'>
      {categories
        .filter((category) => selectedCategories.includes(category.id))
        .map((category) => (
          <Badge
            key={category.id}
            className='px-2 py-1 bg-primary text-primary-foreground flex items-center gap-1'
          >
            {category.name}
            <X
              size={14}
              className='cursor-pointer'
              onClick={() => toggleCategory(category.id)}
            />
          </Badge>
        ))}
    </div>
  );
}
