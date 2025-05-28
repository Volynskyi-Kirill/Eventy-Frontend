export interface Category {
  id: number;
  name: string;
}

export interface EventDate {
  id: number;
  date: string;
  eventId: number;
}

export interface EventZone {
  id: number;
  eventId: number;
  name: string;
  price: number;
  currency: string;
  seatCount: number;
}

export interface SocialMedia {
  id: number;
  eventId: number;
  platform: string;
  link: string;
}

export interface User {
  id: number;
  userName: string;
  userSurname: string;
  email: string;
  avatarUrl: string;
  phoneNumber?: string;
  country?: string;
  state?: string;
  city?: string;
  pwdHash?: string;
  provider?: string;
  providerId?: string;
}

export interface Event {
  id: number;
  ownerId: number;
  title: string;
  country: string;
  state: string;
  city: string;
  street: string;
  buildingNumber: string;
  shortDescription: string;
  fullDescription: string;
  coverImg: string;
  logoImg: string;
  mainImg: string;
  userId: number | null;
  dates: EventDate[];
  eventZones: EventZone[];
  socialMedia: SocialMedia[];
  categories: Category[];
  speakers: User[];
  owner: User;
}

export interface EventLocation {
  country: string;
  state: string;
  city: string;
  street: string;
  buildingNumber: string;
}

export interface EventPrice {
  min: number;
  max: number;
  currency: string;
}

export interface EventSeats {
  total: number;
  available: number;
}

export interface EventListItem {
  id: number;
  title: string;
  mainImg: string;
  categories: Category[];
  location: EventLocation;
  price: EventPrice;
  seats: EventSeats;
  dates: string[];
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface EventsResponse {
  events: EventListItem[];
  pagination: PaginationInfo;
}

export interface RecommendedEventDate {
  date: string;
  time: string;
  dateObj: string;
}

export interface RecommendedEventOwner {
  id: number;
  userName: string;
  userSurname: string;
}

export interface RecommendedEvent {
  id: number;
  title: string;
  description: string;
  categories: string[];
  minPrice: number;
  maxPrice: number;
  currency: string;
  numberOfSeats: number;
  nearestDate: RecommendedEventDate;
  dates: RecommendedEventDate[];
  country: string;
  city: string;
  backgroundImage: string;
  owner: RecommendedEventOwner;
}
