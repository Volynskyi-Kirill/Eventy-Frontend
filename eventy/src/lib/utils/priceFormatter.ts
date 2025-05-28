export const PRICE_THRESHOLDS = {
  FREE: 0,
};

/**
 * Checks if the event is free (both min and max price are 0)
 */
export const isEventFree = (minPrice: number, maxPrice: number): boolean => {
  return (
    minPrice === PRICE_THRESHOLDS.FREE && maxPrice === PRICE_THRESHOLDS.FREE
  );
};

/**
 * Formats the event price based on min and max price values
 */
export const formatEventPrice = (
  minPrice: number,
  maxPrice: number,
  freeText: string
): string => {
  if (isEventFree(minPrice, maxPrice)) {
    return freeText;
  }

  if (minPrice !== maxPrice) {
    return `${minPrice} - ${maxPrice}`;
  }

  return `${minPrice}`;
};
