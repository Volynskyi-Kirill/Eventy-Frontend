import axiosInstance from './axios';
import { API_ENDPOINTS } from './endpoints';
import { AuthSuccessResponse } from './types';

export interface RegisterData {
  userName: string;
  userSurname: string;
  phoneNumber: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  register: async (data: RegisterData) => {
    const response = await axiosInstance.post<AuthSuccessResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );
    return response.data;
  },

  login: async (data: LoginData) => {
    const response = await axiosInstance.post<AuthSuccessResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );
    return response.data;
  },
  loginWithGoogle: async () => {
    const response = await axiosInstance.post<AuthSuccessResponse>(
      API_ENDPOINTS.AUTH.GOOGLE
    );
    return response.data;
  },
  fetchUser: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.USERS.ME);
    return response.data;
  },
};
