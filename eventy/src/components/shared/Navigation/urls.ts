export const URLS = {
  SHARED: {
    ACCOUNT_SETTINGS: '/account-settings',
    LOGIN: '/login',
    REGISTER: '/register',
  },
  CLIENT: {
    HOME: '/client/home',
    EVENTS: '/client/events',
    EVENT: (eventId: number) => `/client/events/${eventId}`,
    BOOK_EVENT: (eventId: number) => `/client/events/${eventId}/booking`,
    OPEN_SPACE: '/client/open-space',
    SUBSCRIBERS: '/client/subscribers',
  },
  ORGANIZER: {
    DASHBOARD: '/organizer/dashboard',
    EVENTS: '/organizer/events',
    EVENTS_NEW: '/organizer/events/new',
    TICKETS: '/organizer/tickets',
    TARGET: '/organizer/target',
    PEOPLE: '/organizer/people',
  },
};
