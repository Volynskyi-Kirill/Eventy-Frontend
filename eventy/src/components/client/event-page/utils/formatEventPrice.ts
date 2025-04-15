import { EventZone } from '@/lib/types/event.types';

type PriceInfo = {
  minPrice: number;
  maxPrice: number;
  currency: string;
};

const DEFAULT_CURRENCY = 'UAH';

export const formatEventPrice = (eventZones: EventZone[]): PriceInfo => {
  if (!eventZones.length) {
    return {
      minPrice: 0,
      maxPrice: 0,
      currency: DEFAULT_CURRENCY,
    };
  }

  const minPrice = eventZones.reduce(
    (min, zone) => (zone.price < min ? zone.price : min),
    eventZones[0]?.price || 0
  );

  const maxPrice = eventZones.reduce(
    (max, zone) => (zone.price > max ? zone.price : max),
    0
  );

  const currency = eventZones[0]?.currency || DEFAULT_CURRENCY;

  return {
    minPrice,
    maxPrice,
    currency,
  };
};
