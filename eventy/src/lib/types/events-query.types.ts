export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export interface LocationFilter {
  country?: string;
  state?: string;
  city?: string;
}

export interface PriceFilter {
  min?: number;
  max?: number;
}

export interface EventsQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortDirection?: SortDirection;
  categoryIds?: number[];
  price?: PriceFilter;
  location?: LocationFilter;
  minPrice?: number;
  maxPrice?: number;
  country?: string;
  state?: string;
  city?: string;
}
