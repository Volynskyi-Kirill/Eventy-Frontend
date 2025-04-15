import { Event } from '@/lib/types/event.types';

export const buildEventAddress = (event: Event): string => {
  const addressParts = [
    event.street,
    event.buildingNumber,
    event.city,
    event.country,
  ].filter(Boolean);

  return addressParts.join(', ');
};
