import { AccountSettingsFormData } from '../validation/accountSettingsSchema';
import axiosInstance from './axios';
import { API_ENDPOINTS } from './endpoints';

export const usersService = {
  updateUser: async (data: AccountSettingsFormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...restData } = data;
    const response = await axiosInstance.patch(
      API_ENDPOINTS.USERS.BASE,
      restData
    );
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
