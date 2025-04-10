import axiosInstance from './axios';
import { API_ENDPOINTS } from './endpoints';
import type { CreateEventFormData } from '@/lib/validation/createEventSchema';
import { extractLocationNames } from '../utils/location';
import { buildEventsQueryParams } from '../utils/event-query-params';
import { Category, Event, EventsResponse } from '../types/event.types';
import { EventsQueryParams } from '../types/events-query.types';

export type {
  Category,
  Event,
  EventDate,
  EventListItem,
  EventsResponse,
  EventZone,
  SocialMedia,
  User,
} from '../types/event.types';

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
