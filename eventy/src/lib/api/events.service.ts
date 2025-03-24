import axiosInstance from './axios';
import { API_ENDPOINTS } from './endpoints';
import type { CreateEventFormData } from '@/lib/validation/createEventSchema';
import { extractLocationNames } from '../utils/location';

export interface Category {
  id: number;
  name: string;
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

  async getEvent(id: number) {
    const response = await axiosInstance.get(
      API_ENDPOINTS.EVENTS.GET_BY_ID(id)
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
