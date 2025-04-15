'use client';

import { eventsService } from '@/lib/api/events.service';
import { QUERY_KEYS } from '@/lib/constants';
import type { EventsQueryParams } from '@/lib/types/events-query.types';
import { SortDirection } from '@/lib/types/events-query.types';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import {
  EventFilters,
  SelectedCategoriesFilter,
} from '@/components/client/events-page/EventFilters';
import { EventGrid } from '@/components/client/events-page/EventGrid';
import { EventPagination } from '@/components/client/events-page/EventPagination';
import { EventSort } from '@/components/client/events-page/EventSort';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PRICE_RANGE,
  DEFAULT_SORT_BY,
  DEFAULT_SORT_DIRECTION,
  PRICE_FILTER_DEBOUNCE_MS,
} from '@/components/client/events-page/constants';

export default function EventsPage() {
  const [filters, setFilters] = useState<EventsQueryParams>({
    page: DEFAULT_PAGE,
    limit: DEFAULT_PAGE_SIZE,
    sortBy: DEFAULT_SORT_BY,
    sortDirection: DEFAULT_SORT_DIRECTION,
  });

  const [priceRangeLocal, setPriceRangeLocal] =
    useState<[number, number]>(DEFAULT_PRICE_RANGE);
  const [debouncedPriceRange] = useDebounce(
    priceRangeLocal,
    PRICE_FILTER_DEBOUNCE_MS
  );
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const { data: categories = [] } = useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: eventsService.getCategories,
  });

  const { data: eventsData, isLoading } = useQuery({
    queryKey: [
      QUERY_KEYS.EVENTS,
      filters,
      debouncedPriceRange,
      selectedCategories,
    ],
    queryFn: async () => {
      const params: EventsQueryParams = {
        ...filters,
        minPrice: debouncedPriceRange[0],
        maxPrice: debouncedPriceRange[1],
        categoryIds:
          selectedCategories.length > 0 ? selectedCategories : undefined,
      };

      return eventsService.getEvents(params);
    },
  });

  const events = eventsData?.events ?? [];
  const pagination = eventsData?.pagination ?? {
    total: 0,
    page: DEFAULT_PAGE,
    limit: DEFAULT_PAGE_SIZE,
    pages: 1,
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  const handleSortChange = (value: string) => {
    const [sortBy, sortDirection] = value.split(':');
    setFilters((prev) => ({
      ...prev,
      sortBy,
      sortDirection: sortDirection as SortDirection,
      page: DEFAULT_PAGE,
    }));
  };

  const handlePriceChange = (value: [number, number]) => {
    setPriceRangeLocal(value);
  };

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) => {
      const categoryIsSelected = prev.includes(categoryId);

      if (categoryIsSelected) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-col md:flex-row gap-6'>
        <EventFilters
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
          priceRange={priceRangeLocal}
          onPriceChange={handlePriceChange}
          categories={categories}
        />

        <div className='w-full md:w-3/4'>
          <div className='flex justify-between items-center mb-6'>
            <SelectedCategoriesFilter
              selectedCategories={selectedCategories}
              categories={categories}
              toggleCategory={toggleCategory}
            />

            <div className='flex justify-end w-full'>
              <EventSort onSortChange={handleSortChange} />
            </div>
          </div>

          <EventGrid events={events} isLoading={isLoading} />

          <EventPagination
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
