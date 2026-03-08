import { persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';
import { useStore } from 'zustand/react';

interface AuthStore {
    token: string | null;
    setToken: (token: string | null) => void;
}

export const authStore = createStore<AuthStore>()(
    persist(
        (set) => ({
            token: null,
            setToken: (token: AuthStore['token']) => set({ token: token }),
        }),
        { name: 'auth' },
    ),
);

export const useAuthStore = () => useStore(authStore);
