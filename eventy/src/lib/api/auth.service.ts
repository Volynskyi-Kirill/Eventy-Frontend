import axiosInstance from './axios';
import { API_ENDPOINTS } from './endpoints';
import { AuthSuccessResponse } from './types';

interface RegisterData {
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
};
