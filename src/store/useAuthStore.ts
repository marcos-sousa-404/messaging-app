import { persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';
import { useStore } from 'zustand/react';
import type { User } from '@/types/User';

interface AuthStore {
  token: string | null;
  setToken: (token: string | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

export const authStore = createStore<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token: AuthStore['token']) => set({ token }),
      user: null,
      setUser: (user: AuthStore['user']) => set({ user }),
    }),
    { name: 'auth' },
  ),
);

const useAuthStore = () => useStore(authStore);

export default useAuthStore;
