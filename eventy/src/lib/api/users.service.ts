import axiosInstance from './axios';
import { API_ENDPOINTS } from './endpoints';

interface UpdateUserData {
  userName?: string;
  userSurname?: string;
  phoneNumber?: string;
  email?: string;
  password?: string;
  newPassword?: string;
  avatarUrl?: string;
}

export const usersService = {
  updateUser: async (data: UpdateUserData) => {
    const response = await axiosInstance.patch(API_ENDPOINTS.USERS.BASE, data);
    return response.data;
  },

  // на будущие, пока наверное не работает
  uploadAvatar: async (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await axiosInstance.post(
      API_ENDPOINTS.USERS.UPLOAD_AVATAR,
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
