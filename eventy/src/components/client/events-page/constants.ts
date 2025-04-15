import { SortDirection } from '@/lib/types/events-query.types';

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_SORT_BY = 'createdAt';
export const DEFAULT_SORT_DIRECTION = SortDirection.DESC;
export const DEFAULT_PRICE_RANGE: [number, number] = [0, 1000];
export const PRICE_RANGE_MIN = 0;
export const PRICE_RANGE_MAX = 1000;
export const PRICE_RANGE_STEP = 10;
export const PRICE_FILTER_DEBOUNCE_MS = 500;

export const MAX_CATEGORIES_DISPLAYED = 2;
export const MAX_DATES_DISPLAYED = 2;
export const EVENT_DATE_FORMAT = 'dd.MM.yy';

export const SORT_OPTIONS = {
  NEWEST: 'createdAt:desc',
  OLDEST: 'createdAt:asc',
};
