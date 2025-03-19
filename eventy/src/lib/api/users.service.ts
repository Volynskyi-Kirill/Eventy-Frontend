import { AccountSettingsFormData } from '../validation/accountSettingsSchema';
import axiosInstance from './axios';
import { API_ENDPOINTS } from './endpoints';

export interface UserByEmail {
  id: number;
  userName: string;
  userSurname: string;
  email: string;
}

export const usersService = {
  updateUser: async (data: AccountSettingsFormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...restData } = data;

    const countryName = restData.country.name;
    const stateName = restData.state.name;
    const cityName = restData.city.name;

    const response = await axiosInstance.patch(API_ENDPOINTS.USERS.BASE, {
      ...restData,
      country: countryName,
      state: stateName,
      city: cityName,
    });

    return response.data;
  },

  getUserByEmail: async (email: string): Promise<UserByEmail> => {
    const response = await axiosInstance.get(API_ENDPOINTS.USERS.BY_EMAIL, {
      params: { email },
    });
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
