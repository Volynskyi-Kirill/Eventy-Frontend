import { STORAGE_KEYS } from './constants';

export const TokenService = {
  setAccessToken: (token: string) => {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  },
  getAccessToken: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },
  removeAccessToken: () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  },
};
