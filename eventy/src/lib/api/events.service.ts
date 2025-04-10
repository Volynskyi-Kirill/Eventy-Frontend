import axiosInstance from './axios';
import { API_ENDPOINTS } from './endpoints';
import type { CreateEventFormData } from '@/lib/validation/createEventSchema';
import { extractLocationNames } from '../utils/location';

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

  async getEvents() {
    const response = await axiosInstance.get(API_ENDPOINTS.EVENTS.GET_ALL);
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
