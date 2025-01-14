import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { TokenService } from '@/lib/token.service';
import { authService, RegisterData } from '@/lib/api/auth.service';

interface User {
  id: number;
  email: string;
  userName: string;
  userSurname: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  register: (data: RegisterData) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      isLoggedIn: false,
      user: null,

      register: async (data: RegisterData) => {
        try {
          const response = await authService.register(data);
          TokenService.setAccessToken(response.access_token);
          set({ isLoggedIn: true });
          await get().fetchUser();
        } catch (error) {
          console.error('Registration failed', error);
          throw error;
        }
      },

      login: async (email, password) => {
        try {
          const response = await authService.login({ email, password });
          TokenService.setAccessToken(response.access_token);
          set({ isLoggedIn: true });
          await get().fetchUser();
        } catch (error) {
          console.error('Login failed', error);
          throw error;
        }
      },

      loginWithGoogle: async () => {
        try {
          const response = await authService.loginWithGoogle();
          TokenService.setAccessToken(response.access_token);
          set({ isLoggedIn: true });
          await get().fetchUser();
        } catch (error) {
          console.error('Google login failed', error);
          throw error;
        }
      },

      logout: () => {
        TokenService.removeAccessToken();
        set({ isLoggedIn: false, user: null });
      },

      fetchUser: async () => {
        try {
          const user = await authService.fetchUser();
          set({ user });
        } catch (error) {
          console.error('Failed to fetch user', error);
          set({ isLoggedIn: false, user: null });
          TokenService.removeAccessToken();
        }
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => {
        const { isLoggedIn, user } = state;
        return { isLoggedIn, user } as AuthState;
      },
    }
  )
);
