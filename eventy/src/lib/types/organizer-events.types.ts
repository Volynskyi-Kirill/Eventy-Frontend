export interface OrganizerEventCard {
  id: number;
  title: string;
  mainImg: string;
  categories: { id: number; name: string }[];
  location: {
    country: string;
    state: string;
    city: string;
    street: string;
    buildingNumber: string;
  };
  price: {
    min: number;
    max: number;
    currency: string;
  };
  seats: {
    total: number;
    available: number;
  };
  dates: string[];
  nearestDate: string | null;
  status: 'upcoming' | 'past';
}

export interface GroupedOrganizerEvents {
  upcoming: OrganizerEventCard[];
  past: OrganizerEventCard[];
}

export enum EventStatus {
  UPCOMING = 'upcoming',
  PAST = 'past',
  ALL = 'all',
}

export interface OrganizerEventsQueryParams {
  status?: EventStatus;
}
