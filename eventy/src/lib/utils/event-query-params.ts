import { EventsQueryParams } from '../types/events-query.types';

export const buildEventsQueryParams = (
  params?: EventsQueryParams
): URLSearchParams => {
  const queryParams = new URLSearchParams();

  if (!params) return queryParams;

  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params.sortDirection)
    queryParams.append('sortDirection', params.sortDirection);

  if (params.categoryIds && params.categoryIds.length > 0) {
    queryParams.append('categoryIds', params.categoryIds.join(','));
  }

  if (params.minPrice !== undefined) {
    queryParams.append('minPrice', params.minPrice.toString());
  }
  if (params.maxPrice !== undefined) {
    queryParams.append('maxPrice', params.maxPrice.toString());
  }

  if (params.country) queryParams.append('country', params.country);
  if (params.state) queryParams.append('state', params.state);
  if (params.city) queryParams.append('city', params.city);

  return queryParams;
};
