'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { eventsService } from '@/lib/api/events.service';
import type { EventListItem, EventsResponse } from '@/lib/types/event.types';
import type { EventsQueryParams } from '@/lib/types/events-query.types';
import { SortDirection } from '@/lib/types/events-query.types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, X } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { useDebounce } from 'use-debounce';

export default function EventsPage() {
  const t = useTranslations('EventsPage');

  const [events, setEvents] = useState<EventListItem[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 1,
  });

  const [filters, setFilters] = useState<EventsQueryParams>({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortDirection: SortDirection.DESC,
  });

  const [priceRangeLocal, setPriceRangeLocal] = useState<[number, number]>([
    0, 1000,
  ]);
  const [debouncedPriceRange] = useDebounce(priceRangeLocal, 500);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: categories = [] } = useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: eventsService.getCategories,
  });

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const params: EventsQueryParams = {
          ...filters,
          minPrice: debouncedPriceRange[0],
          maxPrice: debouncedPriceRange[1],
          categoryIds:
            selectedCategories.length > 0 ? selectedCategories : undefined,
        };

        const data: EventsResponse = await eventsService.getEvents(params);
        setEvents(data.events);
        setPagination(data.pagination);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [filters, debouncedPriceRange, selectedCategories]);

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
      page: 1,
    }));
  };

  const handlePriceChange = (value: [number, number]) => {
    setPriceRangeLocal(value);
  };

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd.MM.yy');
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-col md:flex-row gap-6'>
        {/* Filters */}
        <div className='w-full md:w-1/4 space-y-6'>
          <div>
            <h2 className='text-lg font-semibold mb-2'>{t('price')}</h2>
            <div className='space-y-4'>
              <Slider
                defaultValue={[0, 1000]}
                min={0}
                max={1000}
                step={10}
                value={priceRangeLocal}
                onValueChange={handlePriceChange}
                className='mt-6'
              />
              <div className='flex justify-between'>
                <span>
                  {priceRangeLocal[0] === 0
                    ? t('free')
                    : `${priceRangeLocal[0]} ${t('currency')}`}
                </span>
                <span>{`${priceRangeLocal[1]} ${t('currency')}`}</span>
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
                  <label htmlFor={`category-${category.id}`}>
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Events */}
        <div className='w-full md:w-3/4'>
          <div className='flex justify-between items-center mb-6'>
            <div className='flex flex-wrap gap-2'>
              {selectedCategories.length > 0 &&
                categories
                  .filter((c) => selectedCategories.includes(c.id))
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

            <div className='flex items-center'>
              <span className='mr-2'>{t('sortBy')}</span>
              <Select
                defaultValue='createdAt:desc'
                onValueChange={handleSortChange}
              >
                <SelectTrigger className='w-[140px]'>
                  <SelectValue placeholder={t('sortBy')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='createdAt:desc'>{t('newest')}</SelectItem>
                  <SelectItem value='createdAt:asc'>{t('oldest')}</SelectItem>
                  <SelectItem value='price:asc'>
                    {t('priceLowToHigh')}
                  </SelectItem>
                  <SelectItem value='price:desc'>
                    {t('priceHighToLow')}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className='col-span-full text-center py-10'>
              <p className='text-lg text-muted-foreground'>{t('loading')}</p>
            </div>
          ) : (
            <>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {events.length > 0 ? (
                  events.map((event) => (
                    <Link href={`/client/events/${event.id}`} key={event.id}>
                      <Card className='h-full overflow-hidden hover:shadow-lg transition-shadow'>
                        <div className='relative h-48'>
                          <Image
                            src={event.mainImg || '/placeholder.jpg'}
                            alt={event.title}
                            fill
                            className='object-cover'
                          />
                          {event.categories.length > 0 && (
                            <div className='absolute bottom-2 left-2 flex flex-wrap gap-1'>
                              {event.categories.slice(0, 2).map((category) => (
                                <Badge
                                  key={category.id}
                                  className='bg-primary/80 text-primary-foreground'
                                >
                                  {category.name}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <CardContent className='pt-4'>
                          <h3 className='text-lg font-bold truncate'>
                            {event.title}
                          </h3>
                          <div className='flex items-center text-sm text-muted-foreground mt-2'>
                            <MapPin size={14} className='mr-1' />
                            <span className='truncate'>
                              {event.location.city}, {event.location.country}
                            </span>
                          </div>
                          {event.dates && event.dates.length > 0 && (
                            <div className='flex flex-wrap gap-1 mt-2 text-xs'>
                              {event.dates.slice(0, 2).map((date, index) => (
                                <Badge key={index} variant='outline'>
                                  {formatEventDate(date)}
                                </Badge>
                              ))}
                            </div>
                          )}
                          <div className='mt-4 text-xl font-bold'>
                            {event.price.min === 0 && event.price.max === 0
                              ? t('free')
                              : `${event.price.min} - ${event.price.max} ${event.price.currency}`}
                          </div>
                        </CardContent>
                        <CardFooter className='flex justify-between pt-0'>
                          <Button variant='outline' className='w-full'>
                            {t('viewEvent')}
                          </Button>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))
                ) : (
                  <div className='col-span-full text-center py-10'>
                    <p className='text-lg text-muted-foreground'>
                      {t('noEventsFound')}
                    </p>
                  </div>
                )}
              </div>

              {pagination.pages > 1 && (
                <Pagination className='my-8'>
                  <PaginationContent>
                    {pagination.page > 1 && (
                      <PaginationItem>
                        <PaginationPrevious
                          href='#'
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pagination.page - 1);
                          }}
                        />
                      </PaginationItem>
                    )}

                    {Array.from(
                      { length: pagination.pages },
                      (_, i) => i + 1
                    ).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href='#'
                          isActive={page === pagination.page}
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(page);
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    {pagination.page < pagination.pages && (
                      <PaginationItem>
                        <PaginationNext
                          href='#'
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pagination.page + 1);
                          }}
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
