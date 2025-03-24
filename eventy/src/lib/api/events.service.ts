import axiosInstance from './axios';
import { API_ENDPOINTS } from './endpoints';
import type { CreateEventFormData } from '@/lib/validation/createEventSchema';

export const eventsService = {
  async createEvent(data: CreateEventFormData) {
    const countryName = data.country?.name as string;
    const stateName = data.state?.name as string;
    const cityName = data.city?.name as string;

    const response = await axiosInstance.post(API_ENDPOINTS.EVENTS.CREATE, {
      ...data,
      country: countryName,
      state: stateName,
      city: cityName,
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

    console.log('🚀 ~ uploadImage ~ response:', response);
    return response.data;
  },
};
