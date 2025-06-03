import type { CreateEventFormData } from '@/lib/validation/createEventSchema';
import {
  Category,
  Event,
  EventsResponse,
  RecommendedEvent,
} from '../types/event.types';
import {
  GroupedOrganizerEvents,
  OrganizerEventsQueryParams,
} from '../types/organizer-events.types';
import {
  OrganizerEventDetails,
  OrganizerEventDetailsQueryParams,
} from '../types/organizer-event-details.types';
import {
  DashboardStats,
  DashboardStatsQueryParams,
} from '../types/dashboard-stats.types';
import { EventsQueryParams } from '../types/events-query.types';
import { buildEventsQueryParams } from '../utils/event-query-params';
import { extractLocationNames } from '../utils/location';
import axiosInstance from './axios';
import { API_ENDPOINTS } from './endpoints';

export type {
  Category,
  Event,
  EventDate,
  EventListItem,
  EventsResponse,
  EventZone,
  RecommendedEvent,
  RecommendedEventDate,
  RecommendedEventOwner,
  SocialMedia,
  User,
} from '../types/event.types';

export type {
  GroupedOrganizerEvents,
  OrganizerEventCard,
  EventStatus,
} from '../types/organizer-events.types';

export type {
  OrganizerEventDetails,
  EventBooking,
  EventStatistics,
  EventDateTimeSlot,
} from '../types/organizer-event-details.types';

export type {
  DashboardStats,
  TopEventByRevenue,
  TopEventByTickets,
  CategoryStats,
  RecentEvent,
  UpcomingEvent,
} from '../types/dashboard-stats.types';

export { SortDirection } from '../types/events-query.types';

export type { EventsQueryParams } from '../types/events-query.types';

export const eventsService = {
  async getCategories() {
    const response = await axiosInstance.get<Category[]>(
      API_ENDPOINTS.CATEGORIES.GET_ALL
    );
    return response.data;
  },

  async createEvent(data: CreateEventFormData) {
    const { country, state, city } = extractLocationNames(data);

    const response = await axiosInstance.post(API_ENDPOINTS.EVENTS.CREATE, {
      ...data,
      country,
      state,
      city,
    });
    return response.data;
  },

  async getEvents(params?: EventsQueryParams) {
    const queryParams = buildEventsQueryParams(params);
    const url = `${API_ENDPOINTS.EVENTS.GET_ALL}?${queryParams.toString()}`;
    const response = await axiosInstance.get<EventsResponse>(url);
    return response.data;
  },

  async getOrganizerEvents(params?: OrganizerEventsQueryParams) {
    const queryParams = new URLSearchParams();
    if (params?.status) {
      queryParams.append('status', params.status);
    }

    const url = `${API_ENDPOINTS.EVENTS.ORGANIZER}?${queryParams.toString()}`;
    const response = await axiosInstance.get<GroupedOrganizerEvents>(url);
    return response.data;
  },

  async getOrganizerEventDetails(
    id: number,
    params?: OrganizerEventDetailsQueryParams
  ) {
    const queryParams = new URLSearchParams();
    if (params?.selectedDate) {
      queryParams.append('selectedDate', params.selectedDate);
    }

    const url = `${API_ENDPOINTS.EVENTS.ORGANIZER_DETAILS(
      id
    )}?${queryParams.toString()}`;
    const response = await axiosInstance.get<OrganizerEventDetails>(url);
    return response.data;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getOrganizerDashboardStats(params?: DashboardStatsQueryParams) {
    const queryParams = new URLSearchParams();
    // Add future query parameters here if needed

    const url = `${
      API_ENDPOINTS.EVENTS.ORGANIZER_DASHBOARD_STATS
    }?${queryParams.toString()}`;
    const response = await axiosInstance.get<DashboardStats>(url);
    return response.data;
  },

  async getRecommendedEvents() {
    const response = await axiosInstance.get<RecommendedEvent[]>(
      API_ENDPOINTS.EVENTS.RECOMMENDED
    );
    return response.data;
  },

  async getEvent(id: string | number) {
    const response = await axiosInstance.get<Event>(
      API_ENDPOINTS.EVENTS.GET_BY_ID(Number(id))
    );
    return response.data;
  },

  async updateEvent(id: number, data: Partial<CreateEventFormData>) {
    const response = await axiosInstance.put(
      API_ENDPOINTS.EVENTS.UPDATE(id),
      data
    );
    return response.data;
  },

  async deleteEvent(id: number) {
    const response = await axiosInstance.delete(
      API_ENDPOINTS.EVENTS.DELETE(id)
    );
    return response.data;
  },

  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosInstance.post(
      API_ENDPOINTS.EVENTS.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  },
};
