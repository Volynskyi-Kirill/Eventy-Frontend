import { STORAGE_KEYS } from './constants';

export const TokenService = {
  setAccessToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
    }
  },
  getAccessToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    }
    return null;
  },
  removeAccessToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    }
  },
};
