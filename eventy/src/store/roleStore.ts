import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export enum USER_ROLES {
  CLIENT = 'client',
  ORGANIZER = 'organizer',
}

interface RoleState {
  role: USER_ROLES;
  setRole: (role: USER_ROLES) => void;
}

export const useRoleStore = create<RoleState>()(
  persist(
    (set) => ({
      role: USER_ROLES.CLIENT,

      setRole: (role: USER_ROLES) => set({ role }),
    }),
    {
      name: 'role-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ role: state.role }),
    }
  )
);
