import { Category } from '@/lib/types/event.types';

export interface Event {
  id: number;
  title: string;
  mainImg: string;
  categories: Category[];
  location: {
    city: string;
    country: string;
    state?: string;
  };
  dates: string[];
  price: {
    min: number;
    max: number;
    currency: string;
  };
}

export interface PaginationData {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface EventsData {
  events: Event[];
  pagination: PaginationData;
}

export interface EventFiltersProps {
  selectedCategories: number[];
  toggleCategory: (categoryId: number) => void;
  priceRange: [number, number];
  onPriceChange: (value: [number, number]) => void;
  categories: Category[];
}

export interface SelectedCategoriesFilterProps {
  selectedCategories: number[];
  categories: Category[];
  toggleCategory: (categoryId: number) => void;
}

export interface EventSortProps {
  onSortChange: (value: string) => void;
}

export interface EventCardProps {
  event: Event;
  isPast?: boolean;
}

export interface EventGridProps {
  events: Event[];
  isLoading: boolean;
}

export interface EventPaginationProps {
  pagination: PaginationData;
  onPageChange: (page: number) => void;
}
