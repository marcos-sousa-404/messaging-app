import { persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';
import { useStore } from 'zustand/react';

interface UserPreferencesStore {
  theme: 'light' | 'dark' | 'auto';
  setTheme: (theme: 'light' | 'dark') => void;
}

const userPreferencesStore = createStore<UserPreferencesStore>()(
  persist(
    (set) => ({
      theme: 'auto',
      setTheme: (theme: UserPreferencesStore['theme']) => set({ theme }),
    }),
    { name: 'user-preferences' },
  ),
);

export const useUserPreferencesStore = () => useStore(userPreferencesStore);
