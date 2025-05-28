export const QUERY_KEYS = {
  ORGANIZER_EVENTS: 'organizer-events',
} as const;

export const REFETCH_INTERVAL = {
  ORGANIZER_EVENTS: 30000, // 30 seconds
} as const;

export const STALE_TIME = {
  ORGANIZER_EVENTS: 60000, // 1 minute
} as const;
