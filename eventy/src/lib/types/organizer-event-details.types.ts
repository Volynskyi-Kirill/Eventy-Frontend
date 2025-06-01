export interface EventDateTimeSlot {
  date: string;
  time: string;
  dateObj: string;
  eventDateId: number;
}

export interface EventBooking {
  id: number;
  ticketId: number;
  seatNumber: number;
  zoneName: string;
  price: number;
  currency: string;
  paymentMethod: string;
  purchaseDate: string;
  eventDate: string;
  eventTime: string;
  buyerName: string;
  buyerEmail: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string | null;
}

export interface EventStatistics {
  totalTickets: number;
  soldTickets: number;
  availableTickets: number;
  totalRevenue: number;
  currency: string;
  guestsCount: number;
  totalSeats: number;
}

export interface OrganizerEventDetails {
  id: number;
  title: string;
  coverImg: string;
  logoImg: string;
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
  shortDescription: string;
  fullDescription: string;
  speakers: {
    id: number;
    userName: string;
    userSurname: string;
    email: string;
    avatarUrl: string;
  }[];
  owner: {
    id: number;
    userName: string;
    userSurname: string;
    email: string;
  };
  availableDates: EventDateTimeSlot[];
  statistics: EventStatistics;
  bookings: EventBooking[];
  selectedDate?: string;
}

export interface OrganizerEventDetailsQueryParams {
  selectedDate?: string;
}
